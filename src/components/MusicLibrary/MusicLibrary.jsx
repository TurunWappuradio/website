import React, { useState } from 'react';
import { getTracklist } from '../../utils/tracklist';

const tracklist = getTracklist();

const MusicLibrary = () => {
  const [state, setState] = useState('');
  const filteredList = tracklist.filter(track => {
    return (
      track.artist.toLowerCase().match(state.toLowerCase()) ||
      track.title.toLowerCase().match(state.toLowerCase())
    );
  });

  const changeValue = ev => {
    ev.preventDefault();

    setState(ev.target.value);
  };

  // filteröi listasta sellaiset joihin ei sisälly statea;

  return (
    <div>
      <h1>Kappalelistaus</h1>
      <div class="TracklistSearchContainer">
        <input
          class="TracklistSearch"
          onChange={changeValue}
          placeholder="Suodata kappaleita..."
        />
      </div>
      <ul>
        {filteredList.map((track, index) => (
          <li key={index} class="TracklistItem">
            {track.artist} - {track.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MusicLibrary;
