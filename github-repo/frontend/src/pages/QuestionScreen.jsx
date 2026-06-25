import React, { useState, useEffect, useCallback } from 'react';
import HeaderBar from '../components/HeaderBar';
import { getQuestions, submitAnswer } from '../services/api';
import './QuestionScreen.css';

// Fallback questions (when API is unavailable)
const FALLBACK_QUESTIONS = [
  {
    id: 'q_default_1',
    question: 'What is the specified torque value to apply when tightening the rear axle nut?',
    options: { A: '19±2.85 Nm', B: '100±15 Nm', C: '8±1 Nm', D: '30±40 Nm' },
    correct: 'B',
    topicId: 14
  },
  {
    id: 'q_default_2',
    question: 'How often should the drive chain be inspected, adjusted and lubricated?',
    options: { A: 'Every 250 km', B: 'Every 500 km', C: 'Every 1000 km', D: 'Every 2000 km' },
    correct: 'B',
    topicId: 14
  },
  {
    id: 'q_default_3',
    question: 'What tools are required for drive chain freeplay adjustment?',
    options: {
      A: '30cm scale, 6mm Allen key, 28mm & 10mm ring spanners',
      B: '15cm scale, 8mm Allen key, 30mm & 12mm ring spanners',
      C: 'Only a 28mm ring spanner',
      D: 'Torque wrench and pliers only'
    },
    correct: 'A',
    topicId: 14
  }
];

// Animation phases for each question
const PHASE = {
  EMPTY: 'empty',         // Just KNOWLEDGE CHECK at bottom
  QUESTION: 'question',  // Question text appears
  OPTIONS: 'options',    // Options appear
  ABCD: 'abcd',          // ABCD buttons appear
  SUBMITTED: 'submitted' // Result shown
};

const QuestionScreen = ({ topicId, onFinish }) => {
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [phase, setPhase] = useState(PHASE.EMPTY);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [result, setResult] = useState(null); // { isCorrect, correctAnswer, message }
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);

  // Load questions
  useEffect(() => {
    setLoading(true);
    getQuestions(topicId)
      .then(res => {
        setQuestions(res.data && res.data.length > 0 ? res.data : FALLBACK_QUESTIONS);
      })
      .catch(() => setQuestions(FALLBACK_QUESTIONS))
      .finally(() => setLoading(false));
  }, [topicId]);

  // Animate phases sequentially after questions load
  useEffect(() => {
    if (!loading && questions.length > 0) {
      setPhase(PHASE.EMPTY);
      setSelectedAnswer(null);
      setResult(null);
      const t1 = setTimeout(() => setPhase(PHASE.QUESTION), 600);
      const t2 = setTimeout(() => setPhase(PHASE.OPTIONS),  1400);
      const t3 = setTimeout(() => setPhase(PHASE.ABCD),     2200);
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }
  }, [loading, currentIdx, questions.length]);

  const handleSelectAnswer = (letter) => {
    if (phase !== PHASE.ABCD || result) return;
    setSelectedAnswer(letter);
  };

  const handleSubmit = useCallback(async () => {
    if (!selectedAnswer || result) return;
    const q = questions[currentIdx];
    try {
      const res = await submitAnswer({
        questionId: q.id,
        selectedAnswer,
        topicId
      });
      const data = res.data;
      setResult(data);
      if (data.isCorrect) setScore(s => s + 1);
    } catch {
      // Offline fallback
      const isCorrect = selectedAnswer === q.correct;
      const data = {
        isCorrect,
        correctAnswer: q.correct,
        message: isCorrect ? 'Perfect! – Good to Go' : 'Missed it – Let\'s check'
      };
      setResult(data);
      if (isCorrect) setScore(s => s + 1);
    }
    setPhase(PHASE.SUBMITTED);
  }, [selectedAnswer, result, questions, currentIdx, topicId]);

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(idx => idx + 1);
    } else {
      onFinish({ score, total: questions.length });
    }
  };

  if (loading) {
    return (
      <div className="screen question-screen">
        <div className="screen-bg" />
        <HeaderBar />
        <div className="kc-bottom">
          <div className="kc-tools-icon">
            <KCToolsIcon />
          </div>
          <span className="kc-label">KNOWLEDGE CHECK</span>
        </div>
        <div className="q-loading">Loading questions…</div>
      </div>
    );
  }

  const currentQ = questions[currentIdx];
  const showQuestion = [PHASE.QUESTION, PHASE.OPTIONS, PHASE.ABCD, PHASE.SUBMITTED].includes(phase);
  const showOptions  = [PHASE.OPTIONS, PHASE.ABCD, PHASE.SUBMITTED].includes(phase);
  const showABCD    = [PHASE.ABCD, PHASE.SUBMITTED].includes(phase);
  const showSubmit  = phase === PHASE.ABCD && selectedAnswer && !result;
  const showResult  = phase === PHASE.SUBMITTED && result;

  return (
    <div className="screen question-screen">
      <div className="screen-bg" />
      <HeaderBar />

      {/* Progress indicator */}
      <div className="q-progress">
        {questions.map((_, i) => (
          <div
            key={i}
            className={`q-progress-dot ${i === currentIdx ? 'active' : ''} ${i < currentIdx ? 'done' : ''}`}
          />
        ))}
      </div>

      {/* Question */}
      {showQuestion && (
        <div className={`q-question-wrapper anim-fade-slide`}>
          <p className="q-question-text">{currentQ.question}</p>
        </div>
      )}

      {/* Options grid A B  C D */}
      {showOptions && (
        <div className="q-options-grid anim-fade-slide">
          <div className="q-option">
            <span className="q-option-key">A)</span>
            <span className={`q-option-value ${result && currentQ.correct === 'A' ? 'q-option-correct' : ''} ${result && selectedAnswer === 'A' && !result.isCorrect ? 'q-option-wrong' : ''}`}>
              {currentQ.options.A}
            </span>
          </div>
          <div className="q-option q-option-right">
            <span className={`q-option-value ${result && currentQ.correct === 'C' ? 'q-option-correct' : ''} ${result && selectedAnswer === 'C' && !result.isCorrect ? 'q-option-wrong' : ''}`}>
              {currentQ.options.C}
            </span>
            <span className="q-option-key">(C</span>
          </div>
          <div className="q-option">
            <span className="q-option-key">B)</span>
            <span className={`q-option-value ${result && currentQ.correct === 'B' ? 'q-option-correct' : ''} ${result && selectedAnswer === 'B' && !result.isCorrect ? 'q-option-wrong' : ''}`}>
              {currentQ.options.B}
            </span>
          </div>
          <div className="q-option q-option-right">
            <span className={`q-option-value ${result && currentQ.correct === 'D' ? 'q-option-correct' : ''} ${result && selectedAnswer === 'D' && !result.isCorrect ? 'q-option-wrong' : ''}`}>
              {currentQ.options.D}
            </span>
            <span className="q-option-key">(D</span>
          </div>
        </div>
      )}

      {/* ABCD Click Buttons */}
      {showABCD && (
        <div className="q-abcd-row anim-pop">
          {['A', 'B', 'C', 'D'].map(letter => (
            <button
              key={letter}
              className={`q-abcd-btn btn-animated 
                ${selectedAnswer === letter ? 'q-abcd-selected' : ''}
                ${result && letter === result.correctAnswer ? 'q-abcd-correct' : ''}
                ${result && letter === selectedAnswer && !result.isCorrect ? 'q-abcd-wrong' : ''}`}
              onClick={() => handleSelectAnswer(letter)}
              disabled={!!result}
            >
              {letter}
            </button>
          ))}
        </div>
      )}

      {/* Submit Button */}
      {showSubmit && (
        <div className="q-submit-wrapper anim-pop">
          <button className="q-submit-btn btn-animated" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      )}

      {/* Result Feedback */}
      {showResult && (
        <div className={`q-result-wrapper anim-pop ${result.isCorrect ? 'q-result-correct' : 'q-result-wrong'}`}>
          <span className="q-result-text">{result.message}</span>
          <button className="q-next-arrow btn-animated" onClick={handleNext}>
            {result.isCorrect ? (
              <img src={`${process.env.PUBLIC_URL}/assets/icons/right-arrow.png`} alt="Next" className="q-arrow-img q-arrow-green" />
            ) : (
              <img src={`${process.env.PUBLIC_URL}/assets/icons/left-arrow.png`} alt="Review" className="q-arrow-img q-arrow-red" />
            )}
          </button>
        </div>
      )}

      {/* Knowledge Check Bottom */}
      <div className="kc-bottom">
        <div className="kc-tools-icon"><KCToolsIcon /></div>
        <span className="kc-label">KNOWLEDGE CHECK</span>
      </div>
    </div>
  );
};

// Tools icon SVG as per design
const KCToolsIcon = () => (
  <svg viewBox="0 0 360 130" xmlns="http://www.w3.org/2000/svg" style={{width:'340px',height:'120px'}}>
    {/* Wrench */}
    <g transform="translate(80,20) rotate(-30)">
      <rect x="-6" y="-50" width="12" height="80" rx="5" fill="rgba(255,255,255,0.15)"/>
      <ellipse cx="0" cy="-50" rx="16" ry="10" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="5"/>
      <ellipse cx="0" cy="30" rx="16" ry="10" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="5"/>
    </g>
    {/* Large Wrench center */}
    <g transform="translate(180,10) rotate(0)">
      <rect x="-7" y="-60" width="14" height="100" rx="6" fill="rgba(255,255,255,0.18)"/>
      <ellipse cx="0" cy="-60" rx="20" ry="12" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="6"/>
      <ellipse cx="0" cy="40" rx="20" ry="12" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="6"/>
    </g>
    {/* Pliers */}
    <g transform="translate(240,15) rotate(15)">
      <rect x="-5" y="-55" width="10" height="75" rx="4" fill="rgba(255,255,255,0.14)"/>
      <rect x="-18" y="-70" width="12" height="25" rx="3" fill="rgba(255,255,255,0.14)"/>
      <rect x="6" y="-70" width="12" height="25" rx="3" fill="rgba(255,255,255,0.14)"/>
    </g>
    {/* Hex keys left */}
    {[-40,-30,-20].map((x,i) => (
      <g key={i} transform={`translate(${60+i*18},30) rotate(${-40+i*5})`}>
        <rect x="-3" y="-35" width="6" height="55" rx="3" fill="rgba(255,255,255,0.12)"/>
      </g>
    ))}
    {/* Hammer */}
    <g transform="translate(130,20) rotate(-10)">
      <rect x="-4" y="-50" width="8" height="70" rx="3" fill="rgba(255,255,255,0.13)"/>
      <rect x="-14" y="-55" width="28" height="18" rx="4" fill="rgba(255,255,255,0.16)"/>
    </g>
    {/* Right hex keys */}
    {[0,1,2].map((i) => (
      <g key={i} transform={`translate(${290+i*18},28) rotate(${30+i*5})`}>
        <rect x="-3" y="-32" width="6" height="52" rx="3" fill="rgba(255,255,255,0.12)"/>
      </g>
    ))}
    {/* Screwdriver */}
    <g transform="translate(320,18) rotate(20)">
      <rect x="-3" y="-48" width="6" height="72" rx="2" fill="rgba(255,255,255,0.13)"/>
      <rect x="-8" y="-60" width="16" height="18" rx="3" fill="rgba(255,255,255,0.16)"/>
      <polygon points="-3,24 3,24 0,36" fill="rgba(255,255,255,0.2)"/>
    </g>
  </svg>
);

export default QuestionScreen;
