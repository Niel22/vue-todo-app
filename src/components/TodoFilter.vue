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
    computed: {
        filter(){
            return this.$store.state.filter;
        }
    },
    methods: {
        setFilter(filter){
            this.$store.dispatch('setFilter', filter);
        }
    }
}
</script>