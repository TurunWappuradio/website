import React from 'react';
import { Slider, Handles } from 'react-compound-slider';

import VolumeOffIcon from '../../../assets/icons/baseline-volume_off.svg';
import VolumeOnIcon from '../../../assets/icons/baseline-volume_on.svg';
import VolumeDownIcon from '../../../assets/icons/baseline-volume_down.svg';
import { FiVolume1, FiVolume2, FiVolumeX } from 'react-icons/fi';

const ICON_SIZE = '34px';

const sliderStyle = {
  position: 'relative',
  height: '100%'
};

const railStyle = {
  margin: 'auto',
  height: '100%',
  width: '8px',
  borderRadius: '50px',
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
      backgroundColor: '#ffffff'
    }}
    {...getHandleProps(id)}></div>
);

const renderSlider = (values, onChange) => (
  <Slider
    vertical
    reversed
    rootStyle={sliderStyle}
    domain={[0, 100]}
    step={1}
    values={values}
    onChange={onChange}>
    <div style={railStyle} />
    <Handles>
      {({ handles, getHandleProps }) => (
        <div className="slider-handles">
          {handles.map(handle => handleComponent(handle, getHandleProps))}
        </div>
      )}
    </Handles>
  </Slider>
);

export default ({ onClickMute, muted, volumeLevel, changeVolume }) => {
  const [sliderOpen, setSliderOpen] = React.useState(false);
  const openCloseSlider = () => {
    setSliderOpen(!sliderOpen);
  };
  return (
    <div className="VolumeControl">
      {sliderOpen && (
        <div className="VolumeSliderArea">
          <div style={{ height: '20%', padding: '0' }}>
            <button
              className="VolumeSliderMute"
              title="Mute"
              onClick={onClickMute}>
              <FiVolumeX />
            </button>
          </div>
          <div style={{ height: '80%', padding: '14px 0 25px 0' }}>
            {renderSlider([volumeLevel], changeVolume)}
          </div>
        </div>
      )}
      <button
        className={`VolumeSliderButton ${sliderOpen &&
          'VolumeSliderButton--Active'} `}
        title="Äänenvoimakkuus"
        onClick={openCloseSlider}>
        {muted ? (
          <FiVolumeX />
        ) : volumeLevel < 50 ? (
          <FiVolume1 />
        ) : (
          <FiVolume2 />
        )}
      </button>
    </div>
  );
};
