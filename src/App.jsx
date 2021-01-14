import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Helmet from 'react-helmet';

import resolveAssetUrl from './utils/assetUrlResolver';
import './App.scss';
import {
  Footer,
  Header,
  SubPage,
  IndexPage,
  ArchivedShowList
} from './components';
import { pageview } from './utils/analytics';

export default () => {
  pageview();

  return (
    <div className="App">
      <Router>
        <Header />
        {process.env.REACT_APP_BROADCAST_MODE !== 'live'
          && <div id="logoContainer" className="Headline">
            <img src={`${resolveAssetUrl("42UqcWCsSZ4IZyvq0Ucy6b")}?w=300`} alt="Turun Wappuradio" />
          </div>
        }
        <div className="Container">
          <Switch>
            <Route path="/ohjelmakartta/:showListKey">
              <ArchivedShowList />
            </Route>
            <Route path="/:id">
              <SubPage />
            </Route>
            <Route path="/">
              <Helmet>
                <title>Turun Wappuradio</title>
                <meta name="description" content="Wappuradio 21.-30.4."></meta>
              </Helmet>
              <IndexPage />
              {/* {process.env.REACT_APP_BROADCAST_MODE === 'live' && <RadioPlayer />}
              {process.env.REACT_APP_BROADCAST_MODE === 'live' && <VideoChatHider />}
              <ShowList shows={showList} /> */}
            </Route>
          </Switch>
        </div>
      </Router>
      {/* <Sponsors /> */}
      <Footer />
    </div>
  );
}
