<template>
    <div id="gamepad">
        <template v-if="isAnswerCorrect === 0">
            <h3 class="title">題目：{{ question.title }}</h3>
            <img :src="question.photo" class="img" alt="">
        </template>        

        <div v-else>
            <p v-if="isAnswerCorrect > 0">隊友答對了，獲得一分！！！</p>
            <p v-else>可惜對方答錯了，分數扣1...</p>
        </div>
    </div>
</template>

<script>
import { database } from "../../firebase";
export default {
    data(){
        return {
            question: {
                id: null,
                title: null,
                photo: null
            },
            // > 0 為答案正確; < 0 為答案錯誤; === 0 為尚未回答
            isAnswerCorrect: 0
        }
    },

    created(){
        console.log("drawerGamepad created");
        // 隨機選擇一個題目
        const roomId = this.$store.getters.userRoomId;
        const questions = this.$store.getters.questionbase.questions;
        const question = this.random(questions);

        database.ref(`roomsInGame/room_${roomId}/questionId`).set(question.id).then(() => {
            console.log("題目random成功，題目為", question);
            this.question = question;
        }).catch(() => {
            alert("設定題目到firebase上失敗");
        });


        // 監聽picker選擇答案
        database.ref(`roomsInGame/room_${roomId}/answerId`).on("value", this.onAnswerPicked);
    },

    methods: {
        random(arr){
            const min = 0;
            const max = arr.length;
            const randomNum = Math.floor(Math.random() * (max - min) + min);
            return arr[randomNum];
        },

        onAnswerPicked(snapshot){
            const answerId = snapshot.val();

            // on()執行第一次時還沒有answerId資料，因此第一次執行要直接return
            if(!answerId) return;

            const questionId = this.question.id;
            this.isAnswerCorrect = answerId === questionId ? 1 : -1;
            
            // picker選擇完答案並更新data後就拿掉監聽器
            snapshot.ref.off();
        },
    },
    
    // beforeDestroy(){
    //     console.log("frawerGamepad beforeDestroy");
    //     // 清除上一輪的題目
    //     const roomId = this.$store.getters.userRoomId;
    //     database.ref(`roomsInGame/room_${roomId}/questionId`).set(false);
    // }

}
</script>


<style lang="scss" scope>
    #gamepad {
        display: flex;
        width: 500px;
    }
</style>