import React, { useEffect, useState } from 'react'
import TodoList from './components/TodoList'
import AddTodo from './components/AddTodo';
import TodoStore from './store/TodoStore'
import { observer, useLocalStore, useObserver } from 'mobx-react';

function App() {
  const data = TodoStore.todos.data
  const isLoading = TodoStore.todos.isLoading

  const todos = useLocalStore(() => ({
    data: data,
    setTodos(todos) {
      this.data = todos
    }
  }))

  const showActive = () => {
    const newTodos = TodoStore.getActive
    todos.setTodos(newTodos)
  }

  const showCompleted = () => {
    const newTodos = TodoStore.getCompleted
    todos.setTodos(newTodos)
  }

  const showAll = () => {
    const newTodos = TodoStore.todos.data
    todos.setTodos(newTodos)
  }

  useEffect(() => showAll(), [TodoStore.todos.data])

  return useObserver(() => (
    <div className="App">
      <AddTodo />
      <div>
        <button onClick={_ => showActive()}>
          show active
        </button>
        <button onClick={_ => showCompleted()}>
          show completed
        </button>
        <button onClick={_ => showAll()}>
          show all
        </button>
      </div>
      {
        isLoading
        ? <p>loading...</p>
        : <TodoList todos={todos.data} />
      }
    </div>
  ));
}

export default observer(App);

// function App2() {

//   const [state, setState] = useState(null)

//   const show = () => {
//     setState(true)
//   }

//   return (
//     <>
//     <button
//       onClick={_ => show()}
//     >click me</button>
//     {
//       state ? <App /> : null
//     }
//     </>
//   )
// }

// export default observer(App2)
