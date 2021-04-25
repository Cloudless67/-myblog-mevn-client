<template>
    <div class="row">
        <main class="col-lg-9">
            <slot></slot>
        </main>
        <the-sidebar :login="login" class="col-lg-3" />
    </div>
</template>

<script lang="ts">
import TheSidebar from '@/components/TheSidebar.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Main with Sidebar',
    components: { TheSidebar },
    props: { login: Boolean },
});
</script>
