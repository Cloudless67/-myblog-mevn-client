<template>
    <div class="theme-toggle-container"><input type="checkbox" :checked="modelValue" /></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ThemeToggleButton',
    props: {
        modelValue: {
            type: Boolean,
            required: true,
        },
    },
    emits: ['update:modelValue'],
});
</script>
