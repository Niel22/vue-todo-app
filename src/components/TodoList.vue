<template>
    <div>
        <AddTodo  @addedTodo="addTodo"/>

        <div v-if="todosFilter.length > 0">
            <TodoItem v-for="todo in todosFilter" :key="todo.id" class="todo-item" :todo="todo" />
        </div>
        <div v-else>No Todos Found</div>


        <TodoItemsRemaining class="extra-container" :remaining="remaining" @checkedAllTodos="checkAllTodos"/>

        <div class="extra-container">
            <TodoFilter :filter="filter" @updatedFilter="setFilter"/>

            <ClearCompleted :showClearCompletedButton="showClearCompletedButton" @clearedCompleted="clearCompleted"/>
        </div>
    </div>
  </template>
  
  <script>

  import TodoItem from './TodoItem.vue';
  import TodoItemsRemaining from './TodoItemsRemaining.vue';
  import TodoFilter from './TodoFilter.vue';
  import ClearCompleted from './ClearCompleted.vue';
  import AddTodo from './AddTodo.vue';

  export default {
    name: 'TodoList',
    components: {
        TodoItem,
        TodoItemsRemaining,
        TodoFilter,
        ClearCompleted,
        AddTodo
    },
    data () {
      return {
        idForTodo: 4,
        filter: '',
        todos: [
            {
                'id': 1,
                'title': 'Finish vue screen cast',
                'completed': false,
                'editing': false
            },
            {
                'id': 2,
                'title': 'Take over',
                'completed': false,
                'editing': false
            },
            {
                'id': 3,
                'title': 'Take over the world',
                'completed': false,
                'editing': false
            },

        ]
      }
    },
    created(){
      eventBus.$on('removedTodo', (todoToBeDeleted) => this.removeTodo(todoToBeDeleted));
      eventBus.$on('updatedTodo', (todoToUpdate, newTitle) => this.updateTodo(todoToUpdate, newTitle));
    },
    computed: {
        remaining(){
            return this.todos.filter(todo => !todo.completed).length;
        },
        anyRemaining(){
            return this.remaining !== 0;
        },
        todosFilter(){
            if(this.filter === 'all'){
                return this.todos;
            }

            if(this.filter === 'active'){
                return this.todos.filter(todo => !todo.completed);
            }

            if(this.filter === 'completed'){
                return this.todos.filter(todo => todo.completed);
            }

            return this.todos;
        },
        showClearCompletedButton(){
            return this.todos.filter(todo => todo.completed).length > 0;
        }
    },
    directives: {
        focus: {
            inserted: function(el){
                el.focus();
            }
        }
    },
    methods: {
        addTodo(newTodo){
            this.todos.push({
                id: this.idForTodo,
                title: newTodo,
                completed: false,
                editing: false
            });

            this.idForTodo++
        },

        removeTodo(todoToBeDeleted){
            this.todos = this.todos.filter(todo => todo.id !== todoToBeDeleted.id);
        },

        updateTodo(todoToUpdate, newTitle){
                const todo = this.todos.find(todo => todo === todoToUpdate);
                
                if(todo){
                    todo.title = newTitle;
                    todo.editing = false;
                }
        },
        checkAllTodos(){
            const isChecked = event.target.checked;
            this.todos.forEach((todo) => todo.completed = isChecked);
            console.log(this.todos);
        },
        clearCompleted(){
            this.todos = this.todos.filter(todo => !todo.completed);
        },
        setFilter(filter){
          this.filter = filter;
        }
        
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style>
  @import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css");

.todo-input {
  width: 100%;
  padding: 10px 18px;
  font-size: 18px;
  margin-bottom: 16px;

  &:focus {
    outline: 0;
  }
}

.todo-item {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation-duration: 0.3s;
}


.todo-item-left {
  display: flex;
  align-items: center;
}

.todo-item-label {
  padding: 10px;
  border: 1px solid white;
  margin-left: 12px;
}

.remove-item {
  cursor: pointer;
  margin-left: 14px;
}

.remove-item:hover {
  color: black;
}

.todo-item-edit {
  font-size: 24px;
  color: #2c3e50;
  margin-left: 12px;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc; 
  font-family: 'Avenir', Helvetica, Arial, sans-serif;

}

.todo-item-edit:focus {
  outline: none;
}

.completed {
  text-decoration: line-through;
  color: grey;
}

.extra-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  border-top: 1px solid lightgrey;
  padding-top: 14px;
  margin-bottom: 14px;
}

button {
  font-size: 14px;
  background-color: white;
  appearance: none;

}
button:hover {
  background: lightgreen;
}

button:focus {
  outline: none;
}

.active {
  background: lightgreen;
}


.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
  