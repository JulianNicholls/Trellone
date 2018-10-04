import React from 'react';

const BoardCard = props => (
  <div className="card">
    <header className="card-header">
      <p className="card-header-title">{props.name}</p>
    </header>
    <div className="card-image">
      <img className="rounded" src={props.backgroundURL} alt="background" />
    </div>
    <footer className="card-footer">
      <a href={`/board/${props._id}`} className="card-footer-item">
        Open
      </a>
    </footer>
  </div>
);

export default BoardCard;
