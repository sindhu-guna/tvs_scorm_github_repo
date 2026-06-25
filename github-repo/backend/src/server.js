const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Topics data
const topics = [
  { id: 1, name: 'Battery voltage' },
  { id: 2, name: 'Engine oil filter' },
  { id: 3, name: 'Air cleaner element' },
  { id: 4, name: 'Spark plug' },
  { id: 5, name: 'Tappet clearance' },
  { id: 6, name: 'Clutch operations' },
  { id: 7, name: 'Front and rear suspension' },
  { id: 8, name: 'Headlamp beam' },
  { id: 9, name: 'Front and rear brake fluid level' },
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

// Languages
const languages = [
  { id: 'en', name: 'English' },
  { id: 'fr', name: 'French' },
  { id: 'ru', name: 'Russian' },
  { id: 'es', name: 'Spanish' },
  { id: 'de', name: 'German' },
  { id: 'pt', name: 'Portugese' },
  { id: 'ar', name: 'Arabic' }
];

// Sample clips
const sampleClips = [
  {
    id: 1,
    title: 'Heading Slide',
    description: 'Drive Chain Freeplay Adjustment - TVS Apache RR 310',
    thumbnail: '/assets/thumbnails/heading-slide.jpg',
    type: 'heading'
  },
  {
    id: 2,
    title: 'Tools Required Slide',
    description: '30 cm engineering scale, 6 mm Allen key, 28mm ring spanner, 10mm ring spanner',
    thumbnail: '/assets/thumbnails/tools-slide.jpg',
    type: 'tools'
  },
  {
    id: 3,
    title: 'Repair Cycle Slide',
    description: 'Inspect, adjust and lubricate every 500 km once',
    thumbnail: '/assets/thumbnails/repair-cycle.jpg',
    type: 'repair'
  },
  {
    id: 4,
    title: 'Note / Caution Slide',
    description: 'Adjust both the chain adjuster exactly the same amount to maintain correct wheel alignment',
    thumbnail: '/assets/thumbnails/caution-slide.jpg',
    type: 'caution'
  },
  {
    id: 5,
    title: 'Question Slide',
    description: 'Knowledge Check - Test your understanding',
    thumbnail: '/assets/thumbnails/question-slide.jpg',
    type: 'question',
    linksToQuestion: true
  },
  {
    id: 6,
    title: 'Voice Overs',
    description: 'Sample voice over audio clips for the module',
    thumbnail: '/assets/thumbnails/voice-over.jpg',
    type: 'voiceover'
  }
];

// Questions per topic
const questionsByTopic = {
  14: [ // Drive chain slackness
    {
      id: 'q14_1',
      question: 'What is the specified torque value to apply when tightening the rear axle nut?',
      options: {
        A: '19±2.85 Nm',
        B: '100±15 Nm',
        C: '8±1 Nm',
        D: '30±40 Nm'
      },
      correct: 'B',
      topicId: 14
    },
    {
      id: 'q14_2',
      question: 'How often should the drive chain be inspected, adjusted and lubricated?',
      options: {
        A: 'Every 250 km',
        B: 'Every 500 km',
        C: 'Every 1000 km',
        D: 'Every 2000 km'
      },
      correct: 'B',
      topicId: 14
    },
    {
      id: 'q14_3',
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
  ]
};

// Helper to get questions for a topic with defaults
function getQuestionsForTopic(topicId) {
  const tid = parseInt(topicId);
  if (questionsByTopic[tid]) return questionsByTopic[tid];
  // Generate generic questions for topics without specific ones
  const topic = topics.find(t => t.id === tid);
  if (!topic) return [];
  return [
    {
      id: `q${tid}_1`,
      question: `What is the primary purpose of checking ${topic.name}?`,
      options: {
        A: 'To ensure safety and optimal performance',
        B: 'Only for aesthetic purposes',
        C: 'Required by manufacturer warranty',
        D: 'Not important for vehicle operation'
      },
      correct: 'A',
      topicId: tid
    },
    {
      id: `q${tid}_2`,
      question: `How frequently should ${topic.name} be inspected during routine service?`,
      options: {
        A: 'Every 10,000 km or 12 months',
        B: 'Only when a problem occurs',
        C: 'Every 500 km',
        D: 'Once every 5 years'
      },
      correct: 'A',
      topicId: tid
    },
    {
      id: `q${tid}_3`,
      question: `Which of the following is correct regarding ${topic.name} service?`,
      options: {
        A: 'Follow manufacturer specifications',
        B: 'Any method is acceptable',
        C: 'No special tools required',
        D: 'Can be skipped if visually fine'
      },
      correct: 'A',
      topicId: tid
    }
  ];
}

// Voice over content
const voiceOverContent = {
  topic: 'Drive chain freeplay adjustment',
  slides: [
    {
      id: 'heading',
      title: 'Drive Chain Freeplay Adjustment',
      subtitle: 'TVS Apache RR 310',
      content: ''
    },
    {
      id: 'tools',
      title: 'Tools Required',
      content: '30 cm engineering scale,\n6 mm Allen key,\n28mm ring spanner,\n10mm ring spanner.'
    },
    {
      id: 'repair',
      title: 'Repair Cycle',
      content: 'Inspect, adjust and lubricate every 500 km once.'
    },
    {
      id: 'note',
      title: 'Note',
      content: 'The drive chain must be cleaned (on the vehicle) with C-Type brush, dry cloth if the chain is found with less dust / mud and lubricated with TVS TRU SPRAY or MOTUL C2 spray as frequently as every 500 km once for better chain life and smooth vehicle running.\n\nChain free play: Inspect at every 10000 km or 12 months whichever occurs earlier.'
    },
    {
      id: 'warning',
      title: 'Warning',
      content: 'While cleaning, slowly rotate the wheel in the opposite direction and wipe the surface with a dry cloth. When cleaning the front and rear sprockets, do not rotate the wheel.',
      type: 'warning'
    }
  ]
};

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'TVS SCORM Backend is running' });
});

app.get('/api/languages', (req, res) => {
  res.json({ success: true, data: languages });
});

app.get('/api/topics', (req, res) => {
  res.json({ success: true, data: topics });
});

app.get('/api/sample-clips', (req, res) => {
  res.json({ success: true, data: sampleClips });
});

app.get('/api/questions/:topicId', (req, res) => {
  const { topicId } = req.params;
  const questions = getQuestionsForTopic(topicId);
  if (!questions.length) {
    return res.status(404).json({ success: false, message: 'Topic not found' });
  }
  res.json({ success: true, data: questions });
});

app.get('/api/voice-over', (req, res) => {
  res.json({ success: true, data: voiceOverContent });
});

app.post('/api/submit-answer', (req, res) => {
  const { questionId, selectedAnswer, topicId } = req.body;
  const questions = getQuestionsForTopic(topicId);
  const question = questions.find(q => q.id === questionId);
  
  if (!question) {
    return res.status(404).json({ success: false, message: 'Question not found' });
  }
  
  const isCorrect = selectedAnswer === question.correct;
  res.json({
    success: true,
    data: {
      isCorrect,
      correctAnswer: question.correct,
      message: isCorrect ? 'Perfect! – Good to Go' : 'Missed it – Let\'s check'
    }
  });
});

app.post('/api/track-progress', (req, res) => {
  const { userId, topicId, completed, score } = req.body;
  // In production, this would save to a database
  console.log(`Progress tracked: User ${userId}, Topic ${topicId}, Completed: ${completed}, Score: ${score}`);
  res.json({ success: true, message: 'Progress tracked successfully' });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../frontend/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`TVS SCORM Backend running on port ${PORT}`);
});

module.exports = app;
