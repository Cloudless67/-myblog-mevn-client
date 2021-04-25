<template>
    <div class="main-inner justify-content-center text-start" v-if="post">
        <post-container :post="post" />
        <div class="d-flex justify-content-end" v-if="loggedIn">
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
    props: { loggedIn: Boolean },
    data() {
        return {
            post: {} as Post,
        };
    },
    methods: {
        setPost(post: Post) {
            this.post = post;
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
