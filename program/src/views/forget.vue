<template>
  <div class="goback" @click="goBack">
    <span class="iconfont icon-fanhui"></span>
    <span class="backTip">返回首页</span>
  </div>
  <n-card title="" hoverable class="card" embedded>
    <n-breadcrumb class="breadCrumb">
      <n-breadcrumb-item separator=">"> 登录 </n-breadcrumb-item>
      <n-breadcrumb-item>忘记密码</n-breadcrumb-item>
    </n-breadcrumb>
    <n-steps
      style="margin-left: 15%; width: 100%;margin-top: 3em;"
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
import complete from "../components/forget/complete.vue";
import reset from "../components/forget/reset.vue";
import send from "../components/forget/send.vue";
import { defineComponent, onMounted, provide, ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
    onMounted(() => {
    });
    const router = useRouter();
    const goBack = () => {
      router.push('/data');
    };
    const currentTabComponent = ref<string>("send");
    const store = useIndexStore();
    watchEffect(() => {
      if (store.currentIndex === 1) {
        currentTabComponent.value = "send";
      } else if (store.currentIndex === 2) {
        currentTabComponent.value = "reset";
      } else {
        currentTabComponent.value = "complete";
      }
    });
    return {
      currentStatus: ref<StepsProps["status"]>("process"),
      store,
      goBack,
      currentTabComponent,
    };
  },
});
</script>
<style lang="less" scoped>
.card {
  width: 80vw;
  min-width: 900px;
  .breadCrumb{
    top: 2em;
    left: 4em;
    position: absolute;
  }
}
.goback {
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
</style>
