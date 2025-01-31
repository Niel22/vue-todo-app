import Vue from "vue";
import Vuex from 'vuex';
import axios from "axios";

Vue.use(Vuex);
axios.defaults.baseURL = 'http://127.0.0.1:8000';

export const store = new Vuex.Store({
    state: {
        newTodo: '',
        idForTodo: 4,
        filter: '',
        todos: []
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
            todo.editing = false;
            state.todos.push(todo);
        },
        clearCompleted(state){
            state.todos = state.todos.filter(todo => !todo.completed);
        },
        updateTodo(state, data){
            const todo = state.todos.find(todo => todo.id === data.id);
            if(todo){
                todo.title = data.title;
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
        checkAllTodos(state, event){
            state.todos.forEach((todo) => todo.completed = event);
        },
        fetchAllTodos(state, task){
            if(Array.isArray(task)){
                task.forEach(item => item.editing = false);
                state.todos = task;
            }
        }
    },
    actions: {
        addTodo(context, todo){
            axios
              .post("/api/task", {
                title: todo.title
              })
              .then((res) => {
                context.commit('addTodo', res.data.data);
              })
              .catch((err) => {
                console.log(err);
              });
        },
        clearCompleted(context){
            axios
              .get('api/task/clear-completed')
              .then((res) => {
                context.commit('clearCompleted');
              })
              .catch((err) => {
                console.log(err);
              });
        },
        updateTodo(context, {id, newTitle, completed}){
            axios
              .patch(`/api/task/${id}`, {
                title: newTitle,
                completed: completed
              })
              .then((res) => {
                context.commit('updateTodo', res.data.data);
              })
              .catch((err) => {
                console.log(err);
              });
        },
        handlePluralize(context){
            setTimeout(() => {
                context.commit('handlePluralize');
            }, 1000);
        },
        removeTodo(context, id){
            axios
              .delete("/api/task/" + id)
              .then((res) => {
                context.commit('removeTodo', id);
              })
              .catch((err) => {
                console.log(err);
              });
                
        },
        setFilter(context, filter){
                context.commit('setFilter', filter);
        },
        checkAllTodos(context, event){
            axios
              .get("/api/task/complete-all?status=" + event)
              .then((res) => {
                  context.commit('checkAllTodos', event);
              })
              .catch((err) => {
                console.log(err);
              });
        },
        fetchAllTodos(context){
            axios
              .get("/api/task")
              .then((res) => {
                context.commit('fetchAllTodos', res.data.data);
              })
              .catch((err) => {
                console.log(err);
              });
        }
    }
})