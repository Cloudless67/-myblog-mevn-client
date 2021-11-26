<template>
    <nav class="mt-3">
        <ul class="pagination justify-content-center">
            <li v-show="firstOf10s > 1" class="page-item hover-cursor-pointer">
                <span class="page-link">&laquo;</span>
            </li>
            <li
                v-for="i in 10"
                :key="i"
                class="page-item hover-cursor-pointer"
                :class="{ active: isSelected(firstOf10s + i - 1) }"
                @click="changeIndex(firstOf10s + i - 1)"
            >
                <span class="page-link">{{ i }}</span>
            </li>
            <li
                v-show="Math.floor((x - 1) / 10) * 10 >= index"
                class="page-item hover-cursor-pointer"
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
            x: 30,
        };
    },
    computed: {
        firstOf10s() {
            console.log(this.index);
            return Math.floor((this.index - 1) / 10) + 1;
        },
    },
    methods: {
        isSelected(i: number) {
            return i == this.index;
        },
        changeIndex(index: number) {
            this.index = index;
            //this.$router.push({ query: { page: index !== 1 ? index : undefined } });
        },
    },
});
</script>
