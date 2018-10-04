import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadBoard } from '../modules/boards';

export class BoardPage extends Component {
  componentDidMount() {
    this.props.loadBoard(this.props.match.params.id);
  }

  render() {
    return (
      <div>
        <h1>Board</h1>
      </div>
    );
  }
}

const mapStateToProps = state => ({ boards: state.boards });

export default connect(
  mapStateToProps,
  { loadBoard }
)(BoardPage);
