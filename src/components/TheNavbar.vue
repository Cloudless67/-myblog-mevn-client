<template>
    <nav class="navbar navbar-expand navbar-dark bg-primary p-0">
        <div class="container">
            <RouterLink class="navbar-brand" to="/">
                <img id="logo" src="../assets/logo-white.png" alt="Logo" width="48" height="48" />
            </RouterLink>
            <div id="navbarSupportedContent" class="collapse navbar-collapse">
                <ul class="navbar-nav me-auto fs-4">
                    <li class="nav-item d-none d-md-block">
                        <RouterLink class="nav-link active fw-bold" aria-current="page" to="/">
                            Cloudless' Blog
                        </RouterLink>
                    </li>
                </ul>
            </div>
            <div class="d-flex fs-5 text-white">
                <a v-if="login" href="#" class="text-white" @click.prevent="logout">logout</a>
                <ThemeToggleButton
                    id="dark-mode-override"
                    :state="isDarkMode"
                    type="checkbox"
                    @click="toggleTheme"
                />
            </div>
        </div>
    </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ThemeToggleButton from './forms/ThemeToggleButton.vue';
import { logout } from '@/types/mutations';

export default defineComponent({
    name: 'TheNavbar',
    components: { ThemeToggleButton },
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
