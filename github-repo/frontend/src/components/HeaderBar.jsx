/* eslint-disable */
import React from 'react';
import TVSLogo from './TVSLogo';

// Header never shows back button - back is always at bottom of screen
const HeaderBar = () => (
  <div className="header-bar">
    <span className="header-title">RR 310 – Service Training Module</span>
    <TVSLogo />
  </div>
);

export default HeaderBar;
