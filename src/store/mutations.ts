import * as mutationTypes from '@/types/mutations';
import { Post } from '@/types';
import { State } from '@vue/runtime-core';

const mutations = {
    [mutationTypes.login](state: State) {
        state.login = true;
    },
    [mutationTypes.logout](state: State) {
        state.login = false;
    },
    [mutationTypes.setLastPost](state: State, lastPost: Post) {
        state.lastPost = lastPost;
    },
    [mutationTypes.setCategories](state: State, categories: string[]) {
        state.categories = categories;
    },
};

export default mutations;
