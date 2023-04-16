import { createApp, VueElement } from "vue";
import "./style.css";
import router from "./router/index";
import App from "./App.vue";
import {createPinia} from 'pinia'
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import './assets/iconfont/iconfont.css'
import './assets/base.css'
const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(ElementPlus);
app.use(router).mount("#app");
