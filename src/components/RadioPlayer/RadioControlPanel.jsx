import React from 'react';

import PlayControl from './controls/PlayControl';
import VolumeControl from './controls/VolumeControl';
import './RadioControlPanel.scss'

export default function RadioControlPanel(props) {
  return (
    <div className="RadioControlPanel-wrapper">
      <div className="RadioControlPanel">
        <div className="RadioControlPanel-playerControls">
          <PlayControl playing={props.playing} onClick={props.onPlayingClick} />
          <span className="RadioControlPanel-volumeControl">
            <VolumeControl
              muted={props.muted}
              onClickMute={props.onClickMute}
              volumeLevel={props.volumeLevel}
              changeVolume={props.changeVolume}
            />
          </span>
        </div>
        <div className="RadioControlPanel-metaContainer">
          {Date.now() >= 1618995600000 && (
            <>
              <span>Nyt soi</span>
              <span>{props.song && props.song.song}</span>
              <span>{props.song && props.song.artist}</span>
            </>
          )}
        </div>
        <div className="RadioControlPanel-infoContainer RadioControlPanel-infoContainer--Details">
          <div className="RadioControlPanel-contactWrapper">
            <h2>Turun Wappuradio</h2>
            <div>
              <span>Taajuudella</span> <b>93,8 MHz</b>
            </div>
            <div>
              <span>Studio</span> <b>023 619 1666</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
