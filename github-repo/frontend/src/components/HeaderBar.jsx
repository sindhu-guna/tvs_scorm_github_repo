/* eslint-disable */
import React from 'react';
import TVSLogo from './TVSLogo';

const HeaderBar = ({ onBack, showBack = false }) => (
  <div className="header-bar">
    {showBack ? (
      <button className="back-btn btn-animated" onClick={onBack}>
        ← Back
      </button>
    ) : (
      <span className="header-title">RR 310 – Service Training Module</span>
    )}
    <TVSLogo />
  </div>
);

export default HeaderBar;
