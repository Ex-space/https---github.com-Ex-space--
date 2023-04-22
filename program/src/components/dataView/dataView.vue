<template>
  <div class="form-container">
    <slideBar class="slideBar"></slideBar>
    <div class="view-container"></div>
  </div>
</template>

<script lang="ts" setup>
import slideBar from "../slideBar/slideBar.vue";
import { useEchartsStore } from "../../store/echarts";
import shine from "echarts/theme/shine.js";
import purplePassion from "echarts/theme/purple-passion";
import { ref, getCurrentInstance, nextTick, onMounted, watchEffect } from "vue";
const { proxy } = getCurrentInstance() as any;
const userName = "wode";
const eStore = useEchartsStore();
let themeIn = ref(shine);
let themeName = ref<string>("shine");
let myChart: any;
onMounted(() => {
  const option = {
    title: {
      text: userName + "的回复统计",
    },
    tooltip: {
      trigger: "axis",
    },
    axisPointer: {
      show: true,
      type: "line",
      label: {
        show: true,
        precision: 0,
      },
      lineStyle: {
        width: 1,
        type: "line",
      },
    },
    legend: {
      data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"],
    },
    dataZoom: {
      type: "inside",
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    darkMode: true,
    toolbox: {
      right: "4%",
      show: true,
      feature: {
        saveAsImage: {
          show: true,
          title: "保存为图片",
        },
        magicType: {
          type: ["line", "bar"],
          title: {
            line: "切换为折线图",
            bar: "切换为柱状图",
          },
        },
        dataView: {
          show: true,
          title: "数据视图",
          readOnly: true,
          lang: ["数据视图", "关闭", "刷新"],
        },
        restore: {
          show: true,
          title: "复原",
        },
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    },
    yAxis: {
      type: "value",
    },
    // visualMap: {
    //   top: 50,
    //   right: 10,
    //   pieces: [
    //     {
    //       gt: 0,
    //       lte: 50,
    //       color: "#93CE07",
    //     },
    //     {
    //       gt: 50,
    //       lte: 100,
    //       color: "#FBDB0F",
    //     },
    //     {
    //       gt: 100,
    //       lte: 150,
    //       color: "#FC7D02",
    //     },
    //     {
    //       gt: 150,
    //       lte: 200,
    //       color: "#FD0100",
    //     },
    //     {
    //       gt: 200,
    //       lte: 300,
    //       color: "#AA069F",
    //     },
    //     {
    //       gt: 300,
    //       color: "#AC3B2A",
    //     },
    //   ],
    //   outOfRange: {
    //     color: "#999",
    //   },
    // },
    series: [
      {
        name: "邮件营销",
        type: "line",
        sampling: "average",
        data: [120, 132, 101, 134, 90, 230, 210],
        areaStyle: {
          color: new proxy.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgb(255, 158, 68)",
            },
            {
              offset: 1,
              color: "rgb(255, 70, 131)",
            },
          ]),
        },
      },
      {
        name: "联盟广告",
        type: "line",
        data: [220, 182, 191, 234, 290, 330, 310],
      },
      {
        name: "视频广告",
        type: "line",
        data: [150, 232, 201, 154, 190, 330, 410],
      },
      {
        name: "直接访问",
        type: "line",
        data: [320, 332, 301, 334, 390, 330, 320],
      },
      {
        name: "搜索引擎",
        type: "line",
        data: [820, 932, 901, 934, 1290, 1330, 1320],
      },
    ],
    animation: true,
    animationDuration: 1000,
  };
  nextTick(() => {
    // myChart = proxy.$echarts.init(chartDom, themeName);
    const chartDom = <HTMLElement>document.querySelector(".view-container");
    myChart = proxy.$echarts.init(
      chartDom,
      eStore.darkFlag ? "purple-passion" : "shine"
    );
    myChart.setOption(option, eStore.darkFlag ? purplePassion : shine, {
      renderer: "svg",
    });
    // myChart.setOption(option, themeIn, { renderer: "svg" });
    window.onresize = function () {
      myChart.resize();
    };
  });
});
// echarts.init(con, theme);
</script>
<style lang="scss" scoped>
@import "../../assets/scss/color.scss";
@import "../../assets/scss/font.scss";
.form-container {
  background-color: rgb(239, 239, 239);
  box-shadow: inset -5px -5px 20px -10px rgb(80, 80, 80);
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .view-container {
    flex: 1;
    height: 80%;
  }
}
</style>
