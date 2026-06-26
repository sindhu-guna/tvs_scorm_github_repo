/* eslint-disable */
import React from 'react';

// TVS Logo exactly as reference image - Large blue bold TVS + bigger red horse
const TVSLogo = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '0px', flexShrink: 0 }}>
    {/* Blue TVS text - bold large */}
    <span style={{
      fontFamily: 'Poppins, Arial Black, sans-serif',
      fontSize: 'clamp(22px, 2.4vw, 34px)',
      fontWeight: 900,
      color: '#1565C0',
      letterSpacing: '2px',
      lineHeight: 1,
    }}>TVS</span>
    {/* Red horse SVG - bigger */}
    <svg
      width="clamp(36px, 3.5vw, 52px)"
      height="clamp(30px, 3vw, 44px)"
      viewBox="0 0 52 44"
      style={{ width: 'clamp(36px, 3.5vw, 52px)', height: 'clamp(30px, 3vw, 44px)' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Horse body */}
      <path
        d="M4 36 C3 30 3 24 5 19 C8 14 12 11 16 10 C19 9 20 7 22 4 C23 2 25 1 27 1 C30 1 31 3 31 6 C31 8 33 9 36 9 C40 9 44 11 46 14 C48 17 48 21 47 24 C46 26 43 28 40 28 C37 28 34 26 32 24 C29 22 27 22 24 24 C21 25 19 28 19 32 C19 36 20 40 22 42 L18 42 C13 42 6 40 4 36Z"
        fill="#E53935"
      />
      {/* 4 legs */}
      <line x1="13" y1="38" x2="10" y2="44" stroke="#E53935" strokeWidth="3" strokeLinecap="round"/>
      <line x1="18" y1="40" x2="17" y2="44" stroke="#E53935" strokeWidth="3" strokeLinecap="round"/>
      <line x1="23" y1="41" x2="24" y2="44" stroke="#E53935" strokeWidth="3" strokeLinecap="round"/>
      <line x1="28" y1="40" x2="30" y2="44" stroke="#E53935" strokeWidth="3" strokeLinecap="round"/>
      {/* Tail */}
      <path d="M4 33 C1 30 0 26 2 21" stroke="#E53935" strokeWidth="2" strokeLinecap="round" fill="none"/>
      {/* Mane */}
      <path d="M22 4 C21 2 23 0 25 1" stroke="#E53935" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M25 3 C24 1 26 0 28 1" stroke="#E53935" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    </svg>
  </div>
);

export default TVSLogo;
