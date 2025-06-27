import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecommendationsSection = () => {
  const recommendations = [
    {
      id: 1,
      title: 'Node.js Backend Development',
      description: 'Perfect next step after mastering React fundamentals',
      difficulty: 'Intermediate',
      duration: '6-8 weeks',
      skills: ['Express.js', 'MongoDB', 'REST APIs'],
      icon: 'Server',
      color: 'bg-accent',
      match: 95
    },
    {
      id: 2,
      title: 'TypeScript Fundamentals',
      description: 'Enhance your JavaScript skills with static typing',
      difficulty: 'Beginner',
      duration: '3-4 weeks',
      skills: ['Type Safety', 'Interfaces', 'Generics'],
      icon: 'Code2',
      color: 'bg-secondary',
      match: 88
    },
    {
      id: 3,
      title: 'React Native Mobile Development',
      description: 'Leverage your React knowledge for mobile apps',
      difficulty: 'Intermediate',
      duration: '8-10 weeks',
      skills: ['Mobile UI', 'Navigation', 'Native APIs'],
      icon: 'Smartphone',
      color: 'bg-primary',
      match: 82
    }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'text-success bg-success-50';
      case 'Intermediate': return 'text-warning bg-warning-50';
      case 'Advanced': return 'text-error bg-error-50';
      default: return 'text-text-secondary bg-surface-tertiary';
    }
  };

  return (
    <div className="bg-surface rounded-xl border border-border p-6 elevation-1">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-heading font-semibold text-text-primary">
            Recommended for You
          </h2>
          <p className="text-text-secondary text-sm mt-1">
            Based on your learning progress and goals
          </p>
        </div>
        <Link to="/interactive-roadmap-viewer">
          <Button
            variant="ghost"
            size="sm"
            iconName="ArrowRight"
            iconPosition="right"
            className="text-primary hover:text-primary-700"
          >
            View All
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {recommendations.map((rec) => (
          <div key={rec.id} className="border border-border rounded-lg p-4 hover:border-primary-200 hover:elevation-1 transition-smooth">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg ${rec.color} flex items-center justify-center`}>
                <Icon name={rec.icon} size={20} className="text-white" />
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Zap" size={14} className="text-warning" />
                <span className="text-xs font-medium text-warning">
                  {rec.match}% match
                </span>
              </div>
            </div>

            <h3 className="font-semibold text-text-primary text-sm mb-2">
              {rec.title}
            </h3>
            <p className="text-text-secondary text-xs mb-3 line-clamp-2">
              {rec.description}
            </p>

            <div className="flex items-center justify-between mb-3">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(rec.difficulty)}`}>
                {rec.difficulty}
              </span>
              <span className="text-xs text-text-secondary flex items-center">
                <Icon name="Clock" size={12} className="mr-1" />
                {rec.duration}
              </span>
            </div>

            <div className="flex flex-wrap gap-1 mb-4">
              {rec.skills.slice(0, 2).map((skill, index) => (
                <span key={index} className="px-2 py-1 bg-surface-tertiary text-text-secondary text-xs rounded">
                  {skill}
                </span>
              ))}
              {rec.skills.length > 2 && (
                <span className="px-2 py-1 bg-surface-tertiary text-text-secondary text-xs rounded">
                  +{rec.skills.length - 2}
                </span>
              )}
            </div>

            <Link to="/interactive-roadmap-viewer">
              <Button
                variant="outline"
                size="sm"
                fullWidth
                iconName="Play"
                iconPosition="left"
              >
                Start Learning
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationsSection;