<template>
  <div class="input-container">
    <slot name="icon" class="icon"></slot>
    <input
      :type="type"
      id="input"
      @blur="testValid"
      required=""
      ref="myinput"
      v-model="value"
    />
    <label for="input" class="label">
      <slot name="placeholder"></slot>
    </label>
    <div class="underline"></div>
    <span
      :class="[
        'iconfont',
        { 'icon-yincangbukejian': isVisible, 'icon-xianshikejian': !isVisible },
      ]"
      @click.prevent="changeVisible()"
      v-if="inputType === 'password' && value"
    ></span>

    <input
      ref="btn"
      type="button"
      :class="{ btn: true, point: !isDisabled, disPoint: isDisabled }"
      v-if="flag"
      :value="content"
      @click="handleSend"
      :disabled="isDisabled"
    />
  </div>
</template>

<script lang="ts" setup>
import { ElNotification } from "element-plus";
import { useIndexStore } from "../../store/Forget";
import { ElMessage } from "element-plus";
import {
  ref,
  defineProps,
  onMounted,
  nextTick,
  getCurrentInstance,
  onUnmounted,
  watchEffect,
  provide,
  inject,
} from "vue";
import { fi } from "date-fns/locale";
const props = defineProps({
  //表单类型
  inputType: String,
  flag: Boolean,
  //设置不同的限制规则
  restrict: String,
});
let content = ref("发送验证码");
let value = ref("");
//验证码再次发送的间隔时间
let leaveTime = 60;
//表单类型
let type = ref(props.inputType);
let isDisabled = ref(false);
const timeID = ref(null);
//可见性的切换标志
const myinput = ref();
const sendOption = () => {
  if (leaveTime > 0) {
    content.value = `再次发送(${leaveTime--})`;
    isDisabled.value = true;
  } else {
    clearInterval(timeID.value);
    timeID.value = null;
    leaveTime = 60;
    content.value = "发送验证码";
    isDisabled.value = false;
  }
};
const { proxy } = getCurrentInstance();
const store = useIndexStore();
//发送成功时的节流阀
let successTimeID = null;
let successFlag = true;
//没有输入手机号的节流阀
let emptyTimeID = null;
let emptyFlag = true;
//手机号输入错误节流阀
let errorTimeID = null;
let errorFlag = true;
//短信超出限制节流阀
let overTimeID = null;
let overFlag = true;
//axios请求错误节流阀
let exceptionTimeID = null;
let exceptionFlag = true;
let handleSend = async () => {
  if (store.tel) {
    await proxy.$http
      .post(
        "/user/code",
        {
          phone: store.tel,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        
        if (res.data.code) {
          if (successFlag) {
            ElMessage({
              center: true,
              type: "success",
              duration: 2000,
              showClose: true,
              message: "验证码发送成功，5分钟内有效！",
            });
            successFlag = false;
            if (!successTimeID) {
              successTimeID = setTimeout(() => {
                successFlag = true;
                successTimeID = null;
              }, 2000);
            }
          }
          if (!timeID.value) {
            sendOption();
            timeID.value = setInterval(() => {
              sendOption();
            }, 1000);
          }
        } else {
          if ((res.data.msg === "验证码发送失败，请联系管理员！")) {
            if (overFlag) {
              ElMessage({
                center: true,
                type: "error",
                duration: 2000,
                showClose: true,
                message: "请求繁忙，请稍后再试！",
              });
              overFlag = false;
              if (!overTimeID) {
                overTimeID = setTimeout(() => {
                  overFlag = true;
                  overTimeID = null;
                }, 2000);
              }
            }
          } else {
            if (errorFlag) {
              ElMessage({
                center: true,
                type: "error",
                duration: 2000,
                showClose: true,
                message: "该用户未注册或手机号不正确！",
              });
              errorFlag = false;
              if (!errorTimeID) {
                errorTimeID = setTimeout(() => {
                  errorFlag = true;
                  errorTimeID = null;
                }, 2000);
              }
            }
          }
        }
      })
      .catch((Error) => {
        if (exceptionFlag) {
          ElNotification({
            title: "发送验证码失败！",
            type: "error",
            duration: 2000,
            showClose: true,
            message: "服务器繁忙，请联系管理人员！",
          });
          exceptionFlag = false;
          if (!exceptionTimeID) {
            exceptionTimeID = setTimeout(() => {
              exceptionFlag = true;
              exceptionTimeID = null;
            }, 2000);
          }
        }
      });
  } else {
    if (emptyFlag) {
      ElMessage({
        center: true,
        type: "error",
        duration: 2000,
        showClose: true,
        message: "请输入手机号！",
      });
      emptyFlag = false;
      if (!emptyTimeID) {
        emptyTimeID = setTimeout(() => {
          emptyFlag = true;
          emptyTimeID = null;
        }, 2000);
      }
    }
  }
};
let isVisible = ref<boolean>(true);
function changeVisible() {
  isVisible.value = !isVisible.value;
  nextTick(() => {
    if (type) {
      if (type.value! == "password") {
        type.value = "text";
      } else {
        type.value = "password";
      }
    }
  });
}
const name = props.restrict;
const testValid = () => {
  const pwdReg = /^.*(?=.{6,16})(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/;
  //密码检验
  if (name === "pwd") {
    if (pwdReg.exec(store.pwd)) {
      //下一步标志
      store.pwdRight = true;
    } else {
      store.pwdRight = false;
    }
  }
  //确认密码检验
  else if (name === "rePwd") {
    if (pwdReg.exec(store.rePwd)) {
      //下一步标志
      store.pwdRight = true;
    } else {
      store.pwdRight = false;
    }
    if (store.pwd !== store.rePwd) {
      store.consistentRight = false;
    } else {
      store.consistentRight = true;
    }
  }
};
//向父组件传递表单值
const sendValue = () => {
  //更改数据仓库中的数据
  store[name] = value.value;
  //电话号码限制规则
  if (name === "tel") {
    const maxLength = 20;
    const reg = /\D/g;
    if (value.value.length > maxLength) {
      value.value = String(value.value).slice(0, maxLength);
    }
    value.value = value.value.replaceAll(reg, "");
  }
  //验证码限制规则
  if (name === "msg") {
    const maxLength = 6;
    const reg = /\D/g;
    if (value.value.length > maxLength) {
      value.value = String(value.value).slice(0, maxLength);
    }
    value.value = value.value.replaceAll(reg, "");
  }
  //验证码限制规则
  if (name === "pwd" || name === "rePwd") {
    const maxLength = 16;
    if (value.value.length > maxLength) {
      value.value = String(value.value).slice(0, maxLength);
    }
  }
};
watchEffect(() => {
  sendValue();
});
onMounted(() => {
  value.value = "";
});
</script>
<style lang="scss" scoped>
@import "../../assets/scss/color.scss";
@import "../../assets/scss/font.scss";
$halfHeight: 0.5em;
.point {
  cursor: pointer;
  background-color: $soft;
}
.point:hover {
  background-color: $hoverBtn;
}
.disPoint {
  cursor: not-allowed;
  background-color: rgb(198, 198, 198);
}
.input-container {
  display: flex;
  position: relative;
  align-items: center;
  font-weight: 500;
  position: relative;
  margin: 0 auto;
  width: 70%;
  min-width: 300px;
  .iconfont {
    color: $font;
    position: absolute;
    right: 0.3em;
    font-size: 1.8em;
  }
  .btn {
    border-radius: 0.3em;
    color: white;
    padding: 0 0.8em;
    border: 0;
    margin-left: 0.5rem;
    height: 2.6em;
  }
}
.input-container input[type="text"]:focus,
.input-container input[type="password"]:focus {
  border-color: $soft;
}
.input-container input[type="text"],
.input-container input[type="password"] {
  margin-left: 0.5vmax;
  transition: 0.4s;
  font-size: 15px;
  width: 100%;
  border: none;
  color: $font;
  border: 0.13vw solid #ccc;
  border-radius: 1vmin;
  padding: $halfHeight;
  background-color: transparent;
  outline: none;
}

.input-container .label {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 2.7rem;
  color: #ccc;
  transition: all 0.3s ease;
  pointer-events: none;
}

.input-container input[type="text"]:focus ~ .label,
.input-container input[type="password"]:focus ~ .label,
.input-container input[type="text"]:valid ~ .label,
.input-container input[type="password"]:valid ~ .label {
  top: -20px;
  transform: translate(0);
  left: 1.9rem;
  font-size: 12px;
  color: $font;
}
@media screen and (max-width: 900px) {
  .input-container {
    width: 40% !important;
  }
}
</style>
