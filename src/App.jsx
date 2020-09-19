import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
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
  CalendarEvents,
  Header,
  ContentPage
} from './components';

export default () => {
  const content = fetchEntries({
    content_type: 'content-page',
  }).data;
  return (
    <div className="App">
      <Router>
        <Header>
          <ul>
            <li>
              <Link to="/">Etusivu</Link>
            </li>
            {content && content.items && content.items.map(item => item.fields.nav_enabled &&
              <li>
                <Link to={`/${item.fields.name}`}>{item.fields.name}</Link>
              </li>)}
          </ul>
        </Header>
        <Switch>
          <Route path="/:id">
            <ContentPage content={content} />
          </Route>
          <Route path="/">
            {process.env.REACT_APP_BROADCAST_MODE !== 'live'
              && <div id="logoContainer" className="Headline">
                <img src={resolveAssetUrl("42UqcWCsSZ4IZyvq0Ucy6b")} alt="Turun Wappuradio" />
              </div>
            }
            {process.env.REACT_APP_BROADCAST_MODE === 'live' && <RadioPlayer />}
            {process.env.REACT_APP_BROADCAST_MODE === 'live' && <VideoChatHider />}
            <ShowList />
          </Route>
        </Switch>
      </Router>
      <Footer className="Footer" />
    </div>
  );
}

const getNavItems = (content) => {
  if (!content || !content.items) return [];
  content.items.map(item => { if (item.fields.nav_enabled) return item.fields.name; });
}