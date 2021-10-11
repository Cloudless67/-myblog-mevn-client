<template>
    <form>
        <div class="row mb-2">
            <label for="write-category" class="col-sm-1 form-label">Category</label>
            <div class="col-sm-11">
                <select id="write-category" v-model="postData.category" class="form-select">
                    <option v-for="category in categories" :key="category" :value="category">{{
                        category
                    }}</option>
                </select>
            </div>
        </div>
        <div class="row mb-2">
            <label for="write-title" class="col-sm-1 form-label">Title</label>
            <div class="col-sm-11">
                <input id="write-title" v-model="postData.title" class="form-control" type="text" />
            </div>
        </div>
        <div class="row mb-2">
            <label for="write-url" class="col-sm-1 form-label">URL</label>
            <div class="col-sm-11">
                <input id="write-url" v-model="postData.url" class="form-control" type="text" />
            </div>
        </div>
        <div class="row align-items-start mb-2">
            <label for="write-url" class="col-sm-1 form-label">Body</label>
            <div class="col-sm-11">
                <textarea
                    id="write-body"
                    v-model="postData.body"
                    class="form-control"
                    rows="10"
                ></textarea>
            </div>
        </div>
        <div class="row mb-2">
            <label for="write-tags" class="col-sm-1 form-label">Tags</label>
            <div class="col-sm-11">
                <input id="write-tags" v-model="postData.tags" class="form-control" type="text" />
            </div>
        </div>
        <div class="d-flex justify-content-end">
            <button type="submit" class="btn btn-primary" @click.prevent="submit">글쓰기</button>
        </div>
    </form>
</template>

<script lang="ts">
import { postPost } from '@/lib/httpClient';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'WriteRoute',
    data() {
        return {
            categories: [],
            postData: {
                category: '',
                title: '',
                url: '',
                body: '',
                tags: '',
            },
        };
    },
    async created() {
        this.categories = await fetch('/api/categories').then(res => res.json());
    },
    methods: {
        async submit() {
            try {
                const res = await postPost(this.postData);
                this.$router.push({ path: `/post/${res.url}` });
            } catch (error) {
                console.error(error.message);
            }
        },
    },
});
</script>

<style lang="scss" scoped>
.row {
    align-items: center;
}

label {
    font-weight: 700;
    text-align: right;
}
</style>
