import React, { useState, useEffect } from 'react';
import { createClient } from 'contentful';
import resolveAssetUrl from './utils/assetUrlResolver';
import fetchEntries from './utils/dataEntries';
import './App.scss';
import {
  Footer,
  RadioPlayer,
  VideoChatHider,
  ShowList,
  MusicLibrary,
  Dashboard,
  MetadataForm,
  CalendarEvents
} from './components';

export default () => {
  // useEffect(
  //   console.log(fetchEntries({
  //     content_type: 'programme',
  //   }))
  // ,[])
  return (
    <div className="App">
      {process.env.REACT_APP_BROADCAST_MODE !== 'live'
        && <div id="logoContainer" className="Headline">
          <img src={resolveAssetUrl("42UqcWCsSZ4IZyvq0Ucy6b")} alt="Turun Wappuradio" />
        </div>
      }
      {process.env.REACT_APP_BROADCAST_MODE === 'live' && <RadioPlayer />}
      {process.env.REACT_APP_BROADCAST_MODE === 'live' && <VideoChatHider />}
      <ShowList />
      <Footer className="Footer" />
    </div>
  );
}
