'use client'

import { useState, ChangeEventHandler, MouseEventHandler } from 'react'
import AddTodoForm from '@/components/AddTodoForm'
import PageTitle from '@/components/PageTitle'
import ListItem from '@/components/ListItem'

function Home() {
  const [todoList, setTodoList] = useState<Todo[]>([])
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null)
  const [isFormEdit, setIsFormEdit] = useState<boolean>(false)

  const onAddTodo = (todo: Todo) => {
    if (!isFormEdit) {
      setTodoList([...todoList, todo])
    } else {
      const findTodo = todoList.findIndex((item) => item.id === todo.id)
      const updatedState = [...todoList]
      updatedState[findTodo].text = todo.text
      setTodoList(updatedState)
    }
    setCurrentTodo(null)
    setIsFormEdit(false)
  }

  const onInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const updatedTodos = [...todoList]
    const findTodo = todoList.findIndex(
      (todo) => todo.id == e.currentTarget.name
    )
    updatedTodos[findTodo].isDone = !updatedTodos[findTodo].isDone
    setTodoList(updatedTodos)
  }

  const onEditTodo: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation()
    const findTodo = todoList.findIndex(
      (todo) => todo.id === e.currentTarget.id
    )
    setCurrentTodo(todoList[findTodo])
    setIsFormEdit(true)
  }

  const onDeleteTodo: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation()
    const updatedTodos = todoList.filter(
      (todo) => todo.id !== e.currentTarget.id
    )
    setTodoList(updatedTodos)
  }

  return (
    <main className="sm:max-w-sm mx-auto py-12 px-3">
      <PageTitle title="Todo List App" />
      <AddTodoForm
        isEdit={isFormEdit}
        currentTodo={currentTodo}
        onAddTodo={onAddTodo}
      />
      {todoList && todoList.length > 0 ? (
        <ul>
          {todoList.map((todo, idx) => (
            <ListItem
              todo={todo}
              onEditTodo={onEditTodo}
              onDeleteTodo={onDeleteTodo}
              onInputChange={onInputChange}
              key={todo.id}
            />
          ))}
        </ul>
      ) : (
        <p className="text-xs text-gray-400 text-center">Todo list is empty.</p>
      )}
    </main>
  )
}

export default Home
