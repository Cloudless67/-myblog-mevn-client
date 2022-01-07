<template>
    <div class="row">
        <main class="col-lg-9">
            <slot></slot>
            <div class="dummy"></div>
        </main>
        <the-sidebar class="col-lg-3" />
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
