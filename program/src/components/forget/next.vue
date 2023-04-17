<template>
  <button @click="goNext">
    <span class="text">下一步</span
    ><span >Next<span class="iconfont icon-nextstep"></span></span>
  </button>
</template>

<script lang="ts" setup>
import { useIndexStore } from "../../store/Forget";
import { provide, ref } from "vue";
const store = useIndexStore();

const goNext = () => {
  store.currentIndex++;
};
</script>
<style lang="less" scoped>
button {
  --main: #007bff;
  margin-top: 3em;
  margin-bottom: 1.5em;
  position: relative;
  overflow: hidden;
  border: 0.01vw solid var(--main);
  color: var(--main);
  display: inline-block;
  font-size: 18.079px;
  line-height: 18.079px;
  width: 15%;
  padding: .65em 0;
  text-decoration: none;
  cursor: pointer;
  background: --main;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  .iconfont {
    font-size: 1.2em;
    margin-left: 2em;
  }
}

button span:first-child {
  position: relative;
  transition: color 600ms cubic-bezier(0.48, 0, 0.12, 1);
  z-index: 10;
}

button span:last-child {
  color: #fff;
  display: block;
  position: absolute;
  bottom: 0;
  transition: all 500ms cubic-bezier(0.48, 0, 0.12, 1);
  z-index: 100;
  opacity: 0;
  top: 50%;
  left: 50%;
  transform: translateY(225%) translateX(-85%);
  height: 14px;
  line-height: 13px;
}

button:after {
  content: "";
  position: absolute;
  bottom: -50%;
  left: 0;
  width: 120%;
  height: 100%;
  background-color: var(--main);
  transform-origin: bottom center;
  transition: transform 600ms cubic-bezier(0.48, 0, 0.12, 1);
  transform: skewY(9.3deg) scaleY(0);
  z-index: 50;
}
button:hover .iconfont {
  display: inline-block;
  animation: goNext 2s alternate infinite ease-in-out;
}
@keyframes goNext {
  0% {
    transform: translate(-8px, -6px);
  }
  30% {
    transform: translate(-5px, -6px);
  }
  50% {
    transform: translate(-3px, -6px);
  }
  100% {
    transform: translate(-8px, -6px);
  }
}
button:hover:after {
  transform-origin: bottom center;
  transform: skewY(9.3deg) scaleY(2);
}

button:hover span:last-child {
  transform: translateX(-85%) translateY(-50%);
  opacity: 1;
  transition: all 900ms cubic-bezier(0.48, 0, 0.12, 1);
}
</style>
