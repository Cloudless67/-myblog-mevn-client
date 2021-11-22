<template>
    <div
        :class="{ 'hover-cursor-pointer': editing }"
        :draggable="editing"
        @dragstart.stop="dragStart($event.dataTransfer)"
        @drop.stop="drop($event.dataTransfer)"
        @dragenter.prevent
        @dragover.prevent
    >
        <div>
            <toggle-button v-if="children.length" @toggled="toggle" />
            <router-link v-if="!editing" :to="`/${name}`">{{ name }}</router-link>
            <span v-else>{{ name }}</span>
        </div>
        <transition name="slide">
            <ul
                v-if="children"
                v-show="pressed"
                class="flex-column flex-nowrap text-start list-unstyled"
            >
                <li
                    v-for="category in children"
                    :key="category.name"
                    class="nav-item nav-link p-0 mt-1"
                >
                    <sidebar-item
                        class="branch"
                        :name="category.name || category"
                        :children="category.children || []"
                        :editing="editing"
                        @structureChanged="$emit('structureChanged')"
                    />
                </li>
            </ul>
        </transition>
    </div>
</template>

<script lang="ts">
import ToggleButton from '@/components/ToggleButton.vue';
import { putCategory } from '@/lib/httpClient';
import { defineComponent } from 'vue';
import isError from '@/types/error';

export default defineComponent({
    name: 'SidebarItem',
    components: { ToggleButton },
    props: {
        name: { type: String, required: true },
        children: { type: Array, required: true },
        editing: Boolean,
    },
    emits: ['structureChanged'],
    data() {
        return {
            pressed: false,
        };
    },
    methods: {
        dragStart(dataTransfer: DataTransfer) {
            dataTransfer.dropEffect = 'move';
            dataTransfer.effectAllowed = 'move';
            dataTransfer.setData('category', this.name);
            console.log(`Dragging ${this.name}`);
        },
        async drop(dataTransfer: DataTransfer) {
            const droppedCategory = dataTransfer.getData('category');
            if (droppedCategory === this.name) return;
            console.log(`${droppedCategory} dropped to ${this.name}`);

            try {
                const res = await putCategory(droppedCategory, this.name);
                this.$emit('structureChanged', res);
            } catch (error) {
                if (isError(error)) alert(error.message);
            }
        },
        toggle(state: boolean) {
            this.pressed = state;
        },
    },
});
</script>

<style lang="scss" scoped>
.btn-placeholder {
    display: inline-block;
    width: 1em;
    height: 1em;
}

ul,
li {
    position: relative;

    &::before {
        content: '';
        display: block;
        position: absolute;
    }
}

ul {
    padding-left: 18px;

    &::before {
        top: 0;
        bottom: 0;
        left: 8px;
        border-left: 1px solid var(--text-color);
    }
}

li {
    padding-left: 2px !important;

    &::before {
        width: 10px;
        height: 0;
        border-top: 1px solid var(--text-color);
        margin-top: -1px;
        top: 12px;
        left: -10px;
    }

    &:last-child::before {
        width: 10px;
        height: 100%;
        border-left: 1px solid var(--inverse-color);
    }
}

.branch::before {
    top: 12px;
    bottom: -4px;
    left: -10px;
    border-left: 1px solid var(--inverse-color);
}

.slide-enter-active {
    transition: all 0.1s ease-in;
}

.slide-leave-active {
    transition: all 0.1s ease-out;
}

.slide-enter-to,
.slide-leave-from {
    max-height: 100px;
    overflow: hidden;
}

.slide-enter-from,
.slide-leave-to {
    overflow: hidden;
    max-height: 0;
}
</style>
