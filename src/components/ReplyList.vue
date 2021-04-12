<template>
    <section class="replies" v-if="replies">
        <h3 class="fw-bold mb-3">Replies</h3>
        <reply-list-item v-for="reply in replies" :key="reply._id" :reply="reply" />
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
                    required
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
    </section>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import ReplyListItem from '@/components/ReplyListItem.vue';
import Reply from '@/Reply';

@Options({
    name: 'Replies',
    components: {
        ReplyListItem,
    },
    props: {
        replies: Array,
    },
})
export default class Replies extends Vue {
    replies!: Reply[];
}
</script>
