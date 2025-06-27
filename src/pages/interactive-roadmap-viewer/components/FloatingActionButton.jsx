import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FloatingActionButton = ({ 
  onShowDetails, 
  onToggleView, 
  viewMode = 'interactive',
  selectedNode,
  hasSelectedNode = false 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleAction = (action) => {
    action();
    setIsExpanded(false);
  };

  const actions = [
    {
      id: 'details',
      label: 'View Details',
      icon: 'Info',
      action: onShowDetails,
      disabled: !hasSelectedNode,
      variant: 'primary'
    },
    {
      id: 'view',
      label: viewMode === 'interactive' ? 'Linear View' : 'Interactive View',
      icon: viewMode === 'interactive' ? 'List' : 'Network',
      action: onToggleView,
      disabled: false,
      variant: 'secondary'
    },
    {
      id: 'bookmark',
      label: 'Bookmark',
      icon: 'Bookmark',
      action: () => console.log('Bookmark action'),
      disabled: !hasSelectedNode,
      variant: 'ghost'
    },
    {
      id: 'share',
      label: 'Share Progress',
      icon: 'Share2',
      action: () => console.log('Share action'),
      disabled: false,
      variant: 'ghost'
    }
  ];

  return (
    <div className="lg:hidden fixed bottom-20 right-4 z-40">
      {/* Expanded Actions */}
      {isExpanded && (
        <div className="mb-4 space-y-2">
          {actions.map(action => (
            <div
              key={action.id}
              className="flex items-center justify-end"
            >
              <div className="bg-text-primary text-white px-3 py-1 rounded-lg text-sm mr-3 shadow-lg">
                {action.label}
              </div>
              <Button
                variant={action.variant}
                size="md"
                iconName={action.icon}
                onClick={() => handleAction(action.action)}
                disabled={action.disabled}
                className="w-12 h-12 rounded-full shadow-lg"
              />
            </div>
          ))}
        </div>
      )}

      {/* Main FAB */}
      <Button
        variant="primary"
        size="lg"
        iconName={isExpanded ? 'X' : 'Menu'}
        onClick={toggleExpanded}
        className="w-14 h-14 rounded-full shadow-lg"
      />

      {/* Selected Node Indicator */}
      {hasSelectedNode && !isExpanded && (
        <div className="absolute -top-2 -left-2 w-6 h-6 bg-success rounded-full border-2 border-surface flex items-center justify-center">
          <Icon name="Check" size={12} className="text-white" />
        </div>
      )}
    </div>
  );
};

export default FloatingActionButton;