import { createApp } from 'vue'
import {
    ElMessage,
    ElMessageBox,
} from "element-plus";

import App from './App.vue'
import router from "./router";
import store from "./store";
import storage from "good-storage";
import request from "./libs/axios"; // 全局请求


const app = createApp(App);
app.config.globalProperties.$storage = storage; // 自定义添加
app.config.globalProperties.$http = request; // 自定义添加

app.use(ElMessage)
    .use(ElMessageBox)
app.use(store).use(router);
app.mount("#app");
