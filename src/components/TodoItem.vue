<template>
    <div class="todo-item">
        <input type="checkbox" v-model="todo.completed">
        <div  class="todo-item-left">
            <div v-if="!todo.editing" class="todo-item-label" :class="{ completed : todo.completed}" @dblclick="editTodo">{{ todo.title }}</div>
            <input v-else type="text" v-focus v-model="todo.title" class="todo-item-edit" @keyup.enter="updateTodo" @blur="updateTodo" @keyup.escape="cancelEdit">
        </div>
        <div>
            <button @click="handlePluralize">Plural</button>
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
    methods: {
        removeTodo(){
            this.$store.dispatch('removeTodo', this.todo.id);
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
                alert('Title Cannot be empty');
                this.todo.title = this.beforeEditCache;
                this.todo.editing = false;
                return;
            }

            this.$store.dispatch('updateTodo', {id: this.todo.id, newTitle: this.todo.title});
        },
        handlePluralize(){
            this.$store.dispatch('handlePluralize');
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
