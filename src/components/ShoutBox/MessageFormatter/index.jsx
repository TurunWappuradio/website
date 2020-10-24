import React from 'react';
import Button from '../../common/Button';
import NameFormatter from '../NameFormatter';

const MessageFormatter = ({ name, message, color, isAdmin, onBanClick }) => (
  <div
    className="sbSingleMessageBox"
    style={color ? { backgroundColor: 'rgba(0, 0, 0, 0.10)' } : undefined}>
    <div
      style={{
        width: isAdmin ? 'calc(100% - 94px)' : '100%',
        paddingLeft: '0.5rem',
        paddingBottom: '0.5rem',
      }}>
      <NameFormatter name={name} />
      <div className="sbMessageText">{message}</div>
    </div>
    {isAdmin && name !== 'Toimitus' && name !== 'Palvelin' && (
      <Button title="Bännää" onClick={() => onBanClick(name)}
        style={{
          paddingBottom: '0.5rem',
        }}>
        Bännää
      </Button>
    )}
  </div>
);

export default MessageFormatter;
