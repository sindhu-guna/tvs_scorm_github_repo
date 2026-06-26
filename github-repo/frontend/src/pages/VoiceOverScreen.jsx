/* eslint-disable */
import React, { useState, useRef } from 'react';
import HeaderBar from '../components/HeaderBar';
import './VoiceOverScreen.css';

const VOICE_SAMPLES = [
  { id:'m1', label:'Male Voice over Sample 1',   side:'left',  text:'Drive chain freeplay adjustment. Tools required: 30 centimetre engineering scale, 6 millimetre Allen key, 28 millimetre ring spanner, 10 millimetre ring spanner. Repair cycle: Inspect, adjust and lubricate every 500 kilometres once.' },
  { id:'f1', label:'Female Voice over Sample 1', side:'right', text:'The drive chain must be cleaned with C-Type brush and lubricated with TVS TRU SPRAY every 500 kilometres for better chain life and smooth vehicle running.' },
  { id:'m2', label:'Male Voice over Sample 2',   side:'left',  text:'Chain free play: Inspect at every 10000 kilometres or 12 months whichever occurs earlier.' },
  { id:'f2', label:'Female Voice over Sample 2', side:'right', text:'Warning: While cleaning, slowly rotate the wheel in the opposite direction and wipe with a dry cloth.' },
  { id:'m3', label:'Male Voice over Sample 3',   side:'left',  text:'When cleaning the front and rear sprockets, do not rotate the wheel.' },
  { id:'f3', label:'Female Voice over Sample 3', side:'right', text:'Adjust both chain adjusters by the same amount to maintain correct wheel alignment.' },
];

const VoiceOverScreen = ({ onBack, language }) => {
  const [playing, setPlaying] = useState(null);
  const audioRef   = useRef(null);
  const currentRef = useRef(null);

  const stopAll = () => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    if (audioRef.current) { audioRef.current.pause(); audioRef.current.currentTime = 0; }
    currentRef.current = null;
    setPlaying(null);
  };

  const handlePlay = (sample) => {
    // If clicking same one that's playing → stop it
    if (playing === sample.id) { stopAll(); return; }

    // Stop any current
    stopAll();

    setPlaying(sample.id);
    currentRef.current = sample.id;

    // Use MP3 for male sample 1
    if (sample.id === 'm1') {
      const audio = new Audio(`${process.env.PUBLIC_URL}/assets/vo-male-1.mp3`);
      audioRef.current = audio;
      audio.play().catch(() => speakSample(sample));
      audio.onended = () => { if(currentRef.current===sample.id) setPlaying(null); };
      audio.onerror = () => speakSample(sample);
      return;
    }
    speakSample(sample);
  };

  const speakSample = (sample) => {
    if (!window.speechSynthesis) { setPlaying(null); return; }
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(sample.text);
    const isFemale = sample.id.startsWith('f');
    utt.lang  = 'en-US';
    utt.rate  = 0.88;
    utt.pitch = isFemale ? 1.3 : 0.85;
    utt.volume = 0.9;
    const voices = window.speechSynthesis.getVoices();
    const v = isFemale
      ? (voices.find(v=>v.name.includes('Samantha')||v.name.includes('Karen')||v.name.toLowerCase().includes('female'))||voices.find(v=>v.lang.startsWith('en')))
      : (voices.find(v=>v.name.includes('Daniel')||v.name.includes('Alex')||v.name.toLowerCase().includes('male'))||voices.find(v=>v.lang.startsWith('en')));
    if (v) utt.voice = v;
    utt.onend  = () => { if(currentRef.current===sample.id) setPlaying(null); };
    utt.onerror = () => setPlaying(null);
    window.speechSynthesis.speak(utt);
  };

  const handleBack = () => { stopAll(); onBack(); };

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
              <button key="btn" className={`vo-play-btn btn-animated ${isPlaying?'playing':''}`} onClick={() => handlePlay(s)}>
                {isPlaying
                  ? <span className="vo-stop">⏹</span>
                  : <img src={`${process.env.PUBLIC_URL}/assets/icons/play-circle.png`} alt="Play" className="vo-play-icon"/>
                }
              </button>
            );
            const lbl = <span key="lbl" className={`vo-label ${isPlaying?'playing':''}`}>{s.label}</span>;
            return (
              <div key={s.id} className={`vo-row vo-row-${s.side} anim-fade-slide anim-delay-${i+1}`}>
                {isLeft ? [btn, lbl] : [lbl, btn]}
              </div>
            );
          })}
        </div>
      </div>

      <button className="bottom-back-btn btn-animated" onClick={handleBack}>← Back</button>
    </div>
  );
};

export default VoiceOverScreen;
