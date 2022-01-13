<template>
    <div class="theme-toggle-container">
        <img src="@/assets/moon.svg" width="18" height="18" class="icon icon-moon" />
        <img src="@/assets/sun.svg" width="18" height="18" class="icon icon-sun" />
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

.icon {
    position: absolute;
    color: black;
    top: 4px;
}

.icon-sun {
    right: 4px;
}

.icon-moon {
    left: 4px;
}
</style>
