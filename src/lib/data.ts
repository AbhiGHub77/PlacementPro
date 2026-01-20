import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { User } from '@/lib/types';

const findImage = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl || '';

export const mockUser: User = {
  name: 'Alex Doe',
  avatarUrl: findImage('user-avatar'),
  readiness: 75,
  timeToPlacement: '3 months',
  skills: [
    { name: 'DSA', score: 3, targetScore: 4 },
    { name: 'CS Fund.', score: 4, targetScore: 4 },
    { name: 'Projects', score: 2, targetScore: 5 },
    { name: 'Experience', score: 1, targetScore: 3 },
  ],
  companies: [
    { id: 'google', name: 'Google', logoUrl: findImage('google-logo'), fitScore: 85, recommendation: 'Prepare First' },
    { id: 'meta', name: 'Meta', logoUrl: findImage('meta-logo'), fitScore: 78, recommendation: 'Prepare First' },
    { id: 'amazon', name: 'Amazon', logoUrl: findImage('amazon-logo'), fitScore: 92, recommendation: 'Recommended' },
    { id: 'netflix', name: 'Netflix', logoUrl: findImage('netflix-logo'), fitScore: 60, recommendation: 'Not Suitable Yet' },
    { id: 'microsoft', name: 'Microsoft', logoUrl: findImage('microsoft-logo'), fitScore: 88, recommendation: 'Recommended' },
    { id: 'startup-y', name: 'Startup Y', logoUrl: findImage('startup-logo'), fitScore: 95, recommendation: 'Recommended' },
  ],
  roadmap: [
    { id: '1', week: 1, title: 'Master Advanced Array Techniques', description: 'Focus on sliding window and two-pointer problems.', isCompleted: true },
    { id: '2', week: 1, title: 'Build a RESTful API for Project X', description: 'Implement CRUD operations and authentication.', isCompleted: true },
    { id: '3', week: 2, title: 'Deep Dive into Graph Algorithms', description: 'Study BFS, DFS, and Dijkstra\'s algorithm.', isCompleted: false },
    { id: '4', week: 2, title: 'System Design: Design a URL Shortener', description: 'Read articles and watch videos on the topic.', isCompleted: false },
    { id: '5', week: 3, title: 'Contribute to an Open-Source Project', description: 'Find a beginner-friendly issue and submit a PR.', isCompleted: false },
  ],
  guidance: 'Avoid applying to companies that require heavy System Design experience for now. Focus on strengthening your DSA and project portfolio. Learning niche languages like F# or Haskell is not a high-ROI activity at this stage.'
};
