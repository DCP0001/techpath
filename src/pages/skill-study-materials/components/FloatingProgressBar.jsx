import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FloatingProgressBar = ({ skill, onMarkComplete, onBookmark, isBookmarked }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsVisible(scrollTop > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 lg:hidden">
      <div className={`bg-surface border border-border rounded-lg shadow-lg transition-all duration-300 ${
        isExpanded ? 'w-80' : 'w-16'
      }`}>
        {isExpanded ? (
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-text-primary text-sm truncate">
                {skill.title}
              </h3>
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                onClick={() => setIsExpanded(false)}
                className="flex-shrink-0 ml-2"
              >
                <span className="sr-only">Collapse</span>
              </Button>
            </div>
            
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-text-secondary">Progress</span>
                  <span className="text-xs font-medium text-text-primary">{skill.progress}%</span>
                </div>
                <div className="w-full bg-surface-tertiary rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${skill.progress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant={skill.progress === 100 ? "success" : "primary"}
                  size="sm"
                  iconName={skill.progress === 100 ? "CheckCircle" : "Play"}
                  onClick={onMarkComplete}
                  className="flex-1"
                >
                  {skill.progress === 100 ? "Completed" : "Continue"}
                </Button>
                <Button
                  variant={isBookmarked ? "primary" : "ghost"}
                  size="sm"
                  iconName={isBookmarked ? "BookmarkCheck" : "Bookmark"}
                  onClick={onBookmark}
                >
                  <span className="sr-only">Bookmark</span>
                </Button>
              </div>
              
              <div className="flex items-center justify-between text-xs text-text-secondary">
                <div className="flex items-center gap-1">
                  <Icon name="Clock" size={12} />
                  <span>{skill.timeSpent}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="Target" size={12} />
                  <span>{skill.estimatedTime}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsExpanded(true)}
            className="w-16 h-16 flex items-center justify-center relative"
          >
            <div className="absolute inset-2 rounded-full border-2 border-surface-tertiary">
              <div 
                className="absolute inset-0 rounded-full border-2 border-primary transition-all duration-300"
                style={{ 
                  clipPath: `polygon(0 0, ${skill.progress}% 0, ${skill.progress}% 100%, 0 100%)`,
                  transform: 'rotate(-90deg)'
                }}
              ></div>
            </div>
            <Icon name="BookOpen" size={20} className="text-primary" />
          </button>
        )}
      </div>
    </div>
  );
};

export default FloatingProgressBar;