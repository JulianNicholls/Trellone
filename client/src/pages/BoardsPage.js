import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadBoards } from '../modules/boards';
import BoardCard from '../components/BoardCard';

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
            <div key={board._id} className="column is-one-quarter">
              <BoardCard {...board} />
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
