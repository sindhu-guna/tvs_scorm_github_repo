/* eslint-disable */
import React, { useState, useRef } from 'react';
import HeaderBar from '../components/HeaderBar';
import './VoiceOverScreen.css';

const VOICE_SAMPLES = [
  { id:'m1', label:'Male Voice over Sample 1',   side:'left',  text:'Drive chain freeplay adjustment. Tools required: 30 centimetre engineering scale, 6 millimetre Allen key, 28 millimetre ring spanner.' },
  { id:'f1', label:'Female Voice over Sample 1', side:'right', text:'Repair cycle: Inspect, adjust and lubricate every 500 kilometres once.' },
  { id:'m2', label:'Male Voice over Sample 2',   side:'left',  text:'The drive chain must be cleaned with C-Type brush and lubricated with TVS TRU SPRAY every 500 kilometres.' },
  { id:'f2', label:'Female Voice over Sample 2', side:'right', text:'Chain free play: Inspect at every 10000 kilometres or 12 months whichever occurs earlier.' },
  { id:'m3', label:'Male Voice over Sample 3',   side:'left',  text:'Warning: While cleaning, slowly rotate the wheel in the opposite direction.' },
  { id:'f3', label:'Female Voice over Sample 3', side:'right', text:'When cleaning the front and rear sprockets, do not rotate the wheel.' },
];

const VoiceOverScreen = ({ onBack }) => {
  const [playing, setPlaying] = useState(null);

  const handlePlay = (sample) => {
    if (playing === sample.id) {
      window.speechSynthesis.cancel();
      setPlaying(null);
      return;
    }
    window.speechSynthesis.cancel();
    setPlaying(sample.id);

    // Try MP3 first
    if (sample.id === 'm1') {
      try {
        const audio = new Audio(`${process.env.PUBLIC_URL}/assets/vo-male-1.mp3`);
        audio.play().catch(() => speakText(sample));
        audio.onended = () => setPlaying(null);
        return;
      } catch(e) {}
    }
    speakText(sample);
  };

  const speakText = (sample) => {
    if (!window.speechSynthesis) { setPlaying(null); return; }
    const utt = new SpeechSynthesisUtterance(sample.text);
    utt.rate = 0.9;
    const isFemale = sample.id.startsWith('f');
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => v.lang.startsWith('en') && (isFemale ? v.name.toLowerCase().includes('female') || v.name.includes('Samantha') || v.name.includes('Karen') : v.name.toLowerCase().includes('male') || v.name.includes('Daniel') || v.name.includes('Alex'))) || voices.find(v => v.lang.startsWith('en'));
    if (voice) utt.voice = voice;
    utt.pitch = isFemale ? 1.3 : 0.9;
    utt.onend = () => setPlaying(null);
    utt.onerror = () => setPlaying(null);
    window.speechSynthesis.speak(utt);
  };

  return (
    <div className="screen vo-screen">
      <div className="screen-bg" style={{backgroundImage:`url(${process.env.PUBLIC_URL}/assets/background.jpg)`}} />
      <HeaderBar />

      <div className="vo-content">
        <h2 className="vo-title anim-fade-slide">VOICE OVERS</h2>
        <div className="vo-list">
          {VOICE_SAMPLES.map((s, i) => {
            const isLeft = s.side === 'left';
            const isPlaying = playing === s.id;
            const btn = (
              <button key="btn" className={`vo-play-btn btn-animated ${isPlaying ? 'playing' : ''}`} onClick={() => handlePlay(s)}>
                {isPlaying
                  ? <span className="vo-pause">⏸</span>
                  : <img src={`${process.env.PUBLIC_URL}/assets/icons/play-circle.png`} alt="Play" className="vo-play-icon" />
                }
              </button>
            );
            const lbl = <span key="lbl" className={`vo-label ${isPlaying ? 'playing' : ''}`}>{s.label}</span>;
            return (
              <div key={s.id} className={`vo-row vo-row-${s.side} anim-fade-slide anim-delay-${i+1}`}>
                {isLeft ? [btn, lbl] : [lbl, btn]}
              </div>
            );
          })}
        </div>
      </div>
      <button className="bottom-back-btn btn-animated" onClick={() => { window.speechSynthesis.cancel(); onBack(); }}>← Back</button>
    </div>
  );
};

export default VoiceOverScreen;
