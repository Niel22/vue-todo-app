import Vue from "vue";
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        newTodo: '',
        idForTodo: 4,
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
    },
    getters: {
        remaining(state){
            return state.todos.filter(todo => !todo.completed).length;
        },
        anyRemaining(state, getters){
            return getters.remaining !== 0;
        },
        todosFilter(state){
            if(state.filter === 'all'){
                return state.todos;
            }

            if(state.filter === 'active'){
                return state.todos.filter(todo => !todo.completed);
            }

            if(state.filter === 'completed'){
                return state.todos.filter(todo => todo.completed);
            }

            return state.todos;
        },
        showClearCompletedButton(state){
            return state.todos.filter(todo => todo.completed).length > 0;
        },
    }
})