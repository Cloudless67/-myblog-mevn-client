<template>
    <form>
        <div class="row mb-2">
            <label for="write-category" class="col-sm-1 form-label">Category</label>
            <div class="col-sm-11">
                <select id="write-category" class="form-select" v-model="category">
                    <option v-for="category in categories" :key="category" :value="category">{{
                        category
                    }}</option>
                </select>
            </div>
        </div>
        <div class="row mb-2">
            <label for="write-title" class="col-sm-1 form-label">Title</label>
            <div class="col-sm-11">
                <input type="text" id="write-title" class="form-control" v-model="title" />
            </div>
        </div>
        <div class="row mb-2">
            <label for="write-slug" class="col-sm-1 form-label">URL</label>
            <div class="col-sm-11">
                <input type="text" id="write-slug" class="form-control" v-model="slug" />
            </div>
        </div>
        <div class="row align-items-start mb-2">
            <label for="write-slug" class="col-sm-1 form-label">Body</label>
            <div class="col-sm-11">
                <textarea id="write-body" class="form-control" rows="10" v-model="body"></textarea>
            </div>
        </div>
        <div class="row mb-2">
            <label for="write-tags" class="col-sm-1 form-label">Tags</label>
            <div class="col-sm-11">
                <input type="text" id="write-tags" class="form-control" v-model="tags" />
            </div>
        </div>
        <div class="d-flex justify-content-end">
            <button type="submit" class="btn btn-primary" @click.prevent="submit">글쓰기</button>
        </div>
    </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Write Route',
    data() {
        return {
            categories: [],
            category: '',
            title: '',
            slug: '',
            body: '',
            tags: '',
        };
    },
    methods: {
        async submit() {
            const postData = {
                category: this.category,
                title: this.title,
                url: this.slug,
                body: this.body,
                tags: this.tags,
            };

            try {
                const res = await fetch('/api/post', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: JSON.stringify(postData),
                }).then(x => x.json());

                this.$router.push({ path: `/post/${res.url}` });
            } catch (error) {
                console.error(error.message);
            }
        },
    },
    async created() {
        this.categories = await fetch('/api/categories').then(res => res.json());
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
