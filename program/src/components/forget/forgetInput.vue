<template>
  <div class="input-container">
    <slot name="icon" class="icon"></slot>
    <input :type="type" id="input" required="" ref="myinput" v-model="value" />
    <label for="input" class="label">
      <slot name="placeholder"></slot>
    </label>
    <div class="underline"></div>

    <input
      ref="btn"
      type="button"
      :class="{ btn: true, point: !isDisabled, disPoint: isDisabled }"
      v-if="flag"
      :value="content"
      @click="handleSend"
      :disabled="isDisabled"
    />
  </div>
</template>

<script lang="ts" setup>
import { dir } from "console";
import { ref, defineProps, onMounted, nextTick, onUnmounted } from "vue";
const props = defineProps({
  inputType: String,
  flag: Boolean,
});
let content = ref("发送验证码");
let value = ref("");
let leaveTime = 60;
let type = ref(props.inputType);
let isDisabled = ref(false);
const timeID = ref(null);
//可见性的切换标志
const myinput = ref();
const sendOption = () => {
  if (leaveTime > 0) {
    content.value = `请在${leaveTime--}秒后再次发送`;
    isDisabled.value = true;
  } else {
    clearInterval(timeID.value);
    timeID.value = null;
    leaveTime = 60;
    content.value = "发送验证码";
    isDisabled.value = false;
  }
};
let handleSend = () => {
  if (!timeID.value) {
    sendOption();
    timeID.value = setInterval(() => {
      sendOption();
    }, 1000);
  }
};
onMounted(() => {
  value.value = "";
});
</script>
<style lang="less" scoped>
@halfHeight: 0.5em;
.point {
  cursor: pointer;
  background-color: #007bff;
}
.point:hover {
  background-color: #409cff;
}
.disPoint {
  cursor: not-allowed;
  background-color: rgb(198, 198, 198);
}
.input-container {
  display: flex;
  position: relative;
  align-items: center;
  font-weight: 500;
  position: relative;
  margin: 0 auto;
  width: 70%;
  min-width: 300px;
  .iconfont {
    position: absolute;
    right: 0.3em;
    font-size: 1.8em;
  }
  .btn {
    border-radius: 0.3em;
    color: white;
    padding: 0 0.8em;
    border: 0;
    margin-left: 0.5rem;
    height: 2.6em;
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
  left: 2.7rem;
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
  left: 1.9rem;
  font-size: 12px;
  color: #333;
}
</style>
