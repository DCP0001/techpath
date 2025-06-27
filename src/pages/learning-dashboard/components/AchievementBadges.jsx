import React from 'react';
import Icon from '../../../components/AppIcon';

const AchievementBadges = () => {
  const achievements = [
    {
      id: 1,
      title: 'First Steps',
      description: 'Completed your first skill',
      icon: 'Trophy',
      color: 'bg-warning',
      earned: true,
      earnedDate: '2024-01-15'
    },
    {
      id: 2,
      title: 'Week Warrior',
      description: '7-day learning streak',
      icon: 'Flame',
      color: 'bg-error',
      earned: true,
      earnedDate: '2024-01-20'
    },
    {
      id: 3,
      title: 'Frontend Master',
      description: 'Completed Frontend roadmap',
      icon: 'Code',
      color: 'bg-primary',
      earned: true,
      earnedDate: '2024-01-25'
    },
    {
      id: 4,
      title: 'Speed Learner',
      description: 'Complete 5 skills in one day',
      icon: 'Zap',
      color: 'bg-accent',
      earned: false,
      progress: 3,
      total: 5
    },
    {
      id: 5,
      title: 'Knowledge Sharer',
      description: 'Share 3 roadmaps with others',
      icon: 'Share2',
      color: 'bg-secondary',
      earned: false,
      progress: 1,
      total: 3
    }
  ];

  const stats = {
    currentStreak: 12,
    longestStreak: 28,
    totalBadges: achievements.filter(a => a.earned).length,
    totalSkills: 47
  };

  return (
    <div className="bg-surface rounded-xl border border-border p-6 elevation-1">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-text-primary">
          Achievements & Stats
        </h2>
        <button className="text-sm font-medium text-primary hover:text-primary-700 transition-smooth">
          View All
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-3 bg-surface-secondary rounded-lg">
          <div className="text-2xl font-bold text-primary mb-1">
            {stats.currentStreak}
          </div>
          <div className="text-xs text-text-secondary">
            Current Streak
          </div>
        </div>
        <div className="text-center p-3 bg-surface-secondary rounded-lg">
          <div className="text-2xl font-bold text-accent mb-1">
            {stats.longestStreak}
          </div>
          <div className="text-xs text-text-secondary">
            Longest Streak
          </div>
        </div>
        <div className="text-center p-3 bg-surface-secondary rounded-lg">
          <div className="text-2xl font-bold text-warning mb-1">
            {stats.totalBadges}
          </div>
          <div className="text-xs text-text-secondary">
            Badges Earned
          </div>
        </div>
        <div className="text-center p-3 bg-surface-secondary rounded-lg">
          <div className="text-2xl font-bold text-secondary mb-1">
            {stats.totalSkills}
          </div>
          <div className="text-xs text-text-secondary">
            Skills Mastered
          </div>
        </div>
      </div>

      {/* Achievement Badges */}
      <div>
        <h3 className="font-medium text-text-primary mb-4 text-sm">
          Recent Achievements
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3">
          {achievements.slice(0, 4).map((achievement) => (
            <div 
              key={achievement.id} 
              className={`p-3 rounded-lg border transition-smooth ${
                achievement.earned 
                  ? 'border-primary-200 bg-primary-50' :'border-border bg-surface-secondary'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 rounded-lg ${achievement.color} flex items-center justify-center ${
                  !achievement.earned ? 'opacity-50' : ''
                }`}>
                  <Icon 
                    name={achievement.icon} 
                    size={20} 
                    className="text-white"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={`font-medium text-sm ${
                    achievement.earned ? 'text-text-primary' : 'text-text-secondary'
                  }`}>
                    {achievement.title}
                  </h4>
                  <p className="text-text-secondary text-xs mt-1">
                    {achievement.description}
                  </p>
                  {achievement.earned ? (
                    <p className="text-primary text-xs mt-2 font-medium">
                      Earned {new Date(achievement.earnedDate).toLocaleDateString()}
                    </p>
                  ) : (
                    <div className="mt-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-text-secondary">
                          {achievement.progress}/{achievement.total}
                        </span>
                      </div>
                      <div className="w-full bg-surface-tertiary rounded-full h-1">
                        <div 
                          className="bg-primary h-1 rounded-full transition-all duration-300"
                          style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AchievementBadges;