/* eslint-disable */
import React from 'react';
import HeaderBar from '../components/HeaderBar';
import './ResultScreen.css';

const ResultScreen = ({ score, total, topicName, onRestart, onHome }) => {
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;
  const passed = pct >= 70;

  return (
    <div className="screen result-screen">
      <div className="screen-bg" style={{backgroundImage:`url(${process.env.PUBLIC_URL}/assets/background.jpg)`}} />
      <HeaderBar showBack={true} onBack={onHome} />

      <div className="result-content">
        <div className={`result-card anim-pop ${passed ? 'passed' : 'failed'}`}>
          <div className="result-icon">{passed ? '✓' : '✗'}</div>
          <h2 className="result-heading">{passed ? 'Congratulations!' : 'Keep Practising!'}</h2>
          <p className="result-topic">{topicName}</p>
          <div className="result-score-row">
            <span className="result-score-n">{score}</span>
            <span className="result-score-sep">/</span>
            <span className="result-score-t">{total}</span>
          </div>
          <div className="result-pct">{pct}%</div>
          <p className="result-msg">{passed ? 'Perfect! – You have mastered this topic.' : 'Missed it – Review the material and try again.'}</p>
          <div className="result-actions">
            <button className="result-btn result-btn-secondary btn-animated" onClick={onHome}>← Home</button>
            <button className="result-btn result-btn-primary btn-animated" onClick={onRestart}>Try Again</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;
