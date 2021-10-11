<template>
    <post-header :post="post" />
    <!-- eslint-disable-next-line vue/no-v-html -->
    <article class="py-2" v-html="post.formattedBody"></article>
</template>

<script lang="ts">
import PostHeader from '@/components/Post/PostHeader.vue';
import { defineComponent, PropType } from 'vue';
import { Post } from '@/types/post';
import { setLastPost } from '@/types/mutations';
import '@/assets/prism.css';

export default defineComponent({
    name: 'PostContainer',
    components: { PostHeader },
    props: {
        post: {
            type: Object as PropType<Post>,
            required: true,
        },
    },
    watch: {
        post() {
            if (this.post && this.$store.state.login) {
                this.$store.commit(setLastPost, this.post);
            }
        },
    },
});
</script>
