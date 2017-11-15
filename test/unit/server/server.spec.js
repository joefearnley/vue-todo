const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const expect = chai.expect;
const axios = require('axios');

chai.use(chaiHttp);

describe('Todos', () => {

  beforeEach(() => {
    initializeData();
  });

  it('should have no todos', (done) => {
    chai.request(server)
      .get('/todos')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('array');
        expect(res.body.length).to.equal(0);
        done();
      });
  });
  
  async function initializeData() {
    console.log('alskfjalskjdflaskjdf');
    let todos = await axios.get('http://5a0c4a196c25030012c335c9.mockapi.io/todos');
    todos.data.forEach( todo => {
      console.log(todo);
    });

    let newTodo = {
      title: 'title 1',
      created_at: new Date(),
      completed: false
    };

    let todo = await axios.post('http://5a0c4a196c25030012c335c9.mockapi.io/todos', newTodo);
  }
});

