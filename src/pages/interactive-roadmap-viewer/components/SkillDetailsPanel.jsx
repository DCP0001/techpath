import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SkillDetailsPanel = ({ 
  selectedNode, 
  onClose, 
  onMarkComplete, 
  onBookmark, 
  isBookmarked = false,
  isMobile = false 
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!selectedNode) {
    return (
      <div className="flex items-center justify-center h-full text-text-secondary">
        <div className="text-center">
          <Icon name="MousePointer2" size={48} className="mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium mb-2">Select a Skill Node</p>
          <p className="text-sm">Click on any skill in the roadmap to view details</p>
        </div>
      </div>
    );
  }

  // Mock data for selected node details
  const mockResources = [
    {
      id: 1,
      title: "MDN Web Docs - HTML Basics",
      type: "documentation",
      url: "#",
      duration: "2 hours",
      difficulty: "Beginner",
      rating: 4.8,
      completed: true
    },
    {
      id: 2,
      title: "FreeCodeCamp HTML Course",
      type: "course",
      url: "#",
      duration: "8 hours",
      difficulty: "Beginner",
      rating: 4.9,
      completed: false
    },
    {
      id: 3,
      title: "HTML5 Semantic Elements",
      type: "article",
      url: "#",
      duration: "15 min",
      difficulty: "Beginner",
      rating: 4.6,
      completed: false
    }
  ];

  const mockQuizzes = [
    {
      id: 1,
      title: "HTML Fundamentals Quiz",
      questions: 15,
      duration: "10 min",
      completed: true,
      score: 87
    },
    {
      id: 2,
      title: "Semantic HTML Assessment",
      questions: 20,
      duration: "15 min",
      completed: false,
      score: null
    }
  ];

  const mockProjects = [
    {
      id: 1,
      title: "Personal Portfolio Website",
      description: "Create a responsive portfolio using semantic HTML",
      difficulty: "Beginner",
      estimatedTime: "4 hours",
      completed: false
    },
    {
      id: 2,
      title: "Blog Layout Structure",
      description: "Build a blog layout with proper HTML structure",
      difficulty: "Intermediate",
      estimatedTime: "3 hours",
      completed: false
    }
  ];

  const getResourceIcon = (type) => {
    switch (type) {
      case 'course': return 'PlayCircle';
      case 'documentation': return 'FileText';
      case 'article': return 'BookOpen';
      case 'video': return 'Video';
      default: return 'Link';
    }
  };

  const getProgress = () => {
    if (selectedNode.id === 'html-basics') return 100;
    if (selectedNode.id === 'css-fundamentals') return 100;
    if (selectedNode.id === 'javascript-basics') return 65;
    if (selectedNode.id === 'react-fundamentals') return 25;
    return 0;
  };

  const progress = getProgress();

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'resources', label: 'Resources', icon: 'BookOpen' },
    { id: 'practice', label: 'Practice', icon: 'Code' },
    { id: 'progress', label: 'Progress', icon: 'TrendingUp' }
  ];

  return (
    <div className={`bg-surface border-l border-border h-full flex flex-col ${
      isMobile ? 'fixed inset-0 z-50' : ''
    }`}>
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                selectedNode.difficulty === 'Beginner' ?'bg-success-100 text-success-700'
                  : selectedNode.difficulty === 'Intermediate' ?'bg-warning-100 text-warning-700' :'bg-error-100 text-error-700'
              }`}>
                {selectedNode.difficulty}
              </span>
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-surface-secondary text-text-secondary">
                {selectedNode.category}
              </span>
            </div>
            <h2 className="text-xl font-semibold text-text-primary mb-2">
              {selectedNode.title}
            </h2>
            <p className="text-text-secondary text-sm">
              {selectedNode.description}
            </p>
          </div>
          {isMobile && (
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={onClose}
              className="ml-2"
            />
          )}
        </div>

        {/* Progress bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-text-primary">Progress</span>
            <span className="text-sm text-text-secondary">{progress}%</span>
          </div>
          <div className="w-full bg-border-tertiary rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${
                progress === 100 ? 'bg-success' : progress > 0 ? 'bg-warning' : 'bg-border-secondary'
              }`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex space-x-2">
          <Button
            variant={progress === 100 ? "success" : "primary"}
            size="sm"
            iconName={progress === 100 ? "Check" : "Play"}
            onClick={() => onMarkComplete(selectedNode.id)}
            className="flex-1"
          >
            {progress === 100 ? 'Completed' : 'Start Learning'}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName={isBookmarked ? "BookmarkCheck" : "Bookmark"}
            onClick={() => onBookmark(selectedNode.id)}
            className={isBookmarked ? 'text-primary' : ''}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <div className="flex overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-text-primary mb-3">Learning Objectives</h3>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <Icon name="CheckCircle2" size={16} className="text-success mt-0.5" />
                  <span className="text-sm text-text-secondary">
                    Understand HTML document structure and syntax
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <Icon name="CheckCircle2" size={16} className="text-success mt-0.5" />
                  <span className="text-sm text-text-secondary">
                    Learn semantic HTML elements and their purposes
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <Icon name="CheckCircle2" size={16} className="text-success mt-0.5" />
                  <span className="text-sm text-text-secondary">
                    Create accessible and well-structured web pages
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-text-primary mb-3">Prerequisites</h3>
              {selectedNode.prerequisites.length > 0 ? (
                <div className="space-y-2">
                  {selectedNode.prerequisites.map(prereq => (
                    <div key={prereq} className="flex items-center space-x-2 p-2 bg-surface-secondary rounded-lg">
                      <Icon name="CheckCircle2" size={16} className="text-success" />
                      <span className="text-sm text-text-primary capitalize">
                        {prereq.replace('-', ' ')}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-text-secondary">No prerequisites required</p>
              )}
            </div>

            <div>
              <h3 className="font-medium text-text-primary mb-3">Estimated Timeline</h3>
              <div className="bg-surface-secondary rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={16} className="text-text-secondary" />
                  <span className="text-sm font-medium text-text-primary">
                    {selectedNode.estimatedTime}
                  </span>
                </div>
                <p className="text-xs text-text-secondary mt-1">
                  Based on 5-10 hours per week study schedule
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="space-y-4">
            {mockResources.map(resource => (
              <div key={resource.id} className="border border-border rounded-lg p-4 hover:border-primary-200 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${
                      resource.completed ? 'bg-success-100' : 'bg-surface-secondary'
                    }`}>
                      <Icon 
                        name={getResourceIcon(resource.type)} 
                        size={16} 
                        className={resource.completed ? 'text-success-600' : 'text-text-secondary'}
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-text-primary mb-1">
                        {resource.title}
                      </h4>
                      <div className="flex items-center space-x-3 text-xs text-text-secondary">
                        <span>{resource.duration}</span>
                        <span>•</span>
                        <span>{resource.difficulty}</span>
                        <span>•</span>
                        <div className="flex items-center space-x-1">
                          <Icon name="Star" size={12} className="text-warning fill-current" />
                          <span>{resource.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {resource.completed && (
                    <Icon name="CheckCircle2" size={16} className="text-success" />
                  )}
                </div>
                <Button
                  variant={resource.completed ? "ghost" : "primary"}
                  size="sm"
                  iconName={resource.completed ? "Eye" : "ExternalLink"}
                  className="w-full"
                >
                  {resource.completed ? 'Review' : 'Start'}
                </Button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'practice' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-text-primary mb-4">Quizzes & Assessments</h3>
              <div className="space-y-3">
                {mockQuizzes.map(quiz => (
                  <div key={quiz.id} className="border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-text-primary">{quiz.title}</h4>
                      {quiz.completed && (
                        <span className="text-sm font-medium text-success">
                          {quiz.score}%
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-3 text-sm text-text-secondary mb-3">
                      <span>{quiz.questions} questions</span>
                      <span>•</span>
                      <span>{quiz.duration}</span>
                    </div>
                    <Button
                      variant={quiz.completed ? "ghost" : "primary"}
                      size="sm"
                      iconName={quiz.completed ? "RotateCcw" : "Play"}
                      className="w-full"
                    >
                      {quiz.completed ? 'Retake Quiz' : 'Start Quiz'}
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium text-text-primary mb-4">Practice Projects</h3>
              <div className="space-y-3">
                {mockProjects.map(project => (
                  <div key={project.id} className="border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-text-primary mb-1">
                          {project.title}
                        </h4>
                        <p className="text-sm text-text-secondary mb-2">
                          {project.description}
                        </p>
                        <div className="flex items-center space-x-3 text-xs text-text-secondary">
                          <span>{project.difficulty}</span>
                          <span>•</span>
                          <span>{project.estimatedTime}</span>
                        </div>
                      </div>
                      {project.completed && (
                        <Icon name="CheckCircle2" size={16} className="text-success" />
                      )}
                    </div>
                    <Button
                      variant={project.completed ? "ghost" : "primary"}
                      size="sm"
                      iconName={project.completed ? "Eye" : "Code"}
                      className="w-full mt-3"
                    >
                      {project.completed ? 'View Project' : 'Start Project'}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-text-primary mb-4">Learning Statistics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-surface-secondary rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-primary mb-1">{progress}%</div>
                  <div className="text-sm text-text-secondary">Completed</div>
                </div>
                <div className="bg-surface-secondary rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-text-primary mb-1">
                    {selectedNode.resources || 5}
                  </div>
                  <div className="text-sm text-text-secondary">Resources</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-text-primary mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-surface-secondary rounded-lg">
                  <Icon name="BookOpen" size={16} className="text-primary" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-text-primary">
                      Completed "HTML Fundamentals Quiz"
                    </p>
                    <p className="text-xs text-text-secondary">2 days ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-surface-secondary rounded-lg">
                  <Icon name="Video" size={16} className="text-warning" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-text-primary">
                      Started "FreeCodeCamp HTML Course"
                    </p>
                    <p className="text-xs text-text-secondary">1 week ago</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-text-primary mb-4">Next Steps</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 p-3 border border-border rounded-lg">
                  <Icon name="Target" size={16} className="text-primary" />
                  <span className="text-sm text-text-primary">
                    Complete remaining practice exercises
                  </span>
                </div>
                <div className="flex items-center space-x-2 p-3 border border-border rounded-lg">
                  <Icon name="ArrowRight" size={16} className="text-text-secondary" />
                  <span className="text-sm text-text-primary">
                    Move to CSS Fundamentals
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillDetailsPanel;