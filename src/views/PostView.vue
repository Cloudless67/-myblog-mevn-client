<template>
    <div v-if="post && post.tags">
        <post-container :post="post" />
        <div v-if="login" class="d-flex justify-content-end">
            <router-link :to="`/update/${encodeURI(post.url)}`" class="btn btn-primary me-3"
                >수정</router-link
            >
            <div class="btn btn-primary" @click="deletePost">삭제</div>
        </div>
        <hr />
        <replies :replies="post.replies" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Post } from '@/types/post';
import PostContainer from '@/components/Post/PostContainer.vue';
import Replies from '@/components/Post/ReplyList.vue';
import { deletePost, getPost } from '@/lib/httpClient';
import isError from '@/types/error';

export default defineComponent({
    name: 'PostRoute',
    components: {
        PostContainer,
        Replies,
    },
    async beforeRouteEnter(to, from, next) {
        const post: Post = await getPost(to.params.title as string);
        // Using any due to issue: https://github.com/vuejs/vue-router-next/issues/701
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        next((vm: any) => vm.setPost(post));
    },
    data() {
        return {
            post: {} as Post,
        };
    },
    computed: {
        login() {
            return this.$store.state.login;
        },
    },
    methods: {
        setPost(post: Post) {
            this.post = post;
            document.title = post.title;

            this.setMetaContent('title', post.title);

            const firstHeading = post.body.indexOf('#');
            const end = Math.min(firstHeading > 0 ? firstHeading : 160, 160);
            const description = post.body.substring(0, end);
            this.setMetaContent('description', description);
        },
        setMetaContent(name: string, content: string) {
            const metaTag = document.querySelector(`meta[name=${name}]`);
            if (metaTag) {
                metaTag.setAttribute('content', content);
            } else {
                const meta = document.createElement('meta');
                meta.setAttribute('name', name);
                meta.setAttribute('content', content);
                document.head.appendChild(meta);
            }
        },
        async editPost() {
            this.$router.push({ path: '/update' });
        },
        async deletePost() {
            try {
                const res = await deletePost(this.post.url);
                if (res.status == 200) this.$router.push({ path: '/' });
                else alert(`${res.status}: ${res.statusText}`);
            } catch (error) {
                if (isError(error)) alert(error.message);
            }
        },
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
