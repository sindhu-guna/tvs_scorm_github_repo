/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react';
import HeaderBar from '../components/HeaderBar';
import { getLanguages } from '../services/api';
import './LanguageScreen.css';

const LANGUAGES_FALLBACK = [
  { id: 'en', name: 'English' },
  { id: 'fr', name: 'French' },
  { id: 'ru', name: 'Russian' },
  { id: 'es', name: 'Spanish' },
  { id: 'de', name: 'German' },
  { id: 'pt', name: 'Portugese' },
  { id: 'ar', name: 'Arabic' }
];

const VISIBLE_COUNT = 7;

const LanguageScreen = ({ onNext }) => {
  const [languages, setLanguages] = useState(LANGUAGES_FALLBACK);
  const [selected, setSelected] = useState(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [showNext, setShowNext] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    getLanguages()
      .then(res => { if (res && res.data) setLanguages(res.data); })
      .catch(() => {}); // use fallback
  }, []);

  const handleSelect = (lang) => {
    setSelected(lang.id);
    setShowNext(true);
  };

  const handleScroll = (dir) => {
    setScrollTop(prev => {
      const maxScroll = Math.max(0, languages.length - VISIBLE_COUNT);
      if (dir === 'up') return Math.max(0, prev - 1);
      return Math.min(maxScroll, prev + 1);
    });
  };

  const handleWheel = (e) => {
    e.preventDefault();
    handleScroll(e.deltaY > 0 ? 'down' : 'up');
  };

  const visibleLangs = languages.slice(scrollTop, scrollTop + VISIBLE_COUNT);

  return (
    <div className="screen lang-screen">
      <div className="screen-bg" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/assets/background.jpg)`}} />
      <HeaderBar />

      {/* Bike - shifted left per design */}
      <div className="bike-shifted-container">
        <img src={`${process.env.PUBLIC_URL}/assets/bike-shifted.jpg`} alt="TVS Apache RR 310" className="bike-shifted-img" />
      </div>

      {/* Language List - right panel */}
      <div className="lang-panel" onWheel={handleWheel}>
        <ul className="lang-list" ref={listRef}>
          {visibleLangs.map((lang, i) => (
            <li
              key={lang.id}
              className={`lang-item btn-animated anim-slide-right anim-delay-${i + 1} ${selected === lang.id ? 'lang-item-selected' : ''}`}
              onClick={() => handleSelect(lang)}
            >
              {/* Active indicator line */}
              {selected === lang.id && <span className="lang-active-line" />}
              <span className="lang-name">{lang.name}</span>
              {/* Right dash for Portugese and Arabic visible in design */}
              {(lang.id === 'pt' || lang.id === 'ar') && (
                <span className="lang-dash">—</span>
              )}
            </li>
          ))}
        </ul>

        {/* Scroll controls */}
        <div className="scroll-controls">
          <button className="scroll-arrow btn-animated" onClick={() => handleScroll('up')} disabled={scrollTop === 0}>
            ∧
          </button>
          <button className="scroll-arrow btn-animated" onClick={() => handleScroll('down')} disabled={scrollTop >= languages.length - VISIBLE_COUNT}>
            ∨
          </button>
        </div>
      </div>

      {/* Next Button */}
      {showNext && (
        <div className="next-btn-wrapper anim-pop">
          <button
            className="next-btn btn-animated"
            onClick={() => onNext(selected)}
          >
            <span className="next-text">Next</span>
            <img src={`${process.env.PUBLIC_URL}/assets/icons/arrow-right.png`} alt="Next" className="next-icon" />
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageScreen;
