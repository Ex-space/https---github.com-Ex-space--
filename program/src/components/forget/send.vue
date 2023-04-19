<template>
  <forgetInput class="input tel" input-type="text" restrict="tel" :flag="false">
    <template #icon>
      <span class="iconfont icon-shoujihaoma" style="font-size: 1.5em"></span>
    </template>
    <template #placeholder> 请输入手机号码</template>
  </forgetInput>
  <forgetInput restrict="msg" class="input msg" input-type="text" :flag="true">
    <template #icon>
      <span
        class="iconfont icon-yanzhengyanzhengma"
        style="font-size: 1.5em"
      ></span>
    </template>
    <template #placeholder> 请输入短信验证码</template>
  </forgetInput>
  <next></next>
</template>

<script lang="ts" setup>
import { useIndexStore } from "../../store/Forget";
import { provide, ref, watchEffect } from "vue";
</script>
<style lang="scss" scoped>
@import "../../assets/scss/color.scss";
@import "../../assets/scss/font.scss";
.input {
  width: 30% !important;
}
.tel {
  margin-top: 5em !important;
}
.iconfont{
  color:$font;
  font-weight: $weight;
}
.msg {
  margin-top: 4em !important;
}
</style>
