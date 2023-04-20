<template>
  <button @click="goNext">
    <span class="text">下一步</span
    ><span>Next<span class="iconfont icon-nextstep"></span></span>
  </button>
</template>

<script lang="ts" setup>
import { useIndexStore } from "../../store/Forget";
import { provide, ref } from "vue";
import { ElMessage } from "element-plus";
import { ElNotification } from "element-plus";
const store = useIndexStore();
//节流阀
let pwdFlag = true;
let pwdTimeID = null;
let conFlag = true;
let conTimeID = null;
let veriFlag = true;
let veriTimeID = null;
let authFlag = true;
let authTimeID = null;
const goNext = () => {
  //校验手机验证那
  if (store.currentIndex === 1) {
    //下一步点击事件触发
    if (store.authRight && store.veriRight) {
      store.currentIndex++;
    } else if (!store.authRight) {
      if (authFlag) {
        ElNotification.error({
          duration: 2000,
          title: "请输入正确有效的手机号码！",
          showClose: false,
          offset: 10,
          zIndex: 10101010100,
        });
        authFlag = false;
        if (!authTimeID) {
          authTimeID = setTimeout(() => {
            authFlag = true;
            authTimeID = null;
          }, 2000);
        }
      }
    } else {
      if (veriFlag) {
        ElNotification.error({
          duration: 2000,
          title: "验证码不匹配，请输入正确的验证码！",
          showClose: false,
          offset: 10,
          zIndex: 10101010100,
        });
        veriFlag = false;
        if (!veriTimeID) {
          veriTimeID = setTimeout(() => {
            veriFlag = true;
            veriTimeID = null;
          }, 2000);
        }
      }
    }
  }
  //校验重置密码
  if (store.currentIndex === 2) {
    //下一步点击事件触发
    if (store.pwdRight && store.consistentRight) {
      store.currentIndex++;
      ElNotification.success({
        title: "重置密码成功！",
        message: "重置密码成功，即将返回首页登录！",
        showClose: false,
        offset: 10,
        zIndex: 10101010100,
      });
    } else if (!store.consistentRight) {
      if (conFlag) {
        ElNotification.error({
          duration: 2000,
          title: "两次输入的密码不一致",
          showClose: false,
          offset: 10,
          zIndex: 10101010100,
        });
        conFlag = false;
        if (!conTimeID) {
          conTimeID = setTimeout(() => {
            conFlag = true;
            conTimeID = null;
          }, 2000);
        }
      }
    } else {
      if (pwdFlag) {
        ElNotification.error({
          duration: 4000,
          title: "密码格式错误！",
          message:
            "密码至少6位，至多16位，包括至少1个大写字母，1个小写字母，1个数字！",
          showClose: false,
          offset: 10,
          zIndex: 10101010100,
        });
        pwdFlag = false;
        if (!pwdTimeID) {
          pwdTimeID = setTimeout(() => {
            pwdFlag = true;
            pwdTimeID = null;
          }, 4000);
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import '../../assets/scss/color.scss';
@import '../../assets/scss/font.scss';
button {
  transition: all 0.3s;
  margin-top: 3em;
  margin-bottom: 1.5em;
  position: relative;
  overflow: hidden;
  border: 0.01vw solid $main;
  color: $main;
  display: inline-block;
  font-size: 18.079px;
  line-height: 18.079px;
  width: 15%;
  min-width: 120px;
  padding: 0.65em 0;
  text-decoration: none;
  cursor: pointer;
  background: $btn;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  .iconfont {
    font-size: 1.2em;
    margin-left: 2em;
  }
}

button span:first-child {
  position: relative;
  transition: color 600ms cubic-bezier(0.48, 0, 0.12, 1);
  z-index: 10;
}

button span:last-child {
  color: $btn;
  display: block;
  position: absolute;
  bottom: 0;
  transition: all 500ms cubic-bezier(0.48, 0, 0.12, 1);
  z-index: 100;
  opacity: 0;
  top: 50%;
  left: 50%;
  transform: translateY(225%) translateX(-85%);
  height: 14px;
  line-height: 13px;
}
button:active {
  transform: scale(0.9);
}
button:after {
  content: "";
  position: absolute;
  bottom: -50%;
  left: 0;
  width: 120%;
  height: 100%;
  background-color: $main;
  transform-origin: bottom center;
  transition: transform 600ms cubic-bezier(0.48, 0, 0.12, 1);
  transform: skewY(9.3deg) scaleY(0);
  z-index: 50;
}
button:hover .iconfont {
  display: inline-block;
  animation: goNext 2s alternate infinite ease-in-out;
}
@keyframes goNext {
  0% {
    transform: translate(-8px, -6px);
  }
  30% {
    transform: translate(-5px, -6px);
  }
  50% {
    transform: translate(-3px, -6px);
  }
  100% {
    transform: translate(-8px, -6px);
  }
}
button:hover:after {
  transform-origin: bottom center;
  transform: skewY(9.3deg) scaleY(2);
}

button:hover span:last-child {
  transform: translateX(-85%) translateY(-50%);
  opacity: 1;
  transition: all 900ms cubic-bezier(0.48, 0, 0.12, 1);
}
</style>
