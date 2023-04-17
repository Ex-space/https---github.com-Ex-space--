<template>
  <n-result
    class="result"
    status="success"
    title="修改成功"
    :description="description"
  >
    <template #footer>
      <n-button @click="goBackNow">立即返回</n-button>
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
<style lang="less" scoped>
.result {
  margin: 7em 0 4em;
}
</style>
