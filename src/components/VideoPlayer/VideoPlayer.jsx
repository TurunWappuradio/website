import React from 'react';
import Button from '../common/Button';

export default class extends React.Component {
  constructor() {
    super();

    this.state = {
      open: false
    };

    this.toggleVideo.bind(this);
  }

  toggleVideo() {
    this.setState({ open: !this.state.open });
  }

  render() {
    if (!this.state.open) {
      return (
        <div className="VideoPlayer">
          <Button onClick={() => this.toggleVideo()}>Katso lähetystä</Button>
        </div>
      );
    }

    return (
      <div className="VideoPlayer">
        <Button onClick={() => this.toggleVideo()}>Piilota video</Button>
        <div className="VideoContainer">
          <iframe
            src="https://player.twitch.tv/?channel=turunwappuradio"
            height="480px"
            width="848px"
          />
        </div>
      </div>
    );
  }
}
