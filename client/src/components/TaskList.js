import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { FaEdit, FaTrashAlt } from 'react-icons/fa';

import { useLists } from '../context/list';

const TaskList = ({ tasks, listId }) => {
  const { addTask, updateTask } = useLists();
  const [newText, setNewText] = useState('');
  const [updating, setUpdating] = useState(null);
  const [updateText, setUpdateText] = useState('');

  const maxOrder = tasks.reduce((max, { order }) => {
    if (order > max) max = order;

    return max;
  }, 0);

  const addNewTask = event => {
    if (event.key === 'Enter') {
      addTask(newText, maxOrder + 1, listId);
      setNewText('');
    }
  };

  const startEdit = task => {
    setUpdateText(task.text);
    setUpdating(task._id);
  };

  const editTask = (event, task) => {
    if (event.key === 'Enter') {
      const updatedTask = { ...task, text: updateText };

      updateTask(updatedTask, listId);
      setUpdating(null);
    } else if (event.key === 'Escape') {
      setUpdating(null);
    }
  };

  const archiveTask = task => {
    const updatedTask = { ...task, archived: !task.archived };

    updateTask(updatedTask, listId);
  };

  const renderText = task => {
    if (updating === task._id)
      return (
        <input
          className="update"
          type="text"
          value={updateText}
          onChange={event => setUpdateText(event.target.value)}
          onKeyUp={event => editTask(event, task)}
          autoFocus
        />
      );

    if (task.archived) return <div className="text archived">{task.text}</div>;

    return <div className="text">{task.text}</div>;
  };

  const order = (a, b) => a.order - b.order;

  return (
    <ul className="task-list">
      {tasks.sort(order).map(task => (
        <li className="task-list__item" key={task.order}>
          {renderText(task)}
          <div>
            <FaEdit className="icon" onClick={() => startEdit(task)} />
            <FaTrashAlt className="icon" onClick={() => archiveTask(task)} />
          </div>
        </li>
      ))}
      <li className="task-list__item">
        <input
          type="text"
          placeholder="New task"
          value={newText}
          onChange={event => setNewText(event.target.value)}
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
