/* eslint-disable */
import React, { useState, useEffect } from 'react';
import HeaderBar from '../components/HeaderBar';
import { getLanguages } from '../services/api';
import './LanguageScreen.css';

const LANGUAGES_FALLBACK = [
  { id: 'en', name: 'English' }, { id: 'fr', name: 'French' },
  { id: 'ru', name: 'Russian' }, { id: 'es', name: 'Spanish' },
  { id: 'de', name: 'German' }, { id: 'pt', name: 'Portugese' },
  { id: 'ar', name: 'Arabic' }
];

const VISIBLE_COUNT = 7;

const LanguageScreen = ({ onNext, onBack }) => {
  const [languages, setLanguages] = useState(LANGUAGES_FALLBACK);
  const [selected, setSelected] = useState(null);
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    getLanguages().then(res => { if (res && res.data) setLanguages(res.data); }).catch(() => {});
  }, []);

  const handleSelect = (lang) => setSelected(lang.id);
  const handleDoubleClick = (lang) => { setSelected(lang.id); onNext(lang.id); };

  const handleScroll = (dir) => {
    setScrollTop(prev => {
      const max = Math.max(0, languages.length - VISIBLE_COUNT);
      if (dir === 'up') return Math.max(0, prev - 1);
      return Math.min(max, prev + 1);
    });
  };

  const visibleLangs = languages.slice(scrollTop, scrollTop + VISIBLE_COUNT);

  return (
    <div className="screen lang-screen" onWheel={(e) => { e.preventDefault(); handleScroll(e.deltaY > 0 ? 'down' : 'up'); }}>
      <div className="screen-bg" style={{backgroundImage:`url(${process.env.PUBLIC_URL}/assets/background.jpg)`}} />
      <HeaderBar showBack={true} onBack={onBack} />

      <div className="lang-bike">
        <img src={`${process.env.PUBLIC_URL}/assets/bike-shifted.jpg`} alt="TVS Apache RR 310" style={{width:'100%',height:'100%',objectFit:'cover'}} />
      </div>

      <div className="lang-panel">
        <ul className="lang-list">
          {visibleLangs.map((lang, i) => (
            <li
              key={lang.id}
              className={`lang-item btn-animated anim-slide-right anim-delay-${i + 1} ${selected === lang.id ? 'lang-selected' : ''}`}
              onClick={() => handleSelect(lang)}
              onDoubleClick={() => handleDoubleClick(lang)}
            >
              {selected === lang.id && <span className="lang-active-bar" />}
              <span className="lang-name">{lang.name}</span>
            </li>
          ))}
        </ul>
        <div className="scroll-controls">
          <button className="scroll-arrow btn-animated" onClick={() => handleScroll('up')} disabled={scrollTop === 0}>∧</button>
          <button className="scroll-arrow btn-animated" onClick={() => handleScroll('down')} disabled={scrollTop >= languages.length - VISIBLE_COUNT}>∨</button>
        </div>
      </div>

      {selected && (
        <div className="next-wrap anim-pop">
          <button className="next-btn btn-animated" onClick={() => onNext(selected)}>
            <span className="next-text">Next</span>
            <img src={`${process.env.PUBLIC_URL}/assets/icons/arrow-right.png`} alt="Next" className="next-icon" />
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageScreen;
