import React from 'react';
import ReactDOM from 'react-dom';
import { VideoPlayer, RadioPlayer, ShoutBox, ShowList, MusicLibrary } from './components';

function renderVideo() {
  const mountPoint = document.getElementById('video-root');
  if (mountPoint) {
    ReactDOM.render(<VideoPlayer />, mountPoint);
  }
}

function renderRadio() {
  const mountPoint = document.getElementById('radio-root');
  const placeHolder = document.getElementById('logoContainer');
  if (mountPoint) {
    placeHolder.style.display = 'none';
    ReactDOM.render(<RadioPlayer />, mountPoint);
  }
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
  if (process.env.BROADCAST_MODE === 'live') {
    renderRadio();
    renderVideo();
  }
  renderShoutBox();
  renderMusic();
  renderShows();
}

mountComponents();
