<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary p-0">
        <div class="container">
            <router-link class="navbar-brand" to="/">
                <img id="logo" src="/logo-white.png" alt="Logo" height="" />
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
            <div class="d-flex">
                <a href="/login"> <span class="fs-5 text-white">Login</span></a>
            </div>
        </div>
    </nav>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({ name: 'Navbar' })
export default class Navbar extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#logo {
    width: 3rem;
    height: 3rem;
}
</style>
