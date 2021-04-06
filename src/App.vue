<template>
    <the-navbar />
    <section class="container my-3">
        <router-view />
    </section>
    <the-footer />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import TheNavbar from '@/components/TheNavbar.vue'; // @ is an alias to /src
import TheFooter from '@/components/TheFooter.vue';

@Options({
    components: {
        TheNavbar,
        TheFooter,
    },
})
export default class App extends Vue {}
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
</style>
