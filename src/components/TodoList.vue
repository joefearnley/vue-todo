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
                  <input class="input" type="text" name="new-todo" 
                    v-model="newTodoText" 
                    @keyup="checkCanAddTodo" 
                    placeholder="Add thing to do">
                  <a id="add-todo-button" class="button is-primary" 
                    :class="{ 'is-disabled': !canAddTodo  }" 
                    @click="addTodo">
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
                  <h3>{{ todo.title }}</h3>
                  <small>{{ todo.created_at | moment('MMM Do YYYY') }}</small>
                </div>
              </div>
              <footer class="card-footer">
                <a class="card-footer-item complete-todo" title="Complete" 
                    @click="completeTodo(todo)">
                  <span class="icon"><i class="fa fa-check"></i></span>
                </a>
                <a class="card-footer-item edit-todo" title="Edit"
                    @click="editTodo(todo)">
                  <span class="icon"><i class="fa fa-pencil"></i></span>
                </a>
                <a class="card-footer-item edit-todo" title="Delete"
                    @click="deleteTodo(todo)">
                  <span class="icon"><i class="fa fa-times"></i></span>
                </a>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="modal" :class="{ 'is-active': showEditForm  }" >
      <div class="modal-background"></div>
      <input class="input" type="hidden" v-model="todoToEdit">
      <div class="modal-content">
        <div class="box">
          <p class="control">
            <input class="input" type="text" v-model="editTodoText">
          </p>
          <div class="control is-grouped">
            <p class="control">
              <button class="button is-primary" @click="saveTodo">Save</button>
            </p>
            <p class="control">
              <button class="button is-light" @click="removeEditModal">Cancel</button>
            </p>
          </div>
        </div>
      </div>
      <button class="modal-close" @click="removeEditModal"></button>
    </div>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'todo-list',
  data () {
    return {
      canAddTodo: false,
      todos: [],
      newTodoText: '',
      editTodoText: '',
      todoToEdit: {},
      showEditForm: false,
      apiUrl: 'http://58beac9f4389c312007f4044.mockapi.io/todo'
    }
  },
  mounted() {
    this.fetchTodos();
  },
  methods: {
    checkCanAddTodo (event) {
      this.canAddTodo = this.newTodo !== '';
    },
    fetchTodos() {
      axios.get(this.apiUrl)
        .then(response => {
          this.todos = response.data.filter(todo => !todo.completed);
        });
    },
    addTodo() {
      const id = this.todos.length;
      let newTodo = {
        id: id,
        title: this.newTodoText,
        created_at: new Date(),
        completed: false
      };

      axios.post(this.apiUrl)
        .then(response => {
          this.todos.push(newTodo);
          this.newTodoText = '';
          this.canAddTodo = false;
        });
    },
    completeTodo(todo) {
      todo.completed = true;
      axios.put(this.apiUrl + '/' + todo.id, todo)
        .then(response => {
          this.todos = this.todos.filter(todo => todo.id != response.data.id);
          this.newTodoText = '';
          this.canAddTodo = false;
        });
    },
    editTodo(todo) {
      this.showEditForm = true;
      this.todoToEdit = todo;
      this.editTodoText = todo.title;
    },
    saveTodo() {
      this.todoToEdit.title = this.editTodoText;
      axios.put(this.apiUrl + '/' + this.todoToEdit.id, this.todoToEdit)
        .then(response => {
          this.removeEditModal();
        });
    },
    deleteTodo(todo) {
      axios.delete(this.apiUrl + '/' + todo.id)
        .then(response => {
          this.todos = this.todos.filter(todo => todo.id != response.data.id);
        });
    },
    removeEditModal() {
      this.showEditForm = false;
      this.editTodoText = '';
    }
  }
}
</script>

<style scoped>
</style>