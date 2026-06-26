/* eslint-disable */
import React, { useState } from 'react';
import './styles/global.css';
import HomeScreen      from './pages/HomeScreen';
import LanguageScreen  from './pages/LanguageScreen';
import TopicScreen     from './pages/TopicScreen';
import SampleScreen    from './pages/SampleScreen';
import VoiceOverScreen from './pages/VoiceOverScreen';
import QuestionScreen  from './pages/QuestionScreen';
import ResultScreen    from './pages/ResultScreen';

const TOPICS = [
  { id:1,name:'Battery voltage' }, { id:2,name:'Engine oil filter' },
  { id:3,name:'Air cleaner element' }, { id:4,name:'Spark plug' },
  { id:5,name:'Tappet clearance' }, { id:6,name:'Clutch operations' },
  { id:7,name:'Front and rear suspension' }, { id:8,name:'Headlamp beam' },
  { id:9,name:'Front and rear brake fluid level' }, { id:10,name:'Front and rear brake pad wear' },
  { id:11,name:'Brake hose / rubber parts' }, { id:12,name:'Tyre air pressure' },
  { id:13,name:'Coolant level, water hoses' }, { id:14,name:'Drive chain slackness / lubrication Inspect' },
  { id:15,name:'Steering play' }, { id:16,name:'Lubrication points' },
  { id:17,name:'Brake pedal / gear shift lever mounting pin' },
  { id:18,name:'All fastner checking and tightening' },
  { id:19,name:'All light & horn inspection' }, { id:20,name:'Brake fluid Replacement' }
];

const S = { HOME:'home', LANGUAGE:'language', TOPIC:'topic', SAMPLE:'sample', VOICEOVER:'voiceover', QUESTION:'question', RESULT:'result' };

function App() {
  const [screen, setScreen]         = useState(S.HOME);
  const [history, setHistory]       = useState([]);
  const [topicId, setTopicId]       = useState(null);
  const [language, setLanguage]     = useState('en');
  const [quizResult, setQuizResult] = useState(null);

  const goTo = (s) => { setHistory(h => [...h, screen]); setScreen(s); };
  const goBack = () => {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setHistory(h => h.slice(0, -1));
    setScreen(prev);
  };
  const goHome = () => { setHistory([]); setScreen(S.HOME); setTopicId(null); setQuizResult(null); };

  const topicObj = TOPICS.find(t => t.id === topicId);

  return (
    <div className="page-enter">
      {screen === S.HOME      && <HomeScreen onSelectLanguage={() => goTo(S.LANGUAGE)} />}
      {screen === S.LANGUAGE  && <LanguageScreen onNext={(lang) => { setLanguage(lang || 'en'); goTo(S.TOPIC); }} onBack={goBack} />}
      {screen === S.TOPIC     && <TopicScreen onStartModule={(tid) => { setTopicId(tid); goTo(S.SAMPLE); }} onBack={goBack} />}
      {screen === S.SAMPLE    && <SampleScreen topicId={topicId} onPreview={(t) => { if(t==='voiceover') goTo(S.VOICEOVER); }} onGoToQuestion={(tid) => { setTopicId(tid); goTo(S.QUESTION); }} onBack={goBack} />}
      {screen === S.VOICEOVER && <VoiceOverScreen onBack={goBack} language={language} />}
      {screen === S.QUESTION  && <QuestionScreen topicId={topicId} language={language} onFinish={(r) => { setQuizResult(r); goTo(S.RESULT); }} onBack={goBack} />}
      {screen === S.RESULT && quizResult && (
        <ResultScreen
          score={quizResult.score} total={quizResult.total}
          topicName={topicObj ? topicObj.name : 'Service Training'}
          onRestart={() => { setQuizResult(null); goTo(S.QUESTION); }}
          onHome={goHome}
        />
      )}
    </div>
  );
}

export default App;
