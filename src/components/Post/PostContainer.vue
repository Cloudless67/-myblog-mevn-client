<template>
    <post-header :post="post" />
    <article class="py-2" v-html="post.formattedBody"></article>
</template>

<script lang="ts">
import PostHeader from '@/components/Post/PostHeader.vue';
import { defineComponent, PropType } from 'vue';
import { Post } from '@/types';

export default defineComponent({
    name: 'Post Container',
    components: { PostHeader },
    props: { post: Object as PropType<Post> },
});
</script>
