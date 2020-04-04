import React from 'react';

import VolumeOffIcon from '../../../assets/icons/baseline-volume_off.svg';
import VolumeOnIcon from '../../../assets/icons/baseline-volume_on.svg';
import VolumeDownIcon from '../../../assets/icons/baseline-volume_down.svg';

const ICON_SIZE = '34px';

export default ({ onClickMute, muted, volumeLevel, changeVolume }) => {
  const [sliderOpen, setSliderOpen] = React.useState(false);
  const openCloseSlider = () => { setSliderOpen(!sliderOpen); };
  return (
    <div className="VolumeControl">
      {sliderOpen && (
        <div className="VolumeSliderArea">
          <div style={{ height: '20%', padding: "0" }}>
            <button
              className="VolumeSliderMute"
              title="Mute"
              onClick={onClickMute}>
                <VolumeOffIcon
                  width={'24px'}
                  height={'24px'}
                  viewBox={[0, 0, 24, 24]}
                  style={{ display: 'block', margin: 'auto', width: '100%' }}
                />
            </button>
          </div>
          <div style={{ height: '80%', padding: "0.7rem 0 1rem 0" }}>
            <input
              className="VolumeSlider"
              type="range"
              orient="vertical"
              min="1"
              max="100"
              value={volumeLevel}
              onChange={changeVolume}
            />
          </div>
        </div>
      )}
      <button
        className="RadioPlayerControl"
        title="Äänenvoimakkuus"
        onClick={openCloseSlider}>
        {muted ? (
          <VolumeOffIcon
            width={ICON_SIZE}
            height={ICON_SIZE}
            viewBox={[0, 0, 24, 24]}
          />
        )  : volumeLevel < 50 ? (
          <VolumeDownIcon
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
    </div>
  )
};
