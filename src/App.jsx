import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Helmet from 'react-helmet';

import './App.scss';
import {
  Footer,
  Header,
  SubPage,
  IndexPage
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
            <img src="leima.svg" alt="Turun Wappuradio" />
            <h1>Wappuradio starttaa 21.4.</h1>
            Verkossa ja taajuudella 93,8MHz
          </div>
        }
        <div className="Container">
          <Switch>
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
