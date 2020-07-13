import {
  observable,
  action,
  computed,
  decorate,
  autorun,
  reaction,
} from "mobx";

class TodoStore {
  constructor() {
    autorun(() => {
      this.fetchTodos().then(() => this.filterTodos("all"));
    });
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

    isLoading: false,
  };

  setTodos(todos) {
    const newTodos = { ...this.todos, ...todos };
    this.todos = newTodos;
  }

  async fetchTodos() {
    this.setTodos({ isLoading: true });
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos?_limit=10"
    );
    const json = await response.json();
    this.setTodos({
      data: json,
      isLoading: false,
    });
  }

  addTodo(title) {
    const newId = Date.now();
    const newTodo = {
      userId: 1,
      id: newId,
      title: title,
      completed: false,
    };
    const newData = [...this.getAll, newTodo];
    this.setTodos({ data: newData });
  }

  delTodo(id) {
    const newData = this.getAll.filter((todo) => todo.id !== id);
    this.setTodos({ data: newData });
  }

  completeTodo(id) {
    const newData = this.getAll.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });

    this.setTodos({ data: newData });
  }

  get getAll() {
    return this.todos.data;
  }

  get getActive() {
    return this.todos.data.filter((todo) => !todo.completed);
  }

  get getCompleted() {
    return this.todos.data.filter((todo) => todo.completed);
  }

  filtered = [];

  setFiltered = reaction(
    () => this.todos.data,
    () => this.filterTodos("all")
  );

  filterTodos(filterBy) {
    switch (filterBy) {
      case "all":
        this.filtered = this.getAll;
        break;
      case "active":
        this.filtered = this.getActive;
        break;
      case "completed":
        this.filtered = this.getCompleted;
        break;
      default:
        this.filtered = this.getAll;
    }
  }
}

const todoStore = decorate(TodoStore, {
  todos: observable,
  fetchTodos: action,
  addTodo: action,
  delTodo: action,
  getActive: computed,
  getCompleted: computed,
  filterTodos: action,
  filtered: observable,
});

export default new todoStore();
