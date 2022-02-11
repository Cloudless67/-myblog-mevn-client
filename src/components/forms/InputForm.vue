<template>
    <div>
        <label :for="name" class="form-label">{{ label }}</label>
        <input
            :id="name"
            :value="modelValue"
            class="form-control"
            :type="type"
            :disabled="disabled"
            @input="$emit('update:modelValue', $event.target.value)"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'InputForm',
    props: {
        name: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            default: 'text',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        modelValue: {
            type: [String, Number],
            required: true,
        },
    },
    emits: ['update:modelValue'],
});
</script>
