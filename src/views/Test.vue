<template>
    <div></div>
</template>


<script>
import { database, storage } from "../firebase.js";

export default {
    mounted(){
        database.ref(`questionbase`).orderByChild("title").equalTo("水果").once("value").then(snapshot => {
            const questionbase = snapshot.val();
            console.log(questionbase);
        })
    }
}
</script>
