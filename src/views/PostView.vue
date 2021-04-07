<template>
    <main-with-sidebar>
        <div class="main-inner justify-content-center text-start" v-if="!loading">
            <post-container :post="post" />
            <hr />
            <reply-list :replies="post.replies" />
            <form
                class="container"
                :action="`localhost:3000/api${$route.fullPath}/reply`"
                method="POST"
            >
                <div class="row">
                    <input
                        class="col-sm-6"
                        type="text"
                        id="reply-nickname"
                        placeholder="닉네임"
                        v-model="replyNickname"
                    />
                    <input
                        class="col-sm-6"
                        type="password"
                        id="reply-password"
                        placeholder="password"
                        v-model="replyPassword"
                    />
                </div>
                <div class="row">
                    <textarea name="reply-body" rows="3" v-model="replyBody"></textarea>
                </div>
                <button
                    class="btn btn-primary float-end mt-1"
                    type="submit"
                    @click.prevent="submitReply()"
                >
                    등록
                </button>
            </form>
        </div>
    </main-with-sidebar>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import MainWithSidebar from '@/components/MainWithSidebar.vue';
import PostContainer from '@/components/PostContainer.vue';
import ReplyList from '@/components/ReplyList.vue';
import Post from '@/Post';

@Options({
    name: 'PostView',
    components: {
        MainWithSidebar,
        PostContainer,
        ReplyList,
    },
})
export default class PostView extends Vue {
    loading = true;
    post!: Post;

    async created() {
        await this.loadPost();

        this.$watch(
            () => this.$route,
            async () => {
                if (this.$route.path.startsWith('/post')) {
                    this.loading = true;
                    await this.loadPost();
                }
            },
        );
    }

    async loadPost() {
        const title = this.$route.params.title as string;
        const url = `http://localhost:3000/api/post/${title}`;
        this.post = await fetch(url, { mode: 'cors' }).then(res => res.json());
        console.log(this.post);
        this.loading = false;
    }
}
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
