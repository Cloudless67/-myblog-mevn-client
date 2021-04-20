import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import LoginView from '@/views/LoginView.vue';
import WriteView from '@/views/WriteView.vue';
import HomeView from '@/views/HomeView.vue';
import PostView from '@/views/PostView.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: 'Login',
        component: LoginView,
    },
    {
        path: '/write',
        name: 'Write',
        component: WriteView,
    },
    {
        path: '/post/:title',
        name: 'Post',
        component: PostView,
    },
    {
        path: '/tags/:tag?',
        name: 'Tags View',
        component: HomeView,
    },
    {
        path: '/:category?',
        name: 'Categories View',
        component: HomeView,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
