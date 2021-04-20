<template>
    <div class="main-inner justify-content-center text-start">
        <h1 class="fw-bold">{{ title }}</h1>
        <div class="post-list">
            <post-list-item v-for="post in posts" :key="post._id" :post="post" />
        </div>
        <nav class="text-center mt-3" v-if="maxIndex > 1">
            <span
                class="postlist-indexer px-2"
                :class="{
                    'bg-gray-500': isSelected(i),
                    'text-danger': isSelected(i),
                    'border-end': i != maxIndex,
                }"
                v-for="i in maxIndex"
                :key="i"
                @click="changeIndex(i)"
            >
                {{ i }}
            </span>
        </nav>
    </div>
</template>

<script lang="ts">
import { RouteLocationNormalized } from 'node_modules/vue-router/dist/vue-router';
import { defineComponent } from 'vue';
import PostListItem from '@/components/PostListItem.vue';
import { Post } from '@/types';

type PostsRes = { posts: Post[]; totalLength: number };
const maxPostPerPage = 10;

export default defineComponent({
    name: 'Home View',
    components: {
        PostListItem,
    },
    data() {
        return {
            index: 1,
            posts: [] as Post[],
            totalLength: 0,
        };
    },
    methods: {
        setPosts({ posts, totalLength }: PostsRes) {
            this.posts = posts;
            this.totalLength = totalLength;
        },
        isSelected(i: number) {
            return i == this.index;
        },
        async changeIndex(index: number) {
            this.$router.push({ query: { page: index !== 1 ? index : undefined } });
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
        index(): number {
            return Number(this.$route.query.page || 1);
        },
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

    return `/api${path}`;
};
</script>

<style scoped>
h3 {
    margin: 40px 0 0;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

.bg-gray-500 {
    background: #eee;
}

.postlist-indexer:hover {
    cursor: pointer;
    text-decoration: underline;
}
</style>
