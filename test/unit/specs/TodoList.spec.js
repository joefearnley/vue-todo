import Vue from 'vue';
import TodoList from '@/components/TodoList';
import moxios from 'moxios';

describe('Data Initizialization', () => {
  const vm = new Vue(TodoList).$mount();

  it('should initialize data', () => {
    expect(vm.canAddTodo).to.equal(false);
    expect(vm.todos.length).to.equal(0);
    expect(vm.newTodoText).to.equal('');
    expect(vm.todoToEdit).to.be.an('object');
    expect(vm.showEditForm).to.equal(false);
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
    moxios.wait(function () {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: fakeRepsonse
      }).then(function () {
        expect(vm.todos.length).to.equal(2);
        expect(vm.completedTodos.length).to.equal(1);
        done();
      });
    });
  });

  it('should add a todo', (done) => {
    const newTodo = {
      id: 4,
      title: 'Todo 3',
      created_at: new Date(),
      completed: false
    };

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
});

// describe('The Todo list renders properly', () => {
//   const vm = new Vue(TodoList).$mount();
//   vm.todos.push({id: 1, title: 'Todo 1', created_at: new Date(), completed: false });
//   vm.todos.push({ id: 2, title: 'Todo 2', created_at: new Date(), completed: false });
//   vm.todos.push({ id: 2, title: 'Completed Todo 1', created_at: new Date(), completed: true });
  
//   beforeEach(function () {
//     moxios.install();
//   });

//   afterEach(function () {
//     moxios.uninstall();
//   });

//   it('should render the title', () => {
//     expect(vm.$el.querySelector('h1.todos-title').textContent)
//       .to.equal('Todos (2)');
//   });
  
//   it('should render the todos', () => {
//     const todos = [...vm.$el.querySelectorAll('.todo h3')];
//     expect(todos[0].textContent).to.equal('Todo 1');
//     expect(todos[1].textContent).to.equal('Todo 2');
//   });
  
//   it('should render the completed todos title', () => {
//     expect(vm.$el.querySelector('h1.completed-todos-title').textContent)
//       .to.equal('Completed Todos (1)');
//   });
// });


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
//});

