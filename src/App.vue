<template>
    <the-navbar :login="login" @logout="logout()" />
    <section class="container my-4">
        <main-with-sidebar>
            <router-view @login="login = true" :loggedIn="login" />
        </main-with-sidebar>
    </section>
    <router-link to="/write" class="btn btn-primary" id="write-button">글쓰기</router-link>
    <the-footer />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TheNavbar from '@/components/TheNavbar.vue'; // @ is an alias to /src
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
            login: localStorage.getItem('token') !== undefined,
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

a {
    color: black;
    text-decoration: none;

    &:hover {
        color: inherit;
        text-decoration: underline;
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
