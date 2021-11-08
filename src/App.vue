<template>
    <the-navbar />
    <section class="container my-4">
        <main-with-sidebar>
            <router-view />
        </main-with-sidebar>
    </section>
    <router-link v-if="login" id="write-button" class="btn btn-primary" to="/write"
        >글쓰기</router-link
    >
    <the-footer />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import jwt_decode from 'jwt-decode';
import TheNavbar from '@/components/TheNavbar.vue';
import MainWithSidebar from '@/components/MainWithSidebar.vue';
import TheFooter from '@/components/TheFooter.vue';
import { login, logout, setCategories } from '@/types/mutations';
import isError from './types/error';

type JWTPayload = {
    authorized: boolean;
    exp: number;
    iat: number;
};

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
    async mounted() {
        const token = localStorage.getItem('token');
        if (token) {
            const payload = jwt_decode<JWTPayload>(token);
            const exp = payload.exp;
            const now = new Date().getTime() / 1000;

            if (exp < now) {
                this.$store.commit(login);
            }
        } else {
            this.$store.commit(logout);
        }
        try {
            const categories = await fetch('/api/categories').then((res) => res.json());
            this.$store.commit(setCategories, categories);
        } catch (e) {
            if (isError(e)) alert(e.message);
        }
    },
});
</script>

<style lang="scss">
@import '@/scss/custom';

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

#logo {
    width: 3rem;
    height: 3rem;
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
