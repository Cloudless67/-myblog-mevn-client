<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary p-0">
        <div class="container">
            <router-link class="navbar-brand" to="/">
                <img id="logo" src="../assets/logo-white.png" alt="Logo" height="" />
            </router-link>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto fs-4">
                    <li class="nav-item">
                        <router-link class="nav-link active fw-bold" aria-current="page" to="/"
                            >Cloudless' Blog</router-link
                        >
                    </li>
                </ul>
            </div>
            <div class="d-flex fs-5 text-white">
                <a href="#" class="text-white" v-if="login.value" @click.prevent="$emit('logout')"
                    >logout</a
                >
                <router-link to="/login" v-else>
                    <span class="text-white">login</span>
                </router-link>
            </div>
        </div>
    </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Navbar',
    inject: ['login'],
    emits: ['logout'],
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#logo {
    width: 3rem;
    height: 3rem;
}
</style>
