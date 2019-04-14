import React from 'react';
import ReactDOM from 'react-dom';
import { VideoPlayer, RadioPlayer, ShowList, MusicLibrary } from './components';

function renderVideo() {
  ReactDOM.render(<VideoPlayer />, document.getElementById('radio-root'));
}

function renderRadio() {
  ReactDOM.render(<RadioPlayer />, document.getElementById('video-root'));
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
  renderMusic();
  renderShows();
}

mountComponents();
