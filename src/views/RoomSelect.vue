<template>
    <div>
        <h1>Room Select Page</h1>
        <Rooms 
            v-for="n in 4" 
            :roomId="n" 
            :confirmSelection="confirmSelection" 
            :enoughPlayers="enoughPlayers"
            @confirm="confirmSelection = true"
        ></Rooms>
    </div>
</template>

<script>
import { database } from "../firebase";
import Rooms from "../components/Rooms";

export default {
    data(){
        return {
            confirmSelection: false,
            enoughPlayers: false,
            enterGameRoom: false,

            // 儲存加上了.on的firebase reference, 之後呼叫.off()要用到
            databaseRef: null
        }
    },

    components: { Rooms },

    methods: {
        onWaitingPlayersChange(snapshot){
            const value = snapshot.val();

            this.enoughPlayers = value.waitingPlayers >= 2 ? true : false;
            this.enterGameRoom = value.confirmedPlayers >= 2 ? true : false;
        }
    },

    computed: {
        userRoomId(){
            return this.$store.getters.userRoomId
        }
    },

    watch: {
        userRoomId(newUserRoomId, oldUserRoomId){
            if(newUserRoomId){
                const databaseRef = database.ref(`roomsInSelect/room_${newUserRoomId}`);
                this.databaseRef = databaseRef;

                this.databaseRef.on("value", this.onWaitingPlayersChange);

            } else {
                this.databaseRef.off("value", this.onWaitingPlayersChange);
            }
        },

        enterGameRoom(newValue, oldValue){
            if(newValue === true){
                // 歸類user是drawer還是picker
                let roomId = this.$store.getters.userRoomId;                
                let role = this.$store.state.room.player;
                if(this.$store.getters.isMainController){
                    role = "drawer";
                } else {
                    role = "picker";
                }

                // 跳轉到題目選擇房間
                this.$router.push({ name: "questionbaseSelect", params: { roomId } });
            }
        },
    },

    beforeDestroy(){
        // 註銷所有firebase監聽器
        this.databaseRef.off();
    }
    
}
</script>