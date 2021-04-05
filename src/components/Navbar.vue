<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary p-0">
        <div class="container">
            <a class="navbar-brand" href="#">
                <img id="logo" src="/Logo_White.png" alt="Logo" height="" />
            </a>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto fs-4">
                    <li class="nav-item">
                        <a class="nav-link active fw-bold" aria-current="page" href="#"
                            >Cloudless' Blog</a
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
import { Vue } from 'vue-class-component';

export default class Navbar extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#logo {
    width: 3rem;
    height: 3rem;
}
</style>
