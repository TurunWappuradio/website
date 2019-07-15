import React from 'react';

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
