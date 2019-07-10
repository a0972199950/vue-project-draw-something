<template>
    <div>
        <h1>QuestionbaseSelect</h1>
        <h2>{{ questionbaseTitle }}</h2>
    </div>
</template>

<script>
import { database } from "../firebase";
import { setTimeout } from 'timers';

export default {
    mounted(){
        if(this.$store.getters.isMainController){
            this.randomQuestionbase();
        }

        this.listenQuestionbase();
    },

    methods: {
        randomQuestionbase(){
            database.ref("questionbase").once("value", snapshot => {
                console.log("抓取所有題庫");
                const questionbases = snapshot.val();
                const questionbase = this.random(questionbases);

                this.$store.dispatch("selectQuestionbaseAsync", { questionbaseId: questionbase.id });
            })
        },

        listenQuestionbase(){
            const roomId = this.$store.getters.userRoomId;
            database.ref(`roomsInGame/room_${roomId}/questionbaseId`).on("value", this.onQuestionbaseSelect);
        },

        random(arr){
            const min = 0;
            const max = arr.length;
            const randomNum = Math.floor(Math.random() * (max - min) + min);
            return arr[randomNum];
        },

        onQuestionbaseSelect(snapshot){
            const questionbaseId = snapshot.val();

            this.$store.dispatch("listenQuestionbaseAsync", { questionbaseId });
        }
    },

    computed: {
        questionbaseTitle(){
            if(this.$store.getters.questionbase){
                return this.$store.getters.questionbase.title;
            } else {
                return null;
            }
        }
    },

    watch: {
        "questionbaseTitle": function(){
            const roomId = this.$store.getters.userRoomId;                
            let role;

            // 歸類user是drawer還是picker                
            if(this.$store.getters.isMainController){
                role = "drawer";
            } else {
                role = "picker";
            };

            setTimeout(() => {
                // 跳轉到遊戲房間
                this.$router.push({ name: "gameRoom", params: { roomId, role } });
            }, 3000);
        }
    },

    beforeDestroy(){
        const roomId = this.$store.getters.userRoomId;
        database.ref(`roomsInGame/room_${roomId}/questionbaseId`).off();
    }
}
</script>