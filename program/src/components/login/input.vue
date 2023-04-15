<template>
  <div class="input-container">
    <slot name="icon" class="icon"></slot>
    <input type="text" id="input" required="" />
    <label for="input" class="label">
      <slot name="placeholder"></slot>
    </label>
    <div class="underline"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
</script>
<style lang="less" scoped>
@halfHeight: 0.6vmax;
.input-container {
  display: flex;
  align-items: center;
  font-weight: 500;
  position: relative;
  margin: 0 auto;
  width: 70%;
}
.input-container input[type="text"]:focus{
  border-color: #007bff;
}
.input-container input[type="text"] {
  margin-left: .5vmax;
  transition: .4s;
  font-size: 1vmax;
  width: 100%;
  border: none;
  border: 2px solid #ccc;
  border-radius: 1vmin;
  padding: @halfHeight;
  background-color: transparent;
  outline: none;
}

.input-container .label {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 13%;
  color: #ccc;
  transition: all 0.3s ease;
  pointer-events: none;
}

.input-container input[type="text"]:focus ~ .label,
.input-container input[type="text"]:valid ~ .label {
  top: -1.3vmax;
  transform: translate(0);
  left: 10%;
  font-size: .8vmax;
  color: #333;
}


</style>
