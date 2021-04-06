<template>
    <div class="post-list mb-3 pt-3 border-top">
        <router-link :to="`/post/${encodeURI(post.title)}`">
            <small class="float-end">조회 {{ post.views }} | 댓글 {{ post.repliesNum }}</small>
            <h3 class="fw-bold">{{ post.title }}</h3>
            <p class="text-black-50 m-0">{{ preview }}</p>
        </router-link>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
    name: 'Postlist Item',
    props: {
        post: Object,
    },
})
export default class PostListItem extends Vue {
    post!: Post;

    get preview() {
        return this.post.body.substring(
            0,
            Math.min(this.post.body.indexOf('#') > 0 ? this.post.body.indexOf('#') : 200, 200),
        );
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
    body: string;
    formattedBody: string;
    replies: object[];
};
</script>
