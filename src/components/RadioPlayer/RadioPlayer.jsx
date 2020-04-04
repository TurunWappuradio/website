import React from 'react';

import PlayControl from './controls/PlayControl';
import ExternalLinkControl from './controls/ExternalLinkControl';
import VolumeControl from './controls/VolumeControl';

const AUDIO_STREAM_URL = 'https://player.turunwappuradio.com/wappuradio.mp3';
const METADATA_SERVER_URL =
  process.env.METADATA_SERVER || 'ws://localhost:3031';

export default class extends React.Component {
  constructor() {
    super();

    this.state = {
      playing: false,
      muted: false,
      song: '',
      volumeLevel: 100,
    };

    this.onPlayStop.bind(this);
    this.onVolumeOnOff.bind(this);
    this.changeVolume = this.changeVolume.bind(this);
    this.connectWebSocket = this.connectWebSocket.bind(this);

    this.audio = React.createRef();
  }

  componentDidMount() {
    this.connectWebSocket();
  }

  connectWebSocket() {
    const socket = new WebSocket(METADATA_SERVER_URL);

    this.setState({ socket });

    // When receiving a message
    socket.onmessage = e => {
      if (e.data === 'PING') {
        return socket.send('PONG');
      }

      const song = e.data;
      this.setState({ song });
    };

    // When connection closes
    socket.onclose = () => {
      setTimeout(this.connectWebSocket, 5000);
    };
  }

  onPlayStop() {
    if (this.audio.current.paused) this.audio.current.play();
    else {
      // Pause, but then load the stream again ready to start
      this.audio.current.pause();
      this.audio.current.src = AUDIO_STREAM_URL;
    }

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

  changeVolume(e) {
    if (e.currentTarget && e.currentTarget.value) {
      this.setState({ volumeLevel: e.currentTarget.value });
      this.audio.current.volume = e.currentTarget.value / 100;
      this.state.muted && this.onVolumeOnOff();
    }
  }

  onOpenExternal() {
    window.open(AUDIO_STREAM_URL, '_blank');
  }

  render() {
    const { muted, playing, song, volumeLevel } = this.state;

    return (
      <div className="RadioPlayer">
        <img
          className={
            'RadioPlayer__Brand ' + (this.state.playing ? 'pulse' : '')
          }
          src="leima.svg"
          alt="Turun Wappuradio"
        />
        {Date.now() >= 1556010000000 && (
          <div className="RadioPlayer__NowPlaying">Nyt soi: {song}</div>
        )}
        <div className="RadioPlayer__Controls">
          <VolumeControl muted={muted} onClickMute={() => this.onVolumeOnOff()} volumeLevel={volumeLevel} changeVolume={this.changeVolume} />
          <PlayControl playing={playing} onClick={() => this.onPlayStop()} />
          <ExternalLinkControl onClick={this.onOpenExternal} />
        </div>
        <audio ref={this.audio}>
          <source src={AUDIO_STREAM_URL} />
        </audio>
      </div>
    );
  }
}
