<template>
    <post-header :post="post" />
    <article class="py-2" v-html="post.formattedBody"></article>
</template>

<script lang="ts">
import PostHeader from '@/components/Post/PostHeader.vue';
import { defineComponent, PropType } from 'vue';
import { Post } from '@/types';
import { setLastPost } from '@/types/mutations';

export default defineComponent({
    name: 'Post Container',
    components: { PostHeader },
    props: {
        post: {
            type: Object as PropType<Post>,
            required: true,
        },
    },
    watch: {
        post() {
            if (this.post) {
                if (this.$store.state.login) this.$store.commit(setLastPost, this.post);
                this.$nextTick(() => {});
            }
        },
    },
});
</script>
