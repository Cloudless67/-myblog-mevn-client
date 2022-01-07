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
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { top: 0 };
        }
    },
});

router.beforeEach(() => {
    const main = document.querySelector('main');
    const dummy = document.querySelector<HTMLDivElement>('.dummy');

    if (main === null) {
        throw new ReferenceError('<main> element not found.');
    }

    if (dummy === null) {
        throw new ReferenceError('Dummy element not found.');
    }

    const mainRect = main.getBoundingClientRect();

    setTimeout(() => {
        dummy.style.height = `${mainRect.height}px`;
    }, 210);
});

export default router;
