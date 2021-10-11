<template>
    <button
        type="button"
        class="btn p-0 me-1 mb-1"
        :aria-state="state"
        autocomplete="off"
        @click="toggled"
    >
        <i class="fas position-absolute top-0 start-0" :class="`fa-${icon}-square`"></i>
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
        icon(): 'minus' | 'plus' {
            return this.state ? 'minus' : 'plus';
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
    width: 1em;
    height: 1em;

    &:hover {
        color: var(--text-color);
    }
}
</style>
