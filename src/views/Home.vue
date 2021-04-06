<template>
    <div class="container row">
        <post-list class="col-md-9" />
        <the-sidebar class="col-md-3" />
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import PostList from '@/components/PostList.vue';
import TheSidebar from '@/components/TheSidebar.vue';

@Options({
    name: 'Home',
    components: {
        PostList,
        TheSidebar,
    },
})
export default class Home extends Vue {}
</script>
