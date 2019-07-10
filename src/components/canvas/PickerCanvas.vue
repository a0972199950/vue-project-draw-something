<template>
    <div>
        <canvas
            :width="canvasWidth"
            :height="canvasHeight"
        ></canvas>
    </div>
</template>

<script>
import { database } from "../../firebase";
export default {
    data(){
        return {
            canvasWidth: 500,
            canvasHeight: 400,
            ctx: null,

            drawingStatus: "end",
            percentX: 0,
            percentY: 0
        }
    },

    mounted(){
        const canvas = document.getElementsByTagName("canvas")[0];
        const ctx = canvas.getContext("2d");

        ctx.lineWidth = 3;
        this.ctx = ctx;

        const roomId = this.$store.getters.userRoomId;
        // const roomId = 1; // 測試環境用
        database.ref(`canvas/room_${roomId}`).on("value", this.onCoorChange)
    },

    methods: {
        onCoorChange(snapshot){
            const { drawingStatus, percentX, percentY } = snapshot.val();

            this.drawingStatus = drawingStatus;
            this.percentX = percentX;
            this.percentY = percentY;

            switch(drawingStatus){
                case "start":
                    this.handleStart();
                    break;

                case "move":
                    this.handleMove();
                    break;

                case "end":
                    this.handleEnd();
                    break;
            }
        },

        handleStart(){
            const ctx = this.ctx;
            const x = this.percentX * this.canvasWidth;
            const y = this.percentY * this.canvasHeight;

            ctx.beginPath();
            ctx.moveTo(x, y);
        },

        handleMove(){
            const ctx = this.ctx;
            const x = this.percentX * this.canvasWidth;
            const y = this.percentY * this.canvasHeight;

            ctx.lineTo(x, y);
            ctx.stroke();
        },

        handleEnd(){

        }
    }
}
</script>


<style lang="scss" scoped>
    canvas {
        border: 1px red solid;
    }
</style>