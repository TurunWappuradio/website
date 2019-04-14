import React from 'react';

const MessageFormatter = ({ name, message }) => (
  <div className="sbSingleMessageBox">
    <div
      className="sbNameText"
      style={name === 'TWRToimitus' ? { color: '#ee6b60' } : {}}>
      {name}:
    </div>
    <div className="sbMessageText">{message}</div>
  </div>
);

export default MessageFormatter;
