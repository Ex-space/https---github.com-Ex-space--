import { defineStore } from "pinia";
import { ref } from "vue";
export const useIndexStore = defineStore("index", {
  state: () => {
    return {
      //初始化步骤条
      currentIndex: ref<number>(2),
      tel: ref<string>(""),
      pwd: ref<string>(""),
      rePwd: ref<string>(""),
      msg: ref<string>(""),
      //手机号码是否真实有效
      authRight: ref<boolean>(false),
      //验证码是否匹配
      veriRight: ref<boolean>(false),
      //密码格式校验
      pwdRight: ref<boolean>(false),
      //两次输入密码是否一致
      consistentRight: ref<boolean>(true),
    };
  },
  actions: {
  },
});
