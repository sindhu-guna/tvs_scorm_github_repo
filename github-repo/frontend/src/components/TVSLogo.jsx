/* eslint-disable */
import React from 'react';

const TVSLogo = () => (
  <img
    src={`${process.env.PUBLIC_URL}/assets/tvs-logo.png`}
    alt="TVS"
    style={{
      height: 'clamp(36px, 4vw, 56px)',
      width: 'auto',
      objectFit: 'contain',
      display: 'block',
      flexShrink: 0,
    }}
  />
);

export default TVSLogo;
