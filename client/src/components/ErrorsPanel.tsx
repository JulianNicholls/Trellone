import React from 'react';

interface ErrorsPanelProps {
  errors: Array<string>;
}

const ErrorsPanel = ({ errors }: ErrorsPanelProps): JSX.Element | null => {
  if (errors.length === 0) return null;

  return (
    <div className="errors">
      {errors.map((e: string, idx: number) => (
        <div key={idx}>{e}</div>
      ))}
    </div>
  );
};

export default ErrorsPanel;
