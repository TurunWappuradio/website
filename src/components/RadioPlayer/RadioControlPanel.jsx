import React from 'react';

import PlayControl from './controls/PlayControl';
import VolumeControl from './controls/VolumeControl';

export default function RadioControlPanel(props) {
  return (
    <div className="RadioControlPanel-wrapper">
      <div className="RadioControlPanel">
        <PlayControl playing={props.playing} onClick={props.onPlayingClick} />
        <VolumeControl
          muted={props.muted}
          onClickMute={props.onClickMute}
          volumeLevel={props.volumeLevel}
          changeVolume={props.changeVolume}
        />
        <div className="RadioControlPanel--infoContainer">
          <h2>Wappustartti</h2>
          <h2>Hindu & Make - Leipää</h2>
        </div>
      </div>
    </div>
  );
}
