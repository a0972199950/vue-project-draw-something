<template>
    <section @click.capture="cancelAllEvent">
        <h3>房間{{ roomId }}</h3>
        <div class="rooms">
            <div class="room" @click="handleSelectRoom('player1')">
                <img v-if="player1Photo" :src="player1Photo">

                <p v-else>
                    尚無玩家
                </p>
                
            </div>

            <div class="room" @click="handleSelectRoom('player2')">
                <img v-if="player2Photo" :src="player2Photo">

                <p v-else>
                    尚無玩家
                </p>
            </div>

            <div v-if="(enoughPlayers && userInThisRoom)">
                <p>玩家已到齊，請按確認進入遊戲：</p>
                <button :disabled="confirmSelection" @click="handleConfirm">確認</button>
            </div>
            
        </div>
    </section>    
</template>

<script>
import { database } from "../firebase";
import { setTimeout } from 'timers';

export default {
    props: ["roomId", "enoughPlayers", "confirmSelection"],

    data(){
        return {
            player1Photo: null,
            player2Photo: null,

            databaseRef: null
        }       
    },

    methods: {
        cancelAllEvent(e){
            if(this.confirmSelection){
                e.stopImmediatePropagation();
            }            
        },

        handleSelectRoom(player){
            const databaseRef = database.ref(`roomsInSelect/room_${this.roomId}`);

            // 判斷房間是否為可選狀態，以及玩家是否擁有該房間
            let roomsIsSelected, playerOwnRoom;

            databaseRef.once("value")
            .then(snapshot => {
                const value = snapshot.val();
                if(value[player].uid){
                    roomsIsSelected = true;

                    // 判斷玩家是否擁有該房間
                    const roomUid = value[player].uid;
                    const uid = this.$store.state.user.uid;
                    playerOwnRoom = roomUid === uid;
                } else {
                    roomsIsSelected = false;
                }
            })
            .then(() => {
                // 判斷玩家是否已選過房間
                let playerHasRoom = this.$store.state.room.roomId ? true : false;
                

                // 判斷該如何處理房間選擇事件
                if(roomsIsSelected && playerHasRoom && playerOwnRoom){
                    this.$store.dispatch("unselectRoomAsync", { databaseRef, player })

                } else if(!roomsIsSelected && !playerHasRoom){
                    this.$store.dispatch("selectRoomAsync", { databaseRef, player, roomId: this.roomId })

                } else return;
            });
        },
        
        handleConfirm(){
            const databaseRef = database.ref(`roomsInSelect/room_${this.roomId}`);

            databaseRef.child("confirmedPlayers").transaction(currentData =>  currentData + 1).then(() => {
                this.$emit("confirm");
            })
            
        },

        onPhotoChange(snapshot){
            const value = snapshot.val();

            this.player1Photo = value.player1.photo;
            this.player2Photo = value.player2.photo;
        }

    },

    created(){
        const databaseRef = database.ref(`roomsInSelect/room_${this.roomId}`);
        this.databaseRef = databaseRef;

        // 監聽firebase的roomsInSelect的玩家照片變化
        this.databaseRef.on("value", this.onPhotoChange);
    },
    

    computed: {
        userInThisRoom(){
            return this.roomId === this.$store.getters.userRoomId;
        }
    },


    beforeDestroy(){
        // 註銷所有firebase監聽器
        this.databaseRef.off();
    }
}
</script>


<style lang="scss">
    img {
        width: 100%;
        display: block;
    }
    .rooms {
        display: flex;

        .room {
            width: 100px;
            height: 100px;
            border: 1px black solid;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
        }
    }

    
</style>