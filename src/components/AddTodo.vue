<template>
    <div>
        <input type="text" placeholder="What needs to be done" class="todo-input" v-model="$store.state.newTodo" @keyup.enter="addTodo">
    </div>
</template>

<script>
export default {
    name: 'AddTodo',
    methods: {
        addTodo(){
            if(this.$store.state.newTodo.trim().length === 0){
                alert('You cannot add empty todo');
                return;
            }

            this.$store.state.todos.push({
                id: this.idForTodo,
                title: this.$store.state.newTodo,
                completed: false,
                editing: false
            });
            this.$store.state.idForTodo++
            this.$store.state.newTodo = '';
        }
    }
}
</script>