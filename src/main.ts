import { createApp } from 'vue';
import App from './App.vue';
import { createMetaManager } from 'vue-meta';
import router from './router';

createApp(App)
    .use(createMetaManager())
    .use(router)
    .mount('#app');
