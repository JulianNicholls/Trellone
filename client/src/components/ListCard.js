import React from 'react';
import { connect } from 'react-redux';

import { archiveList, addTask } from '../modules/lists';
import NewTask from '../components/NewTask';

class ListCard extends React.Component {
  addTask = text => {
    const { _id, tasks } = this.props;

    const newTask = {
      text,
      listId: _id,
      order: Math.max(tasks.map(({ order }) => order)) + 1
    };

    this.props.addTask(newTask);
  };

  render() {
    const { _id, name, tasks, archiveList } = this.props;

    return (
      <div className="card">
        <header className="card-header">
          <p className="card-header-title">{name}</p>
          <button className="button is-warning" onClick={() => archiveList(_id)}>
            Archive
          </button>
        </header>
        <div className="card-content">
          {tasks.map(task => (
            <div className="task" key={task._id}>
              {task.text}
            </div>
          ))}
          <NewTask onSubmit={this.addTask} />
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { archiveList, addTask }
)(ListCard);
