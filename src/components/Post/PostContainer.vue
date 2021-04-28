<template>
    <post-header :post="post" />
    <article class="py-2" v-html="post.formattedBody"></article>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import PostHeader from '@/components/Post/PostHeader.vue';
import { Post } from '@/types';

@Options({
    name: 'Post Container',
    components: {
        PostHeader,
    },
    props: {
        post: Object,
    },
})
export default class PostContainer extends Vue {
    post!: Post;
}
</script>
