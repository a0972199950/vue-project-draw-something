<template>
    <div>
        Init Firebase Page
        <router-link to="/">回首頁</router-link>
    </div>
</template>

<script>
import { roomsInSelect, canvas, questionbase, roomsInGame } from "../../data_tree";
import { database } from "../firebase";

export default {
    mounted(){
        database.ref("/").set({ roomsInSelect, canvas, questionbase, roomsInGame }).then(() => {
            console.log("初始化firebase完成");
        })
    }
}
</script>