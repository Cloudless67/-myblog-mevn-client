import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import PostView from '@/views/PostView.vue';

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
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { top: 0 };
        }
    },
});

export default router;
