<template>
    <div class="main-inner justify-content-center text-start">
        <h1 class="fw-bold">{{ title }}</h1>
        <div class="post-list">
            <post-list-item v-for="post in posts" :key="post._id" :post="post" />
        </div>
        <nav class="text-center mt-3">
            <span
                class="px-2"
                :class="{
                    'bg-gray-500': isSelected(i),
                    'text-danger': isSelected(i),
                    'border-end': i != maxIndex,
                }"
                v-for="i in maxIndex"
                :key="i"
                @click="changeIndexAndEmit(i)"
            >
                {{ i }}
            </span>
        </nav>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PostListItem from '@/components/PostListItem.vue';

const maxPostPerPage = 10;

export default defineComponent({
    name: 'Post List',
    components: {
        PostListItem,
    },
    emits: ['changeIndex'],
    props: {
        posts: Array,
        totalLength: Number,
    },
    data() {
        return {
            index: 1,
        };
    },
    watch: {
        title() {
            this.index = 1;
        },
    },
    computed: {
        title(): string {
            return (this.$route.params.category as string) || '전체 글';
        },
        maxIndex(): number {
            return Math.ceil(this.totalLength! / maxPostPerPage);
        },
    },
    methods: {
        isSelected(i: number) {
            return i == this.index;
        },
        changeIndexAndEmit(i: number) {
            this.index = i;
            this.$emit('changeIndex', i);
        },
    },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
    margin: 40px 0 0;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}

.bg-gray-500 {
    background: #eee;
}
</style>
