import React from 'react';
import PropTypes from 'prop-types';

const ErrorsPanel = ({ errors }) => {
  if (errors.length === 0) return null;

  return (
    <div className="errors">
      {errors.map((e, idx) => (<div key={idx}>{e}</div>))}
    </div>
  );
};

ErrorsPanel.propTypes = {
  errors: PropTypes.array.isRequired,
};

export default ErrorsPanel;
