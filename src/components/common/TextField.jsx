import React from 'react';
import './TextField.scss';

const TextField = ({ label, placeholder, value, onChange, type }) => (
  <div className="TextFieldArea">
    {label}
    <input
      className="TextField"
      type={type || 'text'}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </div>
);

export default TextField;
