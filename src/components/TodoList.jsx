import React from "react";
import TodoItem from "./TodoItem";

function TodoList({ todos }) {
  console.log(todos);
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

export default TodoList;
