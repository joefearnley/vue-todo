import Vue from 'vue'
import TodoList from '@/components/TodoList'

describe('Hello.vue', () => {
  it('should render the title', () => {
    const Constructor = Vue.extend(TodoList);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('.hero-body h1.title').textContent)
        .to.equal('Todos');
  })
});