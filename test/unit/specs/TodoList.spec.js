import Vue from 'vue';
import TodoList from '@/components/TodoList';
import moxios from 'moxios';

describe('TodoList.vue', () => {

  const Constructor = Vue.extend(TodoList);
  const vm = new Constructor().$mount();
  
  vm.todos.push({
      id: 1,
      title: 'Todo 3',
      created_at: new Date(),
      completed: false
    });
    
  vm.todos.push({
      id: 2,
      title: 'Todo 3',
      created_at: new Date(),
      completed: false
  });

  beforeEach(function () {
    moxios.install();
  });

  afterEach(function () {
    moxios.uninstall();
  });

  it('should render the title', () => {
    expect(vm.$el.querySelector('h1.todos-title').textContent)
      .to.equal('Todos (2)');
  });

  it('should initialize data', () => {
      expect(vm.canAddTodo).to.equal(false);
      expect(vm.todos.length).to.equal(2);
      expect(vm.newTodoText).to.equal('');
      expect(vm.todoToEdit).to.be.an('object');
      expect(vm.showEditForm).to.equal(false);
  });

  it('should add a todo', (done) => {
    
    const newTodo = {
      id: 3,
      title: 'Todo 3',
      created_at: new Date(),
      completed: false
    };

    vm.addTodo(newTodo);

    moxios.wait(function () {
      moxios.requests.mostRecent().respondWith({
        status: 200
      }).then(function () {
        //let list = document.querySelector()
        // equal(list.rows.length, 2)
        // equal(list.rows[0].cells[0].innerHTML, 'Fred')
        // equal(list.rows[1].cells[0].innerHTML, 'Wilma')

        console.log(vm.todos.length);

        expect(vm.todos.length).to.equal(3);
        expect(vm.newTodoText).to.equal('');
        expect(vm.canAddTodo).to.equal(false);
        done();
      });
    });

  });

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

