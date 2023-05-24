import React, { useState, useContext } from 'react'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Task = ( props ) => {

    const { task, setTodoList, todoList } = props; 
    const taskName = task.taskName
    const id = task.id
    const [status, setStatus] = useState(task.done)

    const deleteTask = () => {
      setTodoList(todoList => todoList.filter(task => task.id !== id))
    }
  
    return (
      <div className = "flex flex-row space-x-2 m-2 py-2 px-5 text-white bg-blue-500 hover:shadow-md hover:shadow-blue-500 duration-200 ease active:scale-95"
      onClick = {() => setStatus(() => {
        setTodoList(todoList => {
          return todoList.map(task => {
            if (task.id === id){
              return { id: id, taskName: taskName, done: !status } 
            }
            else{
              return task
            }
          })
        })
        return !status
      })}>
        <input type = "checkbox" checked = { status } onChange ={ event => {
          setStatus(event.target.checked)
        }}/>
        { status ? <p className = 'line-through flex-grow px-2'>{ taskName }</p> : <p className = "flex-grow px-2">{ taskName }</p>}
        <button className = "flex-shrink px-4" onClick = { deleteTask }><FontAwesomeIcon icon = { faTrash } /></button>
      </div>
    )
}

export default Task