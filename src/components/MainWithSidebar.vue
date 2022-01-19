<template>
    <div class="row">
        <main class="col-lg-9">
            <slot></slot>
        </main>
        <TheSidebar class="col-lg-3" />
    </div>
</template>

<script lang="ts">
import TheSidebar from '@/components/TheSidebar.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'MainWithSidebar',
    components: { TheSidebar },
});
</script>
