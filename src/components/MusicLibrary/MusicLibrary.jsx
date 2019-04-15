import React, { useState } from 'react';
import { getTracklist } from '../../utils/tracklist';
import { take } from 'ramda';

const tracklist = getTracklist();

const MusicLibrary = () => {
  const [state, setState] = useState({ filter: '', showAll: false });
  const filteredList = tracklist.filter(track => {
    return (
      track.artist.toLowerCase().match(state.filter.toLowerCase()) ||
      track.title.toLowerCase().match(state.filter.toLowerCase())
    );
  });

  const changeValue = ev => {
    ev.preventDefault();

    setState({ ...state, filter: ev.target.value });
  };

  return (
    <div className="MusicLibrary">
      <div className="ShowList-header">
        <h1 className="ShowList-title">Kappalelistaus</h1>
        <button
          className="ShowList-filterButton"
          onClick={() => setState({ ...state, showAll: !state.showAll })}>
          {!state.showAll ? 'Näytä kaikki' : 'Näytä vain 100'}
        </button>
      </div>
      <div class="TracklistSearchContainer">
        <input
          class="TracklistSearch"
          onChange={changeValue}
          placeholder="Suodata kappaleita..."
        />
      </div>
      <ul>
        {take(100, filteredList).map((track, index) => (
          <li key={index} class="TracklistItem">
            {track.artist} - {track.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MusicLibrary;
