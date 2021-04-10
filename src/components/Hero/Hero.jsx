import React from 'react';
import './Hero.scss';

const Hero = ({ text }) => (
  <div id="logoContainer" className="Hero">
    <div className="Hero-wrapper">
      <img src="leima.svg" alt="Turun Wappuradio" />
      <h1>{text}</h1>
    </div>
  </div>
);

export default Hero;