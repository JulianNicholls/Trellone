import React, { Component } from 'react';

export class NewBoardCard extends Component {
  state = {
    name: '',
    backgroundURL: '',
    error: ''
  };

  updateField = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  onSubmit = e => {
    e.preventDefault();

    if (!this.state.name) {
      return this.setState({ error: 'You must provide a name for the board' });
    }

    this.props.onSubmit(this.state);

    this.setState({ name: '', backgroundURL: '', error: '' });
  };

  render() {
    const { error, name, backgroundURL } = this.state;

    return (
      <div>
        <div className="card">
          <div className="card-header">
            <p className="card-header-title is-centered">New Board</p>
          </div>
          <div className="card-content">
            {error && <div className="notification is-danger">{error}</div>}

            <form onSubmit={this.onSubmit}>
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

              <div className="field">
                <label className="label" htmlFor="backgroundURL">
                  Background URL
                </label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    id="backgroundURL"
                    name="backgroundURL"
                    value={backgroundURL}
                    onChange={this.updateField}
                  />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <button className="button is-link">Add Board</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default NewBoardCard;
