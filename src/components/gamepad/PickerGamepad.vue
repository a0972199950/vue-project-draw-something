<template>
    <div id="gamepad">
        <template v-if="isAnswerCorrect === 0">
            <button 
                v-for="option in options"
                @click="handlePickAnswer(option.id)"
            >{{ option.title }}</button>
        </template>        

        <div v-else>
            <p v-if="isAnswerCorrect > 0">答對了！！！</p>
            <p v-else>可惜答錯囉，答案是...{{question.title}}</p>
        </div>
    </div>
</template>


<script>
import { database } from "../../firebase";
export default {
    data(){
        return {
            question: null,
            options: [],
            // > 0 為答案正確; < 0 為答案錯誤; === 0 為尚未回答
            isAnswerCorrect: 0
        }
    },

    created(){
        console.log("pickerGamepad created");
        const roomId = this.$store.getters.userRoomId;

        // 監聽DrawerGamepad何時隨機選出問題，之後在本地端random出四個選項
        database.ref(`roomsInGame/room_${roomId}/questionId`).on("value", this.onQuestionSet);

        // 監聽picker選擇答案
        database.ref(`roomsInGame/room_${roomId}/answerId`).on("value", this.onAnswerPicked);
    },

    
    methods: {
        onQuestionSet(snapshot){
            console.log("picker真的有執行設定答案了喔");     
            const questionId = snapshot.val();
            if(!questionId) return;
            const options = [];

            // 深拷貝一個questions陣列
            const questions = this.$store.getters.questionbase.questions.map(question => question);

            // 依照id尋找正確答案後，把正確答案push進options及加進data裡，並從原陣列刪除該question
            const answerIndex = questions.findIndex(question => question.id === questionId);
            this.question = questions[answerIndex];
            console.log("pickerGamepad執行onQuestionSet，題目id為", questionId);   
            options.push(questions.splice(answerIndex, 1)[0]);

            // 另外random出三個不是正確答案的選項
            while(options.length < 4){
                const randomNum = Math.floor(Math.random() * questions.length);
                options.push(questions.splice(randomNum, 1)[0]);
            };

            // 打散options陣列的順序後，將需要的資料存到data的options裡面
            options.sort((a, b) => Math.random() > 0.5 ? 1 : -1);
            this.options = options.map(option => ({id: option.id, title: option.title}));

            // random出四個選項後就拿掉監聽器
            snapshot.ref.off();
        },

        onAnswerPicked(snapshot){
            const answerId = snapshot.val();

            // on()執行第一次時還沒有answerId資料，因此第一次執行要直接return
            if(answerId === false) return;

            const questionId = this.question.id;
            this.isAnswerCorrect = answerId === questionId ? 1 : -1;
            
            // picker選擇完答案並更新data後就拿掉監聽器
            snapshot.ref.off();
        },

        handlePickAnswer(answerId){
            const roomId = this.$store.getters.userRoomId;
            database.ref(`roomsInGame/room_${roomId}/answerId`).set(answerId);
        }
    },


    watch: {
        // 根據答對或答錯來增減firebase上的分數紀錄
        isAnswerCorrect(newValue){
            const roomId = this.$store.getters.userRoomId;
            const mutation = newValue;

            database.ref(`roomsInGame/room_${roomId}/score`).transaction(currentData => currentData + mutation);
        }
    },


    // beforeDestroy(){
    //     // 清除上一輪的答案
    //     const roomId = this.$store.getters.userRoomId;
    //     database.ref(`roomsInGame/room_${roomId}/answerId`).set(false);
    // }
}
</script>


<style lang="scss" scope>
    #gamepad {
        display: flex;
        width: 500px;
        justify-content: space-between;
    }
</style>