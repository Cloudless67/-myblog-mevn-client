<template>
    <section class="replies" v-if="replies">
        <h3 class="fw-bold mb-3">Replies</h3>
        <reply-list-item
            v-for="reply in replies"
            :key="reply._id"
            :reply="reply"
            @removed="removeReply"
        />
        <form>
            <div class="input-group">
                <input
                    class="col-sm-6 form-control"
                    type="text"
                    id="reply-nickname"
                    placeholder="닉네임"
                    v-model="replyFormData.nickname"
                />
                <input
                    class="col-sm-6 form-control"
                    type="password"
                    id="reply-password"
                    placeholder="password"
                    required
                    v-model="replyFormData.password"
                />
            </div>
            <div class="input-group">
                <textarea
                    class="form-control"
                    id="reply-body"
                    rows="3"
                    v-model="replyFormData.body"
                ></textarea>
                <button class="btn btn-primary" type="submit" @click.prevent="submitReply()">
                    등록
                </button>
            </div>
        </form>
    </section>
</template>

<script lang="ts">
import ReplyListItem from '@/components/Post/ReplyListItem.vue';
import { Reply } from '@/types';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
    name: 'Replies',
    components: { ReplyListItem },
    props: {
        replies: { type: Array as PropType<Reply[]>, required: true },
    },
    data() {
        return {
            replyFormData: {
                nickname: '',
                password: '',
                body: '',
            },
        };
    },
    methods: {
        async submitReply() {
            const url = `/api${this.$route.fullPath}/reply`;
            const newReply = await fetch(url, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.replyFormData),
            }).then(res => res.json());

            this.resetSubmitForm();
            this.replies.push(newReply);
        },
        removeReply(id: string) {
            this.replies.splice(
                this.replies.findIndex(reply => reply._id === id),
                1,
            );
        },
        resetSubmitForm() {
            this.replyFormData.password = '';
            this.replyFormData.body = '';
        },
    },
});
</script>
