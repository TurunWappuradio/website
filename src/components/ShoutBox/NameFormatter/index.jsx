import React from 'react';

const Index = ({ name, role }) => (
  <div className="sbNameText" style={findColor(role)}>
    {name}:
  </div>
);

const findColor = role => {
  switch (role) {
    case 'admin':
    case 'moderator':
      return { color: '#ee6b60' };
    case 'server':
      return { color: '#fdfd96' };
    default:
      return { color: '#ffffff' };
  }
};

export default Index;
