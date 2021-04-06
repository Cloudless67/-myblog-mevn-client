<template>
    <main class="justify-content-center text-start px-md-5">
        <h1 class="fw-bold mb-3">{{ title }}</h1>
        <div v-if="!loading">
            <post-list-item v-for="post in posts" :key="post._id" :post="post" />
        </div>
    </main>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import PostListItem from './PostListItem.vue';

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

        const res = await fetch(baseUrl + queryParam, { mode: 'cors' }).then(res => res.json());
        this.posts = res;
        this.loading = false;
        console.log(this.posts);
    }
}

type Post = {
    tags: string[];
    writtenTime: string;
    views: number;
    repliesNum: number;
    title: string;
    url: string;
    category: string;
    formattedBody: string;
    replies: object[];
};
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
</style>
