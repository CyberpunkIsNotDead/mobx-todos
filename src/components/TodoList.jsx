import React from "react";
import { observer } from "mobx-react";
import TodoItem from "./TodoItem";

function TodoList({ todos }) {
  return (
    <>
      <ul
        style={{
          listStyleType: "none",
          margin: 0,
          padding: 0,
        }}
      >
        {todos.map((todo, index) => (
          <TodoItem todo={todo} key={index} />
        ))}
      </ul>
    </>
  );
}

export default observer(TodoList);
