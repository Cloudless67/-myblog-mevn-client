<template>
    <div v-if="posts.length > 0">
        <h1>{{ title }}</h1>
        <ul class="list-unstyled">
            <post-list-item v-for="post in posts" :key="post._id" :post="post" />
        </ul>
        <post-list-pagination v-if="maxIndex > 1" :total-page="maxIndex" />
    </div>
    <LoadingSkeleton v-else />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RouteLocationNormalizedLoaded } from 'vue-router';
import LoadingSkeleton from '@/components/LoadingSkeleton.vue';
import { PostPreview } from '@/types/post';
import PostListItem from '@/components/PostListItem.vue';
import PostListPagination from '@/components/PostListPagination.vue';
import isError from '@/types/error';

type PostsRes = { posts: PostPreview[]; totalLength: number };
const maxPostPerPage = 10;

async function getPosts(url: string) {
    const res = await fetch(url).then((res) => res.json());

    const posts: PostPreview[] = res.posts;
    const totalLength: number = res.totalLength;
    return { posts, totalLength };
}

function buildPath(to: RouteLocationNormalizedLoaded): string {
    let path: string;
    if (to.params.category) path = '/posts' + to.fullPath;
    else if (to.params.tag) path = to.fullPath;
    else path = '/posts' + to.fullPath;

    return `/api${path}`;
}

export default defineComponent({
    name: 'HomeView',
    components: { PostListItem, PostListPagination, LoadingSkeleton },
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
    async created() {
        document.title = 'Cloudless의 블로그';
        try {
            const res = await getPosts(buildPath(this.$route));
            this.setPosts(res);
        } catch (error) {
            if (isError(error)) console.error(error.message);
        }
    },
    methods: {
        setPosts({ posts, totalLength }: PostsRes) {
            this.posts = posts;
            this.totalLength = totalLength;
        },
    },
});
</script>
