import React from 'react';
import { Header } from '..';
import './Hero.scss';

const Hero = ({ text }) => (
  <div id="logoContainer" className="Hero" style={{
    backgroundImage: 'url("herokuva.jpeg")'
  }}>
    <Header />
    <div className="Hero-colorOverlay">
      <div className="Hero-wrapper">
        <img src="leima.svg" alt="Turun Wappuradio" />
        <h1>{text}</h1>
      </div>
    </div>
  </div>
);

export default Hero;