<template>
    <div>
        <button :class="{ active: filter === 'all'}" @click="setFilter('all')">
            All
        </button>
        <button :class="{ active: filter === 'active'}" @click="setFilter('active')">
            Active
        </button>
        <button :class="{ active: filter === 'completed'}" @click="setFilter('completed')">
            Completed
        </button>
    </div>
</template>

<script>
export default {
    name: "TodoFilter",
    props: {
        filter:  {
            type: String,
            required: true
        }
    },
    methods: {
        setFilter(filter){
            this.$emit('updatedFilter', filter);
        }
    }
}
</script>