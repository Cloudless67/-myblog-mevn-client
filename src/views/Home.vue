<template>
    <div class="container my-3">
        <div class="row">
            <PostList class="col-md" msg="Welcome to Your Vue.js + TypeScript App" />
            <Sidebar class="col-md-3" />
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import PostList from '@/components/PostList.vue';
import Sidebar from '@/components/Sidebar.vue';

@Options({
    components: {
        PostList,
        Sidebar,
    },
})
export default class Home extends Vue {}
</script>
