<template>
    <nav class="navbar navbar-expand navbar-dark bg-primary p-0">
        <div class="container">
            <router-link class="navbar-brand" to="/">
                <img id="logo" src="../assets/logo-white.png" alt="Logo" height="" />
            </router-link>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto fs-4">
                    <li class="nav-item d-none d-md-block">
                        <router-link class="nav-link active fw-bold" aria-current="page" to="/"
                            >Cloudless' Blog</router-link
                        >
                    </li>
                </ul>
            </div>
            <div class="d-flex fs-5 text-white">
                <a href="#" class="text-white" v-if="login" @click.prevent="logout">logout</a>
                <router-link to="/login" v-else>
                    <span class="text-white">login</span>
                </router-link>
                <a
                    href="https://github.com/Cloudless67"
                    target="_blank"
                    class="text-white ms-3"
                    rel="noopener noreferrer"
                    ><i class="fab fa-github"></i
                ></a>
            </div>
        </div>
    </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { logout } from '@/types/mutations';

export default defineComponent({
    name: 'Navbar',
    computed: {
        login() {
            return this.$store.state.login;
        },
    },
    methods: {
        logout() {
            if (localStorage.getItem('token')) {
                localStorage.removeItem('token');
            }
            this.$store.commit(logout);
        },
    },
});
</script>
