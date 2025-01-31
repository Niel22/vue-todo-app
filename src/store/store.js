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
    },
    mutations: {
        addTodo(state, todo){
            state.todos.push({
                id: todo.id,
                title: todo.title,
                completed: todo.completed,
                editing: todo.editing
            });
        },
        clearCompleted(state){
            state.todos = state.todos.filter(todo => !todo.completed);
        },
        updateTodo(state, {id, newTitle}){
            const todo = state.todos.find(todo => todo.id === id);
            if(todo){
                todo.title = newTitle;
                todo.editing = false;
            }
        },
        handlePluralize(state){
            state.todos.forEach(todo => todo.title += 's');
        },
        removeTodo(state, id){
            state.todos = state.todos.filter(todo => todo.id !== id);
        },
        setFilter(state, filter){
            state.filter = filter;
        },
        checkAllTodos(state){
            state.todos.forEach((todo) => todo.completed = !todo.completed);
        }
    },
    actions: {
        addTodo(context, todo){
            context.commit('addTodo', todo);
            setTimeout(() => {
            }, 1000);
        },
        clearCompleted(context){
            setTimeout(() => {
                context.commit('clearCompleted');
            }, 1000);
        },
        updateTodo(context, {id, newTitle}){
            setTimeout(() => {
                context.commit('updateTodo', {id, newTitle});
            }, 1000);
        },
        handlePluralize(context){
            setTimeout(() => {
                context.commit('handlePluralize');
            }, 1000);
        },
        removeTodo(context, id){
            setTimeout(() => {
                context.commit('removeTodo', id);
            }, 1000);
        },
        setFilter(context, filter){
            setTimeout(() => {
                context.commit('setFilter', filter);
            }, 1000);
        },
        checkAllTodos(context){
            setTimeout(() => {
                context.commit('checkAllTodos');
            }, 1000);
        }
    }
})