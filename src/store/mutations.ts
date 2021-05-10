import { State } from '@vue/runtime-core';

const mutations = {
    login(state: State) {
        state.login = true;
    },
    logout(state: State) {
        state.login = false;
    },
};

export default mutations;
