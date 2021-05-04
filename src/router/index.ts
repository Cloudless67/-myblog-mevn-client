import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/LoginView.vue'),
    },
    {
        path: '/write',
        name: 'Write',
        component: () => import('@/views/WriteView.vue'),
    },
    {
        path: '/update/:slug',
        name: 'Update',
        component: () => import('@/views/UpdateView.vue'),
    },
    {
        path: '/post/:title',
        name: 'Post',
        component: () => import('@/views/PostView.vue'),
    },
    {
        path: '/tags/:tag?',
        name: 'Tags View',
        component: () => import('@/views/HomeView.vue'),
    },
    {
        path: '/:category?',
        name: 'Categories View',
        component: () => import('@/views/HomeView.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
