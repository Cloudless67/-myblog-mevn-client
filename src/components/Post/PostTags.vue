<template>
    <div class="tags">
        <router-link
            v-for="tag in tags"
            :key="tag"
            class="btn btn-outline-primary fs-6 rounded-pill mx-1 py-0"
            :to="`/tags/${tag}`"
            >{{ tag }}</router-link
        >
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'PostTags',
    props: {
        tags: {
            type: Array,
            required: true,
        },
    },
});
</script>
