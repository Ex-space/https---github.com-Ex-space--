<template>
  <div class="nav-container">
  </div>
</template>

<script lang='ts' setup>
  import {ref} from 'vue'

</script>
<style lang='less' scoped>
.nav-container{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3rem;
  // background-color: pink;
  z-index: 10000;
  background-image: radial-gradient(transparent 1px,#fff 1px);
  background-size: 4px 4px;
  backdrop-filter: saturate(50%) blur(4px);
}
</style>