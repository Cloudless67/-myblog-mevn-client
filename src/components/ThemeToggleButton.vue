<template>
    <div class="theme-toggle-container">
        <i class="fas fa-moon"></i>
        <i class="fas fa-sun"></i>
        <div :class="`theme-toggle-switch theme-toggle-${state ? 'light' : 'dark'}`"></div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ThemeToggleButton',
    props: {
        state: {
            type: Boolean,
            required: true,
        },
    },
});
</script>

<style lang="scss" scoped>
.theme-toggle-container {
    position: relative;
    background: var(--inverse-color);
    width: 48px;
    height: 24px;
    border-radius: 12px;
}

.theme-toggle-switch {
    position: absolute;
    width: 20px;
    height: 20px;
    top: 2px;
    left: 2px;
    border-radius: 50%;
    background: white;
    transition: all 0.2s ease-in-out;
}

.theme-toggle-dark {
    transform: translateX(24px);
    background: var(--bs-light);
}

.fas {
    position: absolute;
    font-size: 16px;
    color: black;
    top: 4px;
}

.fa-sun {
    right: 4px;
    color: yellow;
}

.fa-moon {
    left: 4px;
    color: black;
}
</style>
