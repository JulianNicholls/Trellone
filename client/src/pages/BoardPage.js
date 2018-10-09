import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadBoard } from '../modules/boards';
import { loadLists } from '../modules/lists';

export class BoardPage extends Component {
  componentDidMount() {
    const { auth, history, loadBoard, loadLists, match } = this.props;

    if (auth.token) {
      loadBoard(match.params.id);
      loadLists(match.params.id);
    } else {
      history.replace('/login');
    }
  }

  render() {
    const { current } = this.props.boards;

    return current ? (
      <main
        className="has-background-dark board-main"
        style={
          current.backgroundURL
            ? { backgroundImage: `url(${current.backgroundURL})` }
            : {}
        }
      >
        <div className="board-main__header">
          <h1 className="has-text-centered is-size-3">{current.name}</h1>
        </div>
      </main>
    ) : (
      <h1 className="has-text-centered is-size-3">Loading...</h1>
    );
  }
}

const mapStateToProps = state => ({ ...state });

export default connect(
  mapStateToProps,
  { loadBoard, loadLists }
)(BoardPage);
