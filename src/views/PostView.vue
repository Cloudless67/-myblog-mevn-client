<template>
    <div v-if="post">
        <post-container :post="post" />
        <div class="d-flex justify-content-end" v-if="login">
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
import PostContainer from '@/components/Post/PostContainer.vue';
import Replies from '@/components/Post/ReplyList.vue';
import { Post } from '@/types';

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
                const res = await fetch(`/api/post/${this.post.url}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (res.status == 200) this.$router.push({ path: '/' });
                else alert(`${res.status}: ${res.statusText}`);
            } catch (error) {
                alert(error.message);
            }
        },
    },
    async beforeRouteEnter(to, from, next) {
        const baseUrl = `/api/post/${to.params.title}`;
        const headers = localStorage.getItem('token')
            ? { Authorization: `Bearer ${localStorage.getItem('token')}` }
            : undefined;
        const post: Post = await fetch(baseUrl, { headers }).then(res => res.json());
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
