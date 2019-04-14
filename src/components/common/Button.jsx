import React from 'react';

export default ({ children, title, onClick }) => (
  <button className="Button" title={title} onClick={onClick}>
    {children}
  </button>
);
