<template>
  <div class="data-container">
    <Transition>
      <login></login>
    </Transition>
    <dataView class="main"></dataView>
  </div>
</template>

<script lang="ts" setup>
import dataView from "../components/dataView/dataView.vue";
import login from "../components/login/login.vue";
import { getCurrentInstance, ref } from "vue";
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
.data-container {
  width: 100%;
  height: 100%;
}
</style>
