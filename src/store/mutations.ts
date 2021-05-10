import { State } from '@vue/runtime-core';

const mutations = {
    login(state: State) {
        state.login = true;
    },
    logout(state: State) {
        state.login = false;
    },
    setCategories(state: State, { categories }: { categories: string[] }) {
        state.categories = categories;
    },
};

export default mutations;
