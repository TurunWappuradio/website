import React, { useState } from 'react';

import VideoPlayer from '../VideoPlayer/VideoPlayer';
import ShoutBox from '../ShoutBox/ShoutBox';
import './VideoChatHider.scss'
import { FaChevronDown } from 'react-icons/fa';

import Button from '../common/Button';

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
            <Button onClick={toggleVideo}>
              {!openVideo ? 'Katso lähetystä' : 'Piilota video'}
            </Button>
          </div>
        )}
        <div className="VCSingleButton">
          <Button onClick={toggleShoutBox}>
            {!openShout ? 'Avaa chat' : 'Piilota chat'}
          </Button>
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
