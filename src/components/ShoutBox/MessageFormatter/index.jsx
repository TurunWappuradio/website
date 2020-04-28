import React from 'react';
import Button from '../../common/Button';
import NameFormatter from '../NameFormatter';

const MessageFormatter = ({ name, message, color, role, isAdmin, onBanClick }) => (
  <div
    className="sbSingleMessageBox"
    style={color ? { backgroundColor: 'rgba(0, 0, 0, 0.10)' } : undefined}>
    <div
      style={{
        width: isAdmin ? 'calc(100% - 94px)' : '100%',
        paddingLeft: '0.5rem'
      }}>
      <NameFormatter name={name} role={role} />
      <div className="sbMessageText">{message}</div>
    </div>
    {isAdmin && name !== 'Toimitus' && name !== 'Palvelin' && (
      <Button title="Bännää" onClick={() => onBanClick(name)}>
        Bännää
      </Button>
    )}
  </div>
);

export default MessageFormatter;
