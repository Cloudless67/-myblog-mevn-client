<template>
    <ul
        id="sidebar"
        class="flex-column text-start list-unstyled"
        @drop="drop($event)"
        @dragenter.prevent
        @dragover.prevent
    >
        <div class="d-flex flex-row align-items-center">
            <span class="ms-3 fs-3 fw-bold">게시판</span>
            <i
                id="edit-categories"
                class="fas fa-cog ms-2 hover-cursor-pointer"
                v-if="$store.state.login"
                @click="toggleEditState"
            ></i>
        </div>
        <li
            class="nav-item nav-link ps-3 py-0 my-1"
            v-for="category in categories"
            :key="category.name || category"
        >
            <sidebar-item
                :name="category.name || category"
                :children="category.children"
                :editing="editing"
                @structureChanged="onStructureChange"
            />
        </li>
        <form class="text-end" v-if="editing">
            <input class="form-control" type="text" v-model="categoryToAdd" />
            <button class="btn btn-primary" type="submit" @click.prevent="tryAddCategory">
                추가
            </button>
        </form>
    </ul>
</template>

<script lang="ts">
import SidebarItem from '@/components/SidebarItem.vue';
import { defineComponent } from 'vue';
import { postCategory, putCategory } from '@/lib/httpClient';

type Category = string | string[];

export default defineComponent({
    name: 'The Sidebar',
    components: { SidebarItem },
    data() {
        return {
            categories: [] as Category[],
            categoryToAdd: '',
            editing: false,
        };
    },
    methods: {
        toggleEditState() {
            this.editing = !this.editing;
        },
        onStructureChange(res: Category[]) {
            this.categories = res;
        },
        async tryAddCategory() {
            try {
                const res = await postCategory(this.categoryToAdd);
                if (res.status == 200) {
                    this.categories.push(this.categoryToAdd);
                    this.categoryToAdd = '';
                } else {
                    alert(await res.text());
                }
            } catch (error) {
                alert(error.message);
            }
        },
        async drop(event: Event) {
            event.stopPropagation();
            const droppedCategory = (event as DragEventInit).dataTransfer!.getData('category');
            try {
                const res = await putCategory(droppedCategory);
                this.onStructureChange(res);
            } catch (error) {
                alert(error.message);
            }
        },
    },
    async created() {
        const res = await fetch('/api/categories/structured');
        this.categories = await res.json();
    },
});
</script>

<style>
#sidebar {
    height: fit-content;
}
</style>
