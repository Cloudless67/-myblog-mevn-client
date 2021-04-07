<template>
    <header>
        <div class="d-flex justify-content-between">
            <router-link class="fw-bold" :to="`/${post.category}`"
                >{{ post.category }}
            </router-link>
            <post-tags :tags="post.tags" />
        </div>
        <h1 class="fw-bold mb-2">
            {{ post.title }}
        </h1>
        <time class="post-time">{{ post.writtenTime }}</time>
        <hr />
    </header>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import PostTags from '@/components/PostTags.vue';
import Post from '@/Post';

@Options({
    name: 'Post Header',
    components: {
        PostTags,
    },
    props: {
        post: Object,
    },
})
export default class PostHeader extends Vue {
    post!: Post;
}
</script>
