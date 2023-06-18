import React, {Component, useState} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import TodoForm from './TodoForm'
import TodoList from './TodoList'
import Footer from './Footer'
import { saveTodo } from '../lib/service'


const TodoApp=()=> {
 const[currentTodo, setCurrentTodo] = useState('')
 const[todos, setTodos] = useState([])
  const[error, setError] = useState({})

const handleFormInput = (e) =>{
setCurrentTodo(e.target.value)
}
   /*onchange will not work since this 
          is not native input
<TodoForm onChange={handleFormInput} currentTodo={currentTodo}/>
       
    it needs to be passed into the component 
    where it can be used correctly*/
  const handleTodoSubmit=(eventT)=>{
    eventT.preventDefault()
    const newTodo = {name: currentTodo, isComplete: false}
    saveTodo(newTodo)
      .then(({data}) => 
        setTodos(prev=>
          [...prev,data]
        ) //need to pass as an array
       ,
        setCurrentTodo('')
      )
      .catch(error=>{
         setError({error:true})
        })
  }

    return (
      <Router>
        <div>
          <header className="header">
            <h1>todos</h1>
            {error? <span style={{background:'red', 'font-size': '34px', 'color':'white'}} className="error">Error Occured</span>:null}
            <TodoForm handleTodoSubmit={handleTodoSubmit} handleFormInput={handleFormInput} currentTodo={currentTodo}/>
          </header>
          <section className="main">
            <TodoList todos={todos} />
          </section>
          <Footer />
        </div>
      </Router>
    )
  
  }

  export default  TodoApp