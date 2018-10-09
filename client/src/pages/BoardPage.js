import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadBoard } from '../modules/boards';
import { loadLists, createList } from '../modules/lists';
import ListCard from '../components/ListCard';
import NewListCard from '../components/NewListCard';

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

  addList = name => {
    const newList = {
      name,
      boardId: this.props.boards.current._id,
      order:
        this.props.lists.reduce((max, list) => {
          if (list.order > max) max = list.order;

          return max;
        }, 0) + 1
    };

    this.props.createList(newList);
  };

  render() {
    const { current } = this.props.boards;
    const { lists } = this.props;

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
          <h1 className="has-text-centered is-size-3 has-text-light">
            {current.name}
          </h1>
        </div>
        <div className="container">
          <div className="lists">
            {lists.map(list => (
              <ListCard key={list._id} {...list} />
            ))}
            <NewListCard onSubmit={this.addList} />
          </div>
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
  { loadBoard, loadLists, createList }
)(BoardPage);
