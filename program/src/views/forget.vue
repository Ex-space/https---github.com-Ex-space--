<template>
  <navBar></navBar>
  <div class="goback" @click="goBack">
    <span class="iconfont icon-fanhui"></span>
    <span class="backTip">返回首页</span>
  </div>
  <n-card
    title=""
    hoverable
    :class="{ card: true, last: store.currentIndex === 3 }"
    embedded
  >
    <n-breadcrumb class="breadCrumb">
      <n-breadcrumb-item separator=">"> 登录 </n-breadcrumb-item>
      <n-breadcrumb-item>忘记密码</n-breadcrumb-item>
    </n-breadcrumb>
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
        style="cursor: default"
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
    const router = useRouter();
    const goBack = () => {
      router.push("/data");
    };
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
      goBack,
      title,
      currentTabComponent,
    };
  },
});
</script>
<style lang="less" scoped>
.card {
  width: 80vw;
  min-width: 400px;
  .breadCrumb {
    top: 2em;
    left: 4em;
    position: absolute;
  }
}
.goback {
  z-index: 10001;
  cursor: pointer;
  position: absolute;
  top: 2vmin;
  font-size: 1.4vmax;
  left: 4vmin;
  .iconfont,
  .backTip {
    transition: all 0.5s;
  }
  .iconfont {
    font-size: 1.4vw;
    margin-right: 0.4vw;
  }
}
//返回动画
@keyframes shake {
  0% {
    transform: translate(0px);
  }
  100% {
    transform: translate(-2px, -2px) rotate(-5deg) scale(1.05);
  }
}
.goback:hover {
  color: #007bff;
  .iconfont {
    transform-origin: 100% 100%;
    display: inline-block;
    animation: shake 0.5s alternate ease-in infinite;
  }
}
.title {
  display: none;
}
@media screen and (max-height: 580px) {
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
