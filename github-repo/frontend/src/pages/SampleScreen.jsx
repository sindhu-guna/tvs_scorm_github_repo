/* eslint-disable */
import React, { useState, useEffect } from 'react';
import HeaderBar from '../components/HeaderBar';
import './SampleScreen.css';

// Inline SVG thumbnails that mimic the actual design screenshots
const ThumbnailHeading = () => (
  <svg viewBox="0 0 280 160" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}}>
    <rect width="280" height="160" fill="#f0f0f0"/>
    <rect x="0" y="0" width="160" height="160" fill="#e8e8e8"/>
    {/* Bike silhouette */}
    <ellipse cx="80" cy="110" rx="55" ry="30" fill="#cc1a2a" opacity="0.8"/>
    <rect x="50" y="70" width="60" height="40" rx="8" fill="#cc1a2a"/>
    <circle cx="45" cy="120" r="18" fill="#333" stroke="#555" strokeWidth="2"/>
    <circle cx="115" cy="120" r="18" fill="#333" stroke="#555" strokeWidth="2"/>
    <rect x="85" y="60" width="25" height="20" rx="4" fill="#444"/>
    <text x="170" y="55" fontFamily="Arial" fontSize="10" fontWeight="bold" fill="#333">Drive Chain Freeplay</text>
    <text x="170" y="68" fontFamily="Arial" fontSize="10" fontWeight="bold" fill="#333">Adjustment</text>
    <text x="170" y="84" fontFamily="Arial" fontSize="8" fill="#888">TVS Apache RR 310</text>
    <rect x="168" y="140" width="40" height="12" fill="#cc1a2a" rx="2"/>
    <text x="173" y="150" fontFamily="Arial" fontSize="7" fill="white" fontWeight="bold">TVS</text>
    {/* Gear icon */}
    <circle cx="140" cy="80" r="35" fill="none" stroke="#ccc" strokeWidth="8" opacity="0.3"/>
    <circle cx="140" cy="80" r="20" fill="none" stroke="#ccc" strokeWidth="4" opacity="0.2"/>
  </svg>
);

const ThumbnailTools = () => (
  <svg viewBox="0 0 280 160" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}}>
    <rect width="280" height="160" fill="#f5f5f5"/>
    <circle cx="140" cy="80" r="55" fill="none" stroke="#ddd" strokeWidth="12" opacity="0.4"/>
    <circle cx="140" cy="80" r="30" fill="none" stroke="#ddd" strokeWidth="6" opacity="0.3"/>
    <text x="15" y="40" fontFamily="Arial" fontSize="9" fontWeight="bold" fill="#cc1a2a">Tools Required :</text>
    <text x="15" y="58" fontFamily="Arial" fontSize="8.5" fill="#cc1a2a">30 cm engineering scale,</text>
    <text x="15" y="73" fontFamily="Arial" fontSize="8.5" fill="#cc1a2a">6 mm Allen key,</text>
    <text x="15" y="88" fontFamily="Arial" fontSize="8.5" fill="#cc1a2a">28mm ring spanner,</text>
    <text x="15" y="103" fontFamily="Arial" fontSize="8.5" fill="#cc1a2a">10mm ring spanner.</text>
    {/* Allen keys visual */}
    <line x1="175" y1="50" x2="260" y2="130" stroke="#888" strokeWidth="5" strokeLinecap="round"/>
    <line x1="185" y1="45" x2="270" y2="125" stroke="#888" strokeWidth="4" strokeLinecap="round"/>
    <line x1="195" y1="40" x2="275" y2="118" stroke="#888" strokeWidth="3.5" strokeLinecap="round"/>
    <line x1="205" y1="38" x2="278" y2="114" stroke="#777" strokeWidth="3" strokeLinecap="round"/>
    <line x1="215" y1="36" x2="280" y2="110" stroke="#777" strokeWidth="2.5" strokeLinecap="round"/>
    <rect x="10" y="140" width="40" height="14" fill="#cc1a2a" rx="2"/>
    <text x="15" y="151" fontFamily="Arial" fontSize="8" fill="white" fontWeight="bold">TVS</text>
  </svg>
);

const ThumbnailRepair = () => (
  <svg viewBox="0 0 280 160" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}}>
    <rect width="280" height="160" fill="#f0f0f0"/>
    {/* Speedometer */}
    <rect x="0" y="0" width="140" height="160" fill="#1a1a2e"/>
    <circle cx="70" cy="80" r="55" fill="#111" stroke="#333" strokeWidth="2"/>
    <text x="50" y="75" fontFamily="Arial" fontSize="26" fontWeight="bold" fill="white">500</text>
    <text x="58" y="93" fontFamily="Arial" fontSize="9" fill="#aaa">km/h</text>
    <line x1="70" y1="80" x2="105" y2="45" stroke="#00ff00" strokeWidth="2.5" strokeLinecap="round"/>
    {/* Gear marks */}
    {[0,30,60,90,120,150,180].map((a,i) => (
      <line key={i}
        x1={70 + 45*Math.cos((a-90)*Math.PI/180)}
        y1={80 + 45*Math.sin((a-90)*Math.PI/180)}
        x2={70 + 52*Math.cos((a-90)*Math.PI/180)}
        y2={80 + 52*Math.sin((a-90)*Math.PI/180)}
        stroke="#555" strokeWidth="2"/>
    ))}
    {/* Right content */}
    <text x="155" y="60" fontFamily="Arial" fontSize="9" fill="#555">Repair cycle</text>
    <text x="155" y="78" fontFamily="Arial" fontSize="9" fontWeight="bold" fill="#cc1a2a">Inspect, adjust and</text>
    <text x="155" y="93" fontFamily="Arial" fontSize="9" fontWeight="bold" fill="#cc1a2a">lubricate every</text>
    <text x="155" y="108" fontFamily="Arial" fontSize="9" fontWeight="bold" fill="#cc1a2a">500 km once.</text>
    <rect x="230" y="140" width="40" height="14" fill="#cc1a2a" rx="2"/>
    <text x="235" y="151" fontFamily="Arial" fontSize="8" fill="white" fontWeight="bold">TVS</text>
  </svg>
);

const ThumbnailCaution = () => (
  <svg viewBox="0 0 280 160" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}}>
    <rect width="280" height="160" fill="#f5f5f5"/>
    <circle cx="140" cy="80" r="55" fill="none" stroke="#ddd" strokeWidth="12" opacity="0.3"/>
    <text x="80" y="32" fontFamily="Arial" fontSize="10" fontWeight="bold" fill="#333">Caution :</text>
    <text x="20" y="52" fontFamily="Arial" fontSize="8" fontWeight="bold" fill="#cc1a2a">Adjust both the chain adjuster exactly the same</text>
    <text x="20" y="65" fontFamily="Arial" fontSize="8" fontWeight="bold" fill="#cc1a2a">amount to maintain correct wheel alignment.</text>
    {/* Chain diagram */}
    <rect x="30" y="80" width="100" height="50" rx="4" fill="#e0e0e0" stroke="#ccc" strokeWidth="1"/>
    <rect x="150" y="80" width="100" height="50" rx="4" fill="#e0e0e0" stroke="#ccc" strokeWidth="1"/>
    <text x="35" y="95" fontFamily="Arial" fontSize="7" fill="#555">LEFT SIDE (Chain Side)</text>
    <text x="155" y="95" fontFamily="Arial" fontSize="7" fill="#555">RIGHT SIDE</text>
    <rect x="40" y="100" width="80" height="20" rx="3" fill="#4a90d9"/>
    <rect x="160" y="100" width="80" height="20" rx="3" fill="#4a90d9"/>
    {/* Warning triangle */}
    <polygon points="20,145 40,110 60,145" fill="#ffcc00" stroke="#e0a800" strokeWidth="1.5"/>
    <text x="36" y="140" fontFamily="Arial" fontSize="14" fontWeight="bold" fill="#cc1a2a">!</text>
    <rect x="230" y="145" width="40" height="14" fill="#cc1a2a" rx="2"/>
    <text x="235" y="155" fontFamily="Arial" fontSize="8" fill="white" fontWeight="bold">TVS</text>
  </svg>
);

const ThumbnailQuestion = () => (
  <svg viewBox="0 0 280 160" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}}>
    <rect width="280" height="160" fill="#0a1628"/>
    <rect x="0" y="0" width="280" height="24" fill="#0d2044"/>
    <text x="8" y="16" fontFamily="Arial" fontSize="7" fill="rgba(255,255,255,0.7)">RR 310 – Service Training Module</text>
    <text x="215" y="16" fontFamily="Arial" fontSize="8" fontWeight="bold" fill="#1a3ccc">TVS</text>
    <text x="20" y="55" fontFamily="Arial" fontSize="7.5" fontWeight="bold" fill="white">What is the specified torque value to apply</text>
    <text x="20" y="67" fontFamily="Arial" fontSize="7.5" fontWeight="bold" fill="white">when tightening the rear axle nut?</text>
    <text x="30" y="88" fontFamily="Arial" fontSize="7" fill="white">A) 19±2.85 Nm</text>
    <text x="160" y="88" fontFamily="Arial" fontSize="7" fill="white">8±1 Nm (C</text>
    <text x="30" y="103" fontFamily="Arial" fontSize="7" fill="white">B) 100±15 Nm</text>
    <text x="160" y="103" fontFamily="Arial" fontSize="7" fill="white">30±40 Nm (D</text>
    {/* ABCD buttons */}
    {['A','B','C','D'].map((l,i) => (
      <g key={l}>
        <rect x={22+i*22} y="116" width="18" height="14" fill="none" stroke="white" strokeWidth="1"/>
        <text x={27+i*22} y="127" fontFamily="Arial" fontSize="8" fontWeight="bold" fill="white">{l}</text>
      </g>
    ))}
    <text x="155" y="127" fontFamily="Arial" fontSize="7" fontStyle="italic" fill="white">Perfect ! – Good to Go</text>
    <polygon points="258,120 270,126 258,132" fill="#22c55e"/>
    {/* Tools icon */}
    <text x="95" y="155" fontFamily="Arial" fontSize="7" fill="rgba(255,255,255,0.4)">KNOWLEDGE CHECK</text>
  </svg>
);

const ThumbnailVoiceOver = () => (
  <svg viewBox="0 0 280 160" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}}>
    <rect width="280" height="160" fill="#f0f0f0"/>
    {/* 2x3 grid of voice over avatars */}
    {[
      { x: 0, y: 0, bg: '#e8f4fd', color: '#3b82f6' },
      { x: 140, y: 0, bg: '#fef3e8', color: '#f97316' },
      { x: 0, y: 80, bg: '#e8fdf4', color: '#22c55e' },
      { x: 140, y: 80, bg: '#fdf0e8', color: '#ef4444' },
    ].map((c, i) => (
      <g key={i}>
        <rect x={c.x} y={c.y} width="140" height="80" fill={c.bg} stroke="#ddd" strokeWidth="1"/>
        {/* Microphone icon */}
        <circle cx={c.x+70} cy={c.y+28} r="16" fill={c.color} opacity="0.2"/>
        <rect x={c.x+65} y={c.y+16} width="10" height="18" rx="5" fill={c.color}/>
        <path d={`M${c.x+58},${c.y+28} Q${c.x+58},${c.y+42} ${c.x+70},${c.y+42} Q${c.x+82},${c.y+42} ${c.x+82},${c.y+28}`}
          fill="none" stroke={c.color} strokeWidth="2.5"/>
        <line x1={c.x+70} y1={c.y+42} x2={c.x+70} y2={c.y+52} stroke={c.color} strokeWidth="2.5"/>
        <line x1={c.x+62} y1={c.y+52} x2={c.x+78} y2={c.y+52} stroke={c.color} strokeWidth="2.5"/>
        {/* Sound waves */}
        <path d={`M${c.x+88},${c.y+22} Q${c.x+96},${c.y+30} ${c.x+88},${c.y+38}`}
          fill="none" stroke={c.color} strokeWidth="2" opacity="0.7"/>
        <path d={`M${c.x+94},${c.y+17} Q${c.x+106},${c.y+30} ${c.x+94},${c.y+43}`}
          fill="none" stroke={c.color} strokeWidth="2" opacity="0.4"/>
      </g>
    ))}
  </svg>
);

const CLIPS = [
  { id: 1, title: '1. Heading Slide', type: 'heading', Thumb: ThumbnailHeading, linksToQuestion: false },
  { id: 2, title: '2. Tools Required Slide', type: 'tools', Thumb: ThumbnailTools, linksToQuestion: false },
  { id: 3, title: '3. Repair Cycle Slide', type: 'repair', Thumb: ThumbnailRepair, linksToQuestion: false },
  { id: 4, title: '4. Note / Caution Slide', type: 'caution', Thumb: ThumbnailCaution, linksToQuestion: false },
  { id: 5, title: '5. Question Slide', type: 'question', Thumb: ThumbnailQuestion, linksToQuestion: true },
  { id: 6, title: '6. Voice Overs', type: 'voiceover', Thumb: ThumbnailVoiceOver, linksToQuestion: false },
];

const SampleScreen = ({ onPreview, onGoToQuestion, topicId }) => {
  const [hovered, setHovered] = useState(null);
  const [visible, setVisible] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 200);
    const t2 = setTimeout(() => setShowPreview(true), 800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const handleClipClick = (clip) => {
    if (clip.linksToQuestion) {
      onGoToQuestion(topicId);
    } else if (clip.type === 'voiceover') {
      onPreview('voiceover');
    } else {
      onPreview(clip.type);
    }
  };

  return (
    <div className="screen sample-screen">
      <div className="screen-bg" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/assets/background.jpg)`}} />
      <HeaderBar />

      <div className="sample-content">
        {/* Title */}
        {visible && (
          <h2 className="sample-title anim-fade-slide">Sample Clips</h2>
        )}

        {/* 3x2 Thumbnail Grid */}
        {visible && (
          <div className="clips-grid">
            {CLIPS.map((clip, i) => {
              const { Thumb } = clip;
              const isHovered = hovered === clip.id;
              return (
                <div
                  key={clip.id}
                  className={`clip-card anim-fade-slide anim-delay-${i + 1} ${isHovered ? 'clip-card-hovered' : ''}`}
                  onMouseEnter={() => setHovered(clip.id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => handleClipClick(clip)}
                >
                  <div className="clip-thumb-wrapper">
                    <Thumb />
                    {/* Play overlay on hover */}
                    {isHovered && (
                      <div className="clip-play-overlay">
                        <img src={`${process.env.PUBLIC_URL}/assets/icons/play-circle.png`} alt="Play" className="clip-play-icon" />
                      </div>
                    )}
                    {/* Question link badge */}
                    {clip.linksToQuestion && (
                      <div className="clip-question-badge">→ Question</div>
                    )}
                  </div>
                  <p className={`clip-label ${isHovered ? 'clip-label-bold' : ''}`}>
                    {clip.title}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Preview Button */}
      {showPreview && (
        <div className="preview-btn-wrapper anim-pop">
          <button
            className="preview-btn btn-animated"
            onClick={() => onPreview('voiceover')}
          >
            <span className="preview-text">Preview</span>
            <img src={`${process.env.PUBLIC_URL}/assets/icons/play-circle.png`} alt="Preview" className="preview-icon" />
          </button>
        </div>
      )}
    </div>
  );
};

export default SampleScreen;
