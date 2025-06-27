import React from 'react';

import Button from '../../../components/ui/Button';

const SkillHeader = ({ skill, onBookmark, onRate, isBookmarked }) => {
  return (
    <div className="bg-surface border-b border-border p-4 lg:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-3 h-3 rounded-full ${skill.difficulty === 'Beginner' ? 'bg-success' : skill.difficulty === 'Intermediate' ? 'bg-warning' : 'bg-error'}`}></div>
              <span className="text-sm font-medium text-text-secondary">{skill.difficulty}</span>
              <span className="text-text-tertiary">•</span>
              <span className="text-sm text-text-secondary">{skill.estimatedTime}</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-heading font-bold text-text-primary mb-2">
              {skill.title}
            </h1>
            <p className="text-text-secondary leading-relaxed">
              {skill.description}
            </p>
          </div>
          
          <div className="flex items-center gap-2 lg:flex-col lg:items-end">
            <Button
              variant={isBookmarked ? "primary" : "outline"}
              size="sm"
              iconName={isBookmarked ? "BookmarkCheck" : "Bookmark"}
              onClick={onBookmark}
              className="flex-1 lg:flex-none"
            >
              {isBookmarked ? "Bookmarked" : "Bookmark"}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="Star"
              onClick={onRate}
              className="flex-1 lg:flex-none"
            >
              Rate
            </Button>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-text-primary">Progress</span>
            <span className="text-sm text-text-secondary">{skill.progress}% Complete</span>
          </div>
          <div className="w-full bg-surface-tertiary rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
              style={{ width: `${skill.progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillHeader;