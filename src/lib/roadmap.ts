import type { SkillScores, SkillGap, Roadmap, RoadmapWeek, RoadmapTask } from '@/lib/types';

// DSA topics with difficulty levels
const dsaTopics = {
  beginner: [
    { title: 'Arrays & Strings Basics', hours: 10, resources: ['LeetCode Easy', 'NeetCode Arrays'] },
    { title: 'Two Pointers Technique', hours: 8, resources: ['LeetCode Two Pointers', 'Take U Forward'] },
    { title: 'Basic Sorting Algorithms', hours: 6, resources: ['Visualgo', 'GeeksforGeeks'] },
    { title: 'Hash Maps & Sets', hours: 8, resources: ['LeetCode Hash Table', 'NeetCode Hashing'] }
  ],
  intermediate: [
    { title: 'Binary Search Mastery', hours: 10, resources: ['LeetCode Binary Search', 'Strivers A2Z'] },
    { title: 'Linked Lists & Pointers', hours: 8, resources: ['LeetCode Linked List', 'NeetCode'] },
    { title: 'Stacks & Queues', hours: 8, resources: ['LeetCode Stack', 'Monotonic Stack Patterns'] },
    { title: 'Trees & BST', hours: 12, resources: ['LeetCode Tree', 'NeetCode Trees'] },
    { title: 'Recursion & Backtracking', hours: 12, resources: ['LeetCode Backtracking', 'Strivers A2Z'] }
  ],
  advanced: [
    { title: 'Dynamic Programming', hours: 20, resources: ['LeetCode DP', 'NeetCode DP', 'AtCoder DP'] },
    { title: 'Graph Algorithms', hours: 15, resources: ['LeetCode Graph', 'William Fiset YouTube'] },
    { title: 'Advanced Trees (Tries, Segment)', hours: 10, resources: ['CP Algorithms', 'CSES Problem Set'] },
    { title: 'Greedy Algorithms', hours: 8, resources: ['LeetCode Greedy', 'Strivers A2Z'] }
  ]
};

const fundamentalsTopics = {
  os: [
    { title: 'Process & Threads', hours: 4, resources: ['Gate Smashers', 'OS Concepts Book'] },
    { title: 'Memory Management', hours: 4, resources: ['Gate Smashers', 'GeeksforGeeks'] },
    { title: 'CPU Scheduling', hours: 3, resources: ['Gate Smashers', 'Javatpoint'] },
    { title: 'Deadlocks & Synchronization', hours: 4, resources: ['Gate Smashers', 'Neso Academy'] }
  ],
  cn: [
    { title: 'OSI & TCP/IP Models', hours: 3, resources: ['Gate Smashers', 'Computer Networks Book'] },
    { title: 'HTTP, DNS, TCP/UDP', hours: 4, resources: ['MDN Web Docs', 'Hussein Nasser'] },
    { title: 'Network Security Basics', hours: 3, resources: ['Cybrary', 'NetworkChuck'] }
  ],
  dbms: [
    { title: 'SQL Fundamentals', hours: 6, resources: ['SQLZoo', 'Mode Analytics SQL'] },
    { title: 'Normalization & ER Diagrams', hours: 4, resources: ['Gate Smashers', 'GeeksforGeeks'] },
    { title: 'Indexing & Transactions', hours: 4, resources: ['Use The Index Luke', 'CMU DB Course'] },
    { title: 'NoSQL Concepts', hours: 3, resources: ['MongoDB University', 'Redis University'] }
  ],
  oops: [
    { title: 'Core OOP Concepts', hours: 4, resources: ['GeeksforGeeks', 'Refactoring Guru'] },
    { title: 'SOLID Principles', hours: 4, resources: ['Refactoring Guru', 'Clean Code Book'] },
    { title: 'Design Patterns', hours: 8, resources: ['Refactoring Guru', 'Head First Design Patterns'] }
  ]
};

const projectTopics = [
  { title: 'Build Portfolio Website', hours: 8, resources: ['Frontend Mentor', 'Tailwind CSS Docs'] },
  { title: 'Full Stack CRUD App', hours: 15, resources: ['Traversy Media', 'Next.js Docs'] },
  { title: 'Real-time Chat Application', hours: 12, resources: ['Socket.io Docs', 'Firebase Docs'] },
  { title: 'API Development Project', hours: 10, resources: ['REST API Tutorial', 'Postman Learning'] }
];

// Topics to explicitly exclude based on time constraints
const excludedTopics = {
  shortTime: [
    'Competitive Programming (CP) contests',
    'Advanced graph theory (strongly connected components)',
    'Number theory and combinatorics',
    'Segment trees with lazy propagation',
    'Heavy-light decomposition'
  ],
  lowPriority: [
    'Blockchain development',
    'Game development',
    'Mobile app development (unless targeted)',
    'Machine learning (unless targeted)'
  ]
};

// Generate roadmap based on skill gaps and timeline
export function generateRoadmap(
  skills: SkillScores,
  gaps: SkillGap[],
  timelineWeeks: number,
  weeklyHours: number
): Roadmap {
  const weeks: RoadmapWeek[] = [];
  let currentWeek = 1;
  let taskId = 1;
  
  // Priority order based on typical interview importance
  const prioritizedGaps = [...gaps].sort((a, b) => {
    const order = { high: 0, medium: 1, low: 2 };
    return order[a.priority] - order[b.priority];
  });
  
  // Calculate available hours
  const totalHours = timelineWeeks * weeklyHours;
  let usedHours = 0;
  
  // Generate tasks for each gap
  for (const gap of prioritizedGaps) {
    if (currentWeek > timelineWeeks) break;
    
    const tasks: RoadmapTask[] = [];
    let weekTheme = '';
    
    if (gap.skill === 'DSA') {
      weekTheme = 'Data Structures & Algorithms';
      
      // Select topics based on gap size
      let topicsToInclude: typeof dsaTopics.beginner = [];
      
      if (skills.dsa < 2) {
        topicsToInclude = [...dsaTopics.beginner, ...dsaTopics.intermediate.slice(0, 2)];
      } else if (skills.dsa < 3.5) {
        topicsToInclude = [...dsaTopics.intermediate, ...dsaTopics.advanced.slice(0, 2)];
      } else {
        topicsToInclude = dsaTopics.advanced;
      }
      
      for (const topic of topicsToInclude) {
        if (usedHours + topic.hours > totalHours) break;
        
        tasks.push({
          id: `task-${taskId++}`,
          title: topic.title,
          description: `Master ${topic.title} with focused practice`,
          category: 'dsa',
          priority: gap.priority,
          estimatedHours: topic.hours,
          resources: topic.resources,
          isCompleted: false
        });
        
        usedHours += topic.hours;
      }
    } else if (gap.skill === 'CS Fundamentals') {
      weekTheme = 'Computer Science Fundamentals';
      
      // Add topics for weak fundamentals
      const allTopics = [
        ...fundamentalsTopics.os,
        ...fundamentalsTopics.cn,
        ...fundamentalsTopics.dbms,
        ...fundamentalsTopics.oops
      ];
      
      for (const topic of allTopics) {
        if (usedHours + topic.hours > totalHours) break;
        
        tasks.push({
          id: `task-${taskId++}`,
          title: topic.title,
          description: `Learn and revise ${topic.title}`,
          category: 'fundamentals',
          priority: gap.priority,
          estimatedHours: topic.hours,
          resources: topic.resources,
          isCompleted: false
        });
        
        usedHours += topic.hours;
      }
    } else if (gap.skill === 'Projects') {
      weekTheme = 'Project Building';
      
      for (const topic of projectTopics) {
        if (usedHours + topic.hours > totalHours) break;
        
        tasks.push({
          id: `task-${taskId++}`,
          title: topic.title,
          description: `Build and deploy ${topic.title}`,
          category: 'projects',
          priority: gap.priority,
          estimatedHours: topic.hours,
          resources: topic.resources,
          isCompleted: false
        });
        
        usedHours += topic.hours;
      }
    }
    
    // Distribute tasks across weeks
    let weekTasks: RoadmapTask[] = [];
    let weekHours = 0;
    
    for (const task of tasks) {
      if (weekHours + task.estimatedHours > weeklyHours && weekTasks.length > 0) {
        weeks.push({
          weekNumber: currentWeek,
          theme: weekTheme,
          tasks: weekTasks,
          estimatedHours: weekHours
        });
        currentWeek++;
        weekTasks = [];
        weekHours = 0;
        
        if (currentWeek > timelineWeeks) break;
      }
      
      weekTasks.push(task);
      weekHours += task.estimatedHours;
    }
    
    // Add remaining tasks
    if (weekTasks.length > 0 && currentWeek <= timelineWeeks) {
      weeks.push({
        weekNumber: currentWeek,
        theme: weekTheme,
        tasks: weekTasks,
        estimatedHours: weekHours
      });
      currentWeek++;
    }
  }
  
  // Add soft skills week if time permits
  if (currentWeek <= timelineWeeks) {
    weeks.push({
      weekNumber: currentWeek,
      theme: 'Interview Preparation',
      tasks: [
        {
          id: `task-${taskId++}`,
          title: 'Mock Interviews',
          description: 'Practice with peers or platforms like Pramp',
          category: 'softskills',
          priority: 'medium',
          estimatedHours: 6,
          resources: ['Pramp', 'Interviewing.io', 'Peer Mock Sessions'],
          isCompleted: false
        },
        {
          id: `task-${taskId++}`,
          title: 'Resume & LinkedIn Polish',
          description: 'Update resume and LinkedIn with quantified achievements',
          category: 'softskills',
          priority: 'high',
          estimatedHours: 4,
          resources: ['Resume Worded', 'LinkedIn Learning'],
          isCompleted: false
        }
      ],
      estimatedHours: 10
    });
  }
  
  return {
    id: `roadmap-${Date.now()}`,
    userId: '',
    generatedAt: new Date(),
    totalWeeks: weeks.length,
    weeks,
    excludedTopics: [
      ...excludedTopics.shortTime.slice(0, 3),
      ...excludedTopics.lowPriority.slice(0, 2)
    ]
  };
}
