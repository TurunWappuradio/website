import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import contentful from './utils/contentful';

import resolveAssetUrl from './utils/assetUrlResolver';
import fetchEntries from './utils/dataEntries';
import { pageview } from './utils/analytics';
import './App.scss';
import {
  Footer,
  RadioPlayer,
  VideoChatHider,
  ShowList,
  Header,
  SubPage,
  IndexPage,
  Head
} from './components';
import { INDEX_PAGE, CONTENT_PAGE, NAVIGATION } from './constants/contentTypes';
import useLiveShowListId from './utils/liveShows';
import useShowList from './utils/shows';

export default () => {
  const content = fetchEntries({
    content_type: CONTENT_PAGE,
  }).data;

  const nav = fetchEntries({
    content_type: NAVIGATION,
  }).data;

  const liveShowListId = useLiveShowListId();
  const showList = useShowList(liveShowListId);

  // TODO: create a hook for fetching index content.
  const [indexContent, setIndexContent] = useState(null);

  useEffect(() => {
    const fetchIndex = () => contentful.getEntries({ content_type: INDEX_PAGE })
      .then(res => setIndexContent(res.items[0].fields.content));
    fetchIndex();
  }, []);

  return (
    <div className="App">
      <Head />
      <Router>
        <Header>
          <ul>
            <li>
              <Link to="/">Etusivu</Link>
            </li>
            {nav && nav.items && nav.items[0].fields.pages.map((item, idx) =>
              <li key={idx}>
                <Link to={`/${item.fields.slug.toLowerCase()}`}>{item.fields.name}</Link>
              </li>)}
          </ul>
        </Header>
        <div className="Container">
          <Switch>
            <Route path="/:id">
              <SubPage pageContent={content} />
            </Route>
            <Route path="/">
              {pageview("/")}
              {process.env.REACT_APP_BROADCAST_MODE !== 'live'
                && <div id="logoContainer" className="Headline">
                  <img src={resolveAssetUrl("2KyFepzwzH0Jd9TFyTf4yr")} alt="Turun Wappuradio" />
                </div>
              }
              <IndexPage content={indexContent} />
              {/* {process.env.REACT_APP_BROADCAST_MODE === 'live' && <RadioPlayer />}
              {process.env.REACT_APP_BROADCAST_MODE === 'live' && <VideoChatHider />}
              <ShowList shows={showList} /> */}
            </Route>
          </Switch>
        </div>
      </Router>
      <Footer className="Footer" />
    </div>
  );
}
