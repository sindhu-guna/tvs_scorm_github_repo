/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react';
import HeaderBar from '../components/HeaderBar';
import { getQuestions, submitAnswer } from '../services/api';
import './QuestionScreen.css';

const FALLBACK_QUESTIONS = [
  { id:'q_1', question:'What is the specified torque value to apply when tightening the rear axle nut?', options:{A:'19±2.85 Nm',B:'100±15 Nm',C:'8±1 Nm',D:'30±40 Nm'}, correct:'B' },
  { id:'q_2', question:'How often should the drive chain be inspected, adjusted and lubricated?', options:{A:'Every 250 km',B:'Every 500 km',C:'Every 1000 km',D:'Every 2000 km'}, correct:'B' },
  { id:'q_3', question:'What tools are required for drive chain freeplay adjustment?', options:{A:'30cm scale, 6mm Allen key, 28mm & 10mm ring spanners',B:'15cm scale, 8mm Allen key',C:'Only a 28mm ring spanner',D:'Torque wrench and pliers only'}, correct:'A' }
];

const PHASE = { EMPTY:'empty', QUESTION:'question', OPTIONS:'options', ABCD:'abcd', SUBMITTED:'submitted' };

// VO text that gets read aloud
const VO_SCRIPT = "Drive chain freeplay adjustment. Tools required: 30 centimetre engineering scale, 6 millimetre Allen key, 28 millimetre ring spanner, 10 millimetre ring spanner. Repair cycle: Inspect, adjust and lubricate every 500 kilometres once.";

const QuestionScreen = ({ topicId, onFinish, onBack }) => {
  const [questions, setQuestions]     = useState([]);
  const [currentIdx, setCurrentIdx]   = useState(0);
  const [phase, setPhase]             = useState(PHASE.EMPTY);
  const [selectedAnswer, setSelected] = useState(null);
  const [result, setResult]           = useState(null);
  const [loading, setLoading]         = useState(true);
  const [score, setScore]             = useState(0);
  const [voicePlaying, setVoicePlaying] = useState(false);
  const audioRef = useRef(null);
  const synthRef = useRef(null);
  const timersRef = useRef([]);

  const clearTimers = () => { timersRef.current.forEach(clearTimeout); timersRef.current = []; };
  const after = (ms, fn) => { const t = setTimeout(fn, ms); timersRef.current.push(t); };

  // Play background voice using Web Speech API
  const playVoice = () => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(VO_SCRIPT);
    utt.rate = 0.9;
    utt.pitch = 1;
    utt.volume = 0.8;
    // Try to get a good voice
    const voices = window.speechSynthesis.getVoices();
    const eng = voices.find(v => v.lang.startsWith('en') && v.name.includes('Male')) || voices.find(v => v.lang.startsWith('en')) || voices[0];
    if (eng) utt.voice = eng;
    utt.onstart = () => setVoicePlaying(true);
    utt.onend = () => setVoicePlaying(false);
    utt.onerror = () => setVoicePlaying(false);
    synthRef.current = utt;
    window.speechSynthesis.speak(utt);
    setVoicePlaying(true);
  };

  const stopVoice = () => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setVoicePlaying(false);
  };

  // Also play the actual MP3 if available
  const playMP3 = () => {
    try {
      const audio = new Audio(`${process.env.PUBLIC_URL}/assets/vo-male-1.mp3`);
      audio.volume = 0.7;
      audio.play().catch(() => {});
      audioRef.current = audio;
    } catch(e) {}
  };

  const stopMP3 = () => {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current.currentTime = 0; }
  };

  // Load questions
  useEffect(() => {
    setLoading(true);
    getQuestions(topicId)
      .then(res => { setQuestions(res && res.data && res.data.length > 0 ? res.data : FALLBACK_QUESTIONS); })
      .catch(() => setQuestions(FALLBACK_QUESTIONS))
      .finally(() => setLoading(false));
    return () => { stopVoice(); stopMP3(); clearTimers(); };
  }, [topicId]);

  // Animate phases + play voice on load
  useEffect(() => {
    if (!loading && questions.length > 0) {
      setPhase(PHASE.EMPTY);
      setSelected(null);
      setResult(null);
      // Play voice when entering question screen
      playVoice();
      playMP3();
      after(600,  () => setPhase(PHASE.QUESTION));
      after(1400, () => setPhase(PHASE.OPTIONS));
      after(2200, () => setPhase(PHASE.ABCD));
    }
    return () => clearTimers();
  }, [loading, currentIdx, questions.length]);

  const handleSelectAnswer = (letter) => {
    if (phase !== PHASE.ABCD || result) return;
    setSelected(letter);
  };

  const handleSubmit = async () => {
    if (!selectedAnswer || result) return;
    stopVoice();
    stopMP3();
    const q = questions[currentIdx];
    let isCorrect, message;
    try {
      const res = await submitAnswer({ questionId: q.id, selectedAnswer, topicId });
      if (res && res.data) { isCorrect = res.data.isCorrect; message = res.data.message; }
      else throw new Error('no res');
    } catch {
      isCorrect = selectedAnswer === q.correct;
      message = isCorrect ? 'Perfect! – Good to Go' : "Missed it – Let's check";
    }
    setResult({ isCorrect, message });
    if (isCorrect) setScore(s => s + 1);
    setPhase(PHASE.SUBMITTED);
  };

  const handleNext = () => {
    if (result && !result.isCorrect) {
      // Wrong answer → go back to sample screen to rewatch
      stopVoice(); stopMP3();
      onBack();
      return;
    }
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(idx => idx + 1);
    } else {
      stopVoice(); stopMP3();
      onFinish({ score: score + (result && result.isCorrect ? 0 : 0), total: questions.length });
    }
  };

  // Correct finish with right score
  const handleCorrectNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(idx => idx + 1);
    } else {
      stopVoice(); stopMP3();
      onFinish({ score, total: questions.length });
    }
  };

  if (loading) return (
    <div className="screen question-screen">
      <div className="screen-bg" style={{backgroundImage:`url(${process.env.PUBLIC_URL}/assets/background.jpg)`}} />
      <HeaderBar />
      <div className="kc-bottom"><KCToolsIcon /><span className="kc-label">KNOWLEDGE CHECK</span></div>
      <div className="q-loading">Loading questions…</div>
    </div>
  );

  const q = questions[currentIdx];
  const showQ      = [PHASE.QUESTION,PHASE.OPTIONS,PHASE.ABCD,PHASE.SUBMITTED].includes(phase);
  const showOpts   = [PHASE.OPTIONS,PHASE.ABCD,PHASE.SUBMITTED].includes(phase);
  const showABCD   = [PHASE.ABCD,PHASE.SUBMITTED].includes(phase);
  const showSubmit = phase === PHASE.ABCD && selectedAnswer && !result;
  const showResult = phase === PHASE.SUBMITTED && result;

  const cv = (l) => {
    let c = 'q-opt-val';
    if (result && q.correct === l) c += ' correct';
    if (result && selectedAnswer === l && !result.isCorrect) c += ' wrong';
    return c;
  };

  return (
    <div className="screen question-screen">
      <div className="screen-bg" style={{backgroundImage:`url(${process.env.PUBLIC_URL}/assets/background.jpg)`}} />
      <HeaderBar />

      {/* Voice indicator */}
      {voicePlaying && (
        <div className="voice-indicator anim-fade">
          <span className="voice-dot"></span>
          <span className="voice-dot"></span>
          <span className="voice-dot"></span>
          <span className="voice-text">Voice Over Playing</span>
        </div>
      )}

      {/* Progress dots */}
      <div className="q-progress">
        {questions.map((_,i) => (
          <div key={i} className={`q-dot ${i===currentIdx?'active':''} ${i<currentIdx?'done':''}`} />
        ))}
      </div>

      {showQ && (
        <div className="q-question anim-fade-slide">
          <p className="q-question-text">{q.question}</p>
        </div>
      )}

      {showOpts && (
        <div className="q-options anim-fade-slide">
          <div className="q-opt"><span className="q-opt-key">A)</span><span className={cv('A')}>{q.options.A}</span></div>
          <div className="q-opt q-opt-r"><span className={cv('C')}>{q.options.C}</span><span className="q-opt-key">(C</span></div>
          <div className="q-opt"><span className="q-opt-key">B)</span><span className={cv('B')}>{q.options.B}</span></div>
          <div className="q-opt q-opt-r"><span className={cv('D')}>{q.options.D}</span><span className="q-opt-key">(D</span></div>
        </div>
      )}

      {showABCD && (
        <div className="q-abcd anim-pop">
          {['A','B','C','D'].map(l => (
            <button key={l}
              className={`q-letter btn-animated ${selectedAnswer===l?'sel':''} ${result&&q.correct===l?'ans-correct':''} ${result&&selectedAnswer===l&&!result.isCorrect?'ans-wrong':''}`}
              onClick={() => handleSelectAnswer(l)}
              disabled={!!result}
            >{l}</button>
          ))}
        </div>
      )}

      {showSubmit && (
        <div className="q-submit-wrap anim-pop">
          <button className="q-submit btn-animated" onClick={handleSubmit}>Submit</button>
        </div>
      )}

      {showResult && (
        <div className={`q-result anim-pop ${result.isCorrect?'correct':'wrong'}`}>
          <span className="q-result-text">{result.message}</span>
          <button className="q-arrow-btn btn-animated" onClick={result.isCorrect ? handleCorrectNext : handleNext}>
            {result.isCorrect
              ? <img src={`${process.env.PUBLIC_URL}/assets/icons/right-arrow.png`} alt="Next" className="q-arrow-img" />
              : <img src={`${process.env.PUBLIC_URL}/assets/icons/left-arrow.png`}  alt="Back" className="q-arrow-img" />
            }
          </button>
        </div>
      )}

      <div className="kc-bottom"><KCToolsIcon /><span className="kc-label">KNOWLEDGE CHECK</span></div>
      <button className="bottom-back-btn btn-animated" onClick={() => { stopVoice(); stopMP3(); onBack(); }}>← Back</button>
    </div>
  );
};

const KCToolsIcon = () => (
  <svg viewBox="0 0 360 110" xmlns="http://www.w3.org/2000/svg" style={{width:'320px',height:'100px'}}>
    <g transform="translate(80,15) rotate(-30)"><rect x="-6" y="-45" width="12" height="72" rx="5" fill="rgba(255,255,255,.14)"/><ellipse cx="0" cy="-45" rx="14" ry="9" fill="none" stroke="rgba(255,255,255,.14)" strokeWidth="5"/><ellipse cx="0" cy="27" rx="14" ry="9" fill="none" stroke="rgba(255,255,255,.14)" strokeWidth="5"/></g>
    <g transform="translate(175,8)"><rect x="-7" y="-52" width="14" height="90" rx="6" fill="rgba(255,255,255,.17)"/><ellipse cx="0" cy="-52" rx="18" ry="11" fill="none" stroke="rgba(255,255,255,.17)" strokeWidth="6"/><ellipse cx="0" cy="38" rx="18" ry="11" fill="none" stroke="rgba(255,255,255,.17)" strokeWidth="6"/></g>
    <g transform="translate(240,12) rotate(15)"><rect x="-5" y="-50" width="10" height="70" rx="4" fill="rgba(255,255,255,.13)"/><rect x="-16" y="-64" width="11" height="22" rx="3" fill="rgba(255,255,255,.13)"/><rect x="5" y="-64" width="11" height="22" rx="3" fill="rgba(255,255,255,.13)"/></g>
    <g transform="translate(130,16) rotate(-10)"><rect x="-4" y="-45" width="8" height="64" rx="3" fill="rgba(255,255,255,.12)"/><rect x="-13" y="-50" width="26" height="16" rx="4" fill="rgba(255,255,255,.15)"/></g>
    <g transform="translate(290,24) rotate(30)"><rect x="-3" y="-28" width="6" height="46" rx="3" fill="rgba(255,255,255,.11)"/></g>
    <g transform="translate(308,22) rotate(35)"><rect x="-3" y="-30" width="6" height="48" rx="3" fill="rgba(255,255,255,.11)"/></g>
    <g transform="translate(320,18) rotate(20)"><rect x="-3" y="-44" width="6" height="68" rx="2" fill="rgba(255,255,255,.12)"/><rect x="-8" y="-54" width="14" height="16" rx="3" fill="rgba(255,255,255,.15)"/><polygon points="-3,24 3,24 0,36" fill="rgba(255,255,255,.18)"/></g>
  </svg>
);

export default QuestionScreen;
