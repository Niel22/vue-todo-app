<template>
    <div>
        <input type="text" placeholder="What needs to be done" class="todo-input" v-model="newTodo" @keyup.enter="addTodo">
        
        <div v-if="todosFilter.length > 0">

            <div v-for="(todo, index) in todosFilter" :key="todo.id" class="todo-item">
                <input type="checkbox" v-model="todo.completed">
                <div  class="todo-item-left">
                    <div v-if="!todo.editing" class="todo-item-label" :class="{ completed : todo.completed}" @dblclick="editTodo(todo)">{{ todo.title }}</div>
                    <input v-else type="text" v-focus v-model="todo.title" class="todo-item-edit" @keyup.enter="updateTodo(todo)" @blur="updateTodo(todo)" @keyup.escape="cancelEdit(todo)">
                </div>
                
                
                <div class="remove-item" @click="removeTodo(index)">
                    &times;
                </div>
            </div>
        </div>
        <div v-else>No Todos Found</div>

        <div class="extra-container">
            <div><label><input type="checkbox" :checked="!anyRemaining" @change="checkAllTodos">Check All</label></div>
            <div>{{ remaining }} items left</div>
        </div>

        <div class="extra-container">
            <div>
                <button :class="{ active: filter === 'all'}" @click="filter = 'all'">
                    All
                </button>
                <button :class="{ active: filter === 'active'}" @click="filter = 'active'">
                    Active
                </button>
                <button :class="{ active: filter === 'completed'}" @click="filter = 'completed'">
                    Completed
                </button>
            </div>

            <div>
                <transition name="fade">
                    <button v-if="showClearCompletedButton" @click="clearCompleted">Clear Completed</button>
                </transition>
            </div>
        </div>
    </div>
  </template>
  
  <script>

  export default {
    name: 'TodoList',
    data () {
      return {
        newTodo: '',
        idForTodo: 4,
        beforeEditCache: '',
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
                'completed': true,
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
        addTodo(){

            if(this.newTodo.trim().length == 0){
                return;
            }

            this.todos.push({
                id: this.idForTodo,
                title: this.newTodo,
                completed: false,
                editing: false
            });

            this.newTodo = '';
            this.idForTodo++
        },

        removeTodo(index){
            this.todos.splice(index, 1);
        },
        editTodo(todo){
            this.beforeEditCache = todo.title;
            todo.editing = true
        },
        updateTodo(todo){
            if(todo.title.trim().length == 0){
                todo.title = this.beforeEditCache;
                todo.editing = false;
                return;
            }

            todo.title = todo.title;
        },
        cancelEdit(todo){
            todo.title = this.beforeEditCache;
            todo.editing = false;
        },
        checkAllTodos(){
            const isChecked = event.target.checked;
            this.todos.forEach((todo) => todo.completed = isChecked);
        },
        clearCompleted(){
            this.todos = this.todos.filter(todo => !todo.completed);
        }
        
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
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

.remove-item {
  cursor: pointer;
  margin-left: 14px;
  &:hover {
    color: black;
  }
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
  