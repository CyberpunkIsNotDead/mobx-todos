import {
  observable,
  action,
  computed,
  decorate,
  autorun
} from 'mobx'

class TodoStore {

  constructor() {
    autorun(() => this.fetchTodos())
  }

  todos = {
    data: [
      // {
      //   "userId": 1,
      //   "id": 1,
      //   "title": "delectus aut autem",
      //   "completed": false
      // },
      // {
      //   "userId": 1,
      //   "id": 2,
      //   "title": "quis ut nam facilis et officia qui",
      //   "completed": false
      // },
      // {
      //   "userId": 1,
      //   "id": 3,
      //   "title": "fugiat veniam minus",
      //   "completed": false
      // },
    ],

    isLoading: false
  }

  // setTodos(todos) {
  //   const newTodos = {...this.todos, data: }
  // }

  fetchTodos() {
    this.todos = {...this.todos, isLoading: true}
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
    .then(response => response.json())
    .then(json => {
      this.todos = {
        ...this.todos,
        data: json,
        isLoading: false
      }
    })
  }

  addTodo(title) {
    const newId = Date.now()
    const newTodo = {
      "userId": 1,
      "id": newId,
      "title": title,
      "completed": false
    }
    this.todos.data.push(newTodo)
  }
  
  delTodo(id) {
    const newTodos = this.todos.data
      .filter(todo => todo.id !== id)
    this.todos.data = newTodos
  }

  completeTodo(id) {
    const newTodos = this.todos.data.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed 
      };
      return todo;
    })

    this.todos.data = newTodos
  }
  
  get getActive() {
    return this.todos.data.filter(todo => !todo.completed)
  }
  
  get getCompleted() {
    return this.todos.data.filter(todo => todo.completed)
  }
}

const todoStore = decorate(TodoStore, {
  todos: observable,
  fetchTodos: action,
  addTodo: action,
  delTodo: action,
  getActive: computed,
  getCompleted: computed
})

export default new todoStore()
