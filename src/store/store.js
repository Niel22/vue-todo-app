import Vue from "vue";
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        filter: '',
        todos: [
            {
                'id': 1,
                'title': 'Finish vue screen cast',
                'completed': false,
                'editing': false
            },
            {
                'id': 2,
                'title': 'Take over',
                'completed': false,
                'editing': false
            },
            {
                'id': 3,
                'title': 'Take over the world',
                'completed': false,
                'editing': false
            },

        ]
    }
})