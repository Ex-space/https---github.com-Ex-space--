import { defineStore } from "pinia";
import { ref } from "vue";
export const useStatusStore = defineStore("status", {
  state: () => {
    return {
      tel: ref<string>(""),
      pwd: ref<string>(""),
      isLogin: ref(false),
    };
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    changeLoginStatus() {
      // 在 Vuex 中我们需要搞两步：1. 定义 mutations 2. 提交 mutations
      this.isLogin = !this.isLogin;
    },
  },
});
