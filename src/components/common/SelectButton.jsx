import React from 'react';
import './SelectButton.scss';

const SelectButton = ({ children, selected, ...props }) => (
  <button {...props} className={`SelectButton ${selected ? 'SelectButton-selected' : ''} ${props.className || ''}`}>
    {children}
  </button>
);

export default SelectButton;