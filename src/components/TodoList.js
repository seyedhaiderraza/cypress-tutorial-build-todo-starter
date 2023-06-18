import React from 'react'

const TodoItem = props =>
  <li>
    <div className="view">
      <input className="toggle" type="checkbox" />
      <label>
        {props.name}
      </label>
      <button className="destroy" />
    </div>
  </li>
//separate component than above TodoItem
export default props =>
  <ul className="todo-list">
    {props.todos.map(todo => <TodoItem key={todo.id} {...todo} />)}
  </ul>
