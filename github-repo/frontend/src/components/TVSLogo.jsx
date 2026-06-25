/* eslint-disable */
import React from 'react';

// TVS Logo: Blue text + red horse icon (matches design exactly)
const TVSLogo = ({ style = {} }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', ...style }}>
    {/* Blue TVS text */}
    <svg width="68" height="32" viewBox="0 0 68 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="0" y="26" fontFamily="Poppins, sans-serif" fontSize="28" fontWeight="900" fill="#1a3ccc" letterSpacing="3">TVS</text>
    </svg>
    {/* Red galloping horse */}
    <svg width="44" height="36" viewBox="0 0 44 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Simplified horse silhouette matching TVS logo style */}
      <path d="M8 28 C6 24 5 20 7 16 C9 12 12 10 15 9 C17 8 18 7 19 5 C20 3 21 2 23 2 C25 2 26 3 26 5 C26 6 27 7 29 7 C32 7 36 8 38 10 C40 12 40 15 39 17 C38 19 36 20 34 20 C32 20 30 19 28 18 C26 17 24 17 22 18 C20 19 19 21 19 24 C19 27 20 30 22 32 L18 33 C14 33 10 32 8 28 Z" fill="#e8192c"/>
      {/* Legs */}
      <path d="M14 28 L12 34 M18 29 L17 34 M22 30 L22 35 M26 29 L27 34" stroke="#e8192c" strokeWidth="2" strokeLinecap="round"/>
      {/* Tail */}
      <path d="M8 28 C4 26 2 22 3 18 C4 15 7 13 9 14" stroke="#e8192c" strokeWidth="2" strokeLinecap="round" fill="none"/>
      {/* Mane */}
      <path d="M19 5 C18 4 17 3 18 2 M21 4 C20 3 20 1 22 1 M23 5 C23 3 25 2 26 3" stroke="#e8192c" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    </svg>
  </div>
);

export default TVSLogo;
