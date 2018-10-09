import React from 'react';
import { Link } from 'react-router-dom';

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
      <Link to={`/board/${_id}`} className="card-footer-item">
        Open
      </Link>
    </footer>
  </div>
);

export default BoardCard;
