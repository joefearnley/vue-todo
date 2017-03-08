<template>
  <div class="todo">
    <div class="column is-one-quarter" id="todo-${todo.id}">
      <div class="card">
        <div class="card-content">
          <div class="content">
            <h3>${todo.todo}</h3>
            <small>${todo.created_at.toDateString()}</small>
          </div>
        </div>
        <footer class="card-footer">
          <a class="card-footer-item complete-todo" data-id="${todo.id}" title="Complete">
            <span class="icon"><i class="fa fa-check"></i></span>
          </a>
          <a class="card-footer-item edit-todo" v:onclick="" title="Edit">
            <span class="icon"><i class="fa fa-pencil"></i></span>
          </a>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'todo',
  data () {
    return {
      todo: {},
    }
  }
}
</script>


<style scoped>
</style>
