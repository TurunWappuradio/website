import React from 'react';
import Button from '../../common/Button';
import NameFormatter from '../NameFormatter';
import './MessageFormatter.scss';

const MessageFormatter = ({ name, message, color, isAdmin, onBanClick }) => (
  <div
    className={`sbSingleMessageBox ${color ? 'sbSingleMessageBox-dark': ''}`}>
    <div
      style={{
        width: isAdmin ? 'calc(100% - 94px)' : '100%',
        paddingLeft: '0.5rem'
      }}>
      <NameFormatter name={name} />
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
