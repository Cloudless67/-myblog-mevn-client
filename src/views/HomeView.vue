<template>
    <main-with-sidebar>
        <post-list :totalLength="totalLength" :posts="posts" @changeIndex="changeIndex" />
    </main-with-sidebar>
</template>

<script lang="ts">
import MainWithSidebar from '@/components/MainWithSidebar.vue';
import PostList from '@/components/PostList.vue';
import { defineComponent } from 'vue';
import Post from '@/Post';

type PostsRes = { posts: Post[]; totalLength: number };

export default defineComponent({
    name: 'Home View',
    components: {
        MainWithSidebar,
        PostList,
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
        async changeIndex(index: number) {
            this.setPosts(await getPosts(this.$route.params.category as string, index));
        },
    },
    async beforeRouteEnter(to, from, next) {
        const res = await getPosts(to.params.category as string);
        next((vm: any) => vm.setPosts(res));
    },
    async beforeRouteUpdate(to, from, next) {
        this.setPosts(await getPosts(to.params.category as string));
        next();
    },
});

const getPosts = async (category: string, index: number = 1) => {
    if (category) category = '/' + category;
    const baseUrl = `http://localhost:3000/api/posts${category}`;
    const indexQuery = index !== 1 ? `?idx=${index - 1}` : '';
    const res = await fetch(baseUrl + indexQuery).then(res => res.json());

    const posts: Post[] = res.posts;
    const totalLength: number = res.totalLength;
    return { posts, totalLength };
};
</script>
