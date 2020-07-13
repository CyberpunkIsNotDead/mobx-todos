import React from "react";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";
import { observer, inject } from "mobx-react";

function App({ TodoStore }) {
  const isLoading = TodoStore.todos.isLoading;
  console.log(TodoStore.filtered);

  const showActive = () => {
    TodoStore.filterTodos("active");
  };

  const showCompleted = () => {
    TodoStore.filterTodos("completed");
  };

  const showAll = () => {
    TodoStore.filterTodos("all");
  };

  return (
    <div className="App">
      <AddTodo />
      <div>
        <button onClick={() => showActive()}>show active</button>
        <button onClick={() => showCompleted()}>show completed</button>
        <button onClick={() => showAll()}>show all</button>
      </div>
      {isLoading ? <p>loading...</p> : <TodoList todos={TodoStore.filtered} />}
    </div>
  );
}

export default inject("TodoStore")(observer(App));
