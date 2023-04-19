<template>
  <n-result
    class="result"
    status="success"
  >
    <template #default>
      <h2>修改成功</h2>
      <div class="description">{{ description }}</div>
    </template>
    <template #footer>
      <n-button @click="goBackNow">
        <span class="btn">立即返回</span>
      </n-button>
    </template>
  </n-result>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const count = ref<number>(5);
const description = ref<string>(
  `修改密码成功，即将在${count.value}秒后返回首页`
);
const router = useRouter();
let goBackNow = () => {
  router.push('/data');
};
const timeID = ref(null);
if (!timeID.value) {
  timeID.value = setInterval(() => {
    if (count.value > 0) {
      count.value--;
      description.value = `修改密码成功，即将在${count.value}秒后返回首页`;
    } else {
      goBackNow();
    }
  }, 1000);
}
goBackNow = () => {
  router.back();
  clearInterval(timeID.value);
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/color.scss";
@import "../../assets/scss/font.scss";
.result {
  color:$font;
  margin: 6em 0 4em;
  h2{
    font-size: 3rem;
    margin-top: -2rem;
    margin-bottom: .5rem;
  }
  .btn{
    color: $font;
  }
}
</style>
