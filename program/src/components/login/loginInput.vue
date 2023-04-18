<template>
  <div class="input-container">
    <slot name="icon" class="icon"></slot>
    <input :type="type" id="input" required="" ref="myinput" v-model="value" />
    <label for="input" class="label">
      <slot name="placeholder"></slot>
    </label>
    <div class="underline"></div>
    <span
      :class="[
        'iconfont',
        { 'icon-yincangbukejian': isVisible, 'icon-xianshikejian': !isVisible },
      ]"
      @click.prevent="changeVisible()"
      v-if="inputType === 'password' && value"
    ></span>
  </div>
</template>

<script lang="ts" setup>
import { isVisible } from "element-plus/es/utils";
import { ref, defineProps, onMounted, nextTick } from "vue";
const props = defineProps({
  inputType: String,
});
let value = ref("");
let type = ref(props.inputType);
//可见性的切换标志
const myinput = ref();
onMounted(() => {
  value.value = "";
});
let isVisible = ref<boolean>(true);
function changeVisible() {
  isVisible.value = !isVisible.value;
  nextTick(() => {
    if (type) {
      if (type.value! == "password") {
        type.value = "text";
      } else {
        type.value = "password";
      }
    }
  });
}
</script>
<style lang="less" scoped>
@halfHeight: 0.5em;
.input-container {
  display: flex;
  position: relative;
  align-items: center;
  font-weight: 500;
  position: relative;
  margin: 0 auto;
  width: 70%;
  .iconfont {
    position: absolute;
    right: 0.3em;
    font-size: 1.8em;
  }
}
.input-container input[type="text"]:focus,
.input-container input[type="password"]:focus {
  border-color: #007bff;
}
.input-container input[type="text"],
.input-container input[type="password"] {
  margin-left: 0.5vmax;
  transition: 0.4s;
  font-size: 15px;
  width: 100%;
  border: none;
  border: 0.13vw solid #ccc;
  border-radius: 1vmin;
  padding: @halfHeight;
  background-color: transparent;
  outline: none;
}

.input-container .label {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 12%;
  color: #ccc;
  transition: all 0.3s ease;
  pointer-events: none;
}

.input-container input[type="text"]:focus ~ .label,
.input-container input[type="password"]:focus ~ .label,
.input-container input[type="text"]:valid ~ .label,
.input-container input[type="password"]:valid ~ .label {
  top: -20px;
  transform: translate(0);
  left: 8%;
  font-size: 12px;
  color: #333;
}
</style>
