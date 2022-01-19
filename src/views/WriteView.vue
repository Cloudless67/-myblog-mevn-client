<template>
    <form>
        <div class="mb-2">
            <label for="write-category" class="form-label">Category</label>
            <SelectBox id="write-category" v-model="postData.category" :items="categories" />
        </div>
        <InputForm v-model="postData.title" name="write-title" label="Title" />
        <InputForm v-model="postData.url" name="write-url" label="URL" />
        <div class="row">
            <InputForm
                v-model="postData.thumbnail.url"
                class="col-6"
                name="write-thumbnail-url"
                label="Thumbnail URL"
            />
            <InputForm
                v-model="postData.thumbnail.aspectRatio"
                class="col-6"
                name="write-thumbnail-ratio"
                label="Aspect Ratio"
                type="number"
            />
        </div>
        <div class="align-items-start mb-2">
            <label for="write-url" class="form-label">Body</label>
            <textarea
                id="write-body"
                v-model="postData.body"
                class="form-control"
                rows="10"
            ></textarea>
        </div>
        <InputForm v-model="postData.tags" name="write-tags" label="Tags" />
        <div class="d-flex justify-content-end">
            <button type="submit" class="btn btn-primary" @click.prevent="submit">글쓰기</button>
        </div>
    </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { postPost } from '@/lib/httpClient';
import { PostPostData } from '@/types/post';
import SelectBox from '@/components/forms/SelectBox.vue';
import InputForm from '@/components/forms/InputForm.vue';
import isError from '@/types/error';

export default defineComponent({
    name: 'WriteRoute',
    components: { SelectBox, InputForm },
    data() {
        return {
            categories: [],
            postData: {
                category: '',
                title: '',
                url: '',
                thumbnail: { url: '', aspectRatio: 0 },
                body: '',
                tags: '',
            } as unknown,
        };
    },
    async created() {
        this.categories = await fetch('/api/categories').then((res) => res.json());
    },
    methods: {
        async submit() {
            try {
                const body = this.postData as PostPostData;
                const { url } = await postPost({
                    ...body,
                    thumbnail: body.thumbnail?.url ? body.thumbnail : undefined,
                });

                this.$router.push({ path: `/post/${url}` });
            } catch (error) {
                if (isError(error)) console.error(error.message);
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
