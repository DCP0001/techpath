import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import Breadcrumb from '../../components/ui/Breadcrumb';
import SkillHeader from './components/SkillHeader';
import TabNavigation from './components/TabNavigation';
import OverviewTab from './components/OverviewTab';
import ResourcesTab from './components/ResourcesTab';
import PracticeTab from './components/PracticeTab';
import AssessmentTab from './components/AssessmentTab';
import TableOfContents from './components/TableOfContents';
import FloatingProgressBar from './components/FloatingProgressBar';

const SkillStudyMaterials = () => {
  const { skillId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Mock skill data
  const skillData = {
    id: "react-hooks",
    title: "React Hooks Fundamentals",
    description: "Master the fundamentals of React Hooks including useState, useEffect, useContext, and custom hooks. Learn how to build modern React applications with functional components and hooks.",
    difficulty: "Intermediate",
    estimatedTime: "8 hours",
    timeSpent: "3.5 hours",
    progress: 45,
    category: "Frontend Development",
    roadmap: "React Developer",
    objectives: [
      "Understand the motivation behind React Hooks and their advantages over class components",
      "Master the useState hook for managing component state in functional components",
      "Learn useEffect for handling side effects, data fetching, and component lifecycle",
      "Implement useContext for state management across component trees",
      "Create custom hooks to encapsulate and reuse stateful logic",
      "Apply best practices and common patterns when using React Hooks"
    ],
    prerequisites: [
      "JavaScript ES6+",
      "React Basics",
      "Component Lifecycle",
      "JSX Syntax"
    ],
    concepts: [
      {
        title: "useState Hook",
        summary: "Manage state in functional components",
        details: `The useState hook allows you to add state to functional components. It returns an array with the current state value and a function to update it.\n\nUnlike class components, useState doesn't merge state updates automatically - you need to handle this manually when dealing with objects.`,
        example: "const [count, setCount] = useState(0);"
      },
      {
        title: "useEffect Hook",
        summary: "Handle side effects and lifecycle events",
        details: `useEffect serves the same purpose as componentDidMount, componentDidUpdate, and componentWillUnmount combined in React class components.\n\nIt runs after every completed render and can optionally clean up after itself.`,
        example: "useEffect(() => { document.title = `Count: ${count}`; }, [count]);"
      },
      {
        title: "Custom Hooks",
        summary: "Extract and reuse stateful logic",
        details: `Custom hooks are JavaScript functions whose names start with 'use' and that may call other hooks.\n\nThey let you extract component logic into reusable functions, making your code more modular and testable.`,
        example: "function useCounter(initialValue) { const [count, setCount] = useState(initialValue); return [count, setCount]; }"
      }
    ],
    skillsGained: [
      "State Management",
      "Effect Handling",
      "Custom Hook Creation",
      "Performance Optimization",
      "Modern React Patterns",
      "Functional Programming"
    ]
  };

  // Mock resources data
  const resourcesData = [
    {
      id: 1,
      title: "React Hooks Documentation",
      description: "Official React documentation covering all built-in hooks with examples and best practices.",
      type: "documentation",
      url: "https://reactjs.org/docs/hooks-intro.html",
      author: "React Team",
      duration: "30 min read",
      rating: 4.9,
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop"
    },
    {
      id: 2,
      title: "Complete Guide to useEffect",
      description: "Deep dive into useEffect hook, covering dependency arrays, cleanup functions, and common pitfalls.",
      type: "article",
      url: "https://overreacted.io/a-complete-guide-to-useeffect/",
      author: "Dan Abramov",
      duration: "45 min read",
      rating: 4.8,
      thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=225&fit=crop"
    },
    {
      id: 3,
      title: "React Hooks Tutorial for Beginners",
      description: "Step-by-step video tutorial covering useState, useEffect, and custom hooks with practical examples.",
      type: "video",
      url: "https://youtube.com/watch?v=hooks-tutorial",
      author: "Traversy Media",
      duration: "1h 20min",
      rating: 4.7,
      thumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=225&fit=crop"
    },
    {
      id: 4,
      title: "Building Custom Hooks",
      description: "Learn how to create reusable custom hooks for common patterns like data fetching and form handling.",
      type: "tutorial",
      url: "https://example.com/custom-hooks-tutorial",
      author: "Kent C. Dodds",
      duration: "25 min read",
      rating: 4.9,
      thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=225&fit=crop"
    },
    {
      id: 5,
      title: "React Hooks Best Practices",
      description: "Essential patterns and anti-patterns when working with React Hooks in production applications.",
      type: "article",
      url: "https://example.com/hooks-best-practices",
      author: "Robin Wieruch",
      duration: "20 min read",
      rating: 4.6,
      thumbnail: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&h=225&fit=crop"
    },
    {
      id: 6,
      title: "Advanced React Hooks Patterns",
      description: "Explore advanced patterns like useReducer, useMemo, useCallback, and performance optimization techniques.",
      type: "video",
      url: "https://youtube.com/watch?v=advanced-hooks",
      author: "React Conf",
      duration: "55 min",
      rating: 4.8,
      thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=225&fit=crop"
    }
  ];

  // Mock exercises data
  const exercisesData = [
    {
      id: 1,
      title: "Counter with useState",
      description: "Build a simple counter component using the useState hook with increment, decrement, and reset functionality.",
      difficulty: "Easy",
      estimatedTime: "15 min",
      completions: 1250,
      rating: 4.5,
      language: "JavaScript",
      problemStatement: `Create a counter component that displays a number and has three buttons: increment (+1), decrement (-1), and reset (back to 0). Use the useState hook to manage the counter state.`,
      requirements: [
        "Use useState hook to manage counter state",
        "Implement increment function that adds 1 to counter",
        "Implement decrement function that subtracts 1 from counter",
        "Implement reset function that sets counter back to 0",
        "Display current counter value",
        "Add proper button styling and accessibility"
      ],
      starterCode: `import React, { useState } from 'react';

function Counter() {
  // TODO: Add useState hook for counter state
  
  // TODO: Implement increment function
  
  // TODO: Implement decrement function
  
  // TODO: Implement reset function
  
  return (
    <div className="counter">
      {/* TODO: Display counter value */}
      {/* TODO: Add increment button */}
      {/* TODO: Add decrement button */}
      {/* TODO: Add reset button */}
    </div>
  );
}

export default Counter;`,
      hints: [
        "Initialize state with useState(0) to start counter at zero",
        "Use setCount(count + 1) for increment and setCount(count - 1) for decrement",
        "For reset, use setCount(0) to return to initial state"
      ]
    },
    {
      id: 2,
      title: "Data Fetching with useEffect",
      description: "Fetch user data from an API when component mounts and handle loading states using useEffect and useState.",
      difficulty: "Medium",
      estimatedTime: "30 min",
      completions: 890,
      rating: 4.7,
      language: "JavaScript",
      problemStatement: `Create a component that fetches user data from a mock API when it mounts. Display loading state while fetching and show user information once loaded. Handle any potential errors gracefully.`,
      requirements: [
        "Use useEffect to fetch data on component mount",
        "Use useState to manage loading, data, and error states",
        "Display loading indicator while fetching",
        "Show user information after successful fetch",
        "Handle and display error states appropriately",
        "Prevent memory leaks with proper cleanup"
      ],
      starterCode: `import React, { useState, useEffect } from 'react';

// Mock API function
const fetchUserData = async (userId) => {
  const response = await fetch(\`https://jsonplaceholder.typicode.com/users/\${userId}\`);
  if (!response.ok) throw new Error('Failed to fetch user');
  return response.json();
};

function UserProfile({ userId = 1 }) {
  // TODO: Add state for user data, loading, and error
  
  // TODO: Add useEffect to fetch data on mount
  
  // TODO: Handle loading state
  if (loading) {
    return <div>Loading user data...</div>;
  }
  
  // TODO: Handle error state
  if (error) {
    return <div>Error: {error}</div>;
  }
  
  // TODO: Display user data
  return (
    <div className="user-profile">
      {/* Display user information here */}
    </div>
  );
}

export default UserProfile;`,
      hints: [
        "Use three separate state variables: user, loading, and error",
        "Set loading to true before fetching and false after completion",
        "Use try-catch block in useEffect to handle errors",
        "Remember to add userId to dependency array if it can change"
      ]
    },
    {
      id: 3,
      title: "Custom Hook for Local Storage",
      description: "Create a custom hook that syncs state with localStorage, providing persistent state across browser sessions.",
      difficulty: "Hard",
      estimatedTime: "45 min",
      completions: 456,
      rating: 4.9,
      language: "JavaScript",
      problemStatement: `Build a custom hook called useLocalStorage that behaves like useState but automatically syncs with localStorage. The hook should handle JSON serialization/deserialization and provide the same API as useState.`,
      requirements: [
        "Create custom hook that accepts key and initial value",
        "Return current value and setter function like useState",
        "Automatically save to localStorage when value changes",
        "Load initial value from localStorage if it exists",
        "Handle JSON serialization and parsing",
        "Gracefully handle localStorage errors (e.g., quota exceeded)",
        "Support any serializable data type"
      ],
      starterCode: `import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  // TODO: Implement custom hook logic
  
  // TODO: Create state with initial value from localStorage or default
  
  // TODO: Create setter function that updates both state and localStorage
  
  // TODO: Return [value, setValue] like useState
}

// Example usage component
function Settings() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const [username, setUsername] = useLocalStorage('username', '');
  
  return (
    <div>
      <h2>Settings</h2>
      <div>
        <label>
          Theme:
          <select value={theme} onChange={(e) => setTheme(e.target.value)}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Username:
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
        </label>
      </div>
    </div>
  );
}

export { useLocalStorage, Settings };`,
      hints: [
        "Use useState to manage the current value in memory",
        "Use useEffect to sync changes to localStorage",
        "Wrap localStorage operations in try-catch blocks",
        "Use JSON.stringify/JSON.parse for serialization"
      ]
    }
  ];

  // Mock assessments data
  const assessmentsData = [
    {
      id: 1,
      title: "React Hooks Fundamentals Quiz",
      description: "Test your understanding of basic React Hooks concepts including useState, useEffect, and custom hooks.",
      type: "quiz",
      duration: "15 min",
      attempts: 2340,
      bestScore: 85,
      questions: [
        {
          question: "What does the useState hook return?",
          options: [
            "A single state value",
            "An array with current state and setter function",
            "An object with state properties",
            "A function to update state"
          ],
          correctAnswer: 1
        },
        {
          question: "When does useEffect run by default?",
          options: [
            "Only on component mount",
            "Only on component unmount",
            "After every render",
            "Only when dependencies change"
          ],
          correctAnswer: 2
        },
        {
          question: "What is the purpose of the dependency array in useEffect?",
          options: [
            "To prevent the effect from running",
            "To control when the effect should re-run",
            "To pass data to the effect",
            "To handle errors in the effect"
          ],
          correctAnswer: 1
        },
        {
          question: "Custom hooks must start with which prefix?",
          options: [
            "hook",
            "custom",
            "use",
            "react"
          ],
          correctAnswer: 2
        },
        {
          question: "Which hook would you use to share state between components?",
          options: [
            "useState",
            "useEffect",
            "useContext",
            "useReducer"
          ],
          correctAnswer: 2
        }
      ]
    },
    {
      id: 2,
      title: "Advanced Hooks Assessment",
      description: "Comprehensive test covering useReducer, useMemo, useCallback, and performance optimization patterns.",
      type: "test",
      duration: "30 min",
      attempts: 890,
      bestScore: 92,
      questions: [
        {
          question: "When should you use useReducer instead of useState?",
          options: [
            "When you have simple state updates",
            "When you have complex state logic with multiple sub-values",
            "When you need to fetch data",
            "When you want to optimize performance"
          ],
          correctAnswer: 1
        },
        {
          question: "What is the primary purpose of useMemo?",
          options: [
            "To memoize expensive calculations",
            "To manage component state",
            "To handle side effects",
            "To create custom hooks"
          ],
          correctAnswer: 0
        },
        {
          question: "useCallback is used to:",
          options: [
            "Memoize values",
            "Memoize functions",
            "Handle async operations",
            "Manage form state"
          ],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 3,
      title: "Hooks Practice Challenge",
      description: "Hands-on coding challenge to build a complete application using various React Hooks patterns.",
      type: "practice",
      duration: "45 min",
      attempts: 567,
      questions: [
        {
          question: "Build a todo application using useState and useEffect that persists data to localStorage.",
          options: [
            "Complete the implementation",
            "Add error handling",
            "Implement filtering",
            "Add animations"
          ],
          correctAnswer: 0
        }
      ]
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'BookOpen', count: null },
    { id: 'resources', label: 'Resources', icon: 'ExternalLink', count: resourcesData.length },
    { id: 'practice', label: 'Practice', icon: 'Code', count: exercisesData.length },
    { id: 'assessment', label: 'Assessment', icon: 'CheckCircle', count: assessmentsData.length }
  ];

  const breadcrumbItems = [
    { name: 'Dashboard', path: '/learning-dashboard', icon: 'Home' },
    { name: 'React Developer', path: '/interactive-roadmap-viewer', icon: 'Map' },
    { name: skillData.category, path: '/interactive-roadmap-viewer', icon: 'Folder' },
    { name: skillData.title, path: `/skill-study-materials/${skillData.id}`, icon: 'BookOpen', current: true }
  ];

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleRate = () => {
    // Mock rating functionality
    console.log('Rating skill...');
  };

  const handleMarkComplete = () => {
    // Mock completion functionality
    console.log('Marking skill as complete...');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab skill={skillData} />;
      case 'resources':
        return <ResourcesTab resources={resourcesData} />;
      case 'practice':
        return <PracticeTab exercises={exercisesData} />;
      case 'assessment':
        return <AssessmentTab assessments={assessmentsData} />;
      default:
        return <OverviewTab skill={skillData} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16 lg:pt-18 pb-20 lg:pb-8">
        <SkillHeader 
          skill={skillData}
          onBookmark={handleBookmark}
          onRate={handleRate}
          isBookmarked={isBookmarked}
        />
        
        <TabNavigation 
          activeTab={activeTab}
          onTabChange={setActiveTab}
          tabs={tabs}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Breadcrumb customItems={breadcrumbItems} />
          
          <div className="flex gap-8">
            <div className="flex-1 min-w-0">
              <div className="max-w-4xl">
                {renderTabContent()}
              </div>
            </div>
            
            <TableOfContents 
              activeTab={activeTab}
              onTabChange={setActiveTab}
              tabs={tabs}
              skill={skillData}
            />
          </div>
        </div>
      </main>
      
      <FloatingProgressBar 
        skill={skillData}
        onMarkComplete={handleMarkComplete}
        onBookmark={handleBookmark}
        isBookmarked={isBookmarked}
      />
      
      <BottomTabNavigation />
    </div>
  );
};

export default SkillStudyMaterials;