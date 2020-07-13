import React from 'react'
import TodoStore from '../store/TodoStore'

export default function TodoItem({todo}) {

  return (
    <li
      style={{
        border: "1px solid #ccc",
        margin: "5px",
        display: "flex",
        justifyContent: "space-between"
      }}
    >
      <input
        type='checkbox'
        checked={todo.completed}
        onChange={() => TodoStore.completeTodo(todo.id)}
      />
      <span>
        {todo.id}
      </span>
      <span>
        {todo.title}
      </span>
      <button
        onClick={_ => TodoStore.delTodo(todo.id)}
      >
        del todo
      </button>
    </li>
  )
}
