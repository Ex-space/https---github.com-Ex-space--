<template>
  <navBar></navBar>
  <n-card
    title=""
    hoverable
    :class="{ card: true, last: store.currentIndex === 3 }"
    embedded
  >
    <div class="breadCrumb">登录 > 忘记密码</div>
    <span class="title">{{ title }}</span>
    <n-steps
      class="stepLine"
      style="margin-left: 15%; width: 100%; margin-top: 3em"
      v-model:current="store.currentIndex"
      :status="currentStatus"
    >
      <n-step
        class="step"
        title="发送手机验证码"
        style="cursor: default;"
        disabled
      />
      <n-step class="step" title="重置密码" style="cursor: default" disabled />
      <n-step class="step" title="完成" style="cursor: default" disabled />
    </n-steps>
    <keep-alive>
      <component v-bind:is="currentTabComponent"></component>
    </keep-alive>
  </n-card>
</template>

<script lang="ts">
import { useIndexStore } from "../store/Forget";
import { StepsProps } from "naive-ui";
import { defineComponent, onMounted, provide, ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
    onMounted(() => {});
    const title = ref<string>("");
    const currentTabComponent = ref<string>("send");
    const store = useIndexStore();
    watchEffect(() => {
      if (store.currentIndex === 1) {
        title.value = "获取验证码";
        currentTabComponent.value = "send";
      } else if (store.currentIndex === 2) {
        title.value = "重置密码";
        currentTabComponent.value = "reset";
      } else {
        title.value = "";
        currentTabComponent.value = "complete";
      }
    });
    return {
      currentStatus: ref<StepsProps["status"]>("process"),
      store,
      title,
      currentTabComponent,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "../assets/scss/color.scss";
@import "../assets/scss/font.scss";
.card {
  width: 80vw;
  position: relative;
  min-width: 400px;
  border-radius: 1em;
  background-color: $banner;
  border-color: rgba(100,100,100,.5);
  .breadCrumb {
    top: 2em;
    left: 4em;
    position: absolute;
    color: $font;
    font-weight: $weight;
  }
}
.step {
  color: $font !important;
}
.title {
  display: none;
}
@media screen and (max-height: 660px) {
  .goback {
    display: none;
  }
}
@media screen and (max-width: 900px) {
  .stepLine,
  .goback {
    display: none;
  }
  .breadCrumb {
    left: 2em !important;
    top: 1.5em !important;
  }
  .card {
    padding-top: 3em;
  }
  .last {
    padding-top: 0em;
  }
  .title {
    display: block;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    font-size: 24px;
    font-weight: 500;
  }
}
@media screen and (max-width: 1200px) {
  .card {
    width: 85vw;
  }
}
@media screen and (max-width: 768px) {
  .card {
    width: 90vw;
  }
}
</style>
