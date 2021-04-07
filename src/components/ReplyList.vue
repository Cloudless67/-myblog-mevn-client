<template>
    <section class="replies">
        <h3 class="fw-bold mb-3">Replies</h3>
        <reply-list-item v-for="reply in replies" :key="reply._id" :reply="reply" />
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
export default class ReplyList extends Vue {
    replies!: Reply[];
}
</script>
