<template>
    <nav class="mt-3">
        <ul class="pagination justify-content-center">
            <li
                v-show="paginationStartPage > 0"
                class="page-item hover-cursor-pointer"
                @click="changeIndex(paginationStartPage)"
            >
                <span class="page-link">&laquo;</span>
            </li>
            <li
                v-for="i in Math.min(10, totalPage - paginationStartPage)"
                :key="paginationStartPage + i"
                class="page-item hover-cursor-pointer"
                :class="{ active: isSelected(paginationStartPage + i) }"
                @click="changeIndex(paginationStartPage + i)"
            >
                <span class="page-link">{{ paginationStartPage + i }}</span>
            </li>
            <li
                v-show="Math.floor((totalPage - 1) / 10) * 10 >= page"
                class="page-item hover-cursor-pointer"
                @click="changeIndex(paginationStartPage + 11)"
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
    props: { totalPage: { type: Number, default: 1 } },
    computed: {
        page(): number {
            return Number(this.$route.query.page) || 1;
        },
        paginationStartPage() {
            return Math.floor((this.page - 1) / 10) * 10;
        },
    },
    methods: {
        isSelected(i: number) {
            return i == this.page;
        },
        changeIndex(index: number) {
            this.$router.push({ query: { page: index !== 1 ? index : undefined } });
        },
    },
});
</script>
