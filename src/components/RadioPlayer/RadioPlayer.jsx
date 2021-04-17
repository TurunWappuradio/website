import React, { useState, useEffect } from 'react';

import PlayControl from './controls/PlayControl';
import RadioControlPanel from './RadioControlPanel';
import { FiMaximize2 } from 'react-icons/fi';
import { FaTelegramPlane } from 'react-icons/fa';
import resolveAssetUrl from '../../utils/assetUrlResolver';
import './RadioPlayer.scss';

const AUDIO_STREAM_URL = 'https://player.turunwappuradio.com/wappuradio.mp3';
const METADATA_SERVER_URL =
  process.env.REACT_APP_METADATA_SERVER || 'ws://localhost:3031';


export default () => {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [song, setSong] = useState({ song: "", artist: "" });
  const [volumeLevel, setVolumeLevel] = useState(100);
  const [playClicked, setPlayClicked] = useState(false);
  const [audio, setAudio] = useState(React.createRef());

  useEffect(() => {
    setTimeout(() => {
      fetch('https://json.turunwappuradio.com/metadata.json', {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors' // no-cors, *cors, same-origin
      })
        .then(res => res.json())
        .then(metadata => {
          setSong(metadata);
        })
        .catch(console.error);
    }, 1000)
  }, [song]);

  const onPlayStop = () => {
    if (audio.current.paused) audio.current.play();
    else {
      // Pause, but then load the stream again ready to start
      audio.current.pause();
      audio.current.src = AUDIO_STREAM_URL;
    }

    setPlaying(!playing);
    setPlayClicked(true);
  }

  const onVolumeOnOff = () => {
    audio.current.muted = !muted;

    setMuted(!muted);
  }

  const changeVolume = (valueArray) => {
    if (valueArray && valueArray.length === 1) {
      audio.current.volume = valueArray[0] / 100;
      muted && onVolumeOnOff();
      setVolumeLevel(valueArray[0]);
    }
  }

  const onOpenExternal = () => {
    window.open(AUDIO_STREAM_URL, '_blank');
  }

  return (
    <div className="RadioPlayer">
      {playClicked && (
        <RadioControlPanel
          playing={playing}
          onPlayingClick={() => onPlayStop()}
          muted={muted}
          onClickMute={() => onVolumeOnOff()}
          song={song}
          volumeLevel={volumeLevel}
          changeVolume={changeVolume}
        />
      )}
      <div className="RadioPlayer-inPage">
        <img
          className={
            'RadioPlayer-Brand ' + (playing ? 'running' : '')
          }
          src="leima.svg"
          alt="Turun Wappuradio"
        />

        <div className="RadioPlayer-controlWrapper">
          <div className="RadioPlayer-controls">
            <PlayControl
              large
              playing={playing}
              onClick={() => onPlayStop()}
            />
            {Date.now() >= 1556010000000 && (
              <div className="RadioPlayer-nowPlaying">
                <span>Nyt soi</span>
                <span>{song ? song.song : '-'}</span>
                <span>{song ? song.artist : ''}</span>
              </div>
            )}
          </div>
          <div className="RadioPlayer-contact">
            <h2>
              Studio <b>023 619 0420</b>
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
      <audio ref={audio}>
        <source src={AUDIO_STREAM_URL} />
      </audio>
    </div>
  );

}
