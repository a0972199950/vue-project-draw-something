<template>
    <div>
        <canvas
            :width="canvasWidth"
            :height="canvasHeight"
            @mousedown="handleStart('click', $event)"
            @mousemove="handleMove('click', $event)"
            @mouseup="handleEnd('click', $event)"
            @mouseleave="handleEnd('click', $event)"

            @touchstart="handleStart('touch', $event)"
            @touchmove="handleMove('touch', $event)"
            @touchend="handleEnd('touch', $event)"
        ></canvas>
    </div>
</template>


<script>
import { database } from "../../firebase";

export default {
    data(){
        return {
            drawingStatus: "end",
            ctx: null,
            canvasWidth: 500,
            canvasHeight: 400,


            percentX: 0,
            percentY: 0
        }
    },

    mounted(){
        const canvas = document.getElementsByTagName("canvas")[0];
        const ctx = canvas.getContext("2d");
        this.ctx = ctx;
    },


    methods: {
        handleStart(type, e){
            const ctx = this.ctx;

            // 定義滑鼠游標的x及y座標
            let x, y;
            switch(type){
                case "click":
                    x = e.offsetX;
                    y = e.offsetY;
                    break;

                case "touch":
                    x = e.targetTouches[0].pageX;
                    y = e.targetTouches[0].pageY;
                    break;
            }
            

            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(x, y);

            this.updateCoor("start", x, y);
        },

        handleMove(type, e){
            if(this.drawingStatus !== "end"){
                const ctx = this.ctx;

                // 定義滑鼠游標的x及y座標
                let x, y;
                switch(type){
                case "click":
                    x = e.offsetX;
                    y = e.offsetY;
                    break;

                case "touch":
                    x = e.targetTouches[0].pageX;
                    y = e.targetTouches[0].pageY;
                    break;
            }

                ctx.lineTo(x, y);
                ctx.stroke();

                this.updateCoor("move", x, y);
            }            

        },

        handleEnd(){
            this.updateCoor("end", 0, 0);
        },


        updateCoor(drawingStatus, x, y){
            this.drawingStatus = drawingStatus;
            this.percentX = x / this.canvasWidth;
            this.percentY = y / this.canvasHeight;

            this.updateCoorAsync();
        },

        updateCoorAsync(){    
            const roomId = this.$store.getters.userRoomId;
            // const roomId = 1; // 測試環境用

            database.ref(`canvas/room_${roomId}`).update({
                drawingStatus: this.drawingStatus,
                percentX: this.percentX,
                percentY: this.percentY
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    canvas {
        border: 1px black solid;
    }
</style>