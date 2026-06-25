import React, { useState, useCallback } from 'react';
import './styles/global.css';
import HomeScreen      from './pages/HomeScreen';
import LanguageScreen  from './pages/LanguageScreen';
import TopicScreen     from './pages/TopicScreen';
import SampleScreen    from './pages/SampleScreen';
import VoiceOverScreen from './pages/VoiceOverScreen';
import QuestionScreen  from './pages/QuestionScreen';
import ResultScreen    from './pages/ResultScreen';

// Topics list (same as backend)
const TOPICS = [
  { id: 1,  name: 'Battery voltage' },
  { id: 2,  name: 'Engine oil filter' },
  { id: 3,  name: 'Air cleaner element' },
  { id: 4,  name: 'Spark plug' },
  { id: 5,  name: 'Tappet clearance' },
  { id: 6,  name: 'Clutch operations' },
  { id: 7,  name: 'Front and rear suspension' },
  { id: 8,  name: 'Headlamp beam' },
  { id: 9,  name: 'Front and rear brake fluid level' },
  { id: 10, name: 'Front and rear brake pad wear' },
  { id: 11, name: 'Brake hose / rubber parts' },
  { id: 12, name: 'Tyre air pressure' },
  { id: 13, name: 'Coolant level, water hoses' },
  { id: 14, name: 'Drive chain slackness / lubrication Inspect' },
  { id: 15, name: 'Steering play' },
  { id: 16, name: 'Lubrication points' },
  { id: 17, name: 'Brake pedal / gear shift lever mounting pin' },
  { id: 18, name: 'All fastner checking and tightening' },
  { id: 19, name: 'All light & horn inspection' },
  { id: 20, name: 'Brake fluid Replacement' }
];

const SCREENS = {
  HOME:       'home',
  LANGUAGE:   'language',
  TOPIC:      'topic',
  SAMPLE:     'sample',
  VOICEOVER:  'voiceover',
  QUESTION:   'question',
  RESULT:     'result',
};

function App() {
  const [screen, setScreen]         = useState(SCREENS.HOME);
  const [topicId, setTopicId]       = useState(null);
  const [quizResult, setQuizResult] = useState(null);

  const goTo = useCallback((s) => {
    setScreen(s);
  }, [screen]);

  // HOME → click "Select Language"
  const handleSelectLanguage = () => goTo(SCREENS.LANGUAGE);

  // LANGUAGE → select language then "Next"
  const handleLanguageNext = (lang) => {
    goTo(SCREENS.TOPIC);
  };

  // TOPIC → select topic then "Start Module"
  const handleStartModule = (tid) => {
    setTopicId(tid);
    goTo(SCREENS.SAMPLE);
  };

  // SAMPLE → "Preview" or click Voice Over thumbnail
  const handlePreview = (type) => {
    if (type === 'voiceover') {
      goTo(SCREENS.VOICEOVER);
    }
    // other types could show a modal/popup — extensible
  };

  // SAMPLE → click Question Slide thumbnail → go directly to question
  const handleGoToQuestion = (tid) => {
    setTopicId(tid);
    goTo(SCREENS.QUESTION);
  };

  // VOICE OVER → back
  const handleVOBack = () => {
    goTo(SCREENS.SAMPLE);
  };

  // QUESTION → finish
  const handleQuizFinish = ({ score, total }) => {
    setQuizResult({ score, total });
    goTo(SCREENS.RESULT);
  };

  // RESULT → restart quiz
  const handleResultRestart = () => {
    setQuizResult(null);
    goTo(SCREENS.QUESTION);
  };

  // RESULT → go home
  const handleResultHome = () => {
    setTopicId(null);
    setQuizResult(null);
    goTo(SCREENS.HOME);
  };

  const topicObj = TOPICS.find(t => t.id === topicId);

  return (
    <div className="page-enter">
      {screen === SCREENS.HOME && (
        <HomeScreen onSelectLanguage={handleSelectLanguage} />
      )}

      {screen === SCREENS.LANGUAGE && (
        <LanguageScreen onNext={handleLanguageNext} />
      )}

      {screen === SCREENS.TOPIC && (
        <TopicScreen onStartModule={handleStartModule} />
      )}

      {screen === SCREENS.SAMPLE && (
        <SampleScreen
          topicId={topicId}
          onPreview={handlePreview}
          onGoToQuestion={handleGoToQuestion}
        />
      )}

      {screen === SCREENS.VOICEOVER && (
        <VoiceOverScreen onBack={handleVOBack} />
      )}

      {screen === SCREENS.QUESTION && (
        <QuestionScreen
          topicId={topicId}
          onFinish={handleQuizFinish}
        />
      )}

      {screen === SCREENS.RESULT && quizResult && (
        <ResultScreen
          score={quizResult.score}
          total={quizResult.total}
          topicName={topicObj ? topicObj.name : 'Service Training'}
          onRestart={handleResultRestart}
          onHome={handleResultHome}
        />
      )}
    </div>
  );
}

export default App;
