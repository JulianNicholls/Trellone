import React from 'react';
import { Link } from 'react-router-dom';

import { useBoards } from '../context/board';

const BoardsPage = () => {
  const { boards } = useBoards();

  const renderBoards = () =>
    boards.map(({ _id, name, backgroundURL }) => (
      <div key={_id} className="board-card">
        <Link to={`/lists/${_id}`}>
          <div className="board-card__content">
            {backgroundURL && <img src={backgroundURL} alt="Board background" />}
          </div>
          <div className="board-card__footer">{name}</div>
        </Link>
      </div>
    ));

  return (
    <main>
      <h1 className="centred">Boards</h1>

      <div className="board-grid">
        {renderBoards()}
        <div className="board-card">
          <button>Create New</button>
        </div>
      </div>
    </main>
  );
};

export default BoardsPage;
