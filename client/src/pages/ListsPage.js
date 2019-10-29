import React from 'react';
import { useParams } from 'react-router-dom';

import TaskList from '../components/TaskList';

import { useBoards } from '../context/board';
import { useLists } from '../context/list';

const List = ({ _id, name, tasks }) => (
  <div className="list-card">
    <div className="list-card__header">{name}</div>
    <div className="list-card__content">
      <TaskList tasks={tasks} listId={_id} />
    </div>
  </div>
);

const ListsPage = () => {
  const { boardById } = useBoards();
  const params = useParams();
  const board = boardById(params.boardId);
  const { lists } = useLists();

  if (board === undefined) return <div className="loading">Loading...</div>;

  const { backgroundURL, name } = board;

  const bgStyle = backgroundURL
    ? {
        minHeight: '90vh',
        backgroundImage: `url(${backgroundURL})`,
        backgroundSize: 'cover',
      }
    : {};

  const renderLists = () =>
    lists.map((list, index) => <List key={index} {...list} />);

  return (
    <div style={bgStyle}>
      <main style={{ marginTop: 0, paddingTop: '0.5em' }}>
        <h1 className="centred">{name}</h1>

        <div className="list-grid">
          {renderLists()}
          <div className="list-card">
            <div className="list-card__content">
              <button>Add List</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ListsPage;
