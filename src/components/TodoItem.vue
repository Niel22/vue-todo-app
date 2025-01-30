<template>
    <div class="todo-item">
        <input type="checkbox" v-model="todo.completed">
        <div  class="todo-item-left">
            <div v-if="!todo.editing" class="todo-item-label" :class="{ completed : todo.completed}" @dblclick="editTodo">{{ todo.title }}</div>
            <input v-else type="text" v-focus v-model="todo.title" class="todo-item-edit" @keyup.enter="updateTodo" @blur="updateTodo" @keyup.escape="cancelEdit">
        </div>
        
        <div class="remove-item" @click="removeTodo">
            &times;
        </div>

    </div>
</template>

<script>
export default{
    name: 'todo-item',
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
    methods: {
        removeTodo(){
            this.$emit('removedTodo', this.todo);
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
            
            this.todo.editing = false;
            this.$emit('updatedTodo', this.todo.id, this.todo.title);

        },
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
