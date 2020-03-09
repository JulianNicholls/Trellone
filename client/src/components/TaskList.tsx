import React, { useState, ChangeEvent } from 'react';
import PropTypes from 'prop-types';

import { FaEdit, FaTrashAlt } from 'react-icons/fa';

import { useLists } from '../context/list';

interface TaskListProps {
  tasks: Array<Task>;
  listId: string;
}

const TaskList = ({ tasks, listId }: TaskListProps) => {
  const { addTask, updateTask } = useLists();
  const [newText, setNewText] = useState<string>('');
  const [updating, setUpdating] = useState<string>('');
  const [updateText, setUpdateText] = useState<string>('');

  const maxOrder = tasks.reduce((max, { order }) => {
    if (order > max) max = order;

    return max;
  }, 0);

  const addNewTask = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addTask(newText, maxOrder + 1, listId);
      setNewText('');
    }
  };

  const startEdit = (task: Task) => {
    setUpdateText(task.text);
    setUpdating(task._id);
  };

  const finishEdit = (
    event: React.KeyboardEvent<HTMLInputElement>,
    task: Task
  ) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const updatedTask = { ...task, text: updateText };

      updateTask(updatedTask, listId);
      setUpdating('');
    } else if (event.key === 'Escape') {
      event.preventDefault();
      setUpdating('');
    }
  };

  const archiveTask = (task: Task) => {
    const updatedTask = { ...task, archived: !task.archived };

    updateTask(updatedTask, listId);
  };

  const renderText = (task: Task) => {
    if (updating === task._id)
      return (
        <input
          className="update"
          type="text"
          value={updateText}
          onChange={event => setUpdateText(event.target.value)}
          onKeyUp={event => finishEdit(event, task)}
          autoFocus
        />
      );

    if (task.archived) return <div className="text archived">{task.text}</div>;

    return <div className="text">{task.text}</div>;
  };

  return (
    <ul className="task-list">
      {tasks
        .sort((a, b) => a.order - b.order)
        .map(task => (
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
