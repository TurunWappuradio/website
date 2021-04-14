import React from 'react';

const Hamburger = ({ isActive, ...props }) => (
  <div className="HamburgerContainer" {...props}>
    <ul className={isActive ? 'Hamburger Hamburger-active' : 'Hamburger'}>
      <li></li>
      <li></li>
      <li></li>

      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
);

export default Hamburger;