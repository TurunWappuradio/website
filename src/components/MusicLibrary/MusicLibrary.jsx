import React, { useState } from 'react';
import { take } from 'ramda';
import resolveAssetUrl from '../../utils/assetUrlResolver';
import { useDataSource } from '../../utils/dataEffect';
import './MusicLibrary.scss';

const MusicLibrary = () => {
  const tracklistResult = useDataSource(resolveAssetUrl("6FTzYKVi3VpLvL1m3DPIjq"));
  const [state, setState] = useState({ filter: '', showAll: false });

  if (tracklistResult.status !== "SUCCESS")
    return null;

  const tracklist = tracklistResult.data;
  const filteredList = tracklist.filter(track => {
    return (
      track.artist.toLowerCase().indexOf(state.filter.toLowerCase()) !== -1 ||
      track.album.toLowerCase().indexOf(state.filter.toLowerCase()) !== -1 ||
      track.title.toLowerCase().indexOf(state.filter.toLowerCase()) !== -1
    );
  });

  const changeValue = ev => {
    ev.preventDefault();

    setState({ ...state, filter: ev.target.value });
  };

  const listToShow = state.showAll ? filteredList : take(100, filteredList);

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
      <div className="TracklistSearchContainer">
        <input
          className="TracklistSearch"
          onChange={changeValue}
          placeholder="Suodata kappaleita..."
        />
      </div>
      <table className="Tracklist">
        <thead>
          <td className="TracklistHeading">Artisti</td>
          <td className="TracklistHeading">Albumi</td>
          <td className="TracklistHeading">Kappale</td>
        </thead>
        <tbody>
          {listToShow.map((track, index) => (
            <tr key={index}>
              <td className="TracklistItem">{track.artist}</td>
              <td className="TracklistItem">{track.album}</td>
              <td className="TracklistItem">{track.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MusicLibrary;
