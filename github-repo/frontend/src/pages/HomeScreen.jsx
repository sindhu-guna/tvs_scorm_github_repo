/* eslint-disable */
import React, { useState, useEffect } from 'react';
import HeaderBar from '../components/HeaderBar';
import './HomeScreen.css';

const HomeScreen = ({ onSelectLanguage }) => {
  const [showBtn, setShowBtn] = useState(false);
  const [bikeLoaded, setBikeLoaded] = useState(false);
  const [bikeShifted] = useState(false);

  useEffect(() => {
    // Sequence: bike appears → heading appears → Select Language button appears
    const t1 = setTimeout(() => setBikeLoaded(true), 300);
    const t2 = setTimeout(() => setShowBtn(true), 1200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="screen home-screen">
      {/* Background */}
      <div className="screen-bg" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/assets/background.jpg)`}} />

      {/* Header */}
      <HeaderBar />

      {/* Bike Image - centered initially */}
      <div className={`bike-container ${bikeLoaded ? 'bike-visible' : ''} ${bikeShifted ? 'bike-shifted' : ''}`}>
        <img
          src={`${process.env.PUBLIC_URL}/assets/bike.jpg`}
          alt="TVS Apache RR 310"
          className="bike-image"
          onLoad={() => setBikeLoaded(true)}
        />
      </div>

      {/* Select Language Button - bottom right */}
      {showBtn && (
        <div className="select-lang-wrapper anim-slide-right">
          <button
            className="select-lang-btn btn-animated"
            onClick={onSelectLanguage}
          >
            <span className="select-lang-text">Select Language</span>
            <img
              src={`${process.env.PUBLIC_URL}/assets/icons/translation.png`}
              alt="Language"
              className="lang-icon"
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
