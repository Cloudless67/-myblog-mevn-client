<template>
    <div>
        <h1 class="fw-bold">{{ title }}</h1>
        <ul class="list-unstyled">
            <post-list-item v-for="post in posts" :key="post._id" :post="post" />
        </ul>
        <post-list-pagination v-if="maxIndex > 1" :max-index="maxIndex" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RouteLocationNormalized } from 'vue-router';
import { PostPreview } from '@/types/post';
import PostListItem from '@/components/PostListItem.vue';
import PostListPagination from '@/components/PostListPagination.vue';

type PostsRes = { posts: PostPreview[]; totalLength: number };
const maxPostPerPage = 10;

export default defineComponent({
    name: 'HomeView',
    components: { PostListItem, PostListPagination },
    async beforeRouteEnter(to, from, next) {
        const res = await getPosts(buildPath(to));
        document.title = 'Cloudless의 블로그';
        // Using any due to issue: https://github.com/vuejs/vue-router-next/issues/701
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        next((vm: any) => vm.setPosts(res));
    },
    async beforeRouteUpdate(to, from, next) {
        this.setPosts(await getPosts(buildPath(to)));
        next();
    },
    data() {
        return {
            posts: [] as PostPreview[],
            totalLength: 0,
        };
    },
    computed: {
        title(): string {
            if (this.$route.params.tag) return `Tag="${this.$route.params.tag}"`;
            else return (this.$route.params.category as string) || '전체 글';
        },
        maxIndex(): number {
            return Math.ceil(this.totalLength / maxPostPerPage);
        },
    },
    methods: {
        setPosts({ posts, totalLength }: PostsRes) {
            this.posts = posts;
            this.totalLength = totalLength;
        },
    },
});

async function getPosts(url: string) {
    const res = await fetch(url).then(res => res.json());

    const posts: PostPreview[] = res.posts;
    const totalLength: number = res.totalLength;
    return { posts, totalLength };
}

function buildPath(to: RouteLocationNormalized): string {
    let path: string;
    if (to.params.category) path = '/posts' + to.fullPath;
    else if (to.params.tag) path = to.fullPath;
    else path = '/posts' + to.fullPath;

    return `/api${path}`;
}
</script>
