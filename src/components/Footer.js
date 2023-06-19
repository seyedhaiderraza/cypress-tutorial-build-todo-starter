import React from 'react'
import {Link} from 'react-router-dom'

export default props =>
  <footer className="footer">
    <span className="todo-count">
      <strong>{props.remainingtodos.length}</strong>
      {props.remainingtodos.length ===1 ? ' todo': ' todos'} left
    </span>
    <ul className="filters">
      <li><Link to="/" onClick={()=>props.handleFilter('all')}>All</Link></li>
      {' '}
      <li><Link to="/active" onClick={()=>props.handleFilter('active')}>Active</Link></li>
      {' '}
      <li><Link to="/completed" onClick={()=>props.handleFilter('completed')}>Completed</Link></li>
    </ul>
  </footer>
