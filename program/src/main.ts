import { createApp, getCurrentInstance, VueElement } from "vue";
import "./style.css";
import router from "./router/index";
import App from "./App.vue";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "./assets/iconfont/iconfont.css";
import gsap from "gsap";
import axios from "axios";
import "./assets/scss/base.scss";
import loginInput from "./components/login/loginInput.vue";
import naive from "naive-ui";
import navBar from "./components/navBar/navBar.vue";
import send from "./components/forget/send.vue";
import complete from "./components/forget/complete.vue";
import reset from "./components/forget/reset.vue";
import forgetInput from "./components/forget/forgetInput.vue";
import next from "./components/forget/next.vue";
import * as echarts from 'echarts'
// import.meta.globEager("./theme/purple-passion.js")
// import.meta.globEager("./theme/shine.js");
// require('./theme/purple-passion.js')
// require("./theme/shine.js");
const app = createApp(App);
const pinia = createPinia();
axios.defaults.baseURL = "http://113.141.84.94:8080";
app.config.globalProperties.$http = axios;
app.config.globalProperties.$echarts = echarts;
app.component("loginInput", loginInput);
app.component("send", send);
app.component("complete", complete);
app.component("reset", reset);
app.component("next", next);
app.component("navBar", navBar);
app.component("forgetInput", forgetInput);
app.use(pinia);
app.use(naive);
app.use(gsap);
app.use(ElementPlus);
app.use(router).mount("#app");
