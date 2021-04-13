<template>
    <main-with-sidebar>
        <div class="main-inner justify-content-center text-start" v-if="post">
            <post-container :post="post" />
            <hr />
            <replies :replies="post.replies" />
        </div>
    </main-with-sidebar>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MainWithSidebar from '@/components/MainWithSidebar.vue';
import PostContainer from '@/components/PostContainer.vue';
import { Post } from '@/types';
import Replies from '@/components/ReplyList.vue';

export default defineComponent({
    name: 'Post Route',
    components: {
        MainWithSidebar,
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
        console.log('Post View' + to.fullPath);

        const baseUrl = `http://localhost:3000/api/post/${to.params.title}`;

        const post: Post = await fetch(baseUrl, { mode: 'cors' }).then(res => res.json());
        console.log(post);
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
