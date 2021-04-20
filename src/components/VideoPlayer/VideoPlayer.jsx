import React from 'react';
import './VideoPlayer.scss';

export default class extends React.Component {
  render() {
    return <iframe src="https://player.twitch.tv/?channel=turunwappuradio&parent=www.turunwappuradio.com&muted=true" />;
  }
}
