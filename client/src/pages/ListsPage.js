import React from 'react';
import { useParams } from 'react-router-dom';

import { useBoards } from '../context/board';
import { useLists } from '../context/list';

const ListsPage = () => {
  const { boardById } = useBoards();
  const params = useParams();
  const board = boardById(params.boardId);
  const { lists } = useLists();

  if (board === undefined) return <div className="loading">Loading...</div>;

  const { backgroundURL, name } = board;

  const mainStyle = backgroundURL
    ? {
        minHeight: '90vh',
        backgroundImage: `url(${backgroundURL})`,
        backgroundSize: 'cover',
      }
    : {};

  const renderLists = () =>
    lists.map(({ _id, name, tasks }) => (
      <div key={_id} className="list-card">
        <div className="list-card__header">{name}</div>
        <div className="list-card__content">{tasks.length} tasks</div>
      </div>
    ));

  return (
    <main style={mainStyle}>
      <h1 className="centred">{name}</h1>

      <div className="list-grid">
        {renderLists()}
        <div className="list-card">
          <div className="list-card__content">
            <button>Create New</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ListsPage;
