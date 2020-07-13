import React from "react";
import { inject, observer } from "mobx-react";

function TodoItem({ todo, TodoStore }) {
  return (
    <li
      style={{
        border: "1px solid #ccc",
        margin: "5px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => TodoStore.completeTodo(todo.id)}
      />
      <span>{todo.id}</span>
      <span>{todo.title}</span>
      <button onClick={() => TodoStore.delTodo(todo.id)}>del todo</button>
    </li>
  );
}

export default inject("TodoStore")(observer(TodoItem));
