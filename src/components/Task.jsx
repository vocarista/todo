import React, { useState, useContext } from 'react'
import Context from '../helpers/Context'

const Task = ( props ) => {

    const { setTodoList } = useContext(Context)
    const { task } = props; 
    const taskName = task.taskName
    const [status, setStatus] = useState(task.done)

    const deleteTask = () => {
      setTodoList(todoList => todoList.filter(task => task.taskName !== taskName))
    }
  
    return (
      <div className = "flex flex-row space-x-2 m-2 py-2 px-5 text-white bg-blue-500 hover:shadow-md hover:shadow-blue-500 duration-200 ease active:scale-95"
      onClick = {() => setStatus(() => {
        setTodoList(todoList => {
          return [...todoList, { taskName: taskName, done: !status }]
        })
        return !status
      })}>
        <input type = "checkbox" checked = { status } onChange ={ event => {
          setStatus(event.target.checked)
        }}/>
        { status ? <p className = 'line-through flex-grow px-2'>{ taskName }</p> : <p className = "flex-grow px-2">{ taskName }</p>}
        <button className = "flex-shrink" onClick = {deleteTask}><FontAwesomeIcon icon = {faTrash} /></button>
      </div>
    )
}

export default Task