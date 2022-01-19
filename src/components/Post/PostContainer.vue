<template>
    <PostHeader :post="post" />
    <!-- eslint-disable-next-line vue/no-v-html -->
    <article ref="postContainer" class="py-2" v-html="body"></article>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import PostHeader from '@/components/post/PostHeader.vue';
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
    data() {
        return {
            body: '',
        };
    },
    mounted() {
        this.$store.commit(setLastPost, this.post);

        if (this.post.thumbnail) {
            const postContainer = this.$refs.postContainer as HTMLElement;
            const containerWidth = postContainer.getBoundingClientRect().width;
            const thumbnail = `<p><img src="${
                this.post.thumbnail.url
            }" width="${containerWidth}" height="${
                containerWidth / this.post.thumbnail.aspectRatio
            }" alt="썸네일"></p>`;

            this.body = thumbnail + this.post.formattedBody;
        } else {
            this.body = this.post.formattedBody;
        }
    },
});
</script>
