<template>
    <ul class="sidebar nav flex-column text-start">
        <div class="sidebar-inner" @drop="drop($event)" @dragenter.prevent @dragover.prevent>
            <div class="d-flex flex-row align-items-center">
                <span class="ms-3 fs-3 fw-bold">게시판</span>
                <i
                    id="edit-categories"
                    class="fas fa-cog ms-2 pointer-on-hover"
                    v-if="login.value"
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
                <button class="btn btn-primary" type="submit" @click.prevent="addCategory">
                    추가
                </button>
            </form>
        </div>
    </ul>
</template>

<script lang="ts">
import SidebarItem from '@/components/SidebarItem.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'The Sidebar',
    components: { SidebarItem },
    inject: ['login'],
    data() {
        return {
            categories: [] as any[],
            categoryToAdd: '',
            editing: false,
        };
    },
    methods: {
        toggleEditState() {
            this.editing = !this.editing;
        },
        onStructureChange(res: any[]) {
            this.categories = res;
        },
        async addCategory() {
            const newCategory = { name: this.categoryToAdd };

            try {
                const res = await fetch('/api/category', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: JSON.stringify(newCategory),
                });

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
                const res = await fetch(`/api/category/${droppedCategory}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }).then(res => res.json());

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

<style lang="scss">
#logo {
    width: 3rem;
    height: 3rem;
}

.sidebar {
    height: fit-content;
}

.pointer-on-hover {
    &:hover {
        cursor: pointer;
    }
}
</style>
