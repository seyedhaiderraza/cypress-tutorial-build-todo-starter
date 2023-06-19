import React, {Component, useEffect, useState} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import TodoForm from './TodoForm'
import TodoList from './TodoList'
import Footer from './Footer'
import { deleteTodos, loadTodos, saveTodo, updateTodos } from '../lib/service'


const TodoApp=()=> {
 const[currentTodo, setCurrentTodo] = useState('')
 const[todos, setTodos] = useState([])
  const[error, setError] = useState({})

    useEffect(()=>{

      loadTodos()
      .then((data)=>{
        console.log("loadTodos", data)
         //depending on this we find the object is data{data: Array(5)...}
         setTodos(prev=>{
          return [...prev, ...data.data] 
        })
   
    })
    .catch(error=>{
      setError({error:'App load error'})
    })
  
  },
    [])
      
  
  
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
      .then(({data}) =>{ 
        setTodos(prev=>
          [...prev,data]
        ) //need to pass as an array
       ,
        setCurrentTodo('')
      }
      )
      .catch(error=>{
         setError({error:'Error Occured'})
        })
  }

  const handleDeletion= (id)=>{
    deleteTodos(id)
    .then(()=>{
      setTodos(prev=> [...prev.filter(todo=>todo.id!==id)])
    })
  }

  const handleToggle=(id)=>{
    const targetTodo = todos.find(todo=> todo.id===id)
    const updatedTodo = {
      ...targetTodo,
      isComplete: !targetTodo.isComplete
    }
    updateTodos(updatedTodo)
    .then(({data})=>{
      debugger
      console.log(`within handleToggle|| updateTodos => `,data)
      const newTodosList = todos.map((todo) =>
      todo.id === data.id ? updatedTodo : todo
    );
    setTodos(newTodosList);

    })  
  }
  const remainingtodos = todos.filter(todo=> todo.isComplete!==true)
    return (
      <Router>
        <div>
          <header className="header">
            <h1>todos</h1>
            {error? <span style={{background:'red', 'font-size': '34px', 'color':'white'}} className="error">{error.error}</span>:null}
            <TodoForm handleTodoSubmit={handleTodoSubmit} handleFormInput={handleFormInput} currentTodo={currentTodo}/>
          </header>
          <section className="main">
            <TodoList todos={todos} handleDeletion={handleDeletion} handleToggle={handleToggle} />
          </section>
          <Footer remainingtodos={remainingtodos} />
        </div>
      </Router>
    )
  
  }

  export default  TodoApp