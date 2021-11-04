<template>
    <post-header :post="post" />
    <!-- eslint-disable-next-line vue/no-v-html -->
    <article class="py-2" v-html="post.formattedBody"></article>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import PostHeader from '@/components/Post/PostHeader.vue';
import { setLastPost } from '@/types/mutations';
import { Post } from '@/types/post';

export default defineComponent({
    name: 'PostContainer',
    components: { PostHeader },
    props: {
        post: {
            type: Object as PropType<Post>,
            required: true,
        },
    },
    created() {
        this.$store.commit(setLastPost, this.post);
    },
});
</script>
