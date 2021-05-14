import { ComponentCustomProperties } from 'vue';
import { Store } from 'vuex';
import { Post } from '.';

declare module '@vue/runtime-core' {
    // declare your own store states
    interface State {
        login: boolean;
        lastPost?: Post;
        categories: string[];
    }

    // provide typings for `this.$store`
    interface ComponentCustomProperties {
        $store: Store<State>;
    }
}
