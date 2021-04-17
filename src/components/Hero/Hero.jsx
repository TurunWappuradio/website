import React from 'react';
import { Header } from '..';
import './Hero.scss';

const Hero = ({ children }) => (
  <div id="logoContainer" className="Hero" style={{
    backgroundImage: 'url("herokuva.jpeg")'
  }}>
    <Header />
    <div className="Hero-colorOverlay">
      <div className="Hero-wrapper">
        {children}
      </div>
    </div>
  </div>
);

export default Hero;