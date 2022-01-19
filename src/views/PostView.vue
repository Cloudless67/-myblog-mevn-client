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
    <LoadingSkeleton v-else />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PostContainer from '@/components/post/PostContainer.vue';
import Replies from '@/components/post/ReplyList.vue';
import LoadingSkeleton from '@/components/LoadingSkeleton.vue';
import { deletePost, getPost } from '@/lib/httpClient';
import { Post } from '@/types/post';
import isError from '@/types/error';

export default defineComponent({
    name: 'PostRoute',
    components: {
        PostContainer,
        Replies,
        LoadingSkeleton,
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
    async mounted() {
        const post = await getPost(this.$route.params.title as string);
        this.setPost(post);
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
