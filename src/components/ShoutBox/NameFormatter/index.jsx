import React from 'react';

const Index = ({ name }) => (
  <div className={`sbNameText ${findStyle(name)}`}>
    {name}:
  </div>
);

const findStyle = name => {
  switch (name) {
    case 'Toimitus':
      return "sbNameText-Staff";
    case 'Palvelin':
      return "sbNameText-Server";
    default:
      return "sbNameText-Default";
  }
};

export default Index;
