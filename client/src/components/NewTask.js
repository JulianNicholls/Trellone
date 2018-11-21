import React, { Component } from 'react';

export class NewTask extends Component {
  state = {
    text: '',
    error: ''
  };

  updateField = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  addTask = e => {
    e.preventDefault();

    if (!this.state.text) {
      return this.setState({ error: 'You must provide a task' });
    }

    this.props.onSubmit(this.state.text);

    this.setState({ text: '', error: '' });
  };

  render() {
    const { error, text } = this.state;

    return (
      <div>
        {error && <div className="notification is-danger">{error}</div>}

        <form onSubmit={this.addTask}>
          <div className="field">
            <label className="label" htmlFor="name">
              New Task
            </label>
            <div className="control">
              <input
                className="input"
                type="text"
                id="text"
                name="text"
                value={text}
                onChange={this.updateField}
                required
              />
            </div>
          </div>
          <button className="button" onClick={this.addTask}>
            Add Task
          </button>
        </form>
      </div>
    );
  }
}

export default NewTask;
