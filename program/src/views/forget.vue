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
    <el-steps
      class="stepLine"
      :active="store.currentIndex - 1"
      finish-status="success"
      align-center
    >
      <el-step title="获取手机验证码" />
      <el-step title="重置密码" />
      <el-step title="完成" />
    </el-steps>
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
  border-color: rgba(100, 100, 100, 0.5);
  .breadCrumb {
    top: 2em;
    left: 4em;
    position: absolute;
    color: $font;
    font-weight: $weight;
  }
}
.stepLine{
  transform: translateY(2em);
}
::v-deep .el-step__icon {
  background: $stepIcon;
  width: 30px;
  height: 30px;
}
::v-deep .el-step__line {
  background: transparent;
  border-top: 5px dotted;
  transform: translateY(2.5px);
  .el-step__line-inner {
    border-width: 0 !important;
  }
}
::v-deep .el-step__icon-inner {
  font-size: 18px;
}
::v-deep .el-step__icon-inner.is-finish {
  font-weight: 500;
  font-size: 18px;
  color: $stepFont;
}
::v-deep .el-step__description.is-finish {
  background: $stepIcon;
}
::v-deep .el-step {
  position: relative;
  .el-step__head.is-process {
    color: #c0c4cc;
    border-color: $soft;
    // border-color: #c0c4cc;
  }
  .el-step__title.is-process {
    color: $soft;
    font-weight: unset;
  }
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
