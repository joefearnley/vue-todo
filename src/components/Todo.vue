<template>
<div>
<div class="todo">
  <div class="card">
    <div class="card-content">
      <div class="content">
        <h3>{{ title }}</h3>
        <small>{{ created_at | moment('MMM Do YYYY') }}</small>
      </div>
    </div>
    <footer class="card-footer">
      <a class="card-footer-item complete-todo" title="Complete" @click="completeTodo(todo)">
        <span class="icon"><i class="fa fa-check"></i></span>
      </a>
      <a class="card-footer-item edit-todo" title="Edit" @click="editTodo(todo)">
        <span class="icon"><i class="fa fa-pencil"></i></span>
      </a>
      <a class="card-footer-item edit-todo" title="Delete" @click="deleteTodo(todo)">
        <span class="icon"><i class="fa fa-times"></i></span>
      </a>
    </footer>
  </div>
</div>
<div class="modal" :class="{ 'is-active': showEditForm }" >
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
export default {
  name: 'todo',
  props: ['todo'],
  data() {
    return {
      id: this.todo.id,
      title: this.todo.title,
      created_at: this.todo.created_at,
      editTodoText: false,
      todoToEdit: {},
      editTodoText: '',
      showEditForm: false,
      apiUrl: 'http://58beac9f4389c312007f4044.mockapi.io/todo'
    }
  },
  methods: {
    completeTodo(todo) {
      axios.put(this.apiUrl + '/' + this.id, todo)
        .then(response => {
            this.$parent.$options.methods.featchTodos();
        });
    },
    editTodo(todo) {
    },
    saveTodo() {
    },
    deleteTodo(todo) {
    },
     removeEditModal() {
       this.showEditForm = false;
       this.editTodoText = '';
     },
  }
}
</script>
