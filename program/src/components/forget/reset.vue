<template>
  <forgetInput
    restrict="pwd"
    class="input pwd"
    input-type="password"
    :flag="false"
  >
    <template #icon>
      <span
        class="iconfont icon-mima2"
        style="color: #333; font-size: 1.5em; transform: scaleY(0.9)"
      ></span>
    </template>
    <template #placeholder> 请输入新密码</template>
  </forgetInput>
  <forgetInput
    restrict="rePwd"
    class="input twice"
    input-type="password"
    :flag="false"
  >
    <template #icon>
      <span
        class="iconfont icon-querenmima"
        style="color: black; font-size: 1.5em"
      ></span>
    </template>
    <template #placeholder> 再次确认密码</template>
  </forgetInput>
  <next></next>
</template>

<script lang="ts" setup>
import { useIndexStore } from "../../store/Forget";
import { ref } from "vue";
const store=useIndexStore()
</script>
<style lang="less" scoped>
.input {
  width: 30% !important;
}
.pwd {
  margin-top: 5em !important;
}
.twice {
  margin-top: 4em !important;
}
</style>
