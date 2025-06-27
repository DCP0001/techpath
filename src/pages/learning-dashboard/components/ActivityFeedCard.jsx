import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityFeedCard = () => {
  const activities = [
    {
      id: 1,
      type: 'skill_completed',
      title: 'React Hooks Mastery',
      description: 'Completed advanced useState and useEffect patterns',
      timestamp: '2 hours ago',
      icon: 'CheckCircle',
      iconColor: 'text-success',
      bgColor: 'bg-success-50'
    },
    {
      id: 2,
      type: 'achievement',
      title: 'Frontend Fundamentals Badge',
      description: 'Earned for completing HTML, CSS, and JavaScript basics',
      timestamp: '1 day ago',
      icon: 'Award',
      iconColor: 'text-warning',
      bgColor: 'bg-warning-50'
    },
    {
      id: 3,
      type: 'milestone',
      title: 'React Roadmap - 50% Complete',
      description: 'Halfway through the React development path',
      timestamp: '2 days ago',
      icon: 'Target',
      iconColor: 'text-primary',
      bgColor: 'bg-primary-50'
    },
    {
      id: 4,
      type: 'study_session',
      title: 'JavaScript ES6 Features',
      description: 'Studied arrow functions, destructuring, and modules',
      timestamp: '3 days ago',
      icon: 'BookOpen',
      iconColor: 'text-secondary',
      bgColor: 'bg-secondary-50'
    }
  ];

  return (
    <div className="bg-surface rounded-xl border border-border p-6 elevation-1">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-text-primary">
          Recent Activity
        </h2>
        <button className="text-sm font-medium text-primary hover:text-primary-700 transition-smooth">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-surface-secondary transition-smooth">
            <div className={`w-10 h-10 rounded-lg ${activity.bgColor} flex items-center justify-center flex-shrink-0`}>
              <Icon 
                name={activity.icon} 
                size={20} 
                className={activity.iconColor}
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-text-primary text-sm">
                {activity.title}
              </h3>
              <p className="text-text-secondary text-xs mt-1 line-clamp-2">
                {activity.description}
              </p>
              <p className="text-text-tertiary text-xs mt-2">
                {activity.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeedCard;