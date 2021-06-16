<template>
    <div class="reply p-1 mb-2">
        <h6 class="fw-bold d-inline-block me-1">{{ reply.nickname }}</h6>
        <time class="reply-time text-black-50">{{ formatDateTime(reply.writtenTime) }}</time>
        <span class="position-relative float-end">
            <i class="fas fa-trash-alt pointer-on-hover" @click="onDeleteClick"></i>
            <form class="position-absolute border shadow p-1" v-show="showPasswordForm">
                <div>
                    <div class="input-group">
                        <input
                            type="password"
                            class="form-control"
                            placeholder="Password"
                            aria-label="Reply password"
                            aria-describedby="password of reply"
                            v-model="password"
                        />
                        <button
                            class="btn btn-primary"
                            type="submit"
                            @click.prevent="onReplyPasswordSubmit"
                        >
                            삭제
                        </button>
                    </div>
                </div>
            </form>
        </span>
        <p class="reply-body ms-2">{{ reply.body }}</p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import dayjs, { Dayjs } from 'dayjs';

export default defineComponent({
    name: 'Reply Item',
    props: { reply: Object },
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
                    const res = await forceDeleteReply(postUrl, this.reply!._id);
                    this.handleResponse(res);
                }
            } else {
                this.showPasswordForm = !this.showPasswordForm;
            }
        },
        async onReplyPasswordSubmit() {
            const postUrl = this.$route.params.title as string;
            const res = await deleteReply(postUrl, this.reply!._id, this.password);

            this.handleResponse(res);
        },
        async handleResponse(res: Response) {
            if (res.status === 200) {
                this.$emit('removed', this.reply!._id);
            } else {
                alert(await res.text());
            }
        },
        formatDateTime(dateTime: string) {
            const dt = dayjs(dateTime);
            const now = dayjs();
            const isSameDay = (day1: Dayjs, day2: Dayjs) =>
                day1.startOf('date').isSame(day2.startOf('date'));

            if (isSameDay(dt, now)) {
                return dt.format('HH:mm');
            } else {
                return dt.format('MM.DD');
            }
        },
    },
});

async function forceDeleteReply(postUrl: string, replyID: string) {
    return await fetch(`/api/post/${postUrl}/reply/${replyID}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
}

async function deleteReply(postUrl: string, replyID: string, password: string) {
    return await fetch(`/api/post/${postUrl}/reply/${replyID}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
    });
}
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
