<template>
    <ul class="sidebar nav flex-column text-start">
        <div class="sidebar-inner">
            <span class="ms-3 fs-3 fw-bold">게시판</span>
            <li
                class="nav-item nav-link ps-3 py-0 my-1"
                v-for="category in categories"
                :key="category.name || category"
            >
                <sidebar-item :name="category.name || category" :children="category.children" />
            </li>
        </div>
    </ul>
</template>

<script lang="ts">
import SidebarItem from '@/components/SidebarItem.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'The Sidebar',
    components: { SidebarItem },
    data() {
        return {
            categories: [],
        };
    },
    async created() {
        console.log('hi');
        const res = await fetch('/api/categories');
        this.categories = await res.json();
    },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#logo {
    width: 3rem;
    height: 3rem;
}

.sidebar {
    height: fit-content;
}
</style>
