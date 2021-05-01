<template>
    <div>
        <h1 class="fw-bold">{{ title }}</h1>
        <ul class="list-unstyled">
            <post-list-item v-for="post in posts" :key="post._id" :post="post" />
        </ul>
        <post-list-pagination :maxIndex="maxIndex" v-if="maxIndex > 1" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RouteLocationNormalized } from 'vue-router';
import { Post } from '@/types';
import PostListItem from '@/components/PostListItem.vue';
import PostListPagination from '@/components/PostListPagination.vue';

type PostsRes = { posts: Post[]; totalLength: number };
const maxPostPerPage = 10;

export default defineComponent({
    name: 'Home View',
    components: {
        PostListItem,
        PostListPagination,
    },
    data() {
        return {
            posts: [] as Post[],
            totalLength: 0,
        };
    },
    methods: {
        setPosts({ posts, totalLength }: PostsRes) {
            this.posts = posts;
            this.totalLength = totalLength;
        },
    },
    computed: {
        title(): string {
            if (this.$route.params.tag) return `Tag="${this.$route.params.tag}"`;
            else return (this.$route.params.category as string) || '전체 글';
        },
        maxIndex(): number {
            return Math.ceil(this.totalLength! / maxPostPerPage);
        },
    },
    async beforeRouteEnter(to, from, next) {
        const res = await getPosts(buildPath(to));
        document.title = 'Cloudless의 블로그';
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

    return `/api${path}`;
};
</script>
