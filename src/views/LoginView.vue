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
        <button type="submit" class="btn btn-primary" @click.prevent="tryLogin">Submit</button>
    </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

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
            console.log(this.id, this.password);
        },
    },
});
</script>
