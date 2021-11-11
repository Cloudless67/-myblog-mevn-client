<template>
    <div class="paragraph"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'LoadingSkeleton',
});
</script>

<style lang="scss" scoped>
.paragraph {
    display: block;
    width: 100%;
    height: 90vh;
}
</style>
