import Vue from 'vue'
import TodoList from '@/components/TodoList'

describe('TodoList.vue', () => {

  const Constructor = Vue.extend(TodoList);
  const vm = new Constructor().$mount();

  it('should render the title', () => {
    expect(vm.$el.querySelector('h1.todos-title').textContent).to.equal('Todos (0)');
  });

  it('should initialize data', () => {
      expect(vm.canAddTodo).to.equal(false);
      expect(vm.todos.length).to.equal(0);
      expect(vm.newTodoText).to.equal('');
      expect(vm.todoToEdit).to.be.an('object');
      expect(vm.showEditForm).to.equal(false);
  });

  it('should add a todo', () => {
  })''

  // TODO:
  // - show add todo input
  // - show initial list
  // - add todo
  // - complete todo
  // - edit todo
  // - delete todo
  // 
  // - completed list?
  // - delete from completed list?
  // - move completed back to not completed?
});

