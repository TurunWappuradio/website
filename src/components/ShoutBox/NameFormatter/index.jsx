import React from 'react';

const Index = ({ name }) => (
  <div className="sbNameText" style={findColor(name)}>
    {name}:
  </div>
);

const findColor = name => {
  switch (name) {
    case 'Toimitus':
      return { color: '#ee6b60' };
    case 'Palvelin':
      return { color: '#fdfd96' };
    default:
      return { color: '#ffffff' };
  }
};

export default Index;
