<template>
    <div>
        <input type="text" placeholder="What needs to be done" class="todo-input" v-model="newTodo" @keyup.enter="addTodo">
    </div>
</template>

<script>
export default {
    name: 'AddTodo',
    data() {
        return {
            newTodo: ''
        }
    },
    methods: {
        addTodo(){
            if(this.newTodo.trim().length === 0){
                alert('You cannot add empty todo');
                return;
            }

            this.$emit('addedTodo', this.newTodo);
            this.newTodo = '';
        }
    }
}
</script>