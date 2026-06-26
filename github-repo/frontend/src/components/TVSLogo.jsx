/* eslint-disable */
import React from 'react';

// TVS Logo exactly matching the reference image - Blue TVS text + Red horse
const TVSLogo = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
    <svg width="60" height="28" viewBox="0 0 60 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="0" y="24" fontFamily="Poppins, Arial, sans-serif" fontSize="26" fontWeight="900" fill="#1565C0" letterSpacing="1">TVS</text>
    </svg>
    <svg width="38" height="30" viewBox="0 0 38 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 24 C2 20 2 16 4 13 C6 10 9 8 12 7 C14 6 15 5 16 3 C17 2 18 1 20 1 C22 1 23 2 23 4 C23 5 24 6 26 6 C29 6 32 7 34 9 C36 11 36 14 35 16 C34 17 32 18 30 18 C28 18 26 17 24 16 C22 15 20 15 18 16 C16 17 15 19 15 22 C15 24 16 27 17 28 L14 28 C10 28 5 27 3 24Z" fill="#E53935"/>
      <line x1="10" y1="25" x2="8" y2="30" stroke="#E53935" strokeWidth="2" strokeLinecap="round"/>
      <line x1="14" y1="26" x2="13" y2="30" stroke="#E53935" strokeWidth="2" strokeLinecap="round"/>
      <line x1="17" y1="27" x2="18" y2="30" stroke="#E53935" strokeWidth="2" strokeLinecap="round"/>
      <line x1="21" y1="26" x2="22" y2="30" stroke="#E53935" strokeWidth="2" strokeLinecap="round"/>
      <path d="M3 22 C1 20 0 17 1 14" stroke="#E53935" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    </svg>
  </div>
);

export default TVSLogo;
