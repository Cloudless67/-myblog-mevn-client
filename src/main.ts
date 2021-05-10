import { createApp } from 'vue';
import App from './App.vue';
import { createMetaManager } from 'vue-meta';
import router from './router';
import store from './store';

createApp(App)
    .use(createMetaManager())
    .use(router)
    .use(store)
    .mount('#app');
