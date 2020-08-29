import React from 'react';
import './Button.scss'

export default ({ children, ...rest }) => (
  <button className="Button" {...rest}>
    {children}
  </button>
);
