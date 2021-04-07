<template>
    <div class="main-inner justify-content-center text-start">
        <h1 class="fw-bold">{{ title }}</h1>
        <div class="post-list" v-if="!loading">
            <post-list-item v-for="post in posts" :key="post._id" :post="post" />
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import PostListItem from './PostListItem.vue';
import Post from '@/Post';

@Options({
    name: 'Postlist',
    components: {
        PostListItem,
    },
})
export default class PostList extends Vue {
    title: string = '전체 글';
    category: string = '';
    index: number = 0;
    loading = true;
    posts!: Post[];

    async created() {
        await this.loadPosts();
        this.$watch(
            () => this.$route,
            async () => {
                this.loading = true;
                await this.loadPosts();
            },
        );
    }

    async loadPosts() {
        this.category = (this.$route.params.category as string) || '';
        this.title = this.category || '전체 글';

        const baseUrl = `http://localhost:3000/api/posts/${this.category}`;
        const queryParam = this.index == 0 ? '' : `?idx=${this.index}`;

        this.posts = await fetch(baseUrl + queryParam, { mode: 'cors' }).then(res => res.json());
        this.loading = false;
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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

a {
    color: #42b983;
}

.post-list:last-child {
    border: none im !important;
}
</style>
