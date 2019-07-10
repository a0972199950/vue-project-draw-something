<template>
    <div>
        <h1>目前得分：{{score}}</h1>
        <h1>剩餘時間：{{time}}</h1>
        <h3>You are {{ $route.params.role }}</h3>

        <component :is="canvasComponent"></component>

        <component :is="gamepadComponent"></component>
    </div>
</template>


<script>
import { database } from "../firebase";

import DrawerCanvas from "../components/canvas/DrawerCanvas";
import PickerCanvas from "../components/canvas/PickerCanvas";

import DrawerGamepad from "../components/gamepad/DrawerGamepad";
import PickerGamepad from "../components/gamepad/PickerGamepad";
import { setInterval, clearInterval, setTimeout } from 'timers';

export default {
    components: {
        appDrawerCanvas: DrawerCanvas,
        appPickerCanvas: PickerCanvas,
        
        appDrawerGamepad: DrawerGamepad,
        appPickerGamepad: PickerGamepad
    },

    data(){
        return {
            canvasComponent: null,
            gamepadComponent: null,

            score: 0,
            time: null,
            timer: null
        }
    },

    created(){
        // 監聽分數變化
        const roomId = this.$store.getters.userRoomId;
        database.ref(`roomsInGame/room_${roomId}/score`).on("value", this.onScoreChange);

        // 監聽時間變化
        database.ref(`roomsInGame/room_${roomId}/time`).on("value", this.onTimeChange);  
        
        // 監聽換局許可變化
        database.ref(`roomsInGame/room_${roomId}/readySwitchRole`).on("value", this.onReadySwitchRole);  
    },

    mounted(){
        // 初次渲染要初始化子組件以及設定timer
        console.log("mounted");
        this.initChildComponents();

        // 只有mainControl該做的事
        if(this.$store.getters.isMainController){
            // 1) 設定計時器
            this.setTimer();
        };
    },


    methods: {
        initChildComponents(){
            switch(this.$route.params.role){
                case "drawer":
                    this.canvasComponent = "appDrawerCanvas";
                    this.gamepadComponent = "appDrawerGamepad";
                    break;

                case "picker":
                    this.canvasComponent = "appPickerCanvas";
                    this.gamepadComponent = "appPickerGamepad";
                    break;
            };
        },

        // 換局函數
        onReadySwitchRole(snapshot){
            const readySwitchRole = snapshot.val();
            if(readySwitchRole){
                const roomId = this.$store.getters.userRoomId;
                let role;
                switch(this.$route.params.role){
                    case "drawer":
                        role = "picker";
                        break;

                    case "picker":
                        role = "drawer";
                        break;
                }

                setTimeout(() => {
                    this.$router.push({name: "gameRoom", params: {roomId, role}});
                }, 3000);
                
            }
            
        },

        onScoreChange(snapshot){
            const score = snapshot.val();
            this.score = score;
        },

        onTimeChange(snapshot){
            const time = snapshot.val();
            this.time = time;
        },

        setTimer(){
            const roomId = this.$store.getters.userRoomId;

            const timer = setInterval(() => {
                if(this.time <= 0){
                    clearInterval(this.timer);
                } else {
                    database.ref(`roomsInGame/room_${roomId}/time`).transaction(currentData => currentData - 1);
                }            
            }, 1000);

            this.timer = timer;
        }
    },

    watch: {
        score(){
            const roomId = this.$store.getters.userRoomId;

            // 只有mainControl該做的事
            if(this.$store.getters.isMainController){
                // 1) 暫停計時器
                clearInterval(this.timer);

                // 2) 清空上一輪的題目和答案，並把換局許可打開
                database.ref(`roomsInGame/room_${roomId}`).update({
                    questionId: false,
                    answerId: false,
                    readySwitchRole: true
                });
            };            
        },

        $route(to, from){
            const roomId = this.$store.getters.userRoomId;
            console.log("路由改變");
            this.initChildComponents();

            // 只有mainControl該做的事
            if(this.$store.getters.isMainController){
                // 1) 設定計時器
                this.setTimer();

                // 2) 把換局許可關掉
                database.ref(`roomsInGame/room_${roomId}/readySwitchRole`).set(false);
            };
        }
    }
}
</script>
