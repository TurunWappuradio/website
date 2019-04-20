import React from 'react';

const MessageFormatter = ({ name, message, color }) => (
  <div
    className="sbSingleMessageBox"
    style={color ? { backgroundColor: 'rgba(0, 0, 0, 0.10)' } : undefined}>
    <div
      className="sbNameText"
      style={name === 'TWRToimitus' ? { color: '#ee6b60' } : {}}>
      {name}:
    </div>
    <div className="sbMessageText">{message}</div>
  </div>
);

export default MessageFormatter;
