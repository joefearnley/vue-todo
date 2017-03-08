import Vue from 'vue'
import TodoList from '@/components/TodoList'

describe('TodoList.vue', () => {

  const Constructor = Vue.extend(TodoList);
  const vm = new Constructor().$mount();

  it('should render the title', () => {
    expect(vm.$el.querySelector('.hero-body h1.title').textContent).to.equal('Todos');
  });

  it('should initialize data', () => {
      expect(vm.canAddTodo).to.equal(false);
      expect(vm.todos.length).to.equal(0);
      expect(vm.newTodoText).to.equal('');
      expect(vm.todoToEdit).to.be.an('object');
      expect(vm.showEditForm).to.equal(false);
  });
});