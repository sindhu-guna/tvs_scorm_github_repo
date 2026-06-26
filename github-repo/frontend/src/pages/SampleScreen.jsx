/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react';
import HeaderBar from '../components/HeaderBar';
import './SampleScreen.css';

// Video content data - maps to the 5 MP4 sample videos
const CLIPS = [
  { id: 1, title: '1. Heading Slide',       type: 'heading',   color: '#e8f0fe', textColor: '#1a237e' },
  { id: 2, title: '2. Tools Required Slide', type: 'tools',     color: '#fce8e6', textColor: '#b71c1c' },
  { id: 3, title: '3. Repair Cycle Slide',  type: 'repair',    color: '#e6f4ea', textColor: '#1b5e20' },
  { id: 4, title: '4. Note / Caution Slide',type: 'caution',   color: '#fff8e1', textColor: '#e65100' },
  { id: 5, title: '5. Question Slide',      type: 'question',  color: '#1a1628', textColor: '#ffffff', isQuestion: true },
  { id: 6, title: '6. Voice Overs',         type: 'voiceover', color: '#f3e5f5', textColor: '#4a148c' },
];

// Thumbnail SVGs
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
      {['A','B','C','D'].map((l,i) => (
        <g key={l}>
          <rect x={20+i*22} y="112" width="18" height="13" fill="none" stroke="white" strokeWidth="1"/>
          <text x={25+i*22} y="123" fontFamily="Arial" fontSize="8" fontWeight="bold" fill="white">{l}</text>
        </g>
      ))}
      <text x="152" y="122" fontFamily="Arial" fontSize="6.5" fontStyle="italic" fill="white">Perfect ! – Good to Go</text>
      <polygon points="256,116 268,122 256,128" fill="#22c55e"/>
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
      {[[70,36,'#3b82f6'],[210,36,'#f97316'],[70,115,'#22c55e'],[210,115,'#ef4444']].map(([cx,cy,c],i) => (
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

// Video Player Modal
const VideoModal = ({ clip, onClose, onWatchComplete }) => {
  const [watched, setWatched] = useState(false);
  const [progress, setProgress] = useState(0);

  // Simulate video content based on clip type
  const getVideoContent = () => {
    const contents = {
      heading:   { title: 'Drive Chain Freeplay Adjustment', subtitle: 'TVS Apache RR 310', bg: '#1a1f35', accent: '#cc1a2a' },
      tools:     { title: 'Tools Required', subtitle: '30cm scale • 6mm Allen key • 28mm & 10mm spanners', bg: '#1a2535', accent: '#cc1a2a' },
      repair:    { title: 'Repair Cycle', subtitle: 'Inspect, adjust and lubricate every 500 km once.', bg: '#1a3525', accent: '#22c55e' },
      caution:   { title: 'Caution', subtitle: 'Adjust both chain adjusters equally to maintain wheel alignment.', bg: '#352a1a', accent: '#ffcc00' },
      voiceover: { title: 'Voice Overs', subtitle: 'Male & Female voice samples for your module', bg: '#2a1a35', accent: '#9c27b0' },
    };
    return contents[clip.type] || contents.heading;
  };

  const content = getVideoContent();

  // Auto progress timer simulating video
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); setWatched(true); return 100; }
        return p + 2;
      });
    }, 100); // 5 seconds total
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="video-modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="video-modal" style={{background: content.bg}}>
        <button className="video-close-btn" onClick={onClose}>✕</button>
        
        <div className="video-content">
          <div className="video-icon-area" style={{color: content.accent}}>
            <div className="video-play-animation">
              {progress < 100 ? (
                <div className="video-spinner" style={{borderTopColor: content.accent}}></div>
              ) : (
                <div className="video-done-icon" style={{color: content.accent}}>✓</div>
              )}
            </div>
          </div>
          <h2 className="video-title" style={{color: content.accent}}>{content.title}</h2>
          <p className="video-subtitle">{content.subtitle}</p>
          
          <div className="video-progress-bar">
            <div className="video-progress-fill" style={{width:`${progress}%`, background: content.accent}}></div>
          </div>
          <p className="video-progress-text">{progress < 100 ? `Playing... ${Math.round(progress)}%` : 'Complete!'}</p>
        </div>

        {watched && clip.isQuestion && (
          <button className="video-next-btn btn-animated" style={{background: content.accent}} onClick={onWatchComplete}>
            Start Knowledge Check →
          </button>
        )}
        {watched && !clip.isQuestion && (
          <button className="video-next-btn btn-animated" style={{background: content.accent}} onClick={onClose}>
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
      <HeaderBar showBack={true} onBack={onBack} />

      <div className="sample-content">
        {visible && <h2 className="sample-title anim-fade-slide">Sample Clips</h2>}
        {visible && (
          <div className="clips-grid">
            {CLIPS.map((clip, i) => (
              <div
                key={clip.id}
                className={`clip-card btn-animated anim-fade-slide anim-delay-${i+1} ${hovered === clip.id ? 'clip-hovered' : ''}`}
                onMouseEnter={() => setHovered(clip.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => handleClipClick(clip)}
              >
                <div className="clip-thumb">
                  {THUMBS[clip.type]}
                  {hovered === clip.id && (
                    <div className="clip-play-overlay">
                      <img src={`${process.env.PUBLIC_URL}/assets/icons/play-circle.png`} alt="Play" className="clip-play-icon" />
                    </div>
                  )}
                  {clip.isQuestion && <div className="clip-q-badge">→ Quiz</div>}
                </div>
                <p className={`clip-label ${hovered === clip.id ? 'clip-label-bold' : ''}`}>{clip.title}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {showPreview && (
        <div className="preview-wrap anim-pop">
          <button className="preview-btn btn-animated" onClick={() => onPreview('voiceover')}>
            <span className="preview-text">Preview</span>
            <img src={`${process.env.PUBLIC_URL}/assets/icons/play-circle.png`} alt="Preview" className="preview-icon" />
          </button>
        </div>
      )}

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
