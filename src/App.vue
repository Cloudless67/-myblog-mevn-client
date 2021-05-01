<template>
    <the-navbar @logout="logout()" />
    <section class="container my-4">
        <main-with-sidebar>
            <transition name="fade" mode="out-in">
                <router-view @login="login = true" />
            </transition>
        </main-with-sidebar>
    </section>
    <router-link v-if="login" to="/write" class="btn btn-primary" id="write-button"
        >글쓰기</router-link
    >
    <the-footer />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import TheNavbar from '@/components/TheNavbar.vue';
import MainWithSidebar from '@/components/MainWithSidebar.vue';
import TheFooter from '@/components/TheFooter.vue';

export default defineComponent({
    name: 'App',
    components: {
        TheNavbar,
        MainWithSidebar,
        TheFooter,
    },
    data() {
        return {
            login: localStorage.getItem('token') !== null,
        };
    },
    provide() {
        return {
            login: computed(() => this.login),
        };
    },
    methods: {
        logout() {
            if (localStorage.getItem('token')) {
                localStorage.removeItem('token');
            }
            this.login = false;
        },
    },
});
</script>

<style lang="scss">
#app {
    height: 100vh;
    display: flex;
    flex-direction: column;

    & > nav,
    & > footer {
        flex: 0 0 0%;
    }
    & > section {
        flex: 1 0 auto;
    }
}

img {
    max-width: 100%;
}

#write-button {
    position: fixed;
    bottom: 60px;
    right: 40px;
}
</style>
