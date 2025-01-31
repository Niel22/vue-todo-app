<template>
    <div class="extra-container">
        <div><label><input type="checkbox" :checked="!anyRemaining" @change="checkAllTodos">Check All</label></div>
        <div>{{ remaining }} items left</div>
    </div>
</template>

<script>
export default {
    name: "TodoItemsRemaining",
    computed: {
        anyRemaining(){
            return this.$store.getters.anyRemaining;
        },
        remaining(){
            return this.$store.getters.remaining;
        }
    },
    methods: {
        checkAllTodos(){
            const isChecked = event.target.checked;
            this.$store.state.todos.forEach((todo) => todo.completed = isChecked);
        },
    }
}
</script>