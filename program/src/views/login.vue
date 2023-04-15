<template>
  <div class="form-container">
    <div class="login-form">
      <div class="title">账户登录</div>
      <myInput class="telNumber">
        <template #icon>
          <span
            class="iconfont icon-shoujihaoma"
            style="font-size: 1.5vmax"
          ></span>
        </template>
        <template #placeholder> 手机号码 </template>
      </myInput>
      <myInput class="password">
        <template #icon>
          <span class="iconfont icon-mima" style="font-size: 1.5vmax"></span>
        </template>
        <template #placeholder> 密码 </template>
      </myInput>
      <el-row class="row">
        <div class="checkbox-wrapper-13">
          <input type="checkbox" id="c1-13" />
          <label for="c1-13" style="transform: ">三十天内免登录</label>
        </div>
      </el-row>
      <el-button type="primary" class="login">登录</el-button>
      <el-row class="row2">
        <span>忘记密码？<a href="javascript:;">去找回</a> </span>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
import myInput from "../components/login/input.vue";
import { ref } from "vue";
</script>
<style lang="less" scoped>
.form-container {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 5vmax;
  width: 30vmax;
  height: 27vmax;
  display: flex;
  border-radius: 1vmax;
  box-shadow: 2px 4px 10px 6px rgb(231, 231, 231);
  // background-color: pink;
  overflow: hidden;
  .login-form {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .title {
      margin-top: 3vmax;
    }
    .password,
    .telNumber {
      margin-top: 2vmax;
    }
    .row,
    .login,
    .row2 {
      width: 69%;
    }
    .row {
      margin: 0.8vmax;
      @supports (-webkit-appearance: none) or (-moz-appearance: none) {
        .checkbox-wrapper-13 input[type="checkbox"] {
          --active: #007bff;
          --active-inner: #fff;
          --focus: 2px rgba(112, 147, 254, 0.3);
          --border: #bbc1e1;
          --border-hover: #007bff;
          --background: #fff;
          --disabled: #f6f8ff;
          --disabled-inner: #e1e6f9;
          -webkit-appearance: none;
          -moz-appearance: none;
          height: 1.2vmax;
          outline: none;
          display: inline-block;
          vertical-align: top;
          position: relative;
          margin: 0;
          transform: translateY(0.3vmax);
          cursor: pointer;
          border: 1px solid var(--bc, var(--border));
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
          width: 1.2vmax;
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
          margin-left: 0.4vmax;
        }

        .checkbox-wrapper-13 input[type="checkbox"]:not(.switch) {
          border-radius: 0.3vmax;
        }

        .checkbox-wrapper-13 input[type="checkbox"]:not(.switch):after {
          width: 5px;
          height: 9px;
          border: 2px solid var(--active-inner);
          border-top: 0;
          border-left: 0;
          left: 0.33vmax;
          top: 0.15vmax;
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
    .login {
      font-size: 1vmax;
      height: 2.5vmax;
      margin-bottom: 1.2vmax;
    }
    .row2 {
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
    font-size: 2vmax;
  }
}
</style>
