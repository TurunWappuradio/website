import React from 'react';
import ReactDOM from 'react-dom';
import { VideoPlayer, RadioPlayer, ShoutBox, ShowList, MusicLibrary } from './components';

function renderVideo() {
  ReactDOM.render(<VideoPlayer />, document.getElementById('radio-root'));
}

function renderRadio() {
  ReactDOM.render(<RadioPlayer />, document.getElementById('video-root'));
}

function renderShoutBox() {
  const mountPoint = document.getElementById('shoutbox-root');
  if (mountPoint) {
    ReactDOM.render(<ShoutBox />, mountPoint);
  }
}

function renderShows() {
  const mountPoint = document.getElementById('show-root');
  if (mountPoint) {
    ReactDOM.render(<ShowList />, mountPoint);
  }
}

function renderMusic() {
  const mountPoint = document.getElementById('audiolist-root');
  if (mountPoint) {
    ReactDOM.render(<MusicLibrary />, mountPoint);
  }
}

function mountComponents() {
  // renderVideo();
  // renderRadio();
  renderShoutBox();
  renderMusic();
  renderShows();
  
}

mountComponents();
