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
                <input type="text" id="write-slug" class="form-control" disabled v-model="slug" />
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
            <button type="submit" class="btn btn-primary" @click.prevent="submit">수정</button>
        </div>
    </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Update Route',
    data() {
        return {
            categories: [],
            title: '',
            slug: '',
            category: '',
            body: '',
            tags: '',
        };
    },
    methods: {
        async submit() {
            const postData = {
                category: this.category,
                body: this.body,
                tags: this.tags,
            };

            try {
                const res = await fetch(`/api/post/${this.$route.params.slug}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: JSON.stringify(postData),
                }).then(x => x.json());

                this.$router.push({ path: `/post/${encodeURI(res.url)}` });
            } catch (error) {
                alert(error.message);
            }
        },
    },
    async created() {
        try {
            this.categories = await fetch('/api/categories').then(res => res.json());
            const post = await fetch(`/api/post/${this.$route.params.slug}`).then(res =>
                res.json(),
            );
            this.category = post.category;
            this.title = post.title;
            this.slug = post.url;
            this.body = post.body;
            this.tags = post.tags.join(',');
        } catch (error) {
            alert(error.message);
        }
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
