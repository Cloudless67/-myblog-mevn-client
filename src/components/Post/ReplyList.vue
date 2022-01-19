<template>
    <section v-if="replies" class="replies">
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
                    id="reply-nickname"
                    v-model="replyFormData.nickname"
                    class="col-sm-6 form-control"
                    placeholder="닉네임"
                    type="text"
                />
                <input
                    id="reply-password"
                    v-model="replyFormData.password"
                    class="col-sm-6 form-control"
                    placeholder="password"
                    type="password"
                    required
                />
            </div>
            <div class="input-group">
                <textarea
                    id="reply-body"
                    v-model="replyFormData.body"
                    class="form-control"
                    rows="3"
                ></textarea>
                <button class="btn btn-primary" type="submit" @click.prevent="submitReply()">
                    등록
                </button>
            </div>
        </form>
    </section>
</template>

<script lang="ts">
import ReplyListItem from '@/components/post/ReplyListItem.vue';
import { Reply } from '@/types/reply';
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
            }).then((res) => res.json());

            this.resetSubmitForm();
            // eslint-disable-next-line vue/no-mutating-props
            this.replies.push(newReply);
        },
        removeReply(id: string) {
            // eslint-disable-next-line vue/no-mutating-props
            this.replies.splice(
                this.replies.findIndex((reply) => reply._id === id),
                1
            );
        },
        resetSubmitForm() {
            this.replyFormData.password = '';
            this.replyFormData.body = '';
        },
    },
});
</script>
