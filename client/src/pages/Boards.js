import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadBoards } from '../modules/boards';

const Board = props => (
  <div className="card">
    <header className="card-header">
      <p className="card-header-title">{props.name}</p>
    </header>
    <div className="card-image">
      <img src={props.backgroundURL} alt="background" />
    </div>
    <footer className="card-footer">
      <a href={`/board/${props.id}`} className="card-footer-item">
        Open
      </a>
    </footer>
  </div>
);

class BoardsPage extends Component {
  componentDidMount() {
    this.props.loadBoards();
  }

  render() {
    const { boards } = this.props;

    return (
      <div>
        <h1 className="has-text-centered is-size-3">Boards</h1>
        <div className="columns boards">
          {boards.map(board => (
            <div className="column is-one-quarter">
              <Board {...board} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ boards: state.boards.boards });

export default connect(
  mapStateToProps,
  { loadBoards }
)(BoardsPage);
