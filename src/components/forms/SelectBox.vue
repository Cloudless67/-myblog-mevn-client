<template>
    <select
        :value="modelValue"
        class="form-select"
        @input="$emit('update:modelValue', $event.target.value)"
    >
        <option v-for="(item, idx) in items" :key="`${item}-${idx}`" :value="item">
            {{ item }}
        </option>
    </select>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
    name: 'SelectBox',
    props: {
        items: {
            type: Array as PropType<string[]>,
            required: true,
        },
        modelValue: {
            type: String,
            required: true,
        },
    },
    emits: ['update:modelValue'],
});
</script>
