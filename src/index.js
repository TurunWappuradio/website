import React from 'react';
import ReactDOM from 'react-dom';
import {
  RadioPlayer,
  VideoChatHider,
  ShowList,
  MusicLibrary,
  Dashboard,
  MetadataForm,
  CalendarEvents
} from './components';

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

function renderShoutBox() {
  const mountPoint = document.getElementById('shoutbox-root');
  if (mountPoint) {
    ReactDOM.render(<Dashboard />, mountPoint);
  }
}

function renderMetadataForm() {
  const mountPoint = document.getElementById('metadata-root');
  if (mountPoint) {
    ReactDOM.render(<MetadataForm />, mountPoint);
  }
}

function renderCalendarEvents() {
  const mountPoint = document.getElementById('calendar-root');
  if (mountPoint) {
    ReactDOM.render(<CalendarEvents />, mountPoint);
  }
}

function mountComponents() {
  if (process.env.BROADCAST_MODE === 'live') {
    renderRadio();
    renderVideoChatHider();
    if (process.env.CHAT_MODE === 'live') {
      renderShoutBox();
    }
    renderMetadataForm();
  }
  renderMusic();
  renderShows();
  renderCalendarEvents();
}

mountComponents();
