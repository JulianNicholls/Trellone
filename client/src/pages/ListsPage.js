import React from 'react';
import { useParams } from 'react-router-dom';

import { useBoards } from '../context/board';

const ListsPage = () => {
  const { boardById } = useBoards();
  const params = useParams();
  const board = boardById(params.boardId);

  if (board === undefined) return <div className="loading">Loading...</div>;

  const { backgroundURL, name } = board;

  const mainStyle = backgroundURL
    ? {
        minHeight: '80vh',
        backgroundImage: `url(${backgroundURL})`,
        backgroundSize: 'cover',
      }
    : {};

  return (
    <main style={mainStyle}>
      <h1 className="centred">{name}</h1>
      <div>Lists here</div>
    </main>
  );
};

export default ListsPage;
