import React from 'react'

const TodoItem = props =>
  <li className={props.isComplete? "completed":""}>
    <div className="view">
      <input className="toggle" type="checkbox" checked={props.isComplete} />
      <label>
        {props.name}
      </label>
      <button className="destroy" onClick={()=>props.handleDeletion(props.id)} />
    </div>
  </li>
//separate component than above TodoItem
export default props =>
  <ul className="todo-list">
    {props.todos.map(todo => <TodoItem key={todo.id} {...todo} handleDeletion={props.handleDeletion} />)}
  </ul>
