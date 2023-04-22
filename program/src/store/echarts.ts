import { defineStore } from "pinia";
import { ref } from "vue";
export const useEchartsStore = defineStore("echarts", {
  state: () => {
    return {
      darkFlag: ref<boolean>(false),
    };
  },
  actions: {},
});
