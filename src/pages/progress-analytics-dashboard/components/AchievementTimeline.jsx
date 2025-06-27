import React from 'react';
import Icon from '../../../components/AppIcon';

const AchievementTimeline = () => {
  const achievements = [
    {
      id: 1,
      title: "React Fundamentals Mastery",
      description: "Completed all React basics modules with 95% score",
      date: "2024-01-15",
      type: "skill_completion",
      icon: "Award",
      color: "success"
    },
    {
      id: 2,
      title: "7-Day Learning Streak",
      description: "Maintained consistent daily learning for a week",
      date: "2024-01-12",
      type: "streak",
      icon: "Flame",
      color: "warning"
    },
    {
      id: 3,
      title: "First Project Deployed",
      description: "Successfully deployed React portfolio to production",
      date: "2024-01-10",
      type: "project",
      icon: "Rocket",
      color: "primary"
    },
    {
      id: 4,
      title: "JavaScript Expert",
      description: "Achieved expert level in JavaScript fundamentals",
      date: "2024-01-08",
      type: "skill_level",
      icon: "Star",
      color: "secondary"
    },
    {
      id: 5,
      title: "Study Marathon",
      description: "Completed 5 hours of focused learning in one day",
      date: "2024-01-05",
      type: "time_milestone",
      icon: "Clock",
      color: "accent"
    },
    {
      id: 6,
      title: "Community Contributor",
      description: "Shared first learning roadmap with the community",
      date: "2024-01-03",
      type: "social",
      icon: "Users",
      color: "success"
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      success: 'text-success bg-success-50 border-success-200',
      warning: 'text-warning bg-warning-50 border-warning-200',
      primary: 'text-primary bg-primary-50 border-primary-200',
      secondary: 'text-secondary bg-secondary-50 border-secondary-200',
      accent: 'text-accent bg-accent-50 border-accent-200'
    };
    return colorMap[color] || colorMap.primary;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-surface rounded-xl border border-border p-6 elevation-1">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Achievement Timeline</h3>
          <p className="text-sm text-text-secondary">Recent milestones and accomplishments</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-primary">{achievements.length}</p>
          <p className="text-sm text-text-secondary">This Month</p>
        </div>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {achievements.map((achievement, index) => (
          <div key={achievement.id} className="flex items-start space-x-4">
            {/* Timeline Line */}
            <div className="flex flex-col items-center">
              <div className={`p-2 rounded-lg border-2 ${getColorClasses(achievement.color)}`}>
                <Icon name={achievement.icon} size={16} />
              </div>
              {index < achievements.length - 1 && (
                <div className="w-px h-8 bg-border mt-2" />
              )}
            </div>

            {/* Achievement Content */}
            <div className="flex-1 min-w-0 pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-text-primary">
                    {achievement.title}
                  </h4>
                  <p className="text-sm text-text-secondary mt-1">
                    {achievement.description}
                  </p>
                </div>
                <time className="text-xs text-text-tertiary ml-4 flex-shrink-0">
                  {formatDate(achievement.date)}
                </time>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-lg font-semibold text-success">12</p>
            <p className="text-xs text-text-secondary">Skills Mastered</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-warning">5</p>
            <p className="text-xs text-text-secondary">Streaks Achieved</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-primary">8</p>
            <p className="text-xs text-text-secondary">Projects Completed</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-secondary">3</p>
            <p className="text-xs text-text-secondary">Certifications</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementTimeline;