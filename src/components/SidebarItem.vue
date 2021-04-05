<template>
    <div>
        <div>
            <toggle-button @toggled="toggle" />
            <router-link :to="`/category/${name}`">{{ name }}</router-link>
        </div>
        <ul class="nav flex-column text-start" v-if="children && pressed">
            <li
                :class="'nav-item nav-link p-0 mt-1'"
                v-for="category in children"
                :key="category.name"
            >
                <sidebar-item
                    class="branch"
                    v-if="typeof category === 'object'"
                    :name="category.name"
                    :isTopLevel="category.isTopLevel"
                    :children="category.children"
                />
                <router-link v-else :to="`/category/${category}`">{{ category }}</router-link>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import ToggleButton from '@/components/ToggleButton.vue';

@Options({
    components: {
        ToggleButton,
    },
    props: {
        name: String,
        isTopLevel: Boolean,
        children: Array,
    },
})
export default class SidebarItem extends Vue {
    name!: string;
    isTopLevel!: boolean;
    children!: Array<string | SidebarItem>;
    pressed: boolean = false;

    toggle(state: boolean) {
        this.pressed = state;
    }
}
</script>

<style lang="scss" scoped>
a {
    color: black;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
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
        border-left: 1px solid #000;
    }
}

li {
    &::before {
        width: 8px;
        height: 0;
        border-top: 1px solid;
        margin-top: -1px;
        top: 12px;
        left: -10px;
    }

    &:last-child::before {
        width: 8px;
        height: 100%;
        border-left: 1px solid #fff;
    }
}

.branch::before {
    top: 12px;
    bottom: -4px;
    left: -10px;
    border-left: 1px solid #fff;
}
</style>
