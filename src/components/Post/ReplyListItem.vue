<template>
    <div class="reply p-1 mb-2">
        <h6 class="fw-bold d-inline-block me-1">{{ reply.nickname }}</h6>
        <time class="reply-time">{{ formatDateTime(reply.writtenTime) }}</time>
        <span class="position-relative float-end">
            <i class="fas fa-trash-alt hover-cursor-pointer" @click="onDeleteClick"></i>
            <form v-show="showPasswordForm" class="position-absolute border shadow p-1">
                <div class="input-group">
                    <input
                        v-model="password"
                        class="form-control"
                        type="password"
                        placeholder="Password"
                        aria-label="Reply password"
                        aria-describedby="password of reply"
                    />
                    <button
                        class="btn btn-primary"
                        type="submit"
                        @click.prevent="onReplyPasswordSubmit"
                    >
                        삭제
                    </button>
                </div>
            </form>
        </span>
        <p class="reply-body ms-2">{{ reply.body }}</p>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { deleteReply, forceDeleteReply } from '@/lib/httpClient';
import dayjs, { Dayjs } from 'dayjs';
import { Reply } from '@/types/reply';

export default defineComponent({
    name: 'ReplyItem',
    props: { reply: { type: Object as PropType<Reply>, required: true } },
    emits: ['removed'],
    data() {
        return {
            showPasswordForm: false,
            password: '',
        };
    },
    methods: {
        async onDeleteClick() {
            const login = this.$store.state.login;
            const postUrl = this.$route.params.title as string;

            if (login) {
                if (window.confirm('Delete reply?')) {
                    const res = await forceDeleteReply(postUrl, this.reply._id);
                    this.handleResponse(res);
                }
            } else {
                this.showPasswordForm = !this.showPasswordForm;
            }
        },
        async onReplyPasswordSubmit() {
            const postUrl = this.$route.params.title as string;
            const res = await deleteReply(postUrl, this.reply._id, this.password);

            this.handleResponse(res);
        },
        async handleResponse(res: Response) {
            if (res.status === 200) {
                this.$emit('removed', this.reply._id);
            } else {
                alert(await res.text());
            }
        },
        formatDateTime(dateTime: string) {
            const dt = dayjs(dateTime);

            if (this.isSameDay(dt, dayjs())) return dt.format('HH:mm');
            else return dt.format('MM.DD');
        },
        isSameDay(day1: Dayjs, day2: Dayjs) {
            return day1.startOf('date').isSame(day2.startOf('date'));
        },
    },
});
</script>

<style lang="scss" scoped>
.reply-time {
    font-size: 0.8em;
}

form {
    width: 20em;
    left: -18em;
}
</style>
