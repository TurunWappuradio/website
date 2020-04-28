import React from 'react';

import PlayControl from './controls/PlayControl';
import RadioControlPanel from './RadioControlPanel';
import { FiMaximize2 } from 'react-icons/fi';
import { FaTelegramPlane } from 'react-icons/fa';

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
      playClicked: false,
      prevMetadataFetchTime: 'Tue, 7 Apr 2020 15:25:34 GMT',
    };

    this.onPlayStop.bind(this);
    this.onVolumeOnOff.bind(this);
    this.changeVolume = this.changeVolume.bind(this);

    this.audio = React.createRef();
    this.getSongTitle();
  }

  getSongTitle() {
    console.log(this.state.prevMetadataFetchTime)
    fetch('https://json.turunwappuradio.com/metadata.json', {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      headers: {
        'If-Modified-Since': this.state.prevMetadataFetchTime
      },
    })
      .then(res => res.json())
      .then(metadata => {
        this.setState({
          song: metadata.artist + ' - ' + metadata.song,
          prevMetadataFetchTime: new Date().toUTCString()
        })
      })
      .catch(err => console.error(err))
      .finally(() => { setTimeout(() => {this.getSongTitle()}, 10000) });
  }

  onPlayStop() {
    if (this.audio.current.paused) this.audio.current.play();
    else {
      // Pause, but then load the stream again ready to start
      this.audio.current.pause();
      this.audio.current.src = AUDIO_STREAM_URL;
    }

    this.setState({
      playing: !this.state.playing,
      playClicked: true
    });
  }

  onVolumeOnOff() {
    this.audio.current.muted = !this.state.muted;

    this.setState({
      muted: !this.state.muted
    });
  }

  changeVolume(valueArray) {
    if (valueArray && valueArray.length === 1) {
      this.setState({ volumeLevel: valueArray[0] });
      this.audio.current.volume = valueArray[0] / 100;
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
        {this.state.playClicked && (
          <RadioControlPanel
            playing={playing}
            onPlayingClick={() => this.onPlayStop()}
            muted={muted}
            onClickMute={() => this.onVolumeOnOff()}
            song={this.state.song}
            volumeLevel={volumeLevel}
            changeVolume={this.changeVolume}
          />
        )}
        <div className="RadioPlayer-inPage">
          <img
            className={
              'RadioPlayer-Brand ' + (this.state.playing ? 'pulse' : '')
            }
            src="leima.svg"
            alt="Turun Wappuradio"
          />

          <div className="RadioPlayer-controlWrapper">
            <div className="RadioPlayer-controls">
              <PlayControl
                large
                playing={playing}
                onClick={() => this.onPlayStop()}
              />
              {Date.now() >= 1556010000000 && (
                <div className="RadioPlayer-nowPlaying">
                  <span>Nyt soi</span>
                  <span>{song}</span>
                </div>
              )}
            </div>
            <div className="RadioPlayer-contact">
              <h2>
                Taajuudella <b>93,8 MHz</b>
              </h2>
              <h2>
                Studio <b>023 619 0123</b>
              </h2>
              <h2>
                <b>toimitus[at]turunwappuradio.com</b>
              </h2>
            </div>
            <a
              className="RadioPlayer-streamLink"
              href="https://player.turunwappuradio.com/wappuradio.mp3"
              target="_blank">
              <FiMaximize2 />
              Avaa lähetys uuteen ikkunaan
            </a>
            <a
              className="RadioPlayer-streamLink"
              href="https://t.me/turunwappuradio"
              target="_blank">
              <FaTelegramPlane />
              Keskustele telegrammissa
            </a>
          </div>
        </div>
        <audio ref={this.audio}>
          <source src={AUDIO_STREAM_URL} />
        </audio>
      </div>
    );
  }
}
