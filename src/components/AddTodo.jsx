import React from 'react'
import {
  useLocalStore,
  useObserver,
  // observer
} from 'mobx-react'
import TodoStore from '../store/TodoStore'


export default function AddTodo() {

  const input = useLocalStore(() => ({
    value: '',
    setInput(value) {
      this.value = value
    }
  }))

  const onSubmit = event => {
    event.preventDefault()
    TodoStore.addTodo(input.value)
    input.setInput('')
  }

  const onChange = event => {
    event.preventDefault()
    input.setInput(event.target.value)
  }

  return useObserver(() => (
    <form
      onSubmit={onSubmit}
    >
      <input
        type="text"
        value={input.value}
        onChange={onChange}
      />
      <button
        value="submit"
      >
        add todo
      </button>
    </form>
  ))
}

// export default observer(AddTodo)
