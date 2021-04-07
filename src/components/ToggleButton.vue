<template>
    <button
        type="button"
        class="btn p-0 me-1 mb-1"
        :aria-state="state"
        autocomplete="off"
        @click="toggled"
    >
        <i :class="`fas fa-${icon}-square position-absolute top-0 start-0`"></i>
    </button>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({ name: 'Toggle Button' })
export default class ToggleButton extends Vue {
    state: boolean = false;

    get icon(): 'minus' | 'plus' {
        return this.state ? 'minus' : 'plus';
    }

    toggled() {
        this.state = !this.state;
        this.$emit('toggled', this.state);
    }
}
</script>

<style scoped>
.btn {
    position: relative;
    width: 1em;
    height: 1em;
}
</style>
