<template>
    <the-navbar />
    <section class="container my-4">
        <main-with-sidebar>
            <router-view />
        </main-with-sidebar>
    </section>
    <router-link v-if="login" to="/write" class="btn btn-primary" id="write-button"
        >글쓰기</router-link
    >
    <the-footer />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
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
    computed: {
        login() {
            return this.$store.state.login;
        },
    },
    mounted() {
        if (localStorage.getItem('token')) {
            this.$store.commit('login');
        } else {
            this.$store.commit('logout');
        }
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
