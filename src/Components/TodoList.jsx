import React, { useState } from 'react';

import PropTypes from 'prop-types';

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  todosFiltered: PropTypes.func.isRequired,
  toggleComplete: PropTypes.func.isRequired,
  markAsEditing: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  toggleAllComplete: PropTypes.func.isRequired,
  remaining: PropTypes.func.isRequired,
  clearCompleted: PropTypes.func.isRequired,
};

function TodoList(props) {
  const [filter, setFilter] = useState('all');

  return (
    <>
      <ul className="todo-list">
        {props.todosFiltered(filter).map((todo, index) => (
          <li key={todo.id} className="todo-item-container">
            <div className="todo-item">
              <input
                onChange={() => props.toggleComplete(todo.id)}
                type="checkbox"
                checked={todo.isComplete}
              />
              {!todo.isEditing ? (
                <span
                  onDoubleClick={() => props.markAsEditing(todo.id)}
                  className={`todo-item-label ${
                    todo.isComplete ? 'line-through' : ''
                  }`}
                >
                  {todo.title}
                </span>
              ) : (
                <input
                  onBlur={event => props.updateTodo(event, todo.id)}
                  onKeyDown={event => {
                    if (event.key === 'Enter') {
                      props.updateTodo(event, todo.id);
                    }
                    if (event.key === 'Escape') {
                      props.cancelEdit(todo.id);
                    }
                  }}
                  type="text"
                  className="todo-item-input"
                  defaultValue={todo.title}
                  autoFocus
                />
              )}
            </div>
            <button
              onClick={() => props.deleteTodo(todo.id)}
              className="x-button"
            >
              <svg
                className="x-button-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </li>
        ))}
      </ul>

      <div className="check-all-container">
        <div>
          <div className="button" onClick={props.toggleAllComplete}>
            Check All
          </div>
        </div>

        <span>{props.remaining()} items remaining</span>
      </div>

      <div className="other-buttons-container">
        <div>
          <button
            className={`button filter-button ${
              filter === 'all' ? ' filter-button-active' : ''
            }`}
            onClick={() => {
              setFilter('all');
            }}
          >
            All
          </button>
          <button
            className={`button filter-button ${
              filter === 'active' ? ' filter-button-active' : ''
            }`}
            onClick={() => {
              setFilter('active');
            }}
          >
            Active
          </button>
          <button
            className={`button filter-button ${
              filter === 'completed' ? ' filter-button-active' : ''
            }`}
            onClick={() => {
              setFilter('completed');
            }}
          >
            Completed
          </button>
        </div>
        <div>
          <button className="button" onClick={props.clearCompleted}>
            Clear completed
          </button>
        </div>
      </div>
    </>
  );
}

export default TodoList;
