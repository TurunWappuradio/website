import React from 'react';

export default ({ children, ...rest }) => (
  <button className="Button" {...rest}>
    {children}
  </button>
);
