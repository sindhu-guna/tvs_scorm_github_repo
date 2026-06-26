/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react';
import HeaderBar from '../components/HeaderBar';
import './SampleScreen.css';

const CLIPS = [
  { id: 1, title: '1. Heading Slide',        type: 'heading',   isQuestion: false },
  { id: 2, title: '2. Tools Required Slide', type: 'tools',     isQuestion: false },
  { id: 3, title: '3. Repair Cycle Slide',   type: 'repair',    isQuestion: false },
  { id: 4, title: '4. Note / Caution Slide', type: 'caution',   isQuestion: false },
  { id: 5, title: '5. Question Slide',       type: 'question',  isQuestion: true  },
  { id: 6, title: '6. Voice Overs',          type: 'voiceover', isQuestion: false },
];

const THUMBS = {
  heading: (
    <svg viewBox="0 0 280 158" style={{width:'100%',height:'100%'}}>
      <rect width="280" height="158" fill="#f0f0f0"/>
      <rect x="0" y="0" width="155" height="158" fill="#e4e4e4"/>
      <ellipse cx="77" cy="108" rx="50" ry="28" fill="#cc1a2a" opacity=".8"/>
      <rect x="48" y="68" width="58" height="38" rx="7" fill="#cc1a2a"/>
      <circle cx="42" cy="118" r="17" fill="#333"/>
      <circle cx="112" cy="118" r="17" fill="#333"/>
      <circle cx="140" cy="79" r="38" fill="none" stroke="#bbb" strokeWidth="10" opacity=".25"/>
      <text x="165" y="50" fontFamily="Arial" fontSize="9" fontWeight="bold" fill="#333">Drive Chain Freeplay</text>
      <text x="165" y="63" fontFamily="Arial" fontSize="9" fontWeight="bold" fill="#333">Adjustment</text>
      <text x="165" y="78" fontFamily="Arial" fontSize="8" fill="#888">TVS Apache RR 310</text>
      <rect x="163" y="138" width="40" height="13" fill="#cc1a2a" rx="2"/>
      <text x="168" y="148" fontFamily="Arial" fontSize="7" fill="white" fontWeight="bold">TVS</text>
    </svg>
  ),
  tools: (
    <svg viewBox="0 0 280 158" style={{width:'100%',height:'100%'}}>
      <rect width="280" height="158" fill="#f5f5f5"/>
      <circle cx="140" cy="79" r="56" fill="none" stroke="#ddd" strokeWidth="13" opacity=".35"/>
      <text x="15" y="38" fontFamily="Arial" fontSize="9" fontWeight="bold" fill="#cc1a2a">Tools Required :</text>
      <text x="15" y="56" fontFamily="Arial" fontSize="8" fill="#cc1a2a">30 cm engineering scale,</text>
      <text x="15" y="70" fontFamily="Arial" fontSize="8" fill="#cc1a2a">6 mm Allen key,</text>
      <text x="15" y="84" fontFamily="Arial" fontSize="8" fill="#cc1a2a">28mm ring spanner,</text>
      <text x="15" y="98" fontFamily="Arial" fontSize="8" fill="#cc1a2a">10mm ring spanner.</text>
      <line x1="175" y1="48" x2="270" y2="132" stroke="#888" strokeWidth="5" strokeLinecap="round"/>
      <line x1="190" y1="40" x2="278" y2="118" stroke="#888" strokeWidth="4" strokeLinecap="round"/>
      <line x1="205" y1="35" x2="280" y2="110" stroke="#777" strokeWidth="3" strokeLinecap="round"/>
      <rect x="10" y="138" width="40" height="13" fill="#cc1a2a" rx="2"/>
      <text x="15" y="149" fontFamily="Arial" fontSize="7" fill="white" fontWeight="bold">TVS</text>
    </svg>
  ),
  repair: (
    <svg viewBox="0 0 280 158" style={{width:'100%',height:'100%'}}>
      <rect width="280" height="158" fill="#f0f0f0"/>
      <rect x="0" y="0" width="140" height="158" fill="#1a1a2e"/>
      <circle cx="70" cy="79" r="54" fill="#111" stroke="#333" strokeWidth="2"/>
      <text x="48" y="74" fontFamily="Arial" fontSize="26" fontWeight="bold" fill="white">500</text>
      <text x="57" y="92" fontFamily="Arial" fontSize="9" fill="#aaa">km/h</text>
      <line x1="70" y1="79" x2="104" y2="44" stroke="#00e676" strokeWidth="2.5" strokeLinecap="round"/>
      <text x="152" y="58" fontFamily="Arial" fontSize="9" fill="#666">Repair cycle</text>
      <text x="152" y="76" fontFamily="Arial" fontSize="9" fontWeight="bold" fill="#cc1a2a">Inspect, adjust and</text>
      <text x="152" y="91" fontFamily="Arial" fontSize="9" fontWeight="bold" fill="#cc1a2a">lubricate every</text>
      <text x="152" y="106" fontFamily="Arial" fontSize="9" fontWeight="bold" fill="#cc1a2a">500 km once.</text>
      <rect x="228" y="138" width="40" height="13" fill="#cc1a2a" rx="2"/>
      <text x="233" y="149" fontFamily="Arial" fontSize="7" fill="white" fontWeight="bold">TVS</text>
    </svg>
  ),
  caution: (
    <svg viewBox="0 0 280 158" style={{width:'100%',height:'100%'}}>
      <rect width="280" height="158" fill="#f5f5f5"/>
      <text x="82" y="30" fontFamily="Arial" fontSize="10" fontWeight="bold" fill="#333">Caution :</text>
      <text x="18" y="50" fontFamily="Arial" fontSize="7.5" fontWeight="bold" fill="#cc1a2a">Adjust both the chain adjuster exactly the same</text>
      <text x="18" y="63" fontFamily="Arial" fontSize="7.5" fontWeight="bold" fill="#cc1a2a">amount to maintain correct wheel alignment.</text>
      <rect x="28" y="76" width="100" height="48" rx="4" fill="#e0e0e0" stroke="#ccc" strokeWidth="1"/>
      <rect x="152" y="76" width="100" height="48" rx="4" fill="#e0e0e0" stroke="#ccc" strokeWidth="1"/>
      <rect x="38" y="98" width="80" height="18" rx="3" fill="#4a90d9"/>
      <rect x="162" y="98" width="80" height="18" rx="3" fill="#4a90d9"/>
      <polygon points="20,148 40,112 60,148" fill="#ffcc00" stroke="#e0a800" strokeWidth="1.5"/>
      <text x="36" y="143" fontFamily="Arial" fontSize="15" fontWeight="bold" fill="#cc1a2a">!</text>
      <rect x="228" y="140" width="40" height="13" fill="#cc1a2a" rx="2"/>
      <text x="233" y="150" fontFamily="Arial" fontSize="7" fill="white" fontWeight="bold">TVS</text>
    </svg>
  ),
  question: (
    <svg viewBox="0 0 280 158" style={{width:'100%',height:'100%'}}>
      <rect width="280" height="158" fill="#0a1628"/>
      <rect x="0" y="0" width="280" height="22" fill="#0d2044"/>
      <text x="8" y="15" fontFamily="Arial" fontSize="7" fill="rgba(255,255,255,.6)">RR 310 – Service Training Module</text>
      <text x="218" y="15" fontFamily="Arial" fontSize="8" fontWeight="bold" fill="#1565C0">TVS</text>
      <text x="18" y="50" fontFamily="Arial" fontSize="7.5" fontWeight="bold" fill="white">What is the specified torque value</text>
      <text x="18" y="63" fontFamily="Arial" fontSize="7.5" fontWeight="bold" fill="white">when tightening the rear axle nut?</text>
      <text x="28" y="84" fontFamily="Arial" fontSize="7" fill="white">A) 19±2.85 Nm</text>
      <text x="158" y="84" fontFamily="Arial" fontSize="7" fill="white">8±1 Nm (C</text>
      <text x="28" y="100" fontFamily="Arial" fontSize="7" fill="white">B) 100±15 Nm</text>
      <text x="158" y="100" fontFamily="Arial" fontSize="7" fill="white">30±40 Nm (D</text>
      {['A','B','C','D'].map((l,i)=>(
        <g key={l}>
          <rect x={20+i*22} y="112" width="18" height="13" fill="none" stroke="white" strokeWidth="1"/>
          <text x={25+i*22} y="123" fontFamily="Arial" fontSize="8" fontWeight="bold" fill="white">{l}</text>
        </g>
      ))}
      <text x="88" y="150" fontFamily="Arial" fontSize="7" fill="rgba(255,255,255,.35)">KNOWLEDGE CHECK</text>
    </svg>
  ),
  voiceover: (
    <svg viewBox="0 0 280 158" style={{width:'100%',height:'100%'}}>
      <rect width="280" height="158" fill="#f0f0f0"/>
      <rect x="0" y="0" width="140" height="79" fill="#e8f4fd"/>
      <rect x="140" y="0" width="140" height="79" fill="#fef3e8"/>
      <rect x="0" y="79" width="140" height="79" fill="#e8fdf4"/>
      <rect x="140" y="79" width="140" height="79" fill="#fdf0e8"/>
      {[[70,36,'#3b82f6'],[210,36,'#f97316'],[70,115,'#22c55e'],[210,115,'#ef4444']].map(([cx,cy,c],i)=>(
        <g key={i} transform={`translate(${cx},${cy})`}>
          <rect x="-8" y="-18" width="16" height="26" rx="8" fill={c}/>
          <path d="M-14,4 Q-14,18 0,18 Q14,18 14,4" fill="none" stroke={c} strokeWidth="2.5"/>
          <line x1="0" y1="18" x2="0" y2="28" stroke={c} strokeWidth="2.5"/>
          <line x1="-8" y1="28" x2="8" y2="28" stroke={c} strokeWidth="2.5"/>
        </g>
      ))}
      <line x1="1" y1="79" x2="279" y2="79" stroke="#ccc" strokeWidth="1"/>
      <line x1="140" y1="1" x2="140" y2="157" stroke="#ccc" strokeWidth="1"/>
    </svg>
  ),
};

// Slide content shown inside video modal
const SLIDE_CONTENT = {
  heading: {
    bg: '#ffffff',
    render: () => (
      <div style={{width:'100%',height:'100%',display:'flex',background:'#fff',borderRadius:8,overflow:'hidden'}}>
        <div style={{width:'45%',background:'#f0f0f0',display:'flex',alignItems:'center',justifyContent:'center',padding:16}}>
          <div style={{width:120,height:80,background:'#cc1a2a',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center'}}>
            <span style={{color:'white',fontSize:10,fontWeight:'bold',textAlign:'center'}}>TVS Apache{'\n'}RR 310</span>
          </div>
        </div>
        <div style={{flex:1,padding:16,display:'flex',flexDirection:'column',justifyContent:'center',gap:6}}>
          <div style={{fontSize:13,fontWeight:'bold',color:'#222'}}>Drive Chain Freeplay Adjustment</div>
          <div style={{fontSize:10,color:'#cc1a2a'}}>TVS Apache RR 310</div>
          <div style={{marginTop:8}}>
            <img src="/assets/icons/translation.png" alt="" style={{width:20,opacity:0.3}} />
          </div>
        </div>
      </div>
    )
  },
  tools: {
    bg: '#ffffff',
    render: () => (
      <div style={{width:'100%',height:'100%',background:'#fff',borderRadius:8,padding:16,display:'flex',gap:16}}>
        <div style={{flex:1}}>
          <div style={{fontSize:12,fontWeight:'bold',color:'#cc1a2a',marginBottom:8}}>Tools Required :</div>
          {['30 cm engineering scale','6 mm Allen key','28mm ring spanner','10mm ring spanner'].map((t,i)=>(
            <div key={i} style={{fontSize:11,color:'#cc1a2a',marginBottom:4}}>• {t}</div>
          ))}
        </div>
        <div style={{width:80,display:'flex',alignItems:'center',justifyContent:'center'}}>
          <svg width="60" height="80" viewBox="0 0 60 80">
            {[0,1,2,3,4].map(i=>(
              <line key={i} x1={10+i*10} y1="10" x2={50+i*2} y2="70" stroke="#888" strokeWidth="4" strokeLinecap="round"/>
            ))}
          </svg>
        </div>
      </div>
    )
  },
  repair: {
    bg: '#ffffff',
    render: () => (
      <div style={{width:'100%',height:'100%',background:'#fff',borderRadius:8,display:'flex',overflow:'hidden'}}>
        <div style={{width:'50%',background:'#1a1a2e',display:'flex',alignItems:'center',justifyContent:'center'}}>
          <div style={{width:90,height:90,borderRadius:'50%',border:'4px solid #333',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
            <span style={{color:'white',fontSize:22,fontWeight:'bold'}}>500</span>
            <span style={{color:'#aaa',fontSize:8}}>km/h</span>
          </div>
        </div>
        <div style={{flex:1,padding:16,display:'flex',flexDirection:'column',justifyContent:'center',gap:6}}>
          <div style={{fontSize:10,color:'#666'}}>Repair cycle</div>
          <div style={{fontSize:11,fontWeight:'bold',color:'#cc1a2a',lineHeight:1.5}}>Inspect, adjust and lubricate every 500 km once.</div>
        </div>
      </div>
    )
  },
  caution: {
    bg: '#ffffff',
    render: () => (
      <div style={{width:'100%',height:'100%',background:'#fff',borderRadius:8,padding:16}}>
        <div style={{fontSize:12,fontWeight:'bold',color:'#333',marginBottom:8}}>Caution :</div>
        <div style={{fontSize:11,fontWeight:'bold',color:'#cc1a2a',marginBottom:12,lineHeight:1.5}}>Adjust both the chain adjuster exactly the same amount to maintain correct wheel alignment.</div>
        <div style={{display:'flex',gap:8}}>
          <div style={{flex:1,background:'#e0e0e0',borderRadius:4,padding:'8px',fontSize:9,color:'#555'}}>LEFT SIDE (Chain Side)</div>
          <div style={{flex:1,background:'#e0e0e0',borderRadius:4,padding:'8px',fontSize:9,color:'#555'}}>RIGHT SIDE</div>
        </div>
        <div style={{marginTop:12,display:'flex',alignItems:'center',gap:8}}>
          <span style={{fontSize:20}}>⚠️</span>
          <span style={{fontSize:10,color:'#e65100'}}>Warning: Maintain equal adjustment on both sides</span>
        </div>
      </div>
    )
  },
};

// Video Modal with actual slide content
const VideoModal = ({ clip, onClose, onWatchComplete }) => {
  const [progress, setProgress] = useState(0);
  const [watched, setWatched] = useState(false);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef(null);
  const synthRef = useRef(null);

  const VO_TEXTS = {
    heading: 'Drive chain freeplay adjustment. TVS Apache RR 310 service module.',
    tools: 'Tools Required. 30 centimetre engineering scale. 6 millimetre Allen key. 28 millimetre ring spanner. 10 millimetre ring spanner.',
    repair: 'Repair cycle. Inspect, adjust and lubricate every 500 kilometres once.',
    caution: 'Caution. Adjust both the chain adjuster exactly the same amount to maintain correct wheel alignment.',
    question: 'Knowledge Check. Answer the following question to complete this module.',
  };

  const stopVoice = () => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    synthRef.current = null;
  };

  const playVoice = () => {
    if (!window.speechSynthesis) return;
    stopVoice();
    const text = VO_TEXTS[clip.type] || '';
    if (!text) return;
    const utt = new SpeechSynthesisUtterance(text);
    utt.rate = 0.9;
    utt.volume = 0.9;
    const voices = window.speechSynthesis.getVoices();
    const v = voices.find(v => v.lang.startsWith('en')) || voices[0];
    if (v) utt.voice = v;
    synthRef.current = utt;
    window.speechSynthesis.speak(utt);
  };

  // Start progress + voice
  useEffect(() => {
    playVoice();
    intervalRef.current = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(intervalRef.current);
          setWatched(true);
          stopVoice();
          return 100;
        }
        return p + 1.67; // ~60 seconds = 100%... fast for demo: 3s
      });
    }, 50); // 50ms * 60 = 3 seconds for demo
    return () => { clearInterval(intervalRef.current); stopVoice(); };
  }, []);

  const handlePause = () => {
    if (paused) {
      // Resume
      setPaused(false);
      playVoice();
      intervalRef.current = setInterval(() => {
        setProgress(p => {
          if (p >= 100) { clearInterval(intervalRef.current); setWatched(true); stopVoice(); return 100; }
          return p + 1.67;
        });
      }, 50);
    } else {
      // Pause
      setPaused(true);
      stopVoice();
      clearInterval(intervalRef.current);
    }
  };

  const handleClose = () => {
    stopVoice();
    clearInterval(intervalRef.current);
    onClose();
  };

  const handleWatchComplete = () => {
    stopVoice();
    clearInterval(intervalRef.current);
    onWatchComplete();
  };

  const slideContent = SLIDE_CONTENT[clip.type];
  const progressColor = watched ? '#22c55e' : '#cc1a2a';

  return (
    <div className="video-modal-overlay">
      <div className="video-modal">
        {/* Close button */}
        <button className="video-close-btn" onClick={handleClose}>✕</button>

        {/* Slide preview */}
        <div className="video-slide-preview">
          {slideContent ? slideContent.render() : (
            <div style={{width:'100%',height:'100%',background:'#0a1628',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center'}}>
              <span style={{color:'white',fontSize:16,fontWeight:'bold'}}>{clip.title}</span>
            </div>
          )}
        </div>

        {/* Title */}
        <div className="video-modal-title">{clip.title}</div>

        {/* Progress bar */}
        <div className="video-progress-bar">
          <div className="video-progress-fill" style={{width:`${progress}%`, background: progressColor}}></div>
        </div>

        {/* Controls */}
        <div className="video-controls">
          {!watched ? (
            <button className="video-ctrl-btn" onClick={handlePause}>
              {paused ? '▶ Resume' : '⏸ Pause'}
            </button>
          ) : null}
          <span className="video-status">{watched ? '✓ Complete' : paused ? 'Paused' : '▶ Playing...'}</span>
        </div>

        {/* Action buttons after watched */}
        {watched && clip.isQuestion && (
          <button className="video-action-btn btn-animated" onClick={handleWatchComplete}>
            Start Knowledge Check →
          </button>
        )}
        {watched && !clip.isQuestion && (
          <button className="video-action-btn btn-animated" style={{background:'#22c55e'}} onClick={handleClose}>
            Done ✓
          </button>
        )}
      </div>
    </div>
  );
};

const SampleScreen = ({ topicId, onPreview, onGoToQuestion, onBack }) => {
  const [hovered, setHovered] = useState(null);
  const [visible, setVisible] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 200);
    const t2 = setTimeout(() => setShowPreview(true), 800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const handleClipClick = (clip) => {
    if (clip.type === 'voiceover') { onPreview('voiceover'); return; }
    setActiveVideo(clip);
  };

  const handleVideoComplete = () => {
    setActiveVideo(null);
    onGoToQuestion(topicId);
  };

  return (
    <div className="screen sample-screen">
      <div className="screen-bg" style={{backgroundImage:`url(${process.env.PUBLIC_URL}/assets/background.jpg)`}} />
      {/* Header - no back button here, back btn at bottom */}
      <div className="sample-header">
        <span className="header-title" style={{fontSize:'clamp(14px,1.8vw,22px)',fontWeight:500,fontStyle:'italic',color:'#fff'}}>
          RR 310 – Service Training Module
        </span>
        <div style={{display:'flex',alignItems:'center',gap:4}}>
          <svg width="50" height="22" viewBox="0 0 50 22"><text x="0" y="19" fontFamily="Poppins,Arial,sans-serif" fontSize="22" fontWeight="900" fill="#1565C0" letterSpacing="1">TVS</text></svg>
          <svg width="32" height="26" viewBox="0 0 38 30">
            <path d="M3 24 C2 20 2 16 4 13 C6 10 9 8 12 7 C14 6 15 5 16 3 C17 2 18 1 20 1 C22 1 23 2 23 4 C23 5 24 6 26 6 C29 6 32 7 34 9 C36 11 36 14 35 16 C34 17 32 18 30 18 C28 18 26 17 24 16 C22 15 20 15 18 16 C16 17 15 19 15 22 C15 24 16 27 17 28 L14 28 C10 28 5 27 3 24Z" fill="#E53935"/>
            <line x1="10" y1="25" x2="8" y2="30" stroke="#E53935" strokeWidth="2" strokeLinecap="round"/>
            <line x1="14" y1="26" x2="13" y2="30" stroke="#E53935" strokeWidth="2" strokeLinecap="round"/>
            <line x1="17" y1="27" x2="18" y2="30" stroke="#E53935" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      <div className="sample-content">
        {visible && <h2 className="sample-title anim-fade-slide">Sample Clips</h2>}
        {visible && (
          <div className="clips-grid">
            {CLIPS.map((clip, i) => (
              <div
                key={clip.id}
                className={`clip-card btn-animated anim-fade-slide anim-delay-${i+1} ${hovered===clip.id?'clip-hovered':''}`}
                onMouseEnter={() => setHovered(clip.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => handleClipClick(clip)}
              >
                <div className="clip-thumb">
                  {THUMBS[clip.type]}
                  {hovered===clip.id && (
                    <div className="clip-play-overlay">
                      <img src={`${process.env.PUBLIC_URL}/assets/icons/play-circle.png`} alt="Play" className="clip-play-icon"/>
                    </div>
                  )}
                  {clip.isQuestion && <div className="clip-q-badge">→ Quiz</div>}
                </div>
                <p className={`clip-label ${hovered===clip.id?'clip-label-bold':''}`}>{clip.title}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Preview button bottom right */}
      {showPreview && (
        <div className="preview-wrap anim-pop">
          <button className="preview-btn btn-animated" onClick={() => onPreview('voiceover')}>
            <span className="preview-text">Preview</span>
            <img src={`${process.env.PUBLIC_URL}/assets/icons/play-circle.png`} alt="Preview" className="preview-icon"/>
          </button>
        </div>
      )}

      {/* Back button bottom left */}
      <button className="sample-back-btn btn-animated" onClick={onBack}>← Back</button>

      {/* Video Modal */}
      {activeVideo && (
        <VideoModal
          clip={activeVideo}
          onClose={() => setActiveVideo(null)}
          onWatchComplete={handleVideoComplete}
        />
      )}
    </div>
  );
};

export default SampleScreen;
