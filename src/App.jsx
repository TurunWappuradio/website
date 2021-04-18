import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Helmet from 'react-helmet';

import './App.scss';
import {
  Footer,
  SubPage,
  IndexPage,
  Hero,
  RadioPlayer,
  VideoChatHider,
  ShowList,
  Sponsors,
  RadioControlPanel
} from './components';
import { pageview } from './utils/analytics';
import useLiveShowListId from './utils/liveShows';
import useShowList from './utils/shows';

const AUDIO_STREAM_URL = 'https://player.turunwappuradio.com/wappuradio.mp3';

const isLive = process.env.REACT_APP_BROADCAST_MODE === 'live';

export default () => {

  // TODO: this should probably be a provider.
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [song, setSong] = useState({ song: "", artist: "" });
  const [volumeLevel, setVolumeLevel] = useState(100);
  const [playClicked, setPlayClicked] = useState(false);
  const audio = React.createRef();

  const showListId = useLiveShowListId();
  const showList = useShowList(showListId);

  useEffect(() => {
    setTimeout(() => {
      fetch('https://json.turunwappuradio.com/metadata.json', {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors' // no-cors, *cors, same-origin
      })
        .then(res => res.json())
        .then(metadata => {
          setSong(metadata);
        })
        .catch(console.error);
    }, 1000)
  }, [song]);

  const onPlayPause = () => {
    if (audio.current.paused) audio.current.play();
    else {
      // Pause, but then load the stream again ready to start
      audio.current.pause();
      audio.current.src = AUDIO_STREAM_URL;
    }

    setPlaying(!playing);
    setPlayClicked(true);
  }

  const onVolumeOnOff = () => {
    audio.current.muted = !muted;

    setMuted(!muted);
  }

  const changeVolume = (valueArray) => {
    if (valueArray && valueArray.length === 1) {
      audio.current.volume = valueArray[0] / 100;
      muted && onVolumeOnOff();
      setVolumeLevel(valueArray[0]);
    }
  }
  
  pageview();

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
            <Hero controls={<VideoChatHider/>}>
              {!isLive && (
                <>
                  <img src="leima.svg" alt="Turun Wappuradio" />
                  <h1>Lähetys 21.-30.4.</h1>
                </>
              )}
              {isLive && <RadioPlayer playing={playing} onPlayPause={onPlayPause} song={song} />}
              {/* {isLive && <VideoChatHider />} */}
            </Hero>
            {/* <IndexPage />*/}
            <ShowList shows={showList} />
          </Route>
        </Switch>
      </Router>
      <Sponsors />
      <Footer />
      <audio ref={audio}>
        <source src={AUDIO_STREAM_URL} />
      </audio>
      {playClicked && (
        <RadioControlPanel
          playing={playing}
          onPlayingClick={onPlayPause}
          muted={muted}
          onClickMute={onVolumeOnOff}
          song={song}
          volumeLevel={volumeLevel}
          changeVolume={changeVolume}
        />
      )}
    </div>
  );
}
