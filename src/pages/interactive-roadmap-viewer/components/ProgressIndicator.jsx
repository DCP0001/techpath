import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ 
  totalSkills = 16, 
  completedSkills = 3, 
  inProgressSkills = 2,
  roadmapTitle = "Frontend Developer Roadmap",
  estimatedCompletion = "4 months remaining"
}) => {
  const completionPercentage = Math.round((completedSkills / totalSkills) * 100);
  const inProgressPercentage = Math.round((inProgressSkills / totalSkills) * 100);

  return (
    <div className="bg-surface border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-text-primary mb-1">
            {roadmapTitle}
          </h2>
          <p className="text-sm text-text-secondary">
            {estimatedCompletion}
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary mb-1">
            {completionPercentage}%
          </div>
          <div className="text-xs text-text-secondary">
            Complete
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="w-full bg-border-tertiary rounded-full h-3 overflow-hidden">
          <div className="h-full flex">
            <div 
              className="bg-success transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            ></div>
            <div 
              className="bg-warning transition-all duration-500"
              style={{ width: `${inProgressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <div className="w-8 h-8 bg-success-100 rounded-full flex items-center justify-center">
              <Icon name="CheckCircle2" size={16} className="text-success" />
            </div>
          </div>
          <div className="text-lg font-semibold text-text-primary">
            {completedSkills}
          </div>
          <div className="text-xs text-text-secondary">
            Completed
          </div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <div className="w-8 h-8 bg-warning-100 rounded-full flex items-center justify-center">
              <Icon name="Clock" size={16} className="text-warning" />
            </div>
          </div>
          <div className="text-lg font-semibold text-text-primary">
            {inProgressSkills}
          </div>
          <div className="text-xs text-text-secondary">
            In Progress
          </div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <div className="w-8 h-8 bg-surface-secondary rounded-full flex items-center justify-center">
              <Icon name="Circle" size={16} className="text-text-secondary" />
            </div>
          </div>
          <div className="text-lg font-semibold text-text-primary">
            {totalSkills - completedSkills - inProgressSkills}
          </div>
          <div className="text-xs text-text-secondary">
            Not Started
          </div>
        </div>
      </div>

      {/* Recent Achievement */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 bg-success-100 rounded-full flex items-center justify-center">
            <Icon name="Trophy" size={12} className="text-success" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-text-primary">
              Latest Achievement
            </p>
            <p className="text-xs text-text-secondary">
              Completed "CSS Fundamentals" • 2 days ago
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;