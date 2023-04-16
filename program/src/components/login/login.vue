<template>
  <Transition name="fade">
    <div class="mask" v-if="status.isLogin"></div>
  </Transition>
  <Transition name="fade-bounce">
    <div class="form-container" v-if="status.isLogin">
      <div class="login-form">
        <span class="iconfont icon-guanbi1" @click="closeHandle"></span>
        <div class="title">账户登录</div>
        <myInput class="telNumber" input-type="text">
          <template #icon>
            <span
              class="iconfont icon-shoujihaoma"
              style="font-size: 1.5em"
            ></span>
          </template>
          <template #placeholder> 手机号码 </template>
        </myInput>
        <myInput class="password" input-type="password">
          <template #icon>
            <span class="iconfont icon-mima" style="font-size: 1.5em"></span>
          </template>
          <template #placeholder> 密码 </template>
        </myInput>
        <el-row class="row">
          <div class="checkbox-wrapper-13">
            <input type="checkbox" id="c1-13" />
            <label for="c1-13">三十天内免登录</label>
          </div>
        </el-row>
        <button class="login">登录</button>
        <el-row class="row2">
          <span>忘记密码？ <a href="/forget" target="_blank">去找回</a> </span>
        </el-row>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { useStatusStore } from "../../store/Login";
import myInput from "./input.vue";
import { ref, onMounted } from "vue";
onMounted(() => {});
const status = useStatusStore();
const closeHandle = () => {
  status.changeLoginStatus();
};
</script>
<style lang="less" scoped>
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
    background-color: #fff;
    box-shadow: 1.997px 3.994px 9.999px 6.006px rgb(231, 231, 231);
    display: flex;
    flex-direction: column;
    align-items: center;
    .icon-guanbi1 {
      cursor: pointer;
      position: absolute;
      right: 1em;
      top: 0.6em;
    }
    .title {
      z-index: 2;
      margin-top: 35px;
    }
    .password {
      margin-top: 3em;
    }
    .telNumber{
      margin-top: 2em;
    }
    .row,
    .login,
    .row2 {
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
          --background: #fff;
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
      color: #fff;
      background-image: linear-gradient(30deg, #007bff, #4da3ff);
      border-radius: 2em;
      background-size: 100% auto;
      font-family: inherit;
      padding: 0.6em 1.5em;
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
      margin-top: .5em;
      margin-bottom: 1em;
    }
    .row2 {
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
