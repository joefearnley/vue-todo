const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const expect = chai.expect;
const axios = require('axios');

setResource('todos');
chai.use(chaiHttp);

describe('Todos', () => {

  beforeEach(() => {
    initializeData();
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
  
  async function initializeData() {
    let todos = await axios.get('http://5a0c4a196c25030012c335c9.mockapi.io/todos');
    await axios.delete(`http://5a0c4a196c25030012c335c9.mockapi.io/todos/${todos.data[0].id}`);
    await axios.delete(`http://5a0c4a196c25030012c335c9.mockapi.io/todos/${todos.data[1].id}`);
    await axios.delete(`http://5a0c4a196c25030012c335c9.mockapi.io/todos/${todos.data[2].id}`);

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

    await axios.post('http://5a0c4a196c25030012c335c9.mockapi.io/todos',  todo1);
    await axios.post('http://5a0c4a196c25030012c335c9.mockapi.io/todos', todo2);
    await axios.post('http://5a0c4a196c25030012c335c9.mockapi.io/todos', todo3);
  }
});

