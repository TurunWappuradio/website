import React from 'react';
import './Header.scss';

export default (props) => {
  return (
    <div className="Header">
      {props.children}
    </div>
  );
}