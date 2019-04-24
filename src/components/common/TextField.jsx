import React from 'react';

const TextField = ({ label, placeholder, value, onChange }) => (
  <div className="TextFieldArea">
    {label}
    <input
      className="TextField"
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      />
  </div>
);

export default TextField;
