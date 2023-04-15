import { createApp, VueElement } from "vue";
import "./style.css";
import router from "./router/index";
import store from "./store/index";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import './assets/iconfont/iconfont.css'
import './assets/base.css'
const app = createApp(App);
app.use(ElementPlus);
app.use(router).use(store).mount("#app");
