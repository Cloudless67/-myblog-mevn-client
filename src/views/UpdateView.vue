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
        <div class="row align-items-center mb-2">
            <label for="write-thumbnail" class="col-sm-1 form-label fw-bold text-end"
                >Thumbnail</label
            >
            <div class="col-sm-11">
                <input
                    id="write-thumbnail"
                    v-model="postData.thumbnail"
                    class="form-control"
                    type="text"
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
import { defineComponent } from 'vue';
import { putPost } from '@/lib/httpClient';
import isError from '@/types/error';

export default defineComponent({
    name: 'UpdateRoute',
    data() {
        return {
            categories: [] as string[],
            postData: {
                category: '',
                title: '',
                url: '',
                thumbnail: '',
                body: '',
                tags: '',
            },
        };
    },
    created() {
        this.categories = this.$store.state.categories;
        const post = this.$store.state.lastPost;
        if (post) this.postData = { ...post, tags: post.tags.join(','), thumbnail: '' };
    },
    methods: {
        async submit() {
            try {
                const { url } = await putPost(this.$route.params.slug as string, {
                    title: this.postData.title,
                    category: this.postData.category,
                    thumbnail: this.postData.thumbnail === '' ? undefined : this.postData.thumbnail,
                    body: this.postData.body,
                    tags: this.postData.tags,
                });

                this.$router.push({ path: `/post/${encodeURI(url)}` });
            } catch (error) {
                if (isError(error)) alert(error.message);
            }
        },
    },
});
</script>
