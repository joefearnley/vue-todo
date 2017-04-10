import Vue from 'vue';
import TodoList from '@/components/TodoList';
import moxios from 'moxios';

describe('Data Initizialization', () => {
  const vm = new Vue(TodoList).$mount();

  it('should initialize data', (done) => {
    expect(vm.canAddTodo).to.equal(false);
    expect(vm.todos.length).to.equal(0);
    expect(vm.newTodoText).to.equal('');
    expect(vm.todoToEdit).to.be.an('object');
    expect(vm.showEditForm).to.equal(false);
    done();
  });
});

describe('Methods', () => {
  const vm = new Vue(TodoList).$mount();
  
  beforeEach(function () {
    moxios.install();
  });

  afterEach(function () {
    moxios.uninstall();
  });

  it('should fetch todos', (done) => {
    const fakeRepsonse = [
      { id: 1, title: 'Todo 1', created_at: new Date(), completed: false },
      { id: 2, title: 'Todo 2', created_at: new Date(), completed: false },
      { id: 3, title: 'Completed Todo 1', created_at: new Date(), completed: true }
    ];
    vm.fetchTodos();
    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: fakeRepsonse
      }).then(() => {
        expect(vm.todos.length).to.equal(2);
        expect(vm.completedTodos.length).to.equal(1);
        done();
      }).catch(done);
    });
  });

  it('should add a todo', (done) => {
    const newTodo = { id: 4, title: 'Todo 3', created_at: new Date(), completed: false };
    vm.addTodo(newTodo);

    expect(vm.todos.length).to.equal(3);
    expect(vm.completedTodos.length).to.equal(1);
    expect(vm.newTodoText).to.equal('');
    expect(vm.canAddTodo).to.equal(false);
    done();
  });

  it('should complete a todo', (done) => {
    const todoToBeCompleted = vm.todos.find((todo) => todo.id = 4);
    vm.completeTodo(todoToBeCompleted);

    expect(vm.todos.length).to.equal(2);
    expect(vm.completedTodos.length).to.equal(2);
    expect(vm.newTodoText).to.equal('');
    expect(vm.canAddTodo).to.equal(false);
    done();
  });
  
  it('should edit a todo', (done) => {
    const todo = vm.todos.find((todo) => todo.id = 1);
    vm.editTodo(todo);

    expect(vm.showEditForm).to.equal(true);
    expect(vm.todoToEdit).to.equal(todo);
    expect(vm.editTodoText).to.equal(todo.title);
    done();
  });
    
  it('should save a todo', (done) => {
    const todo = vm.todos.find((todo) => todo.id = 1);
    vm.editTodoText = 'This is a Todo';
    vm.saveTodo(todo);

    moxios.wait(() => {
      moxios.requests.mostRecent().respondWith({
        status: 200
      }).then(() => {
        expect(vm.todoToEdit.title).to.equal( 'This is a Todo');
        expect(vm.showEditForm).to.equal(false);
        expect(vm.editTodoText).to.equal('');
        done();
      }).catch(done);
    });
  });
  
  it('should delete a todo', (done) => {
    const todo = vm.todos.find((todo) => todo.id = 4);
    expect(vm.todos.length).to.equal(2);

    vm.deleteTodo(todo);

    expect(vm.todos.length).to.equal(1);
    done();
  });
  
  it('should check can add todo', (done) => {
    vm.newTodo = '';
    vm.checkCanAddTodo();
    expect(vm.canAddTodo).to.equal(false);

    vm.newTodo = 'Test';
    vm.checkCanAddTodo();
    expect(vm.canAddTodo).to.equal(true);
    done();
  });

  it('should remove modal', (done) => {
    vm.removeEditModal();

    expect(vm.showEditForm).to.equal(false);
    expect(vm.editTodoText).to.equal('');
    done();
  });

  it('should toggle completed todos', (done) => {
    vm.showCompleted = false;
    vm.toggleCompletedTodos();
    expect(vm.showCompleted).to.equal(true);

    vm.showCompleted = true;
    vm.toggleCompletedTodos();
    expect(vm.showCompleted).to.equal(false);
    done();
  });
});

describe('The Todo list works', () => {

  const todoListVm = new Vue(TodoList).$mount();
  const todoListFakeRepsonse = [
    { id: 1, title: 'Todo 1', created_at: new Date(), completed: false },
    { id: 2, title: 'Todo 2', created_at: new Date(), completed: false },
    { id: 3, title: 'Todo 3', created_at: new Date(), completed: false },
    { id: 4, title: 'Completed Todo 1', created_at: new Date(), completed: true },
    { id: 5, title: 'Completed Todo 2', created_at: new Date(), completed: true }
  ];

  beforeEach(function () {
    moxios.install();
  });

  afterEach(function () {
    moxios.uninstall();
  });

  it('should render the titles', (done) => {
    moxios.wait(() => {
      moxios.requests.mostRecent().respondWith({ 
        status: 200
        //,response: todoListFakeRepsonse
      }).then(() => {
          const todosTitle = todoListVm.$el.querySelector('h1.todos-title').textContent;
          const completedTodosTitle = todoListVm.$el.querySelector('h1.completed-todos-title').textContent;

          expect(todosTitle).to.equal('Todos (2)');
          expect(completedTodosTitle).to.equal('Completed Todos (2)');
          done();
      }).catch(done);
    });
  });
  
  it('should render the todos', (done) => {
    const todoListVm = new Vue(TodoList).$mount();
    moxios.wait(() => {
      moxios.requests.mostRecent().respondWith({ 
        status: 200,
        response: todoListFakeRepsonse
      }).then(() => {

        expect(todoListVm.todos.length).to.equal(3);
        expect(todoListVm.completedTodos.length).to.equal(2);

          const todos = [...todoListVm.$el.querySelectorAll('.todo h3')];
          expect(todos[0].textContent).to.equal('Todo 1');
          expect(todos[1].textContent).to.equal('Todo 2');
          expect(todos[2].textContent).to.equal('Todo 3');

          const completedTodos = [...todoListVm.$el.querySelectorAll('.completed-todo h3')];
          expect(completedTodos[0].textContent).to.equal('Completed Todo 1');
          expect(completedTodos[1].textContent).to.equal('Completed Todo 2');
          done();
      }).catch(done);
    });
  });

  it('should add a todo', (done) => {
    const vm = new Vue(TodoList).$mount();
    
    expect(vm.todos.length).to.equal(0);

    let addTodoInput = vm.$el.querySelector('#add-todo-input');
    let addTodoButton = vm.$el.querySelector('#add-todo-button');

    addTodoInput.value = 'This is a todo';
    addTodoButton.click();

    expect(vm.todos.length).to.equal(1);

    done();
  });

  // TODO:
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
