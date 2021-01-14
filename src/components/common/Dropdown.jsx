import React from 'react';
import ReactDropdown from 'react-dropdown';

import './Dropdown.scss';

const Dropdown = ({ children, ...props }) => (
  <ReactDropdown {...props}>
    {children}
  </ReactDropdown>
);

export default Dropdown;
