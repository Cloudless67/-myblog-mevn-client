<template>
    <div class="tags">
        <router-link
            class="btn btn-outline-primary fs-6 rounded-pill mx-1 py-0"
            :to="`/tags/${tag}`"
            v-for="tag in tags"
            :key="tag"
            >{{ tag }}</router-link
        >
    </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import { Options, Vue } from 'vue-class-component';

@Options({
    name: 'Post Tags',
    props: {
        tags: Array,
    },
})
export default class PostTags extends Vue {
    tags!: string[];
}
</script>
