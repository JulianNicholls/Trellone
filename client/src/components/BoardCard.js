import React from 'react';
import { Link } from 'react-router-dom';

const cardImageStyle = {
  alignItems: 'center',
  display: 'flex',
  height: '170px',
  justifyContent: 'center',
  objectFit: 'cover',
  overflow: 'hidden'
};

const BoardCard = ({ _id, name, backgroundURL }) => (
  <div className="card">
    <header className="card-header">{name}</header>
    <div className="card-image" style={cardImageStyle}>
      <Link to={`/board/${_id}`}>
        {backgroundURL && (
          <img className="rounded" src={backgroundURL} alt="background" />
        )}
      </Link>
    </div>
    <footer>
      <Link to={`/board/${_id}`} className="card-footer-item">
        Open
      </Link>
    </footer>
  </div>
);

export default BoardCard;
