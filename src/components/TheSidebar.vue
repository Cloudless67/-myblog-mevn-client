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
                v-if="$store.state.login"
                id="edit-categories"
                class="fas fa-cog ms-2 hover-cursor-pointer"
                @click="toggleEditState"
            ></i>
        </div>
        <li
            v-for="category in categories"
            :key="getCategoryName(category)"
            class="nav-item nav-link ps-3 py-0 my-1"
        >
            <sidebar-item
                :name="getCategoryName(category)"
                :children="getCategoryChildren(category)"
                :editing="editing"
                @structureChanged="onStructureChange"
            />
        </li>
        <form v-if="editing" class="text-end">
            <input v-model="categoryToAdd" class="form-control" type="text" />
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
import Category from '@/types/category';

export default defineComponent({
    name: 'TheSidebar',
    components: { SidebarItem },
    data() {
        return {
            categories: [] as Category[],
            categoryToAdd: '',
            editing: false,
        };
    },
    async created() {
        const res = await fetch('/api/categories/structured');
        this.categories = await res.json();
    },
    methods: {
        getCategoryName(category: Category) {
            return typeof category === 'string' ? category : category.name;
        },
        getCategoryChildren(category: Category) {
            return typeof category === 'string' ? [] : category.children;
        },
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
        async drop(event: DragEvent) {
            event.stopPropagation();
            const droppedCategory = event.dataTransfer?.getData('category');
            if (droppedCategory === undefined) return;

            try {
                const res = await putCategory(droppedCategory);
                this.onStructureChange(res);
            } catch (error) {
                alert(error.message);
            }
        },
    },
});
</script>

<style>
#sidebar {
    height: fit-content;
}
</style>
