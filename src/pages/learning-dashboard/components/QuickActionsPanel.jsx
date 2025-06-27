import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionsPanel = () => {
  const quickActions = [
    {
      id: 1,
      title: 'Browse Roadmaps',
      description: 'Explore all available learning paths',
      icon: 'Map',
      color: 'bg-primary',
      link: '/interactive-roadmap-viewer'
    },
    {
      id: 2,
      title: 'Study Materials',
      description: 'Access interactive learning content',
      icon: 'BookOpen',
      color: 'bg-secondary',
      link: '/skill-study-materials'
    },
    {
      id: 3,
      title: 'View Analytics',
      description: 'Track your learning progress',
      icon: 'BarChart3',
      color: 'bg-accent',
      link: '/progress-analytics-dashboard'
    },
    {
      id: 4,
      title: 'Create Roadmap',
      description: 'Build custom learning paths',
      icon: 'Plus',
      color: 'bg-warning',
      link: '/roadmap-creation-studio'
    }
  ];

  const recentSearches = [
    'React Hooks',
    'Node.js',
    'TypeScript',
    'GraphQL'
  ];

  return (
    <div className="bg-surface rounded-xl border border-border p-6 elevation-1">
      <h2 className="text-xl font-heading font-semibold text-text-primary mb-6">
        Quick Actions
      </h2>

      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon name="Search" size={20} className="text-text-tertiary" />
        </div>
        <input
          type="text"
          placeholder="Search skills, roadmaps, or topics..."
          className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-surface-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth text-text-primary placeholder-text-tertiary"
        />
      </div>

      {/* Recent Searches */}
      <div className="mb-6">
        <h3 className="font-medium text-text-primary mb-3 text-sm">
          Recent Searches
        </h3>
        <div className="flex flex-wrap gap-2">
          {recentSearches.map((search, index) => (
            <button
              key={index}
              className="px-3 py-1 bg-surface-tertiary hover:bg-primary-50 text-text-secondary hover:text-primary text-sm rounded-full transition-smooth"
            >
              {search}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {quickActions.map((action) => (
          <Link key={action.id} to={action.link}>
            <div className="p-4 border border-border rounded-lg hover:border-primary-200 hover:elevation-1 transition-smooth group">
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center group-hover:scale-105 transition-transform`}>
                  <Icon name={action.icon} size={20} className="text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-text-primary text-sm group-hover:text-primary transition-smooth">
                    {action.title}
                  </h4>
                  <p className="text-text-secondary text-xs mt-1">
                    {action.description}
                  </p>
                </div>
                <Icon 
                  name="ArrowRight" 
                  size={16} 
                  className="text-text-tertiary group-hover:text-primary transition-smooth" 
                />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Additional Actions */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
            className="flex-1"
          >
            Export Progress
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="Settings"
            iconPosition="left"
            className="flex-1"
          >
            Preferences
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsPanel;