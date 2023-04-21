<template v-if="status.isLogin">
  <Transition name="fade">
    <div class="mask" v-if="status.isLogin"></div>
  </Transition>
  <Transition name="fade-bounce">
    <div class="form-container" v-if="status.isLogin">
      <div class="login-form">
        <span class="iconfont icon-guanbi1" @click="closeHandle"></span>
        <div class="title">账户登录</div>
        <loginInput class="telNumber" input-type="text">
          <template #icon>
            <span
              class="iconfont icon-shoujihaoma"
              style="color: $font; font-size: 1.5em"
            ></span>
          </template>
          <template #placeholder> 请输入手机号码</template>
        </loginInput>
        <loginInput class="password" input-type="password">
          <template #icon>
            <span
              class="iconfont icon-mima2"
              style="color: #333; font-size: 1.5em; transform: scaleY(0.9)"
            ></span>
          </template>
          <template #placeholder> 请输入密码 </template>
        </loginInput>
        <el-row class="row">
          <div class="checkbox-wrapper-13">
            <input type="checkbox" id="c1-13" v-model="checked" />
            <label for="c1-13">三十天内免登录</label>
          </div>
        </el-row>
        <button class="login" @click="testLogin">登录</button>
        <el-row class="row2">
          <span
            >忘记密码？<a class="a" @click.native="resetIndex" href="/forget"
              >去找回</a
            >
          </span>
        </el-row>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts">
import { useIndexStore } from "../../store/Forget";
import { useStatusStore } from "../../store/Login";
import {
  defineComponent,
  getCurrentInstance,
  onDeactivated,
  onMounted,
  ref,
} from "vue";
import { ElNotification } from "element-plus";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
export default defineComponent({
  setup() {
    const checked = ref<boolean>(false);
    const { proxy } = getCurrentInstance();
    const status = useStatusStore();
    const store = useIndexStore();
    //手机号为空节流阀
    let telTimeID = null;
    let telFlag = true;
    //全为空节流阀
    let allTimeID = null;
    let allFlag = true;
    //密码为空节流阀
    let pwdTimeID = null;
    let pwdFlag = true;
    //输入错误节流阀
    let errorTimeID = null;
    let errorFlag = true;
    //axios请求错误节流阀
    let exceptionTimeID = null;
    let exceptionFlag = true;
    //登录成功时的节流阀
    let successTimeID = null;
    let successFlag = true;
    const testLogin = async () => {
      if (status.tel && status.pwd) {
        await proxy.$http
          .post(
            "/user/login",
            {
              phone: status.tel,
              password: status.pwd,
              remember_me: checked ? 1 : 0,
            },
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then((res) => {
            
            if (res.data.code === 1) {
              if (successFlag) {
                const pwdReg =
                  /^.*(?=.{6,16})(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/;
                ElNotification({
                  title: "登录成功！",
                  type: "success",
                  offset: 50,
                  duration: 2000,
                  zIndex: 100000000000000,
                });
                if (!pwdReg.exec(status.pwd)) {
                  ElNotification({
                    title: "请尽快修改密码！",
                    message: "检测到您的密码强度过低，请尽快修改密码！",
                    type: "warning",
                    offset: 100,
                    duration: 2000,
                    zIndex: 100000000000000,
                  });
                }
                closeHandle();
                successFlag = false;
                if (!successTimeID) {
                  successTimeID = setTimeout(() => {
                    successFlag = true;
                    successTimeID = null;
                  }, 2000);
                }
              }
            } else {
              if (errorFlag) {
                ElNotification({
                  title: "登录失败！",
                  message: res.data.msg,
                  type: "error",
                  offset: 50,
                  duration: 2000,
                  zIndex: 100000000000000,
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
          })
          .catch((Error) => {
            if (exceptionFlag) {
              ElNotification({
                title: "登录失败！",
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
      } else if (!status.tel && !status.pwd) {
        if (allFlag) {
          ElMessage({
            center: true,
            type: "error",
            duration: 2000,
            showClose: true,
            message: "请输入手机号和密码 !",
          });
          allFlag = false;
          if (!allTimeID) {
            allTimeID = setTimeout(() => {
              allFlag = true;
              allTimeID = null;
            }, 2000);
          }
        }
      } else if (!status.tel) {
        if (telFlag) {
          ElMessage({
            center: true,
            type: "error",
            duration: 2000,
            showClose: true,
            message: "请输入手机号 !",
          });
          telFlag = false;
          if (!telTimeID) {
            telTimeID = setTimeout(() => {
              telFlag = true;
              telTimeID = null;
            }, 2000);
          }
        }
      } else {
        if (pwdFlag) {
          ElMessage({
            center: true,
            type: "error",
            duration: 2000,
            showClose: true,
            message: "请输入密码 !",
          });
          pwdFlag = false;
          if (!pwdTimeID) {
            pwdTimeID = setTimeout(() => {
              pwdFlag = true;
              pwdTimeID = null;
            }, 2000);
          }
        }
      }
    };

    const resetIndex = () => {
      store.currentIndex = 0;
    };
    const closeWindow = (e: KeyboardEvent) => {
      if (e.key === "Escape" && status.isLogin) {
        closeHandle();
      }
    };
    onMounted(() => {
      window.addEventListener("keydown", closeWindow);
    });
    const closeHandle = () => {
      status.changeLoginStatus();
      window.removeEventListener("keydown", closeWindow);
    };
    return {
      checked,
      testLogin,
      resetIndex,
      status,
      closeHandle,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "../../assets/scss/color.scss";
@import "../../assets/scss/font.scss";
.mask {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.436);
  height: 100vh;
}
.form-container {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  margin: 0 auto;
  width: 30vmax;
  min-width: 380px;
  height: 26vmax;
  min-height: 380px;
  display: flex;
  border-radius: 15px;
  box-shadow: 1.997px 3.994px 9.999px 6.006px rgb(117, 117, 117);
  // background-color: pink;
  overflow: hidden;
  .login-form {
    z-index: 2;
    width: 100%;
    height: 100%;
    background-color: $realBanner;
    box-shadow: 1.997px 3.994px 9.999px 6.006px rgb(231, 231, 231);
    display: flex;
    flex-direction: column;
    align-items: center;
    .icon-guanbi1 {
      color: $font;
      cursor: pointer;
      position: absolute;
      right: 1em;
      top: 0.6em;
    }
    .a {
      color: $soft;
    }
    .iconfont {
      color: $font !important;
    }
    .title {
      z-index: 2;
      color: $font;
      margin-top: 35px;
    }
    .password {
      color: $font;
      margin-top: 3em;
    }
    .telNumber {
      color: $font;
      margin-top: 2em;
    }
    .row,
    .login,
    .row2 {
      color: $font;
      width: 69%;
    }
    .row {
      font-size: 1em;
      margin: 1em;
      @supports (-webkit-appearance: none) or (-moz-appearance: none) {
        .checkbox-wrapper-13 input[type="checkbox"] {
          --active: #007bff;
          --active-inner: #fff;
          --focus: 0.13vw rgba(112, 147, 254, 0.3);
          --border: #bbc1e1;
          --border-hover: #007bff;
          --background: $font;
          --disabled: #f6f8ff;
          --disabled-inner: #e1e6f9;
          -webkit-appearance: none;
          -moz-appearance: none;
          height: 15px;
          outline: none;
          display: inline-block;
          vertical-align: top;
          position: relative;
          margin: 0;
          transform: translateY(0.45em);
          cursor: pointer;
          border: 0.065vw solid var(--bc, var(--border));
          background: var(--b, var(--background));
          transition: background 0.3s, border-color 0.3s, box-shadow 0.2s;
        }

        .checkbox-wrapper-13 input[type="checkbox"]:after {
          content: "";
          display: block;
          left: 0;
          top: 0;
          position: absolute;
          transition: transform var(--d-t, 0.3s) var(--d-t-e, ease),
            opacity var(--d-o, 0.2s);
        }

        .checkbox-wrapper-13 input[type="checkbox"]:checked {
          --b: var(--active);
          --bc: var(--active);
          --d-o: 0.3s;
          --d-t: 0.6s;
          --d-t-e: cubic-bezier(0.2, 0.85, 0.32, 1.2);
        }

        .checkbox-wrapper-13 input[type="checkbox"]:disabled {
          --b: var(--disabled);
          cursor: not-allowed;
          opacity: 0.9;
        }

        .checkbox-wrapper-13 input[type="checkbox"]:disabled:checked {
          --b: var(--disabled-inner);
          --bc: var(--border);
        }

        .checkbox-wrapper-13 input[type="checkbox"]:disabled + label {
          cursor: not-allowed;
        }

        .checkbox-wrapper-13
          input[type="checkbox"]:hover:not(:checked):not(:disabled) {
          --bc: var(--border-hover);
        }

        .checkbox-wrapper-13 input[type="checkbox"]:focus {
          box-shadow: 0 0 0 var(--focus);
        }

        .checkbox-wrapper-13 input[type="checkbox"]:not(.switch) {
          width: 15px;
        }

        .checkbox-wrapper-13 input[type="checkbox"]:not(.switch):after {
          opacity: var(--o, 0);
        }

        .checkbox-wrapper-13 input[type="checkbox"]:not(.switch):checked {
          --o: 1;
        }

        .checkbox-wrapper-13 input[type="checkbox"] + label {
          display: inline-block;
          vertical-align: middle;
          cursor: pointer;
          margin-left: 7px;
        }

        .checkbox-wrapper-13 input[type="checkbox"]:not(.switch) {
          border-radius: 3px;
        }

        .checkbox-wrapper-13 input[type="checkbox"]:not(.switch):after {
          width: 5.007px;
          height: 9.001px;
          border: 1.997px solid var(--active-inner);
          border-top: 0;
          border-left: 0;
          left: 0.3em;
          top: 0.1em;
          transform: rotate(var(--r, 20deg));
        }

        .checkbox-wrapper-13 input[type="checkbox"]:not(.switch):checked {
          --r: 43deg;
        }
      }

      .checkbox-wrapper-13 * {
        box-sizing: inherit;
      }

      .checkbox-wrapper-13 *:before,
      .checkbox-wrapper-13 *:after {
        box-sizing: inherit;
      }
    }
    button {
      border: none;
      color: #fff !important;
      background-image: linear-gradient(30deg, #007bff, #4da3ff);
      border-radius: 0.3em;
      background-size: 100% auto;
      font-family: inherit;
      padding: 0.6em 1.5em;
    }
    button:focus {
      border: 0;
    }
    button:hover {
      background-position: right center;
      background-size: 200% auto;
      -webkit-animation: pulse 2s infinite;
      animation: pulse512 1.5s infinite;
    }

    @keyframes pulse512 {
      0% {
        box-shadow: 0 0 0 0 #05bada66;
      }

      70% {
        box-shadow: 0 0 0 10px rgb(218 103 68 / 0%);
      }

      100% {
        box-shadow: 0 0 0 0 rgb(218 103 68 / 0%);
      }
    }
    .login {
      font-size: 1em;
      height: 35px;
      margin-top: 0.5em;
      margin-bottom: 1em;
    }
    .row2 {
      color: $font;
      font-size: 1em;
      position: relative;
      // display: flex;
      // justify-content: space-between;
      span {
        position: absolute;
        right: 0;
      }
    }
  }
  .title {
    font-weight: 600;
    // margin: 3vmax;
    font-size: 30px;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-bounce-enter-active {
  animation: bounce-in 0.5s;
}
.fade-bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    opacity: 0.4;
    transform: translate(-50%, -50%) scale(0.4);
  }
  50% {
    transform: translate(-50%, -50%) scale(1.1);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}
</style>
