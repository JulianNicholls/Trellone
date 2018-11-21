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
          <header className="has-text-centered">New List</header>
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
                    required
                  />
                </div>
              </div>
            </form>
          </div>
          <footer>
            <button className="button" onClick={this.addList}>
              Add List
            </button>
          </footer>
        </div>
      </div>
    );
  }
}

export default NewListCard;
