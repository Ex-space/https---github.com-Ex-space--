<template>
  <div>
    <Transition>
      <login></login>
    </Transition>
    <button @click="useLogin">登录</button>
  </div>
</template>

<script lang="ts" setup>
import login from "../components/login/login.vue";
import { ref } from "vue";
import { useStatusStore } from "../store/Login";
const status = useStatusStore();
const useLogin = () => {
  status.changeLoginStatus();
};
</script>
<style lang="less" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
