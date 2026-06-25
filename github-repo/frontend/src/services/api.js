/* eslint-disable */
// API Service - works on both Vercel (production) and local dev
const API_BASE = process.env.REACT_APP_API_URL || '/api';

const api = {
  async get(endpoint) {
    try {
      const res = await fetch(`${API_BASE}${endpoint}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn('API unavailable, using local data:', err.message);
      return null;
    }
  },
  async post(endpoint, body) {
    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn('API unavailable, using local fallback:', err.message);
      return null;
    }
  }
};

export const getLanguages   = () => api.get('/languages');
export const getTopics      = () => api.get('/topics');
export const getSampleClips = () => api.get('/sample-clips');
export const getQuestions   = (topicId) => api.get(`/questions/${topicId}`);
export const getVoiceOver   = () => api.get('/voice-over');
export const submitAnswer   = (data) => api.post('/submit-answer', data);
export const trackProgress  = (data) => api.post('/track-progress', data);

export default api;
