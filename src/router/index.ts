import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import PostView from '@/views/PostView.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/post/:title',
        name: 'About',
        component: PostView,
    },
    {
        path: '/:category?',
        name: 'HomeView',
        component: HomeView,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
