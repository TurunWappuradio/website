import React from 'react';

const MessageFormatter = ({ name, message, color }) => (
  <div
    className="sbSingleMessageBox"
    style={color ? { backgroundColor: 'rgba(0, 0, 0, 0.10)' } : undefined}>
    <div
      className="sbNameText"
      style={findColor(name)}>
      {name}:
    </div>
    <div className="sbMessageText">{message}</div>
  </div>
);

const findColor = name => {
  switch (name) {
    case 'Toimitus':
      return { color: '#ee6b60' };
    case 'Palvelin':
      return { color: '#fdfd96' };
    default:
      return {};
  }
};

export default MessageFormatter;
