<template>
    <div>
        <transition name="fade">
            <button v-if="showClearCompletedButton" @click="clearCompleted">Clear Completed</button>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'ClearCompleted',
    props: {
        showClearCompletedButton: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        clearCompleted(){
            this.$emit('clearedCompleted');
        }
    }
}
</script>