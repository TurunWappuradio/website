import React from 'react';
import { Slider, Handles } from 'react-compound-slider';

import VolumeOffIcon from '../../../assets/icons/baseline-volume_off.svg';
import VolumeOnIcon from '../../../assets/icons/baseline-volume_on.svg';
import VolumeDownIcon from '../../../assets/icons/baseline-volume_down.svg';

const ICON_SIZE = '34px';

const sliderStyle = {
  position: 'relative',
  height: '100%'
};

const railStyle = {
  margin: 'auto',
  height: '100%',
  width: '0.5rem',
  borderRadius: '0.5rem',
  cursor: 'pointer',
  backgroundColor: '#bbbbbb'
};

const handleComponent = ({ id, value, percent }, getHandleProps) => (
  <div
    style={{
      top: `${percent}%`,
      left: '50%',
      position: 'absolute',
      transform: 'translate(-50%, -50%)',
      zIndex: 2,
      width: 20,
      height: 20,
      cursor: 'pointer',
      borderRadius: '50%',
      backgroundColor: '#ffffff',
    }}
    {...getHandleProps(id)}
  >
  </div>
)

const renderSlider = (values, onChange) => (
  <Slider
    vertical
    reversed
    rootStyle={sliderStyle}
    domain={[0, 100]}
    step={1}
    values={values}
    onChange={onChange}
  >
    <div style={railStyle} />
    <Handles>
      {({ handles, getHandleProps }) => (
        <div className="slider-handles">
          {handles.map(handle => (
            handleComponent(handle, getHandleProps)
          ))}
        </div>
      )}
    </Handles>

  </Slider>
);

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
          <div style={{ height: '80%', padding: "1.2rem 0 1.5rem 0" }}>
            {renderSlider([volumeLevel], changeVolume)}
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
