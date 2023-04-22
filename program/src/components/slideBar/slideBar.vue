<template>
  <div class="all">
    <div class="slidebar-container">
      <!-- <div style="height: 200px">
      <n-row :gutter="12">
        <n-col :span="6">
          <div />
        </n-col>
        <n-col :span="6">
          <div />
        </n-col>
        <n-col :span="6">
          <div style="width: 160px; float: right">
            <n-anchor
              affix
              :trigger-top="24"
              :top="88"
              style="z-index: 1"
              ignore-gap
            >
              <n-anchor-link title="演示" href="#演示">
                <n-anchor-link title="忽略间隔" href="#ignore-gap.vue" />
                <n-anchor-link title="固定" href="#affix.vue" />
                <n-anchor-link title="滚动到" href="#scrollto.vue" />
              </n-anchor-link>
              <n-anchor-link title="API" href="#API" />
            </n-anchor>
          </div>
        </n-col>
        <n-col :span="6">
          <div style="width: 160px; float: right">
            <n-anchor affix :trigger-top="24" :top="88" style="z-index: 1">
              <n-anchor-link title="演示" href="#演示">
                <n-anchor-link title="忽略间隔" href="#ignore-gap.vue" />
                <n-anchor-link title="固定" href="#affix.vue" />
                <n-anchor-link title="滚动到" href="#scrollto.vue" />
              </n-anchor-link>
              <n-anchor-link title="API" href="#API" />
            </n-anchor>
          </div>
        </n-col>
      </n-row>
    </div> -->
      <input type="checkbox" id="checkbox" v-model="checked" />
      <label for="checkbox" class="toggle" @click="handleStrench">
        <div class="bars" id="bar1"></div>
        <div class="bars" id="bar2"></div>
        <div class="bars" id="bar3"></div>
      </label>
      <ul ref="slide">
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { nextTick } from "process";
import { getCurrentInstance, onMounted, ref, watchEffect } from "vue";
const checked = ref<boolean>(false);
const slide = ref(null);
//节流阀
let timeID = ref(null);
let flag = ref<boolean>(true);
let handleStrench: any;
handleStrench = () => {
  slide.value.style.width = checked ? "8em" : "3.8em";
};
</script>
<style lang="scss" scoped>
$strench: #ccc;
.all {
  height: 100%;
}
.slidebar-container {
  transition: all 0.5s;
  // position: relative;
  background-color: $strench;
  // height: 100%;
  // width: auto;
  min-height: 10em;
  min-width: 3.8em;
  #checkbox {
    display: none;
  }
  ul {
    transition: all 0.5s;
    background-color: pink;
  }
  .toggle {
    position: absolute;
    bottom: 0;
    left: 0;
    margin-bottom: 1em;
    margin-left: 0.65em;
    width: 2.5em;
    height: 2em;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5em;
    transition-duration: 0.5s;
  }

  .bars {
    width: 100%;
    height: 0.3em;
    background-color: #fff;
    border-radius: 0.3em;
  }

  #bar2 {
    transition-duration: 0.8s;
  }

  #bar1,
  #bar3 {
    width: 70%;
  }

  #checkbox:checked + .toggle .bars {
    position: absolute;
    transition-duration: 0.5s;
  }

  #checkbox:checked + .toggle #bar2 {
    transform: scaleX(0);
    transition-duration: 0.5s;
  }

  #checkbox:checked + .toggle #bar1 {
    width: 100%;
    transform: rotate(45deg);
    transition-duration: 0.5s;
  }

  #checkbox:checked + .toggle #bar3 {
    width: 100%;
    transform: rotate(-45deg);
    transition-duration: 0.5s;
  }

  #checkbox:checked + .toggle {
    transition-duration: 0.5s;
    transform: rotate(180deg);
  }
}
ul:hover {
  max-width: 1000px;
}
.slidebar-container:hover{
  min-height: 100%;
}
@media screen and (max-width: 900px) {
  .slidebar-container {
    display: none;
  }
}
</style>
