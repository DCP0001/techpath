import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProgressOverviewCard = ({ roadmap }) => {
  const progressPercentage = Math.round((roadmap.completedSkills / roadmap.totalSkills) * 100);
  
  return (
    <div className="bg-surface rounded-xl border border-border p-6 elevation-1 hover:elevation-2 transition-smooth">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${roadmap.color}`}>
            <Icon name={roadmap.icon} size={24} className="text-white" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-text-primary text-lg">
              {roadmap.title}
            </h3>
            <p className="text-text-secondary text-sm">{roadmap.category}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          iconName="MoreHorizontal"
          className="text-text-secondary hover:text-text-primary"
        />
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-text-primary">
            {roadmap.completedSkills} of {roadmap.totalSkills} skills
          </span>
          <span className="text-sm font-semibold text-primary">
            {progressPercentage}%
          </span>
        </div>
        <div className="w-full bg-surface-tertiary rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <div className="text-lg font-semibold text-text-primary">
            {roadmap.timeSpent}h
          </div>
          <div className="text-xs text-text-secondary">Time Spent</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-text-primary">
            {roadmap.estimatedTime}h
          </div>
          <div className="text-xs text-text-secondary">Est. Remaining</div>
        </div>
      </div>

      {/* Action Button */}
      <Link to="/interactive-roadmap-viewer" className="block">
        <Button
          variant="primary"
          size="sm"
          fullWidth
          iconName="Play"
          iconPosition="left"
        >
          Continue Learning
        </Button>
      </Link>
    </div>
  );
};

export default ProgressOverviewCard;