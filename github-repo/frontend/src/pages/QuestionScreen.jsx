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

// VO script text for selected language
const VO_SCRIPTS = {
  en: 'Drive chain freeplay adjustment. Tools required: 30 centimetre engineering scale, 6 millimetre Allen key, 28 millimetre ring spanner, 10 millimetre ring spanner. Repair cycle: Inspect, adjust and lubricate every 500 kilometres once.',
  fr: 'Réglage du jeu de la chaîne. Outils nécessaires: règle de 30 centimètres, clé Allen de 6 millimètres. Cycle de réparation: Inspecter et lubrifier tous les 500 kilomètres.',
  ru: 'Регулировка свободного хода цепи. Необходимые инструменты: линейка 30 сантиметров, ключ Аллен 6 миллиметров. Цикл обслуживания: каждые 500 километров.',
  es: 'Ajuste del juego libre de la cadena. Herramientas necesarias: regla de 30 centímetros, llave Allen de 6 milímetros. Ciclo de reparación: cada 500 kilómetros.',
  de: 'Kettenspieleinstellung. Benötigte Werkzeuge: 30 Zentimeter Maßstab, 6 Millimeter Innensechskantschlüssel. Reparaturzyklus: alle 500 Kilometer.',
  pt: 'Ajuste da folga da corrente. Ferramentas necessárias: régua de 30 centímetros, chave Allen de 6 milímetros. Ciclo de reparo: a cada 500 quilômetros.',
  ar: 'ضبط خلوص سلسلة القيادة. الأدوات المطلوبة: مسطرة 30 سنتيمتر، مفتاح ألن 6 ملليمتر. دورة الإصلاح: كل 500 كيلومتر.',
};

// Language codes for Speech API
const LANG_CODES = {
  en: 'en-US', fr: 'fr-FR', ru: 'ru-RU', es: 'es-ES',
  de: 'de-DE', pt: 'pt-BR', ar: 'ar-SA'
};

const QuestionScreen = ({ topicId, onFinish, onBack, language = 'en' }) => {
  const [questions, setQuestions]     = useState([]);
  const [currentIdx, setCurrentIdx]   = useState(0);
  const [phase, setPhase]             = useState(PHASE.EMPTY);
  const [selectedAnswer, setSelected] = useState(null);
  const [result, setResult]           = useState(null);
  const [loading, setLoading]         = useState(true);
  const [score, setScore]             = useState(0);
  const [voicePlaying, setVoicePlaying] = useState(false);
  const [voicePaused, setVoicePaused]   = useState(false);
  const utteranceRef = useRef(null);
  const timersRef    = useRef([]);
  const audioRef     = useRef(null);

  const clearTimers = () => { timersRef.current.forEach(clearTimeout); timersRef.current = []; };
  const after = (ms, fn) => { const t = setTimeout(fn, ms); timersRef.current.push(t); };

  // ── Voice controls ──────────────────────────────
  const stopVoice = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    utteranceRef.current = null;
    setVoicePlaying(false);
    setVoicePaused(false);
  };

  const pauseVoice = () => {
    if (window.speechSynthesis && window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel(); // cancel = true stop (pause is buggy in browsers)
    }
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setVoicePlaying(false);
    setVoicePaused(true);
  };

  const playVoice = () => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();

    // Try MP3 first for sample 1
    if (language === 'en') {
      try {
        const audio = new Audio(`${process.env.PUBLIC_URL}/assets/vo-male-1.mp3`);
        audioRef.current = audio;
        audio.play().catch(() => speakText());
        audio.onended = () => { setVoicePlaying(false); setVoicePaused(false); };
        setVoicePlaying(true);
        setVoicePaused(false);
        return;
      } catch(e) {}
    }
    speakText();
  };

  const speakText = () => {
    const script = VO_SCRIPTS[language] || VO_SCRIPTS['en'];
    const langCode = LANG_CODES[language] || 'en-US';
    const utt = new SpeechSynthesisUtterance(script);
    utt.lang = langCode;
    utt.rate = 0.88;
    utt.pitch = 1;
    utt.volume = 0.85;

    // Get voice matching language
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => v.lang === langCode)
      || voices.find(v => v.lang.startsWith(language))
      || voices.find(v => v.lang.startsWith('en'));
    if (voice) utt.voice = voice;

    utt.onstart  = () => { setVoicePlaying(true); setVoicePaused(false); };
    utt.onend    = () => { setVoicePlaying(false); setVoicePaused(false); };
    utt.onerror  = () => { setVoicePlaying(false); setVoicePaused(false); };

    utteranceRef.current = utt;
    window.speechSynthesis.speak(utt);
    setVoicePlaying(true);
  };

  // Load questions
  useEffect(() => {
    setLoading(true);
    getQuestions(topicId)
      .then(res => { setQuestions(res && res.data && res.data.length > 0 ? res.data : FALLBACK_QUESTIONS); })
      .catch(() => setQuestions(FALLBACK_QUESTIONS))
      .finally(() => setLoading(false));
    return () => { stopVoice(); clearTimers(); };
  }, [topicId]);

  // Animate phases + play voice on each question
  useEffect(() => {
    if (!loading && questions.length > 0) {
      setPhase(PHASE.EMPTY);
      setSelected(null);
      setResult(null);
      stopVoice();
      // Small delay then play voice
      after(400, () => playVoice());
      after(700,  () => setPhase(PHASE.QUESTION));
      after(1500, () => setPhase(PHASE.OPTIONS));
      after(2300, () => setPhase(PHASE.ABCD));
    }
    return () => clearTimers();
  }, [loading, currentIdx, questions.length]);

  const handleSelectAnswer = (letter) => {
    if (phase !== PHASE.ABCD || result) return;
    setSelected(letter);
  };

  const handleSubmit = async () => {
    if (!selectedAnswer || result) return;
    pauseVoice();
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

  const handleCorrectNext = () => {
    stopVoice();
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(idx => idx + 1);
    } else {
      onFinish({ score: score, total: questions.length });
    }
  };

  const handleWrongBack = () => {
    stopVoice();
    onBack(); // go back to sample screen to rewatch video
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

      {/* Progress dots - below header, not overlapping */}
      <div className="q-progress">
        {questions.map((_,i) => (
          <div key={i} className={`q-dot ${i===currentIdx?'active':''} ${i<currentIdx?'done':''}`} />
        ))}
      </div>

      {/* Voice indicator + controls */}
      <div className="voice-bar">
        <div className="voice-indicator">
          {voicePlaying ? (
            <>
              <span className="voice-dot"></span>
              <span className="voice-dot"></span>
              <span className="voice-dot"></span>
              <span className="voice-text">Voice Over Playing</span>
              <button className="voice-pause-btn" onClick={pauseVoice}>⏸ Pause</button>
            </>
          ) : voicePaused ? (
            <>
              <span className="voice-text paused">⏸ Paused</span>
              <button className="voice-pause-btn" onClick={playVoice}>▶ Resume</button>
            </>
          ) : null}
        </div>
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
          <button className="q-arrow-btn btn-animated" onClick={result.isCorrect ? handleCorrectNext : handleWrongBack}>
            {result.isCorrect
              ? <img src={`${process.env.PUBLIC_URL}/assets/icons/right-arrow.png`} alt="Next" className="q-arrow-img"/>
              : <img src={`${process.env.PUBLIC_URL}/assets/icons/left-arrow.png`}  alt="Back" className="q-arrow-img"/>
            }
          </button>
        </div>
      )}

      <div className="kc-bottom"><KCToolsIcon /><span className="kc-label">KNOWLEDGE CHECK</span></div>

      {/* Back button - bottom left */}
      <button className="bottom-back-btn btn-animated" onClick={() => { stopVoice(); onBack(); }}>← Back</button>
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
    <g transform="translate(320,18) rotate(20)"><rect x="-3" y="-44" width="6" height="68" rx="2" fill="rgba(255,255,255,.12)"/><rect x="-8" y="-54" width="14" height="16" rx="3" fill="rgba(255,255,255,.15)"/></g>
  </svg>
);

export default QuestionScreen;
