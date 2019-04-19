import React from 'react';

import VideoPlayer from '../VideoPlayer/VideoPlayer';
import ShoutBox from '../ShoutBox/ShoutBox';

import Button from '../common/Button';

class VideoChatHider extends React.Component {
  constructor() {
    super();
    this.state = {
      openVideo: false,
      openShout: false
    };

    this.toggleVideo.bind(this);
    this.toggleShoutBox.bind(this);
  }

  toggleVideo() {
    this.setState({ openVideo: !this.state.openVideo });
  }

  toggleShoutBox() {
    this.setState({ openShout: !this.state.openShout });
  }

  render() {
    return (
      <div className="VideoChatHider">
        <div className="VCButtons">
          <div className="VCSingleButton">
            <Button onClick={() => this.toggleVideo()}>
              {!this.state.openVideo ? 'Katso lähetystä' : 'Piilota video'}
            </Button>
          </div>
          <div className="VCSingleButton">
            <Button onClick={() => this.toggleShoutBox()}>
              {!this.state.openShout ? 'Avaa chat' : 'Piilota chat'}
            </Button>
          </div>
        </div>
        <div className="VCElements">
          {this.state.openVideo && (
            <div className="VideoContainer">
              <VideoPlayer />
            </div>
          )}
          {this.state.openShout && (
            <div className="ShoutBoxContainer">
              <ShoutBox />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default VideoChatHider;
