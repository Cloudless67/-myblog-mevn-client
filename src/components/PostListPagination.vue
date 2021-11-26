<template>
    <nav class="mt-3">
        <ul class="pagination justify-content-center">
            <li
                v-show="indexOfPagination > 0"
                class="page-item hover-cursor-pointer"
                @click="changeIndex(indexOfPagination * 10)"
            >
                <span class="page-link">&laquo;</span>
            </li>
            <li
                v-for="i in Math.min(10, maxIndex - indexOfPagination * 10)"
                :key="indexOfPagination * 10 + i"
                class="page-item hover-cursor-pointer"
                :class="{ active: isSelected(indexOfPagination * 10 + i) }"
                @click="changeIndex(indexOfPagination * 10 + i)"
            >
                <span class="page-link">{{ indexOfPagination * 10 + i }}</span>
            </li>
            <li
                v-show="Math.floor((maxIndex - 1) / 10) * 10 >= index"
                class="page-item hover-cursor-pointer"
                @click="changeIndex(indexOfPagination * 10 + 11)"
            >
                <span class="page-link">&raquo;</span>
            </li>
        </ul>
    </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'PostListPagination',
    props: { maxIndex: { type: Number, default: 1 } },
    data() {
        return {
            index: 1,
        };
    },
    computed: {
        indexOfPagination() {
            return Math.floor((this.index - 1) / 10);
        },
    },
    methods: {
        isSelected(i: number) {
            return i == this.index;
        },
        changeIndex(index: number) {
            this.index = index;
            this.$router.push({ query: { page: index !== 1 ? index : undefined } });
        },
    },
});
</script>
