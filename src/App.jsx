import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Helmet from 'react-helmet';

import resolveAssetUrl from './utils/assetUrlResolver';
import fetchEntries from './utils/dataEntries';
import './App.scss';
import {
  Footer,
  RadioPlayer,
  VideoChatHider,
  ShowList,
  Header,
  ContentPage,
  Head
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
      <Head />
      <Router>
        <Header>
          <ul>
            <li>
              <Link to="/">Etusivu</Link>
            </li>
            {nav && nav.items && nav.items[0].fields.pages.map(item =>
              <li>
                <Link to={`/${item.fields.slug.toLowerCase()}`}>{item.fields.name}</Link>
              </li>)}
          </ul>
        </Header>
        <div class="Container">
        <Switch>
          <Route path="/:id">
            <ContentPage pageContent={content} />
          </Route>
          <Route path="/">
            <Helmet>
              <title>Turun Syssyradio</title>
              <meta name="description" content="Syssyradio 27. - 28.10.2020"></meta>
            </Helmet>
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
