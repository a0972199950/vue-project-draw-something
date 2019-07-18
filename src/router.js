import Vue from 'vue'
import Router from 'vue-router';
import store from "./store";

import InitFirebase from "./views/InitFirebase.vue";
import Login from "./views/Login.vue";
import RoomSelect from "./views/RoomSelect.vue";
import QuestionbaseSelect from "./views/QuestionbaseSelect.vue";
import GameRoom from "./views/GameRoom.vue";

import Test from "./views/Test.vue";


Vue.use(Router)

const router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },

    {
      path: "/room_select",
      name: "roomSelect",
      component: RoomSelect
    },

    {
      path: "/questionbase_select/:roomId",
      name: "questionbaseSelect",
      component: QuestionbaseSelect
    },
    
    {
      path: "/init",
      name: "init",
      component: InitFirebase
    },

    {
      path: "/game_room/:roomId/:role",
      name: "gameRoom",
      component: GameRoom
    },

    {
      path: "/test",
      name: "test",
      component: Test
    }
  ]
});

// 在所有路由前檢查user是否為登入狀態，若非登入狀態則強制跳回登入頁面
router.beforeEach((to, from, next) => {
  // 進入初始化firebase頁面不要檢查登入狀態
  // 進入測試頁面也不要檢查登入狀態
  if(!store.getters.isLogin 
      && to.name !== "login" 
      && to.name !== "init"
      && to.name !== "test"
    ){
    next({ name: "login" });
  };

  next();  
})

export default router;
