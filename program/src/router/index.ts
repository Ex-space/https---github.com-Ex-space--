import { createRouter, createWebHistory } from "vue-router";
import Data from "../views/data.vue";
import Forget from "../views/forget.vue";
const Router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/data",
    },
    {
      path: "/data",
      name: "data",
      component: Data,
    },
    {
      path: "/forget",
      name: "forget",
      component: Forget,
    },
  ],
});
export default Router;
