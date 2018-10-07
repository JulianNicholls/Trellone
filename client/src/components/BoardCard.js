import React from 'react';

const cardImageStyle = {
  alignItems: 'center',
  display: 'flex',
  height: '170px',
  justifyContent: 'center',
  overflow: 'hidden'
};

const BoardCard = ({ _id, name, backgroundURL }) => (
  <div className="card">
    <header className="card-header">
      <p className="card-header-title">{name}</p>
    </header>
    <div className="card-image" style={cardImageStyle}>
      {backgroundURL && (
        <img className="rounded" src={backgroundURL} alt="background" />
      )}
    </div>
    <footer className="card-footer">
      <a href={`/board/${_id}`} className="card-footer-item">
        Open
      </a>
    </footer>
  </div>
);

export default BoardCard;
