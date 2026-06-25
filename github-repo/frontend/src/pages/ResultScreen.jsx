import React from 'react';
import HeaderBar from '../components/HeaderBar';
import './ResultScreen.css';

const ResultScreen = ({ score, total, topicName, onRestart, onHome }) => {
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  const passed = percentage >= 70;

  return (
    <div className="screen result-screen">
      <div className="screen-bg" />
      <HeaderBar />

      <div className="result-content">
        <div className={`result-card anim-pop ${passed ? 'result-passed' : 'result-failed'}`}>
          <div className="result-icon">{passed ? '✓' : '✗'}</div>
          <h2 className="result-heading">
            {passed ? 'Congratulations!' : 'Keep Practising!'}
          </h2>
          <p className="result-topic">{topicName}</p>
          <div className="result-score-row">
            <span className="result-score-num">{score}</span>
            <span className="result-score-sep">/</span>
            <span className="result-score-total">{total}</span>
          </div>
          <div className="result-percent">{percentage}%</div>
          <p className="result-message">
            {passed
              ? 'Perfect! – You have mastered this topic.'
              : 'Missed it – Review the material and try again.'}
          </p>

          <div className="result-actions">
            <button className="result-btn result-btn-secondary btn-animated" onClick={onHome}>
              ← Home
            </button>
            <button className="result-btn result-btn-primary btn-animated" onClick={onRestart}>
              Try Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;
