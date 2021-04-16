<template>
    <div class="main-inner justify-content-center text-start" v-if="post">
        <post-container :post="post" />
        <hr />
        <replies :replies="post.replies" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PostContainer from '@/components/PostContainer.vue';
import { Post } from '@/types';
import Replies from '@/components/ReplyList.vue';

export default defineComponent({
    name: 'Post Route',
    components: {
        PostContainer,
        Replies,
    },
    data() {
        return {
            post: {} as Post,
        };
    },
    methods: {
        setPost(post: Post) {
            this.post = post;
        },
    },
    async beforeRouteEnter(to, from, next) {
        const baseUrl = `/api/post/${to.params.title}`;
        const post: Post = await fetch(baseUrl).then(res => res.json());
        next((vm: any) => vm.setPost(post));
    },
});
</script>

<style lang="scss" scoped>
header {
    position: relative;
}

.post-time {
    position: absolute;
    right: 0;
    bottom: 5px;
    font-size: 0.9em;
    color: gray;
}
</style>
