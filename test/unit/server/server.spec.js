const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const expect = chai.expect;
const axios = require('axios');

setResource('todos-test');
chai.use(chaiHttp);

describe('Todos', () => {

  beforeEach(async () => {
    await initializeData();
  });

  it('should get all todos', (done) => {
    chai.request(server)
      .get('/todos')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('array');
        expect(res.body.length).to.equal(3);
        done();
      });
  });

  it('should get a todo', (done) => {
    chai.request(server)
      .get('/todos/1')
      .end((err, res) => {
        expect(res).to.have.status(200);

        const todo1 = res.body[0];
        expect(todo1.id).to.equal(1);
        expect(todo1.title).to.equal('Todo 1');
        expect(todo1.completed).be.false;
        done();
      });
  });
  
  async function initializeData() {
    const response = await axios.get('http://5a0c4a196c25030012c335c9.mockapi.io/todos-test');
    const todos = response.data;
    for (let i = 0; i < todos.length; i++) {
      await axios.delete(`http://5a0c4a196c25030012c335c9.mockapi.io/todos-test/${todos[i].id}`);
    }

    const todo1 = {
      title: 'Todo 1',
      created_at: new Date(),
      completed: false
    };

    const todo2 = {
      title: 'Todo 2',
      created_at: new Date(),
      completed: false
    };

    const todo3 = {
      title: 'Todo 3',
      created_at: new Date(),
      completed: false
    };

    await axios.post('http://5a0c4a196c25030012c335c9.mockapi.io/todos-test', todo1);
    await axios.post('http://5a0c4a196c25030012c335c9.mockapi.io/todos-test', todo2);
    await axios.post('http://5a0c4a196c25030012c335c9.mockapi.io/todos-test', todo3);
  }
});

