import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SocialShareModal = ({ isOpen, onClose, achievement }) => {
  if (!isOpen) return null;

  const shareOptions = [
    {
      platform: 'LinkedIn',
      icon: 'Linkedin',
      color: 'text-blue-600',
      action: () => {
        const text = `🎉 Just achieved: ${achievement?.title || 'New milestone'} on TechPath! #TechLearning #SkillDevelopment`;
        const url = `https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin)}&summary=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
      }
    },
    {
      platform: 'Twitter',
      icon: 'Twitter',
      color: 'text-blue-400',
      action: () => {
        const text = `🎉 Just achieved: ${achievement?.title || 'New milestone'} on TechPath! #TechLearning #SkillDevelopment`;
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.origin)}`;
        window.open(url, '_blank');
      }
    },
    {
      platform: 'Facebook',
      icon: 'Facebook',
      color: 'text-blue-700',
      action: () => {
        const url = `https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin)}`;
        window.open(url, '_blank');
      }
    },
    {
      platform: 'Copy Link',
      icon: 'Link',
      color: 'text-text-primary',
      action: () => {
        navigator.clipboard.writeText(window.location.origin);
        // You could add a toast notification here
        alert('Link copied to clipboard!');
      }
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-surface rounded-xl border border-border p-6 w-full max-w-md elevation-3">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-text-primary">Share Achievement</h3>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary"
          />
        </div>

        {achievement && (
          <div className="mb-6 p-4 bg-surface-secondary rounded-lg border border-border">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-success-50 text-success rounded-lg">
                <Icon name="Award" size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-text-primary">{achievement.title}</h4>
                <p className="text-sm text-text-secondary">{achievement.description}</p>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <p className="text-sm text-text-secondary mb-4">
            Share your achievement with your network
          </p>
          
          {shareOptions.map((option) => (
            <button
              key={option.platform}
              onClick={option.action}
              className="w-full flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-surface-secondary transition-smooth"
            >
              <Icon name={option.icon} size={20} className={option.color} />
              <span className="text-sm font-medium text-text-primary">
                Share on {option.platform}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-border">
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SocialShareModal;