<template>
    <footer class="navbar justify-content-center bg-dark p-3">
        <small class="text-white">
            <address>
                <a href="mailto:cloudlesslakitu67@gmail.com" class="text-white"
                    >cloudlesslakitu67@gmail.com</a
                >
                | &copy; 2021 by Cloudless
            </address>
        </small>
    </footer>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';

@Options({ name: 'Footer' })
export default class MainFooter extends Vue {}
</script>
