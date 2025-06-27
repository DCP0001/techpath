import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const NodePropertiesPanel = ({ selectedNode, onNodeUpdate, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    difficulty: 'Beginner',
    duration: '',
    prerequisites: '',
    resources: ''
  });

  useEffect(() => {
    if (selectedNode) {
      setFormData({
        name: selectedNode.name || '',
        description: selectedNode.description || '',
        difficulty: selectedNode.difficulty || 'Beginner',
        duration: selectedNode.duration || '',
        prerequisites: selectedNode.prerequisites || '',
        resources: selectedNode.resources || ''
      });
    }
  }, [selectedNode]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    if (selectedNode) {
      onNodeUpdate(selectedNode.id, formData);
    }
  };

  const difficultyOptions = [
    { value: 'Beginner', label: 'Beginner', color: 'text-success' },
    { value: 'Intermediate', label: 'Intermediate', color: 'text-warning' },
    { value: 'Advanced', label: 'Advanced', color: 'text-error' }
  ];

  const durationOptions = [
    '1 week', '2 weeks', '3 weeks', '1 month', '2 months', '3 months', '6 months'
  ];

  if (!selectedNode) {
    return (
      <div className="w-80 bg-surface border-l border-border p-6 flex items-center justify-center">
        <div className="text-center">
          <Icon name="MousePointer" size={48} className="text-text-tertiary mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">
            Select a Node
          </h3>
          <p className="text-text-secondary text-sm">
            Click on a skill node to edit its properties and customize the learning experience.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-surface border-l border-border flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-text-primary">Node Properties</h3>
        <Button
          variant="ghost"
          size="sm"
          iconName="X"
          onClick={onClose}
          className="text-text-secondary"
        />
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Basic Info */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-text-primary">Basic Information</h4>
          
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              Skill Name
            </label>
            <Input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter skill name"
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe what this skill covers..."
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary placeholder-text-tertiary resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        {/* Learning Details */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-text-primary">Learning Details</h4>
          
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              Difficulty Level
            </label>
            <select
              value={formData.difficulty}
              onChange={(e) => handleInputChange('difficulty', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {difficultyOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              Estimated Duration
            </label>
            <select
              value={formData.duration}
              onChange={(e) => handleInputChange('duration', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Select duration</option>
              {durationOptions.map(duration => (
                <option key={duration} value={duration}>
                  {duration}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Prerequisites */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-text-primary">Prerequisites</h4>
          
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              Required Skills
            </label>
            <textarea
              value={formData.prerequisites}
              onChange={(e) => handleInputChange('prerequisites', e.target.value)}
              placeholder="List prerequisite skills (one per line)"
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary placeholder-text-tertiary resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        {/* Resources */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-text-primary">Learning Resources</h4>
          
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              Recommended Resources
            </label>
            <textarea
              value={formData.resources}
              onChange={(e) => handleInputChange('resources', e.target.value)}
              placeholder="Add links to tutorials, documentation, courses..."
              rows={4}
              className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary placeholder-text-tertiary resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        {/* Node Appearance */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-text-primary">Appearance</h4>
          
          <div className="grid grid-cols-6 gap-2">
            {[
              '#E34F26', '#1572B6', '#F7DF1E', '#61DAFB', '#339933', '#3776AB',
              '#47A248', '#2496ED', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'
            ].map(color => (
              <button
                key={color}
                onClick={() => onNodeUpdate(selectedNode.id, { color })}
                className={`w-8 h-8 rounded-lg border-2 transition-smooth ${
                  selectedNode.color === color ? 'border-text-primary' : 'border-border'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 border-t border-border">
        <div className="flex space-x-2">
          <Button
            variant="primary"
            size="sm"
            onClick={handleSave}
            className="flex-1"
          >
            Save Changes
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NodePropertiesPanel;