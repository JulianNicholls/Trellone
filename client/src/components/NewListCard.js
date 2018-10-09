import React, { Component } from 'react';

export class NewListCard extends Component {
  state = {
    name: '',
    error: ''
  };

  updateField = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  addList = e => {
    e.preventDefault();

    if (!this.state.name) {
      return this.setState({ error: 'You must provide a name for the list' });
    }

    this.props.onSubmit(this.state.name);

    this.setState({ name: '', error: '' });
  };

  render() {
    const { error, name } = this.state;

    return (
      <div>
        <div className="card">
          <div className="card-header">
            <p className="card-header-title is-centered">New List</p>
          </div>
          <div className="card-content">
            {error && <div className="notification is-danger">{error}</div>}

            <form onSubmit={this.addList}>
              <div className="field">
                <label className="label" htmlFor="name">
                  Name
                </label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={this.updateField}
                    autoFocus
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="card-footer">
            <div className="card-footer-item">
              <button className="button" onClick={this.addList}>
                Add List
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewListCard;
