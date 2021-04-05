<template>
    <Navbar />
    <router-view />
    <MainFooter />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Navbar from '@/components/Navbar.vue'; // @ is an alias to /src
import MainFooter from '@/components/MainFooter.vue';

@Options({
    components: {
        Navbar,
        MainFooter,
    },
})
export default class App extends Vue {}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}
</style>
