import React from 'react';
import { connect } from 'react-redux';

import { archiveList } from '../modules/lists';

const ListCard = ({ _id, name, order, archiveList }) => (
  <div className="card">
    <header className="card-header">
      <p className="card-header-title">{name}</p>
      <button className="button warning" onClick={() => archiveList(_id)}>
        Archive
      </button>
    </header>
    <div className="card-content">{order}</div>
  </div>
);

export default connect(
  null,
  { archiveList }
)(ListCard);
