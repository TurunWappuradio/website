import React from 'react';

import PlayControl from './controls/PlayControl';
import ExternalLinkControl from './controls/ExternalLinkControl';
import MuteControl from './controls/MuteControl';

const AUDIO_STREAM_URL = 'https://player.turunwappuradio.com/wappuradio.mp3';

export default class extends React.Component {
  constructor() {
    super();

    this.state = {
      playing: false,
      muted: false
    };

    this.onPlayPause.bind(this);
    this.onVolumeOnOff.bind(this);
    
    this.audio = React.createRef();
  }

  onPlayPause() {
    this.audio.current.paused
      ? this.audio.current.play()
      : this.audio.current.pause();

    this.setState({
      playing: !this.state.playing
    });
  }

  onVolumeOnOff() {
    this.audio.current.muted = !this.state.muted;

    this.setState({
      muted: !this.state.muted
    });
  }

  onOpenExternal() {
    window.open(AUDIO_STREAM_URL, '_blank');
  }

  render() {
    const { muted, playing } = this.state;

    return (
      <div className="RadioPlayer">
        <img
          className={
            'RadioPlayer__Brand ' + (this.state.playing ? 'pulse' : '')
          }
          src="leima.svg"
          alt="Turun Wappuradio"
        />
        <div className="RadioPlayer__NowPlaying">
          Nyt soi: Anssi Kela - 1972
        </div>
        <div className="RadioPlayer__Controls">
          <MuteControl muted={muted} onClick={() => this.onVolumeOnOff()} />
          <PlayControl playing={playing} onClick={() => this.onPlayPause()} />
          <ExternalLinkControl onClick={this.onOpenExternal} />
        </div>
        <audio ref={this.audio}>
          <source src={AUDIO_STREAM_URL} />
        </audio>
      </div>
    );
  }
}
