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

export default defineComponent({
    name: 'Post Tags',
    props: {
        tags: {
            type: Array,
            required: true,
        },
    },
});
</script>
