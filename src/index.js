import React from 'react';
import ReactDOM from 'react-dom';
import { VideoPlayer, RadioPlayer, ShowList } from './components';

function renderVideo() {
  ReactDOM.render(<VideoPlayer />, document.getElementById('radio-root'));
}

function renderRadio() {
  ReactDOM.render(<RadioPlayer />, document.getElementById('video-root'));
}

function renderShows() {
  ReactDOM.render(<ShowList />, document.getElementById('show-root'));
}

function mountComponents() {
  // renderVideo();
  // renderRadio();
  renderShows();
}

mountComponents();
