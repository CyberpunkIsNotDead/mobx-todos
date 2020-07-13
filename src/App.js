import React, { useEffect } from "react";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";
import TodoStore from "./store/TodoStore";
import { observer, useLocalStore, useObserver } from "mobx-react";

function App() {
  const isLoading = TodoStore.todos.isLoading;

  const todos = useLocalStore(() => ({
    data: [],
    setTodos(todos) {
      this.data = todos;
    },
  }));

  const showActive = () => {
    const newTodos = TodoStore.getActive;
    todos.setTodos(newTodos);
  };

  const showCompleted = () => {
    const newTodos = TodoStore.getCompleted;
    todos.setTodos(newTodos);
  };

  const showAll = () => {
    const newTodos = TodoStore.getAll;
    todos.setTodos(newTodos);
  };

  // eslint-disable-next-line
  useEffect(() => showAll(), [TodoStore.getAll]);

  return useObserver(() => (
    <div className="App">
      <AddTodo />
      <div>
        <button onClick={() => showActive()}>show active</button>
        <button onClick={() => showCompleted()}>show completed</button>
        <button onClick={() => showAll()}>show all</button>
      </div>
      {isLoading ? <p>loading...</p> : <TodoList todos={todos.data} />}
    </div>
  ));
}

export default observer(App);
