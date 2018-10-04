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

    return (
      <div>
        <h1 className="has-text-centered is-size-3">
          {current ? current.name : 'Loading...'}
        </h1>
      </div>
    );
  }
}

const mapStateToProps = state => ({ boards: state.boards });

export default connect(
  mapStateToProps,
  { loadBoard, loadLists }
)(BoardPage);
