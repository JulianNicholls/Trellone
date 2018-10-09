import React from 'react';

const ListCard = ({ name, order }) => (
  <div className="card">
    <header className="card-header">
      <p className="card-header-title">{name}</p>
    </header>
    <div className="card-content">{order}</div>
  </div>
);

export default ListCard;
