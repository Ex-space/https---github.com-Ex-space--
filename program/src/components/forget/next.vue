<template>
  <button @click="goNext">
    <span class="text">下一步</span
    ><span>Next<span class="iconfont icon-nextstep"></span></span>
  </button>
</template>

<script lang="ts" setup>
import { useIndexStore } from "../../store/Forget";
import { provide, ref, getCurrentInstance, Teleport } from "vue";
import { ElMessage } from "element-plus";
import { ElNotification } from "element-plus";
const store = useIndexStore();
const { proxy } = getCurrentInstance();
//节流阀
//reset信息节流阀
let infoFlag = true;
let infoTimeID = null;
//密码空节流阀
let pwdFlag = true;
let pwdTimeID = null;
//确认密码空节流阀
let conFlag = true;
let conTimeID = null;
//重置密码成功节流阀
let resetFlag = true;
let resetTimeID = null;

//验证码空节流阀
let veriFlag = true;
let veriTimeID = null;
//手机号空节流阀
let authFlag = true;
let authTimeID = null;
//错误验证码（第一步next）验证码过期节流阀
let errorVeriFlag = true;
let errorVeriTimeID = null;
//错误验证码（第一步next）验证码错误节流阀
let errorMsgFlag = true;
let errorMsgTimeID = null;
//axios请求错误节流阀
let exceptionTimeID = null;
let exceptionFlag = true;
const goNext = async () => {
  //校验重置密码
  if (store.currentIndex === 2) {
    if (store.pwd && store.rePwd) {
      //下一步点击事件触发
      if (store.pwdRight && store.consistentRight) {
        await proxy.$http
          .post(
            "/user/reset",
            {
              phone: store.tel,
              new_password: store.pwd,
            },
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then((res) => {
            if (res.data.code) {
              store.currentIndex++;
              if (resetFlag) {
                ElNotification.success({
                  title: "重置密码成功！",
                  message: "重置密码成功，即将返回首页登录！",
                  showClose: false,
                  offset: 10,
                  duration: 2000,
                  zIndex: 10101010100,
                });
                resetFlag = false;
                if (!resetTimeID) {
                  resetTimeID = setTimeout(() => {
                    resetFlag = true;
                    resetTimeID = null;
                  }, 2000);
                }
              }
            } else {
              if (errorVeriFlag) {
                ElNotification.error({
                  duration: 2000,
                  title: res.data.msg,
                  message: "请输入",
                  showClose: false,
                  offset: 10,
                  zIndex: 10101010100,
                });
                errorVeriFlag = false;
                if (!errorVeriTimeID) {
                  errorVeriTimeID = setTimeout(() => {
                    errorVeriFlag = true;
                    errorVeriTimeID = null;
                  }, 2000);
                }
              }
            }
          })
          .catch((Error) => {
            if (exceptionFlag) {
              ElNotification({
                title: "出错啦！",
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
    } else {
      if (infoFlag) {
        ElNotification.error({
          duration: 2000,
          title: "请完善重置密码信息！",
          showClose: false,
          offset: 10,
          zIndex: 10101010100,
        });
        infoFlag = false;
        if (!infoTimeID) {
          infoTimeID = setTimeout(() => {
            infoFlag = true;
            infoTimeID = null;
          }, 2000);
        }
      }
    }
  }
  //校验手机验证那
  if (store.currentIndex === 1) {
    //判定是否有缺少输入项
    store.authRight = store.tel ? true : false;
    store.veriRight = store.msg ? true : false;
    //下一步点击事件触发
    if (store.authRight && store.veriRight) {
      await proxy.$http
        .post(
          "/user/verify",
          {
            phone: store.tel,
            code: store.msg,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          if (res.data.code) {
            store.currentIndex++;
          } else {
            if (res.data.msg === "参数错误，没有对应的验证码") {
              if (errorVeriFlag) {
                ElNotification.error({
                  duration: 2000,
                  title: "验证码不存在！",
                  message: "验证码不存在或验证码过期，请重新发送验证码！",
                  showClose: false,
                  offset: 10,
                  zIndex: 10101010100,
                });
                errorVeriFlag = false;
                if (!errorVeriTimeID) {
                  errorVeriTimeID = setTimeout(() => {
                    errorVeriFlag = true;
                    errorVeriTimeID = null;
                  }, 2000);
                }
              }
            } else {
              if (errorMsgFlag) {
                ElNotification.error({
                  duration: 2000,
                  title: "验证码错误！",
                  message: "验证码错误，请检查验证码发送是否正确！",
                  showClose: false,
                  offset: 10,
                  zIndex: 10101010100,
                });
                errorMsgFlag = false;
                if (!errorMsgTimeID) {
                  errorMsgTimeID = setTimeout(() => {
                    errorMsgFlag = true;
                    errorMsgTimeID = null;
                  }, 2000);
                }
              }
            }
          }
        })
        .catch((Error) => {
          if (exceptionFlag) {
            ElNotification({
              title: "出错啦！",
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
          title: "请输入验证码！",
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
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/color.scss";
@import "../../assets/scss/font.scss";
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
