<template>
    <div class="todo-item">
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
</template>

<script>
export default{
    name: 'TodoItem',
    props: {
        todo: {
            type: Object,
            required: true
        }
    },
    data(){
        return {
            beforeEditCache: ''
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
            this.$store.commit('removeTodo', this.todo.id);
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

            this.$store.commit('updateTodo', {id: this.todo.id, newTitle: this.todo.title});
        },
        pluralize(){
            eventBus.$emit('pluralize');
        },
        handlePluralize(){
            this.$store.commit('handlePluralize', this.todo.id);
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
