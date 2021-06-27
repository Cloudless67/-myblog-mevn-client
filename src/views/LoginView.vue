<template>
    <form>
        <div class="mb-3">
            <label for="admin-user" class="form-label fw-bold">Admin User</label>
            <input type="text" class="form-control" id="admin-user" v-model="id" />
        </div>
        <div class="mb-3">
            <label for="admin-password" class="form-label fw-bold">Password</label>
            <input type="password" class="form-control" id="admin-password" v-model="password" />
        </div>
        <button type="submit" class="btn btn-primary" @click.prevent="tryLogin">Login</button>
    </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { postLoginData } from '@/lib/httpClient';

export default defineComponent({
    name: 'Login Route',
    data() {
        return {
            id: '',
            password: '',
        };
    },
    methods: {
        async tryLogin() {
            const token = await postLoginData(this.id, this.password);

            localStorage.setItem('token', token.token);
            this.$router.push({ path: '/' });
            this.$store.commit('login');
        },
    },
});
</script>
