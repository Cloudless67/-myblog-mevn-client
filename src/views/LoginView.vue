<template>
    <form>
        <div class="mb-3">
            <label for="admin-user" class="form-label fw-bold">Admin User</label>
            <input id="admin-user" v-model="id" class="form-control" type="text" />
        </div>
        <div class="mb-3">
            <label for="admin-password" class="form-label fw-bold">Password</label>
            <input id="admin-password" v-model="password" class="form-control" type="password" />
        </div>
        <button type="submit" class="btn btn-primary" @click.prevent="tryLogin">Login</button>
    </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { postLoginData } from '@/lib/httpClient';

export default defineComponent({
    name: 'LoginRoute',
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
