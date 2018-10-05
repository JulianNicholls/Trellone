import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadBoard } from '../modules/boards';
import { loadLists } from '../modules/lists';

export class BoardPage extends Component {
  componentDidMount() {
    const { loadBoard, loadLists, match } = this.props;

    loadBoard(match.params.id);
    loadLists(match.params.id);
  }

  render() {
    const { current } = this.props.boards;

    return current ? (
      <main
        className="has-background-light board-main"
        style={{ backgroundImage: `url(${current.backgroundURL})` }}
      >
        <h1 className="has-text-centered is-size-3">
          {current ? current.name : 'Loading...'}
        </h1>
      </main>
    ) : (
      <h1 className="has-text-centered is-size-3">Loading...</h1>
    );
  }
}

const mapStateToProps = state => ({ 
  boards: state.boards,
  lists: state.lists
});

export default connect(
  mapStateToProps,
  { loadBoard, loadLists }
)(BoardPage);
