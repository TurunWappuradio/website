import React from 'react';

import PauseIcon from '../../../assets/icons/baseline-pause.svg';
import PlayIcon from '../../../assets/icons/baseline-play.svg';

const ICON_SIZE = '48px';

export default ({ onClick, playing }) => (
  <button
    className={'RadioPlayerControl PlayControl ' + (playing ? 'active' : '')}
    title="Play/Pause"
    onClick={() => onClick()}>
    {playing ? (
      <PauseIcon
        width={ICON_SIZE}
        height={ICON_SIZE}
        viewBox={[0, 0, 24, 24]}
      />
    ) : (
      <PlayIcon width={ICON_SIZE} height={ICON_SIZE} viewBox={[0, 0, 24, 24]} />
    )}
  </button>
);
