import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import resolveAssetUrl from './utils/assetUrlResolver';
import fetchEntries from './utils/dataEntries';
import './App.scss';
import {
  Footer,
  RadioPlayer,
  VideoChatHider,
  ShowList,
  Header,
  ContentPage
} from './components';

export default () => {
  const content = fetchEntries({
    content_type: 'content-page',
  }).data;
  const nav = fetchEntries({
    content_type: 'navigation',
  }).data;

  return (
    <div className="App">
      <Router>
        <Header>
          <ul>
            <li>
              <Link to="/">Etusivu</Link>
            </li>
            {nav && nav.items && nav.items[0].fields.pages.map(item =>
              <li>
                <Link to={`/${item.fields.name.toLowerCase()}`}>{item.fields.name}</Link>
              </li>)}
          </ul>
        </Header>
        <div class="Container">
        <Switch>
          <Route path="/:id">
            <ContentPage content={content} />
          </Route>
          <Route path="/">
            {process.env.REACT_APP_BROADCAST_MODE !== 'live'
              && <div id="logoContainer" className="Headline">
                <img src={resolveAssetUrl("2KyFepzwzH0Jd9TFyTf4yr")} alt="Turun Wappuradio" />
              </div>
            }
            {process.env.REACT_APP_BROADCAST_MODE === 'live' && <RadioPlayer />}
            {process.env.REACT_APP_BROADCAST_MODE === 'live' && <VideoChatHider />}
            <ShowList list="live" />
          </Route>
        </Switch>
      </div>
      </Router>
      <Footer className="Footer" />
    </div>
  );
}

const getNavItems = (content) => {
  if (!content || !content.items) return [];
  content.items.map(item => { if (item.fields.nav_enabled) return item.fields.name; });
}
