<template>
  <div class="all">
    <div class="nav-container">
      <label class="switch">
        <input type="checkbox" v-model="checked" />
        <span class="slider"></span>
      </label>
      <ul class="nav-con" ref="con">
        <Transition name="first">
          <li class="second nav-item" v-if="isUnFold">关于</li>
        </Transition>
        <Transition name="second">
          <li class="second nav-item" v-if="isUnFold">关于</li>
        </Transition>
        <Transition name="third">
          <li class="third nav-item" v-if="isUnFold">首页</li>
        </Transition>
        <Transition name="fourth">
          <li class="fourth nav-item" v-if="isUnFold">请求帮助</li>
        </Transition>
      </ul>
      <label class="hamburger">
        <input type="checkbox" ref="unfold" v-model="foldFlag" />
        <svg viewBox="0 0 40 32">
          <path
            class="line line-top-bottom"
            d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
          ></path>
          <path class="line" d="M7 16 27 16"></path>
        </svg>
      </label>
    </div>
  </div>
</template>

<script lang="ts" setup>
import gsap from "gsap";
import { onMounted, ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const checked = ref<boolean>(true);
const isUnFold = ref<boolean>(true);
const theme = ref<string>("#333");

watchEffect(() => {
  if (!checked.value) {
    document
      .getElementsByTagName("body")[0]
      .style.setProperty("--theme", "#333");
    document
      .getElementsByTagName("body")[0]
      .style.setProperty("--compare", "#fff");
    document
      .getElementsByTagName("body")[0]
      .style.setProperty("--back", "#121212");
    document
      .getElementsByTagName("body")[0]
      .style.setProperty("--nav", "rgba(59,59, 59, 0.605)");
    document
      .getElementsByTagName("body")[0]
      .style.setProperty("--font", "#fff");
    document
      .getElementsByTagName("body")[0]
      .style.setProperty("--banner", "rgba(100,100,100,.5)");
    document
      .getElementsByTagName("body")[0]
      .style.setProperty("--main", "#ccc");
    document.getElementsByTagName("body")[0].style.setProperty("--btn", "#000");
    document
      .getElementsByTagName("body")[0]
      .style.setProperty("--soft", "#1888ff");
    document
      .getElementsByTagName("body")[0]
      .style.setProperty("--hoverBtn", "#5eacff");
    document
      .getElementsByTagName("body")[0]
      .style.setProperty("--stepFont", "#fff");
    document
      .getElementsByTagName("body")[0]
      .style.setProperty("--stepIcon", "#404040");
    document
      .getElementsByTagName("body")[0]
      .style.setProperty("--weight", "300");
  } else {
    document
      .getElementsByTagName("body")[0]
      .style.setProperty("--theme", "#fff");
    document
      .getElementsByTagName("body")[0]
      .style.setProperty("--compare", "#666");
    document
      .getElementsByTagName("body")[0]
      .style.setProperty("--back", "#fff");
    document
      .getElementsByTagName("body")[0]
      .style.setProperty("--nav", "rgba(59, 59, 59, 0.605)");
    document
      .getElementsByTagName("body")[0]
      .style.setProperty("--font", "#000");
    document
      .getElementsByTagName("body")[0]
      .style.setProperty("--banner", "rgba(240,240,240,.5)");
    document
      .getElementsByTagName("body")[0]
      .style.setProperty("--main", "#007bff");
    document.getElementsByTagName("body")[0].style.setProperty("--btn", "#fff");
    document
      .getElementsByTagName("body")[0]
      .style.setProperty("--soft", "#007bff");
    document
      .getElementsByTagName("body")[0]
      .style.setProperty("--hoverBtn", "#409cff");
    document
      .getElementsByTagName("body")[0]
      .style.setProperty("--stepFont", "#36be1bff");
    document
      .getElementsByTagName("body")[0]
      .style.setProperty("--stepIcon", "#fff");
    document
      .getElementsByTagName("body")[0]
      .style.setProperty("--weight", "500");
  }
});
const unfold = ref(null);
const con = ref(null);
let foldFlag = ref<boolean>(false);
let body = document.documentElement;
const goBack = () => {
  router.push("/data");
};
const clickE = () => {
  isUnFold.value = !foldFlag.value;
};
const resizeE = () => {
  console.log(body.offsetWidth);

  if (body.offsetWidth <= 900) {
    isUnFold.value = false;
    foldFlag.value = false;
  } else {
    isUnFold.value = true;
  }
};
onMounted(() => {
  unfold.value.addEventListener("click", clickE);
  window.addEventListener("resize", resizeE);

  if (body.offsetWidth <= 900) {
    isUnFold.value = false;
    // con.value.style.display = "none";
  } else {
    isUnFold.value = true;
  }
});
</script>
<style lang="scss" scoped>
@import "../../assets/scss/color.scss";
@import "../../assets/scss/font.scss";
.nav-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 4rem;
  z-index: 10000;
  backdrop-filter: blur(5.5px);
  background-color: $nav;
  display: flex;
  align-items: center;
  justify-content: end;
  .nav-con {
    height: 100%;
    display: flex;
    .nav-item {
      display: grid;
      place-content: center;
      height: 100%;
      cursor: pointer;
      margin-right: 2vw;
      font-size: 1em;
      color: white;
    }
    .night-mode {
      display: none;
    }
  }
  .switch {
    font-size: 17px;
    position: relative;
    display: inline-block;
    width: 4em;
    height: 2em;
    margin-right: 2vmax;
    box-sizing: border-box;
  }

  /* Hide default HTML checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: $theme;
    transition: 0.4s;
    border-radius: 30px;
    border: 0.13vw solid $compare;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 1.4em;
    width: 1.4em;
    border-radius: 20px;
    left: 0.3em;
    bottom: 0.2em;
    background-color: rgb(219, 198, 2);
    transition: 0.4s;
  }

  input:checked + .slider {
    background-color: $theme;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px $theme;
  }

  input:checked + .slider:before {
    transform: translateX(2em);
  }

  .slider::after {
    width: 20px;
    height: 20px;
    left: 20%;
    top: 10%;
    border-radius: 50%;
    position: absolute;
    content: "";
    background-color: $theme;
    transition: ease 0.4s;
  }

  input:checked + .slider::after {
    left: 80%;
    width: 0px;
    height: 0px;
  }
  .hamburger {
    cursor: pointer;
  }

  .hamburger input {
    display: none;
  }

  .hamburger svg {
    display: none;
    /* The size of the SVG defines the overall size */
    height: 3em;
    /* Define the transition for transforming the SVG */
    transition: transform 600ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .line {
    fill: none;
    stroke: white;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 3;
    /* Define the transition for transforming the Stroke */
    transition: stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1),
      stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .line-top-bottom {
    stroke-dasharray: 12 63;
  }

  .hamburger input:checked + svg {
    transform: rotate(-45deg);
  }

  .hamburger input:checked + svg .line-top-bottom {
    stroke-dasharray: 20 300;
    stroke-dashoffset: -32.42;
  }
} /* 对移动中的元素应用的过渡 */
.first-enter-active,
.first-leave-active {
  transition: all 0.5s ease;
}

.first-enter-from,
.first-leave-to {
  opacity: 0;
  transform: translateY(0);
}
.second-enter-active,
.second-leave-active {
  transition: all 0.5s ease;
}

.second-enter-from,
.second-leave-to {
  opacity: 0;
  transform: translateY(-3em);
}
.third-enter-active,
.third-leave-active {
  transition: all 0.5s ease;
}

.third-enter-from,
.third-leave-to {
  opacity: 0;
  transform: translateY(-6em);
}
.fourth-enter-active,
.fourth-leave-active {
  transition: all 0.5s ease;
}

.fourth-enter-from,
.fourth-leave-to {
  opacity: 0;
  transform: translateY(-9em);
}

@media screen and (max-width: 900px) {
  .hamburger svg {
    display: block !important;
  }
  .show {
    display: block !important;
  }
  .all {
    position: relative;
  }
  .nav-con {
    position: absolute;
    width: 100vw;
    left: 0;
    top: 4em;
    height: auto !important;
    display: flex !important;
    flex-direction: column;
    .first {
      transition-delay: 1s;
    }
    .nav-item {
      z-index: 999 !important;
      width: 100%;
      transition: all 0.5s;
      border-bottom: 1px solid black;
      background-color: rgb(93, 93, 93);
      box-shadow: 0px -5px 7px -2px rgb(142, 142, 142);
      backdrop-filter: blur(5px);
      height: 3.5rem !important;
      color: white !important;
      margin-right: 0 !important;
    }
    .nav-item:hover {
      background-color: rgb(119, 119, 119);
    }
  }
}
</style>
