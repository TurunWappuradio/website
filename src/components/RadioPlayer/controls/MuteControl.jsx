import React from 'react';

import VolumeOffIcon from '../../../assets/icons/baseline-volume_off.svg';
import VolumeOnIcon from '../../../assets/icons/baseline-volume_on.svg';

const ICON_SIZE = '34px';

export default ({ onClick, muted }) => (
  <button
    className="RadioPlayerControl"
    title="Äänenvoimakkuus päällä/pois"
    onClick={onClick}>
    {muted ? (
      <VolumeOffIcon
        width={ICON_SIZE}
        height={ICON_SIZE}
        viewBox={[0, 0, 24, 24]}
      />
    ) : (
      <VolumeOnIcon
        width={ICON_SIZE}
        height={ICON_SIZE}
        viewBox={[0, 0, 24, 24]}
      />
    )}
  </button>
);
