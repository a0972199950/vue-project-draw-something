<template>
    <div>
        <h1>登入頁面</h1>
        <button @click="handleLogin('google')">以Google帳戶登入</button>
        <button @click="handleLogout">登出</button>
        <router-link to="/init">初始化資料庫</router-link>
    </div>
</template>


<script>
export default {
    methods: {
        handleLogin(type){            
            this.$store.dispatch("loginAsync", { type });
        },

        handleLogout(){
            this.$store.dispatch("logoutAsync");
        }
    },

    computed: {
        isLogin(){
            return this.$store.getters.isLogin
        }
    },

    watch: {
        isLogin(newValue){
            if(newValue){
                // 登入成功後跳轉到房間選擇頁面
                this.$router.push({ name: "roomSelect"});
            }
        }
    }
}
</script>