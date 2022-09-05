import {createApp} from "vue";
import app from "./app.vue";
import {createAppRouter} from "./router/app-router";

createApp(app)
    .use(createAppRouter())
    .mount('#app')