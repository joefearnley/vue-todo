<template>
  <div class="todo-list">
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
              <div class="column">
                <h1 class="title">Todos</h1>
              </div>
              <div class="column">
                <p class="control has-addons">
                  <input class="input" type="text" name="new-todo" v-model="newTodoText" @keyup="checkCanAddTodo" placeholder="Add thing to do">
                  <a id="add-todo-button" class="button is-primary" :class="{ 'is-disabled': !canAddTodo  }" @click="addTodo">
                    <span class="icon is-small"><i class="fa fa-plus"></i></span>
                  </a>
                </p>
              </div>
              </div>
              <hr>
          </div>
        </div>
    </section>
    <div class="container is-hidden" id="success-message">
      <div class="columns">
        <div class="column is-one-third"></div>
        <div class="column is-one-third">
          <div class="notification is-success">
            <button class="delete"></button>Item Completed.
          </div>
        </div>
        <div class="column is-one-third"></div>
      </div>
    </div>
    <section class="section">
      <div class="container">
        <div class="columns is-multiline">
          <div class="column is-one-quarter" v-for="todo in todos">
            <div class="card">
              <div class="card-content">
                <div class="content">
                  <h3>{{ todo.text }}</h3>
                  <small>{{ todo.created_at | moment('MMMM Do YYYY') }}</small>
                </div>
              </div>
              <footer class="card-footer">
                <a class="card-footer-item complete-todo" @click="completeTodo(todo)" title="Complete">
                  <span class="icon"><i class="fa fa-check"></i></span>
                </a>
                <a class="card-footer-item edit-todo" @click="editTodo(todo)" title="Edit">
                  <span class="icon"><i class="fa fa-pencil"></i></span>
                </a>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<!-- https://scotch.io/tutorials/build-a-to-do-app-with-vue-js-2 -->

<script>
export default {
  name: 'todo-list',
  data () {
    return {
      canAddTodo: false,
      todos: [],
      newTodoText: '',
      apiUrl: 'http://58beac9f4389c312007f4044.mockapi.io/todo'
    }
  },
  methods: {
    checkCanAddTodo (event) {
      this.canAddTodo = this.newTodo !== '';
    },
    addTodo() {
      const id = this.todos.length;
      let newTodo = {
        id: id,
        text: this.newTodoText,
        created_at: new Date(),
        complete: false
      };

      this.todos.push(newTodo);
      this.newTodoText = '';
      this.canAddTodo = false;
    },
    completeTodo() {
      console.log('completing todo');
    },
    editTodo() {
      console.log('editing todo');
    }
  }
}
</script>

<style scoped>
</style>