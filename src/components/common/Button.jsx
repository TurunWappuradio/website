import React from 'react';
import './Button.scss'

export default ({ children, selected, ...rest }) => (
  <button className={`Button ${selected ? 'Button-selected' : ''}`} {...rest}>
    {children}
  </button>
);
