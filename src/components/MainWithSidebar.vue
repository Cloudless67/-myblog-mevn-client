<template>
    <div class="row">
        <main class="col-lg-9">
            <slot></slot>
        </main>
        <the-sidebar class="col-lg-3" />
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import TheSidebar from '@/components/TheSidebar.vue';

@Options({
    name: 'Main with Sidebar',
    components: {
        TheSidebar,
    },
})
export default class MainWithSidebar extends Vue {}
</script>
