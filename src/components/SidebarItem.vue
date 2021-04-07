<template>
    <div>
        <div>
            <toggle-button v-if="children" @toggled="toggle" />
            <router-link :to="`/${name}`">{{ name }}</router-link>
        </div>
        <transition name="slide">
            <ul class="nav flex-column flex-nowrap text-start" v-if="children" v-show="pressed">
                <li
                    class="nav-item nav-link p-0 mt-1"
                    v-for="category in children"
                    :key="category.name"
                >
                    <sidebar-item
                        class="branch"
                        :name="category.name || category"
                        :children="category.children"
                    />
                </li>
            </ul>
        </transition>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import ToggleButton from '@/components/ToggleButton.vue';

@Options({
    name: 'SidebarItem',
    components: {
        ToggleButton,
    },
    props: {
        name: String,
        children: Array,
    },
})
export default class SidebarItem extends Vue {
    name!: string;
    children!: Array<string | SidebarItem>;
    pressed: boolean = false;

    toggle(state: boolean) {
        this.pressed = state;
    }
}
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
