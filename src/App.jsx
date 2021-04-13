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
  IndexPage,
  Hero,
  RadioPlayer,
  VideoChatHider,
  ShowList
} from './components';
import { pageview } from './utils/analytics';
import useLiveShowListId from './utils/liveShows';
import useShowList from './utils/shows';

export default () => {
  pageview();

  const showListId = useLiveShowListId();
  const showList = useShowList(showListId);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/:id">
            <SubPage />
          </Route>
          <Route path="/">
            <Helmet>
              <title>Turun Wappuradio</title>
              <meta name="description" content="Wappuradio 21.-30.4."></meta>
            </Helmet>
            <Hero text="Lähetys 21.-30.4." />
            {/* <IndexPage /> */}
            {process.env.REACT_APP_BROADCAST_MODE === 'live' && <RadioPlayer />}
            {process.env.REACT_APP_BROADCAST_MODE === 'live' && <VideoChatHider />}
            <ShowList shows={showList} />
          </Route>
        </Switch>
      </Router>
      {/* <Sponsors /> */}
      <Footer />
    </div>
  );
}
