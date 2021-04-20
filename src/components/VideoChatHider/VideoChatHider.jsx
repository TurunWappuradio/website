import React, { useState } from 'react';

import VideoPlayer from '../VideoPlayer/VideoPlayer';
import ShoutBox from '../ShoutBox/ShoutBox';
import './VideoChatHider.scss'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

import SelectButton from '../common/SelectButton';

const WEBCAM_MODE = process.env.REACT_APP_WEBCAM_MODE;

const VideoChatHider = () => {
  const [openVideo, setOpenVideo] = useState(false);
  const [openShout, setOpenShout] = useState(false);

  const toggleVideo = () => {
    setOpenVideo(!openVideo);
  }

  const toggleShoutBox = () => {
    setOpenShout(!openShout);
  }

  return (
    <div className="VideoChatHider">
      <div className="VCButtons">
        {WEBCAM_MODE === 'live' && (
          <div className="VCSingleButton">
            <SelectButton onClick={toggleVideo} selected={openVideo}>
              {!openVideo ? 'Katso lähetystä' : 'Piilota video'}
            </SelectButton>
          </div>
        )}
        <div className="VCSingleButton">
          <SelectButton onClick={toggleShoutBox} selected={openShout}>
            {!openShout ? 'Avaa chat' : 'Piilota chat'}
          </SelectButton>
        </div>
      </div>
      <div className="VCElements">
        {openVideo && (
          <div className="VideoContainer">
            <VideoPlayer />
          </div>
        )}
        <ShoutBox isOpen={openShout} />
      </div>
    </div>
  );
}

export default VideoChatHider;
