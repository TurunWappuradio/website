import React from 'react';

export default class extends React.Component {

  constructor() {
    super();
    this.state = {
      playing: false,
      volume: "on"
    }
  }

  onPlayPause() {
    console.log("onPlayPause");
    this.state.playing = !this.state.playing;
    console.log(this.state.playing);
  }

  onVolumeOnOff() {
    console.log("onVolumeOnOff");
  }

  onOpenExternal() {
    console.log("openExternal");
  }

  render() {
    return (
      <div className="RadioPlayer">
        <div id="nowPlaying">Nyt soi: Anssi Kela - 1972</div>
        <div id="RadioPlayerActions">
          <div className="clickable" onClick={() => this.onVolumeOnOff()}>
            <img title="Äänenvoimakkuus päällä/pois" alt="volume on/off" src="icons/baseline-volume_on.svg" />
          </div>
          <div className="clickable" onClick={() => this.onPlayPause()}>
            <img title="Play/Pause" alt="play/pause" src={this.state.playing ? "icons/baseline-pause.svg" : "icons/baseline-play.svg"} />
          </div>
          <div className="clickable" onClick={() => this.onOpenExternal()}>
            <img title="Kuuntele omassa soittimessa" alt="open in external player" src="icons/baseline-open_in_browser.svg" />
          </div>
        </div>
      </div>
    )
  }
}