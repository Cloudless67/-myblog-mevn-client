<template>
    <button
        type="button"
        class="btn p-0 me-1 mb-1"
        :aria-state="state"
        autocomplete="off"
        @click="toggled"
    >
        <img :src="icon" width="22" height="22" />
    </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ToggleButton',
    emits: ['toggled'],
    data() {
        return { state: false };
    },
    computed: {
        icon() {
            const btnColor = document.documentElement.classList.contains('dark-mode')
                ? 'white'
                : 'black';

            return this.state
                ? require(`@/assets/minus-${btnColor}.svg`)
                : require(`@/assets/plus-${btnColor}.svg`);
        },
    },
    methods: {
        toggled() {
            this.state = !this.state;
            this.$emit('toggled', this.state);
        },
    },
});
</script>

<style lang="scss" scoped>
.btn {
    position: relative;
    color: var(--text-color);
    width: 24px;
    height: 24px;

    &:hover {
        color: var(--text-color);
    }
}
</style>
