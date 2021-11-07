<template>
    <nav class="navbar navbar-expand navbar-dark bg-primary p-0">
        <div class="container">
            <router-link class="navbar-brand" to="/">
                <img id="logo" src="../assets/logo-white.png" alt="Logo" height="" />
            </router-link>
            <div id="navbarSupportedContent" class="collapse navbar-collapse">
                <ul class="navbar-nav me-auto fs-4">
                    <li class="nav-item d-none d-md-block">
                        <router-link class="nav-link active fw-bold" aria-current="page" to="/"
                            >Cloudless' Blog</router-link
                        >
                    </li>
                </ul>
            </div>
            <div class="d-flex fs-5 text-white">
                <a v-if="login" href="#" class="text-white" @click.prevent="logout">logout</a>
                <div class="form-check form-switch ms-3">
                    <input
                        id="dark-mode-override"
                        v-model="isDarkMode"
                        class="form-check-input"
                        type="checkbox"
                        @click="toggleTheme"
                    />
                </div>
            </div>
        </div>
    </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { logout } from '@/types/mutations';

export default defineComponent({
    name: 'Navbar',
    data() {
        return {
            isDarkMode: false,
        };
    },
    computed: {
        login() {
            return this.$store.state.login;
        },
    },
    mounted() {
        const isSystemDarkMode = window.matchMedia('(prefers-color-scheme: Dark)').matches;
        const hasDarkModeOverride = localStorage.getItem('theme') !== null;

        if (hasDarkModeOverride) {
            this.isDarkMode = localStorage.getItem('theme') === 'dark';
            this.applyTheme();
        } else if (isSystemDarkMode) {
            this.isDarkMode = isSystemDarkMode;
            document.documentElement.classList.add('dark-mode');
        }
    },
    methods: {
        toggleTheme() {
            localStorage.setItem('theme', this.isDarkMode ? 'light' : 'dark');
            this.applyTheme();
        },
        applyTheme() {
            if (localStorage.getItem('theme') === 'dark') {
                document.documentElement.classList.add('dark-mode');
                this.isDarkMode = true;
            } else {
                document.documentElement.classList.remove('dark-mode');
                this.isDarkMode = false;
            }
        },
        logout() {
            if (localStorage.getItem('token')) {
                localStorage.removeItem('token');
            }
            this.$store.commit(logout);
        },
    },
});
</script>
