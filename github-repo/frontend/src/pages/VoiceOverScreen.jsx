import React, { useState, useRef } from 'react';
import HeaderBar from '../components/HeaderBar';
import './VoiceOverScreen.css';

const VOICE_SAMPLES = [
  { id: 'male-1',   label: 'Male Voice over Sample 1',   side: 'left',  audio: `${process.env.PUBLIC_URL}/assets/vo-male-1.mp3` },
  { id: 'female-1', label: 'Female Voice over Sample 1', side: 'right', audio: null },
  { id: 'male-2',   label: 'Male Voice over Sample 2',   side: 'left',  audio: null },
  { id: 'female-2', label: 'Female Voice over Sample 2', side: 'right', audio: null },
  { id: 'male-3',   label: 'Male Voice over Sample 3',   side: 'left',  audio: null },
  { id: 'female-3', label: 'Female Voice over Sample 3', side: 'right', audio: null },
];

const VoiceOverScreen = ({ onBack }) => {
  const [playing, setPlaying] = useState(null);
  const audioRef = useRef(null);

  const handlePlay = (sample) => {
    if (playing === sample.id) {
      if (audioRef.current) audioRef.current.pause();
      setPlaying(null);
      return;
    }
    if (audioRef.current) { audioRef.current.pause(); }
    setPlaying(sample.id);
    if (sample.audio) {
      audioRef.current = new Audio(sample.audio);
      audioRef.current.play().catch(() => {});
      audioRef.current.onended = () => setPlaying(null);
    } else {
      // Demo: just animate for 3s
      setTimeout(() => setPlaying(null), 3000);
    }
  };

  return (
    <div className="screen vo-screen">
      <div className="screen-bg" />
      <HeaderBar />

      <div className="vo-content">
        <h2 className="vo-title anim-fade-slide">VOICE OVERS</h2>

        <div className="vo-list">
          {VOICE_SAMPLES.map((sample, i) => {
            const isLeft = sample.side === 'left';
            const isPlaying = playing === sample.id;
            return (
              <div
                key={sample.id}
                className={`vo-row vo-row-${sample.side} anim-fade-slide anim-delay-${i + 1}`}
              >
                {isLeft && (
                  <>
                    <button
                      className={`vo-play-btn btn-animated ${isPlaying ? 'vo-play-active' : ''}`}
                      onClick={() => handlePlay(sample)}
                    >
                      {isPlaying ? (
                        <span className="vo-pause-icon">⏸</span>
                      ) : (
                        <img src={`${process.env.PUBLIC_URL}/assets/icons/play-circle.png`} alt="Play" className="vo-play-icon" />
                      )}
                    </button>
                    <span className={`vo-label ${isPlaying ? 'vo-label-active' : ''}`}>
                      {sample.label}
                    </span>
                  </>
                )}
                {!isLeft && (
                  <>
                    <span className={`vo-label vo-label-right ${isPlaying ? 'vo-label-active' : ''}`}>
                      {sample.label}
                    </span>
                    <button
                      className={`vo-play-btn btn-animated ${isPlaying ? 'vo-play-active' : ''}`}
                      onClick={() => handlePlay(sample)}
                    >
                      {isPlaying ? (
                        <span className="vo-pause-icon">⏸</span>
                      ) : (
                        <img src={`${process.env.PUBLIC_URL}/assets/icons/play-circle.png`} alt="Play" className="vo-play-icon" />
                      )}
                    </button>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {onBack && (
        <button className="vo-back-btn btn-animated" onClick={onBack}>
          ← Back
        </button>
      )}
    </div>
  );
};

export default VoiceOverScreen;
