<template>
    <li class="pb-3 pt-3 border-bottom">
        <router-link :to="`/post/${encodeURI(post.url)}`">
            <small class="float-end">조회 {{ post.views }} | 댓글 {{ post.repliesNum }}</small>
            <h4 class="fw-bold text-black">{{ post.title }}</h4>
            <p class="text-black-50 lh-sm m-0 overflow-hidden">{{ post.preview }}</p>
        </router-link>
    </li>
</template>

<script lang="ts">
import { PostPreview } from '@/types';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
    name: 'Post List Item',
    props: {
        post: Object as PropType<PostPreview>,
    },
});
</script>
