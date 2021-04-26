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
                    v-model="nickname"
                />
                <input
                    class="col-sm-6 form-control"
                    type="password"
                    id="reply-password"
                    placeholder="password"
                    required
                    v-model="password"
                />
            </div>
            <div class="input-group">
                <textarea class="form-control" id="reply-body" rows="3" v-model="body"></textarea>
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
        replies: Array as PropType<Reply[]>,
    },
    data() {
        return {
            nickname: '',
            password: '',
            body: '',
        };
    },
    methods: {
        async submitReply() {
            const url = `/api${this.$route.fullPath}/reply`;
            const res = await fetch(url, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nickname: this.nickname,
                    password: this.password,
                    body: this.body,
                }),
            }).then(x => x.json());

            this.password = '';
            this.body = '';
            this.replies!.push(res);
        },
        removeReply(id: string) {
            this.replies?.splice(
                this.replies.findIndex((x: Reply) => x._id === id),
                1,
            );
        },
    },
});
</script>
