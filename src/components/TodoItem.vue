<template>
    <div v-if="todosFilter.length > 0">
        <div class="todo-item" v-for="todo in todosFilter">
            <input type="checkbox" v-model="todo.completed">
            <div  class="todo-item-left">
                <div v-if="!todo.editing" class="todo-item-label" :class="{ completed : todo.completed}" @dblclick="editTodo">{{ todo.title }}</div>
                <input v-else type="text" v-focus v-model="todo.title" class="todo-item-edit" @keyup.enter="updateTodo" @blur="updateTodo" @keyup.escape="cancelEdit">
            </div>
            <div>
                <button @click="pluralize">Plural</button>
                <span class="remove-item" @click="removeTodo">
                    &times;
                </span>
            </div>

        </div>
    </div>
    <div v-else>No Todos Found</div>
</template>

<script>
export default{
    name: 'TodoItem',
    data(){
        return {
            beforeEditCache: ''
        }
    },
    computed: {
        todosFilter(){
            return this.$store.getters.todosFilter
        }
    },
    created(){
        eventBus.$on('pluralize', this.handlePluralize);
    },
    beforeDestroy(){
        eventBus.$off('pluralize', this.handlePluralize);
    },
    methods: {
        removeTodo(){
            this.$store.state.todos = this.$store.state.todos.filter(todo => todo.id !== this.todo.id);
        },
        editTodo(){
            this.beforeEditCache = this.todo.title;
            this.todo.editing = true
        },
        cancelEdit(){
            this.todo.title = this.beforeEditCache;
            this.todo.editing = false;
        },
        updateTodo(){
            if(this.todo.title.trim().length == 0){
                this.todo.title = this.beforeEditCache;
                this.todo.editing = false;
                return;
            }

            const todo = this.$store.state.todos.find(todo => todo.id === this.todo.id);
                
            if(todo){
                todo.title = this.todo.title;
                todo.editing = false;
            }
            todo.editing = false;
        },
        pluralize(){
            eventBus.$emit('pluralize');
        },
        handlePluralize(){
            this.todo.title += 's';
        }
    },
    directives: {
        focus: {
            inserted: function(el){
                el.focus();
            }
        }
    },
}
</script>
