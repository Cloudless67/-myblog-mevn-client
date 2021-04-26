<template>
    <header class="position-relative">
        <div class="d-flex justify-content-between">
            <router-link class="fw-bold" :to="`/${post.category}`"
                >{{ post.category }}
            </router-link>
            <post-tags :tags="post.tags" />
        </div>
        <h1 class="fw-bold mb-2">
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
import PostTags from '@/components/Post/PostTags.vue';
import { Post } from '@/types';
import { DateTime } from 'luxon';

export default defineComponent({
    name: 'Post Header',
    components: { PostTags },
    props: { post: Object as PropType<Post> },
    methods: {
        formatDateTime(dateTime: string) {
            return DateTime.fromISO(dateTime).toLocaleString();
        },
    },
});
</script>
