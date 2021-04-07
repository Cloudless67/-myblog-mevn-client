<template>
    <div class="reply pb-2">
        <h6 class="fw-bold d-inline-block me-1">{{ reply.nickname }}</h6>
        <time class="reply-time text-black-50">{{ reply.writtenTime }}</time>
        <p class="reply-body ms-2">{{ reply.body }}</p>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Reply from '@/Reply';

@Options({
    name: 'Reply',
    props: {
        reply: Object,
    },
})
export default class PostListItem extends Vue {
    reply!: Reply;
}
</script>

<style lang="scss" scoped>
.reply-time {
    font-size: 0.8em;
}
</style>
