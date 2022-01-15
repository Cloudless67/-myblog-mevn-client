<template>
    <footer class="navbar justify-content-center bg-dark p-3 d-flex flex-column">
        <a
            href="https://github.com/Cloudless67"
            target="_blank"
            class="text-center text-white ms-3"
            rel="noopener noreferrer"
            ><i class="fab fa-github fs-3 mb-2"></i
        ></a>
        <small class="text-white">
            <address>
                <a href="mailto:cloudlesslakitu67@gmail.com" class="text-white"
                    >cloudlesslakitu67@gmail.com</a
                >
                | &copy; 2022 by Cloudless
            </address>
        </small>
    </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({ name: 'Footer' });
</script>

<style lang="scss" scoped></style>
