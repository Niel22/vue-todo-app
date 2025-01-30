<template>
    <div>
        <div><label><input type="checkbox" :checked="!anyRemaining" @change="checkAllTodos">Check All</label></div>
        <div>{{ remaining }} items left</div>
    </div>
</template>

<script>
export default {
    name: "TodoItemsRemaining",
    props: {
        remaining: {
            type: Number,
            required: true
        }
    },
    computed: {
        anyRemaining(){
            return this.remaining > 0
        }
    },
    methods: {
        checkAllTodos(){
            this.$emit('checkedAllTodos');
        }
    }
}
</script>