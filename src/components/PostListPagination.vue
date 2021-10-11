<template>
    <nav class="mt-3">
        <ul class="pagination justify-content-center">
            <li
                v-for="i in maxIndex"
                :key="i"
                class="page-item hover-cursor-pointer"
                :class="{ active: isSelected(i) }"
                @click="changeIndex(i)"
            >
                <span class="page-link">{{ i }}</span>
            </li>
        </ul>
    </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'PostListPagination',
    props: { maxIndex: { type: Number, default: 1 } },
    computed: {
        index(): number {
            return Number(this.$route.query.page || 1);
        },
    },
    methods: {
        isSelected(i: number) {
            return i == this.index;
        },
        changeIndex(index: number) {
            this.$router.push({ query: { page: index !== 1 ? index : undefined } });
        },
    },
});
</script>
