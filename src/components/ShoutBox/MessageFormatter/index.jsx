import React from 'react';
import Button from "../../common/Button";

const MessageFormatter = ({ name, message, color, isAdmin, onBanClick }) => (
  <div
    className="sbSingleMessageBox"
    style={color ? { backgroundColor: 'rgba(0, 0, 0, 0.10)' } : undefined}>
    <div style={{ width: isAdmin ? "calc(100% - 94px)" : "100%" }}>
      <div
        className="sbNameText"
        style={findColor(name)}>
        {name}:
      </div>
      <div className="sbMessageText">{message}</div>
    </div>
    {isAdmin && name !== 'Toimitus' && name !== 'Palvelin' && (
      <Button title="Bännää" onClick={() => onBanClick(name)}>
        Bännää
      </Button>
    )}
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
