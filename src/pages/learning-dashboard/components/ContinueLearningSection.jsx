import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContinueLearningSection = () => {
  const currentSkill = {
    id: 1,
    title: 'React State Management',
    roadmap: 'Frontend Development',
    description: 'Learn advanced state management patterns with Context API and useReducer hook',
    progress: 65,
    nextTopic: 'useReducer Hook Patterns',
    estimatedTime: '25 min',
    difficulty: 'Intermediate',
    icon: 'Layers',
    color: 'bg-primary'
  };

  const upcomingSkills = [
    {
      id: 2,
      title: 'React Performance Optimization',
      estimatedTime: '45 min',
      icon: 'Zap'
    },
    {
      id: 3,
      title: 'React Testing with Jest',
      estimatedTime: '60 min',
      icon: 'TestTube'
    },
    {
      id: 4,
      title: 'React Router Advanced',
      estimatedTime: '35 min',
      icon: 'Route'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl border border-primary-200 p-6 elevation-1">
      <div className="flex items-center space-x-3 mb-4">
        <div className={`w-12 h-12 rounded-lg ${currentSkill.color} flex items-center justify-center`}>
          <Icon name={currentSkill.icon} size={24} className="text-white" />
        </div>
        <div>
          <h2 className="text-xl font-heading font-semibold text-text-primary">
            Continue Learning
          </h2>
          <p className="text-text-secondary text-sm">
            Pick up where you left off
          </p>
        </div>
      </div>

      <div className="bg-surface rounded-lg p-4 mb-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-semibold text-text-primary mb-1">
              {currentSkill.title}
            </h3>
            <p className="text-text-secondary text-sm mb-2">
              {currentSkill.roadmap}
            </p>
            <p className="text-text-secondary text-xs">
              {currentSkill.description}
            </p>
          </div>
          <span className="px-2 py-1 bg-warning-50 text-warning text-xs font-medium rounded-full">
            {currentSkill.difficulty}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-text-primary">
              Progress: {currentSkill.progress}%
            </span>
            <span className="text-sm text-text-secondary">
              Next: {currentSkill.nextTopic}
            </span>
          </div>
          <div className="w-full bg-surface-tertiary rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500"
              style={{ width: `${currentSkill.progress}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-text-secondary">
            <span className="flex items-center">
              <Icon name="Clock" size={16} className="mr-1" />
              {currentSkill.estimatedTime}
            </span>
          </div>
          <Link to="/skill-study-materials">
            <Button
              variant="primary"
              size="sm"
              iconName="Play"
              iconPosition="left"
            >
              Continue
            </Button>
          </Link>
        </div>
      </div>

      {/* Upcoming Skills */}
      <div>
        <h4 className="font-medium text-text-primary mb-3 text-sm">
          Coming Up Next
        </h4>
        <div className="space-y-2">
          {upcomingSkills.map((skill, index) => (
            <div key={skill.id} className="flex items-center justify-between bg-surface/50 rounded-lg p-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-surface-tertiary rounded-lg flex items-center justify-center">
                  <Icon name={skill.icon} size={16} className="text-text-secondary" />
                </div>
                <div>
                  <span className="text-sm font-medium text-text-primary">
                    {skill.title}
                  </span>
                </div>
              </div>
              <span className="text-xs text-text-secondary">
                {skill.estimatedTime}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContinueLearningSection;