<template>
    <main-with-sidebar>
        <post-list :totalLength="totalLength" :posts="posts" @changeIndex="changeIndex" />
    </main-with-sidebar>
</template>

<script lang="ts">
import { RouteLocationNormalized } from 'node_modules/vue-router/dist/vue-router';
import { defineComponent } from 'vue';
import MainWithSidebar from '@/components/MainWithSidebar.vue';
import PostList from '@/components/PostList.vue';
import { Post } from '@/types';

type PostsRes = { posts: Post[]; totalLength: number };

export default defineComponent({
    name: 'Home View',
    components: {
        MainWithSidebar,
        PostList,
    },
    methods: {
        setPosts({ posts, totalLength }: PostsRes) {
            this.posts = posts;
            this.totalLength = totalLength;
        },
        async changeIndex(index: number) {
            this.$router.push({ query: { page: index !== 1 ? index : undefined } });
        },
    },
    data() {
        return {
            posts: [] as Post[],
            totalLength: 0,
        };
    },
    async beforeRouteEnter(to, from, next) {
        const res = await getPosts(buildPath(to));
        next((vm: any) => vm.setPosts(res));
    },
    async beforeRouteUpdate(to, from, next) {
        this.setPosts(await getPosts(buildPath(to)));
        next();
    },
});

const getPosts = async (url: string) => {
    const res = await fetch(url).then(res => res.json());

    const posts: Post[] = res.posts;
    const totalLength: number = res.totalLength;
    return { posts, totalLength };
};

const buildPath = (to: RouteLocationNormalized): string => {
    let path: string;
    if (to.params.category) path = '/posts' + to.fullPath;
    else if (to.params.tag) path = to.fullPath;
    else path = '/posts' + to.fullPath;

    return `http://localhost:3000/api${path}`;
};
</script>
