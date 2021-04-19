import React from 'react';

import PlayControl from './controls/PlayControl';
import ExternalLinkControl from './controls/ExternalLinkControl';
import { FiRadio, FiPhone, FiMail, FiInstagram, FiFacebook } from 'react-icons/fi';
import { FaTelegramPlane } from 'react-icons/fa';
import './RadioPlayer.scss';


const RadioPlayer = (props) => {
  const { playing, onPlayPause, song } = props;

  return (
    <div className="RadioPlayer">
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
              onClick={onPlayPause}
            />
            <ExternalLinkControl />
          </div>
            {Date.now() >= 1556010000000 && (
              <div className="RadioPlayer-nowPlaying">
                <span>Nyt soi</span>
                <span>{song ? song.song : '-'}</span>
                <span>{song ? song.artist : ''}</span>
              </div>
            )}
        </div>
        <div className="RadioPlayer-contact">
          <h1>
            Turun Wappuradio
          </h1>
          <p className="RadioPlayer-streamLink">
            <FiRadio />Taajuudella <b>93,8MHz</b>
          </p>
          <p className="RadioPlayer-streamLink">
            <FiPhone />Studio <b>023 619 0420</b>
          </p>

          <h1 className="desktop-only">
            Seuraa meitä myös
          </h1>
          <a
            className="RadioPlayer-streamLink desktop-only"
            href="https://t.me/turunwappuradio"
            target="_blank">
            <FaTelegramPlane /> t.me/turunwappuradio
          </a>
          <a
            className="RadioPlayer-streamLink desktop-only"
            href="https://t.me/turunwappuradio"
            target="_blank">
            <FiInstagram /> @turunwappuradio
          </a>
          <a
            className="RadioPlayer-streamLink desktop-only"
            href="https://t.me/turunwappuradio"
            target="_blank">
            <FiFacebook /> @turunwappuradio
          </a>
        </div>
      </div>
    </div>
  );
}

export default RadioPlayer;
