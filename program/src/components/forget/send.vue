<template>
  <forgetInput class="input tel" input-type="text" :flag="false">
    <template #icon>
      <span class="iconfont icon-shoujihaoma" style="font-size: 1.5em"></span>
    </template>
    <template #placeholder> 请输入手机号码</template>
  </forgetInput>
  <forgetInput class="input msg" input-type="text" :flag="true">
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
import { provide, ref } from "vue";
</script>
<style lang="less" scoped>
.input {
  width: 30% !important;
}
.tel {
  margin-top: 5em !important;
}
.msg {
  margin-top: 4em !important;
}
</style>
