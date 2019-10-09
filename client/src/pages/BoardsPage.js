import React from 'react';

import { useBoards } from '../context/board';

const BoardsPage = () => {
  const boards = useBoards();

  const renderBoards = () =>
    boards.map(({ _id, name, backgroundURL }) => (
      <div key={_id} className="board-card">
        <div className="board-card__header">{name}</div>
        <p>
          {_id}
          {backgroundURL}
        </p>
      </div>
    ));

  return (
    <main>
      <h1 className="centred">Boards</h1>

      <div className="board-grid">{renderBoards()}</div>
    </main>
  );
};

export default BoardsPage;
