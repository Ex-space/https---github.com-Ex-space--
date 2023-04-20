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
        style=" font-size: 1.5em; transform: scaleY(0.9)"
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
        style="font-size: 1.5em"
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
<style lang="scss" scoped>
@import "../../assets/scss/color.scss";
@import "../../assets/scss/font.scss";
.input {
  width: 30% !important;
}
.iconfont{
  color: $font!important;;
}
.pwd {
  margin-top: 5em !important;
}
.twice {
  margin-top: 4em !important;
}
</style>
