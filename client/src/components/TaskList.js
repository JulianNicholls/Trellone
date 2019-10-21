import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { FaEdit, FaTrashAlt } from 'react-icons/fa';

import { useLists } from '../context/list';

const TaskList = ({ tasks, listId }) => {
  const { addTask } = useLists();
  const [text, setText] = useState('');

  const addNewTask = event => {
    if (event.key === 'Enter') {
      addTask(text, 5, listId);
      setText('');
    }
  };

  return (
    <ul className="task-list">
      {tasks.map(task => (
        <li className="task-list__item" key={task.order}>
          {task.archived ? (
            <div className="text archived">{task.text}</div>
          ) : (
            <div className="text">{task.text}</div>
          )}
          <div>
            <FaEdit className="icon" />
            <FaTrashAlt className="icon" />
          </div>
        </li>
      ))}
      <li className="task-list__item">
        <input
          type="text"
          placeholder="New task"
          value={text}
          onChange={event => setText(event.target.value)}
          onKeyUp={addNewTask}
        />
      </li>
    </ul>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      order: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      archived: PropTypes.bool.isRequired,
    })
  ).isRequired,
  listId: PropTypes.string.isRequired,
};

export default TaskList;
