import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadBoards, createBoard } from '../modules/boards';
import BoardCard from '../components/BoardCard';
import NewBoardCard from '../components/NewBoardCard';

class BoardsPage extends Component {
  componentDidMount() {
    if (this.props.auth.token) this.props.loadBoards();
    else this.props.history.replace('/login');
  }

  createBoard = board => {
    this.props.createBoard(board);
  };

  render() {
    const { boards } = this.props;

    return (
      <div className="container">
        <h1 className="has-text-centered is-size-3">Boards</h1>
        <div className="boards">
          {boards.map(board => (
            <div key={board._id}>
              <BoardCard {...board} />
            </div>
          ))}
          <NewBoardCard onSubmit={this.createBoard} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  boards: state.boards.boards
});

export default connect(
  mapStateToProps,
  { loadBoards, createBoard }
)(BoardsPage);
