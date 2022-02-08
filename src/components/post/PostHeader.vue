<template>
    <header class="position-relative">
        <div class="d-flex justify-content-between">
            <RouterLink :to="`/${post.category}`">{{ post.category }} </RouterLink>
            <PostTags :tags="post.tags" />
        </div>
        <h1 class="mb-2">
            {{ post.title }}
        </h1>
        <time class="post-time position-absolute end-0 bottom-0">{{
            formatDateTime(post.writtenTime)
        }}</time>
        <hr />
    </header>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import PostTags from '@/components/post/PostTags.vue';
import { Post } from '@/types/post';
import dayjs from 'dayjs';

export default defineComponent({
    name: 'PostHeader',
    components: { PostTags },
    props: { post: { type: Object as PropType<Post>, required: true } },
    methods: {
        formatDateTime(dateTime: string) {
            return dayjs(dateTime).format('YYYY. MM. DD');
        },
    },
});
</script>
