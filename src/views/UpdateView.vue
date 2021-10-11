<template>
    <form>
        <div class="row align-items-center mb-2">
            <label for="write-category" class="col-sm-1 form-label fw-bold text-end"
                >Category</label
            >
            <div class="col-sm-11">
                <select id="write-category" v-model="postData.category" class="form-select">
                    <option v-for="category in categories" :key="category" :value="category">
                        {{ category }}
                    </option>
                </select>
            </div>
        </div>
        <div class="row align-items-center mb-2">
            <label for="write-title" class="col-sm-1 form-label fw-bold text-end">Title</label>
            <div class="col-sm-11">
                <input id="write-title" v-model="postData.title" class="form-control" type="text" />
            </div>
        </div>
        <div class="row align-items-center mb-2">
            <label for="write-url" class="col-sm-1 form-label fw-bold text-end">URL</label>
            <div class="col-sm-11">
                <input
                    id="write-url"
                    v-model="postData.url"
                    class="form-control"
                    type="text"
                    disabled
                />
            </div>
        </div>
        <div class="row align-items-start mb-2">
            <label for="write-url" class="col-sm-1 form-label fw-bold text-end">Body</label>
            <div class="col-sm-11">
                <textarea
                    id="write-body"
                    v-model="postData.body"
                    class="form-control"
                    rows="10"
                ></textarea>
            </div>
        </div>
        <div class="row align-items-center mb-2">
            <label for="write-tags" class="col-sm-1 form-label fw-bold text-end">Tags</label>
            <div class="col-sm-11">
                <input id="write-tags" v-model="postData.tags" class="form-control" type="text" />
            </div>
        </div>
        <div class="d-flex justify-content-end">
            <button type="submit" class="btn btn-primary" @click.prevent="submit">수정</button>
        </div>
    </form>
</template>

<script lang="ts">
import { putPost } from '@/lib/httpClient';
import { Post } from '@/types/post';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'UpdateRoute',
    data() {
        return {
            categories: [] as string[],
            postData: {
                category: '',
                title: '',
                url: '',
                body: '',
                tags: '',
            },
        };
    },
    created() {
        this.categories = this.$store.state.categories;
        const post: Post = this.$store.state.lastPost;
        this.postData = { ...post, tags: post.tags.join(',') };
    },
    methods: {
        async submit() {
            try {
                const res = await putPost(this.$route.params.slug as string, {
                    category: this.postData.category,
                    body: this.postData.body,
                    tags: this.postData.tags,
                });

                this.$router.push({ path: `/post/${encodeURI(res.url)}` });
            } catch (error) {
                alert(error.message);
            }
        },
    },
});
</script>
