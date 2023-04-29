import { useState, useRef, useEffect } from 'react'
import { useLocalStorage } from 'react-use'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './App.css'


function App() {
  const [todoList, setTodoList] = useState([])
  const [savedList, setSavedList] = useLocalStorage('savedList', [])
  const [curTask, setCurTask] = useState("")
  const inputBox = useRef(null)

  const addTask = () => {
    setTodoList(todoList => {
      if (curTask !== ""){
      return [ ...todoList, curTask ]
      }
      else{
        return todoList
      }
    })
    inputBox.current.value = ""
    setCurTask('')
  }

  const Task = ( props ) => {
  
    const { taskName } = props; 
    const [status, setStatus] = useState(false)

    const deleteTask = () => {
      setTodoList(todoList => todoList.filter(task => task !== taskName))
    }
  
    return (
      <div className = "flex flex-row space-x-2 m-2 py-2 px-5 text-white bg-blue-500 hover:shadow-md hover:shadow-blue-500 duration-200 ease active:scale-95"
      onClick = {() => setStatus(!status)}>
        <input type = "checkbox" checked = { status } onChange ={ event => {
          setStatus(event.target.checked)
        }}/>
        { status ? <p className = 'line-through flex-grow px-2'>{ taskName }</p> : <p className = "flex-grow px-2">{ taskName }</p>}
        <button className = "flex-shrink" onClick = {deleteTask}><FontAwesomeIcon icon = {faTrash} /></button>
      </div>
    )
  }

  useEffect (() => {
    //saving the list to the local storage everytime it changes
    localStorage.setItem('savedList', JSON.stringify(todoList))
  }, [todoList])

  useEffect(() => {
    //load the list from local storage whenever the application mounts
    const savedTodoList = JSON.parse(localStorage.getItem('savedList'))
    if (savedTodoList !== null) {
      setSavedList(savedTodoList)
    }
  }, [])
  useEffect(() => {
    if (savedList.length > 0){
      setTodoList(savedList)
    }
  }, [savedList])

  return (<>
    <div className = "App text-xl font-semibold">
      <h1 className = "text-5xl my-5 font-extrabold">Write your goals here</h1>
      <input type = "text" id = "textbox" className = "border-2 border-blue-500
      my-5 w-96 h-10 p-2
      hover:shadow-sm hover:shadow-blue-500
      focus:shadow-lg focus:shadow-blue-500
      focus:outline-none
      focus:border-none
      duration-200
      ease"
      onChange = {event => {
        setCurTask(event.target.value)
      }}
      placeholder = "Enter a goal..."
      ref = { inputBox } 
      onKeyDown = {event => {
        if(event.keyCode === 13){
          addTask()
        }
      }} />
      <button id = "add-task" className = "border-2 border-blue-500 h-10 mx-5 px-5 hover:bg-blue-500
      hover:text-white
      transition
      duration-200
      active:scale-95
      hover:shadow-lg
      hover:shadow-blue-500
      ease"
      onClick = { addTask }>Add task</button>
      <hr />
      <div id = "tasklist" className = "grid grid-flow-row place-content-center">
        {todoList.map((val, key) => {
          return (
            <Task taskName = {val} />
          )
        })}
      </div>
  </div></>
  )
}

export default App
