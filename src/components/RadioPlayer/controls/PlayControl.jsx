import React from 'react';
import { FiPlay, FiPause } from 'react-icons/fi';

const ICON_SIZE = '48px';

const createClassList = (playing, large) => {
  const classList = ['PlayControl'];
  if (playing) {
    classList.push('PlayControl--Active');
  }
  if (large) {
    classList.push('PlayControl--Large');
  }
  return classList.join(' ');
};

export default ({ onClick, playing, large }) => (
  <button
    className={createClassList(playing, large)}
    title="Play/Pause"
    onClick={() => onClick()}>
    {playing ? (
      <span className="PlayControl-iconWrapper">
        <FiPause />
      </span>
    ) : (
      <span className="PlayControl-iconWrapper">
        <FiPlay style={{ marginLeft: '3px' }} />
      </span>
    )}
  </button>
);
