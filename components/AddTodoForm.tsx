import React, { FormEventHandler, ChangeEventHandler } from 'react'
import { useState, useEffect } from 'react'
import { v4 as uuid } from 'uuid'

type AddTodoFormProps = {
  onAddTodo: (todo: Todo) => void
  currentTodo?: Todo | null
  isEdit: boolean
}

const initialState: Todo = {
  id: '',
  text: '',
  isDone: false,
}

function AddTodoForm(props: AddTodoFormProps) {
  const { onAddTodo, currentTodo, isEdit } = props
  const [todo, setTodo] = useState<Todo>(initialState)

  const onFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    onAddTodo(todo!)
    setTodo(initialState)
  }

  const onInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!isEdit) {
      setTodo({
        id: uuid(),
        text: e.currentTarget.value,
        isDone: false,
      })
    } else {
      setTodo({ ...todo, text: e.target.value })
    }
  }

  useEffect(() => {
    if (currentTodo !== null) {
      setTodo(currentTodo!)
    }
  }, [currentTodo])

  return (
    <form
      onSubmit={onFormSubmit}
      className="flex flex-row item-center justify-between mb-3 lg:mb-6"
    >
      <input
        onChange={onInputChange}
        className="w-full text-base text-gray-600 border border-e-0 border-gray-400 p-3 outline-none focus-within:border-gray-600 transition-colors rounded-s-md placeholder:text-xs"
        type="text"
        placeholder="Add new todo"
        value={todo.text}
      />
      <button
        className="bg-gray-500 text-sm md:text-base text-white font-semibold border-none border-gray-400 py-2 px-4 rounded-e-md cursor-pointer"
        type="submit"
      >
        {isEdit ? 'Update' : 'Add'}
      </button>
    </form>
  )
}

export default AddTodoForm
