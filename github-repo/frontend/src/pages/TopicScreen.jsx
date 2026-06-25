import React, { useState, useEffect, useRef } from 'react';
import HeaderBar from '../components/HeaderBar';
import { getTopics } from '../services/api';
import './TopicScreen.css';

const TOPICS_FALLBACK = [
  { id: 1, name: 'Battery voltage' },
  { id: 2, name: 'Engine oil filter' },
  { id: 3, name: 'Air cleaner element' },
  { id: 4, name: 'Spark plug' },
  { id: 5, name: 'Tappet clearance' },
  { id: 6, name: 'Clutch operations' },
  { id: 7, name: 'Front and rear suspension' },
  { id: 8, name: 'Headlamp beam' },
  { id: 9, name: 'Front and rear brake fluid level' },
  { id: 10, name: 'Front and rear brake pad wear' },
  { id: 11, name: 'Brake hose / rubber parts' },
  { id: 12, name: 'Tyre air pressure' },
  { id: 13, name: 'Coolant level, water hoses' },
  { id: 14, name: 'Drive chain slackness / lubrication Inspect' },
  { id: 15, name: 'Steering play' },
  { id: 16, name: 'Lubrication points' },
  { id: 17, name: 'Brake pedal / gear shift lever mounting pin' },
  { id: 18, name: 'All fastner checking and tightening' },
  { id: 19, name: 'All light & horn inspection' },
  { id: 20, name: 'Brake fluid Replacement' }
];

const VISIBLE_COUNT = 10;

const TopicScreen = ({ onStartModule }) => {
  const [topics, setTopics] = useState(TOPICS_FALLBACK);
  const [selected, setSelected] = useState(null);
  const [scrollTop, setScrollTop] = useState(0);
  const listRef = useRef(null);

  useEffect(() => {
    getTopics()
      .then(res => { if (res.data) setTopics(res.data); })
      .catch(() => {});
  }, []);

  const handleSelect = (topic) => setSelected(topic.id);

  const handleScroll = (dir) => {
    setScrollTop(prev => {
      const max = Math.max(0, topics.length - VISIBLE_COUNT);
      if (dir === 'up') return Math.max(0, prev - 1);
      return Math.min(max, prev + 1);
    });
  };

  const handleWheel = (e) => {
    e.preventDefault();
    handleScroll(e.deltaY > 0 ? 'down' : 'up');
  };

  const visibleTopics = topics.slice(scrollTop, scrollTop + VISIBLE_COUNT);

  return (
    <div className="screen topic-screen">
      <div className="screen-bg" />
      <HeaderBar />

      {/* Bike - positioned right */}
      <div className="topic-bike-container">
        <img src={`${process.env.PUBLIC_URL}/assets/bike-shifted.jpg`} alt="TVS Apache RR 310" className="topic-bike-img" />
      </div>

      {/* Left panel: Select Topic */}
      <div className="topic-panel" onWheel={handleWheel}>
        <div className="topic-title-row">
          <span className="topic-colon">⁝</span>
          <h2 className="topic-title">Select Topic</h2>
        </div>

        <ul className="topic-list" ref={listRef}>
          {visibleTopics.map((topic, i) => {
            const globalIdx = scrollTop + i;
            const isSelected = selected === topic.id;
            return (
              <li
                key={topic.id}
                className={`topic-item btn-animated anim-fade-slide anim-delay-${Math.min(i + 1, 7)} ${isSelected ? 'topic-item-selected' : ''}`}
                onClick={() => handleSelect(topic)}
              >
                <span className="topic-name">
                  {globalIdx + 1}. {topic.name}
                </span>
              </li>
            );
          })}
        </ul>

        {/* Scroll Controls */}
        <div className="topic-scroll-controls">
          <button
            className="scroll-arrow btn-animated"
            onClick={() => handleScroll('up')}
            disabled={scrollTop === 0}
          >∧</button>
          <button
            className="scroll-arrow btn-animated"
            onClick={() => handleScroll('down')}
            disabled={scrollTop >= topics.length - VISIBLE_COUNT}
          >∨</button>
        </div>
      </div>

      {/* Start Module Button */}
      {selected && (
        <div className="start-module-wrapper anim-pop">
          <button
            className="start-module-btn btn-animated"
            onClick={() => onStartModule(selected)}
          >
            <span className="start-module-text">Start Module</span>
            <img src={`${process.env.PUBLIC_URL}/assets/icons/arrow-right.png`} alt="Start" className="start-icon" />
          </button>
        </div>
      )}
    </div>
  );
};

export default TopicScreen;
