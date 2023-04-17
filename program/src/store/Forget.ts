import { defineStore } from "pinia";
import { ref } from "vue";
export const useIndexStore = defineStore("index", {
  state: () => {
    return {
      currentIndex: ref<number>(1),
    };
  },
  actions: {
  },
});
