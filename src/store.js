import Vue from 'vue';
import Vuex from 'vuex';

import { auth, googleAuthProvider, database } from "./firebase";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      name: null,
      photo: null,
      uid: null
    },

    room: {
      roomId: null,
      player: null,
      questionbase: null
    }
  },

  getters: {
    isLogin: state => !!state.user.name,
    userRoomId: state => state.room.roomId,
    questionbase: state => state.room.questionbase,
    isMainController: state => state.room.player === "player1" ? true : false
  },

  mutations: {
    LOGIN(state, { name, photo, uid }){
      state.user.name = name;
      state.user.photo = photo;
      state.user.uid = uid;

      console.log("登入成功");
    },

    LOGOUT(state){
      state.user.name = null;
      state.user.photo = null;
      state.user.uid = null;

      console.log("登出成功");
    },

    SELECT_ROOM(state, { roomId, player }){
      state.room.roomId = roomId;
      state.room.player = player;
    },

    UNSELECT_ROOM(state){
      state.room.roomId = null;
      state.room.player = null;
    },

    SELECT_QUESTIONBASE(state, { questionbase }){
      state.room.questionbase = questionbase;
    }
  },


  actions: {
    loginAsync({ commit }, { type }){
      // 辨認user用何種方式登入
      let provider;
      switch(type){
        case "google":
          provider = googleAuthProvider;
          break;

        default: 
          throw("登入方法不存在, 登入失敗");
      }

      // 執行firebase非同步登入函數
      auth.signInWithPopup(provider).then(res => {
        const name = res.user.displayName;
        const photo = res.user.photoURL;
        const uid = res.user.uid;

        commit("LOGIN", { name, photo, uid })
      })
    },

    logoutAsync({ commit }){
      auth.signOut();
      
      commit("LOGOUT");
    },


    selectRoomAsync(context, { databaseRef, player, roomId }){
      const uid = context.state.user.uid;
      const photo = context.state.user.photo;

      // 將資料庫房間改為選中狀態
      databaseRef.transaction(currentData => {
        return {
            ...currentData,
            waitingPlayers: currentData.waitingPlayers + 1,
            [player]: { uid, photo }
        };

      }).then(() => {
          // 將本機端玩家已選過房間狀態改成未選過房間狀態
          context.commit("SELECT_ROOM", { roomId, player });
      })
    },

    unselectRoomAsync(context, { databaseRef, player }){
      // 刪除資料庫的房間選中狀態
      databaseRef.transaction(currentData => {
          return {
              ...currentData,
              waitingPlayers: currentData.waitingPlayers - 1,
              [player]: {
                  photo: false,
                  uid: false
              }
          };

      }).then(() => {
          // 將本機端玩家已選過房間狀態改成未選過房間狀態
          context.commit("UNSELECT_ROOM");
      })
    },

    selectQuestionbaseAsync(context, { questionbaseId }){
      const roomId = context.getters.userRoomId;

      database.ref(`roomsInGame/room_${roomId}/questionbaseId`).set(questionbaseId)
    },

    setQuestionbaseAsync(context, { questionbaseId }){
      database.ref(`questionbase/${questionbaseId - 1}`).once("value").then(snapshot => {
        const questionbase = snapshot.val();
        console.log(questionbase);

        context.commit("SELECT_QUESTIONBASE", { questionbase });
      })
    }
  }
})
