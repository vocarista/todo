import { useState, useRef, useEffect } from 'react'
import { useLocalStorage } from 'react-use'
import Task from './components/Task'
import './App.css'

function App() {
  const [todoList, setTodoList] = useState([])
  const [savedList, setSavedList] = useLocalStorage('savedList', [])
  const [curTask, setCurTask] = useState("")
  const inputBox = useRef(null)

  const addTask = () => {
    setTodoList(todoList => {
      if (curTask !== ""){
      return [ ...todoList, { id: Math.floor((Math.random())*1000000), taskName: curTask, done: false} ]
      }
      else{
        return todoList
      }
    })
    inputBox.current.value = ""
    setCurTask('')
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
      <h1 className = "text-5xl my-10 font-extrabold text-slate-200">Write your goals here</h1>
      <input type = "text" id = "textbox" className = "border-2 border-blue-500
      mb-10 w-96 h-10 p-2
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
      <button id = "add-task" className = "border-2 border-blue-500 h-10 mx-5 mb-10 px-5 hover:bg-blue-500
      text-slate-200
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
        {todoList.map(task => {
          return (
            <Task task = { task } setTodoList = { setTodoList } todoList = { todoList }/>
          )
        })}
      </div>
  </div></>
  )
}

export default App
