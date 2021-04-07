<template>
    <main-with-sidebar>
        <post-list />
    </main-with-sidebar>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import MainWithSidebar from '@/components/MainWithSidebar.vue';
import PostList from '@/components/PostList.vue';

@Options({
    name: 'HomeView',
    components: {
        MainWithSidebar,
        PostList,
    },
})
export default class HomeView extends Vue {}
</script>
