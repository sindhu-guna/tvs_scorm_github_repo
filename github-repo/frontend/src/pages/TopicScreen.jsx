/* eslint-disable */
import React, { useState, useEffect } from 'react';
import HeaderBar from '../components/HeaderBar';
import { getTopics } from '../services/api';
import './TopicScreen.css';

const TOPICS_FALLBACK = [
  { id: 1, name: 'Battery voltage' }, { id: 2, name: 'Engine oil filter' },
  { id: 3, name: 'Air cleaner element' }, { id: 4, name: 'Spark plug' },
  { id: 5, name: 'Tappet clearance' }, { id: 6, name: 'Clutch operations' },
  { id: 7, name: 'Front and rear suspension' }, { id: 8, name: 'Headlamp beam' },
  { id: 9, name: 'Front and rear brake fluid level' }, { id: 10, name: 'Front and rear brake pad wear' },
  { id: 11, name: 'Brake hose / rubber parts' }, { id: 12, name: 'Tyre air pressure' },
  { id: 13, name: 'Coolant level, water hoses' }, { id: 14, name: 'Drive chain slackness / lubrication Inspect' },
  { id: 15, name: 'Steering play' }, { id: 16, name: 'Lubrication points' },
  { id: 17, name: 'Brake pedal / gear shift lever mounting pin' },
  { id: 18, name: 'All fastner checking and tightening' },
  { id: 19, name: 'All light & horn inspection' }, { id: 20, name: 'Brake fluid Replacement' }
];

const VISIBLE_COUNT = 10;

const TopicScreen = ({ onStartModule, onBack }) => {
  const [topics, setTopics] = useState(TOPICS_FALLBACK);
  const [selected, setSelected] = useState(null);
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    getTopics().then(res => { if (res && res.data) setTopics(res.data); }).catch(() => {});
  }, []);

  const handleSelect = (topic) => setSelected(topic.id);
  const handleDoubleClick = (topic) => { setSelected(topic.id); onStartModule(topic.id); };
  const handleScroll = (dir) => {
    setScrollTop(prev => {
      const max = Math.max(0, topics.length - VISIBLE_COUNT);
      return dir === 'up' ? Math.max(0, prev - 1) : Math.min(max, prev + 1);
    });
  };

  const visibleTopics = topics.slice(scrollTop, scrollTop + VISIBLE_COUNT);

  return (
    <div className="screen topic-screen" onWheel={(e) => { e.preventDefault(); handleScroll(e.deltaY > 0 ? 'down' : 'up'); }}>
      <div className="screen-bg" style={{backgroundImage:`url(${process.env.PUBLIC_URL}/assets/background.jpg)`}} />
      <HeaderBar />

      <div className="topic-bike">
        <img src={`${process.env.PUBLIC_URL}/assets/bike-shifted.jpg`} alt="bike" style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'left center'}} />
      </div>

      <div className="topic-panel">
        <div className="topic-header">
          <span className="topic-colon">⁝</span>
          <h2 className="topic-title">Select Topic</h2>
        </div>
        <ul className="topic-list">
          {visibleTopics.map((topic, i) => {
            const globalIdx = scrollTop + i;
            return (
              <li
                key={topic.id}
                className={`topic-item btn-animated anim-fade-slide anim-delay-${Math.min(i+1,7)} ${selected === topic.id ? 'topic-item-selected' : ''}`}
                onClick={() => handleSelect(topic)}
                onDoubleClick={() => handleDoubleClick(topic)}
              >
                <span className="topic-name">{globalIdx + 1}. {topic.name}</span>
              </li>
            );
          })}
        </ul>
        <div className="topic-scroll">
          <button className="scroll-arrow btn-animated" onClick={() => handleScroll('up')} disabled={scrollTop === 0}>∧</button>
          <button className="scroll-arrow btn-animated" onClick={() => handleScroll('down')} disabled={scrollTop >= topics.length - VISIBLE_COUNT}>∨</button>
        </div>
      </div>

      {selected && (
        <div className="start-wrap anim-pop">
          <button className="start-btn btn-animated" onClick={() => onStartModule(selected)}>
            <span className="start-text">Start Module</span>
            <img src={`${process.env.PUBLIC_URL}/assets/icons/arrow-right.png`} alt="Start" className="start-icon" />
          </button>
        </div>
      )}
      <button className="bottom-back-btn btn-animated" onClick={onBack}>← Back</button>
    </div>
  );
};

export default TopicScreen;
