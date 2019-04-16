import React from 'react';
import ReactDOM from 'react-dom';
import { RadioPlayer, VideoChatHider, ShowList, MusicLibrary } from './components';

function renderRadio() {
  const mountPoint = document.getElementById('radio-root');
  const placeHolder = document.getElementById('logoContainer');
  if (mountPoint) {
    placeHolder.style.display = 'none';
    ReactDOM.render(<RadioPlayer />, mountPoint);
  }
}

function renderVideoChatHider() {
  const mountPoint = document.getElementById('videochat-root');
  if (mountPoint) {
    ReactDOM.render(<VideoChatHider />, mountPoint);
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
    renderVideoChatHider();
  }
  renderMusic();
  renderShows();
}

mountComponents();
