import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RoadmapFilters = ({ 
  onFilterChange, 
  isCollapsed, 
  onToggleCollapse,
  selectedRoadmap,
  onRoadmapChange 
}) => {
  const [activeFilters, setActiveFilters] = useState({
    categories: [],
    difficulty: [],
    status: [],
    estimatedTime: []
  });

  const roadmaps = [
    {
      id: 'frontend-developer',
      title: 'Frontend Developer',
      description: 'Complete path to becoming a frontend developer',
      skills: 12,
      estimatedTime: '6 months',
      difficulty: 'Beginner to Advanced'
    },
    {
      id: 'fullstack-javascript',
      title: 'Full Stack JavaScript',
      description: 'Master JavaScript for both frontend and backend',
      skills: 18,
      estimatedTime: '8 months',
      difficulty: 'Intermediate to Advanced'
    },
    {
      id: 'react-developer',
      title: 'React Developer',
      description: 'Specialized React development roadmap',
      skills: 10,
      estimatedTime: '4 months',
      difficulty: 'Intermediate'
    },
    {
      id: 'backend-developer',
      title: 'Backend Developer',
      description: 'Server-side development with Node.js',
      skills: 15,
      estimatedTime: '7 months',
      difficulty: 'Intermediate to Advanced'
    }
  ];

  const filterOptions = {
    categories: [
      { id: 'frontend', label: 'Frontend', count: 8 },
      { id: 'backend', label: 'Backend', count: 6 },
      { id: 'database', label: 'Database', count: 4 },
      { id: 'devops', label: 'DevOps', count: 3 },
      { id: 'testing', label: 'Testing', count: 2 }
    ],
    difficulty: [
      { id: 'beginner', label: 'Beginner', count: 5 },
      { id: 'intermediate', label: 'Intermediate', count: 8 },
      { id: 'advanced', label: 'Advanced', count: 3 }
    ],
    status: [
      { id: 'not-started', label: 'Not Started', count: 10 },
      { id: 'in-progress', label: 'In Progress', count: 4 },
      { id: 'completed', label: 'Completed', count: 2 }
    ],
    estimatedTime: [
      { id: '1-2-weeks', label: '1-2 weeks', count: 6 },
      { id: '3-4-weeks', label: '3-4 weeks', count: 7 },
      { id: '1-2-months', label: '1-2 months', count: 3 }
    ]
  };

  const handleFilterToggle = (category, filterId) => {
    const newFilters = { ...activeFilters };
    const categoryFilters = newFilters[category];
    
    if (categoryFilters.includes(filterId)) {
      newFilters[category] = categoryFilters.filter(id => id !== filterId);
    } else {
      newFilters[category] = [...categoryFilters, filterId];
    }
    
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      categories: [],
      difficulty: [],
      status: [],
      estimatedTime: []
    };
    setActiveFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const getActiveFilterCount = () => {
    return Object.values(activeFilters).reduce((total, filters) => total + filters.length, 0);
  };

  const renderFilterSection = (title, category, options) => (
    <div className="mb-6">
      <h3 className="font-medium text-text-primary mb-3">{title}</h3>
      <div className="space-y-2">
        {options.map(option => (
          <label
            key={option.id}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <input
              type="checkbox"
              checked={activeFilters[category].includes(option.id)}
              onChange={() => handleFilterToggle(category, option.id)}
              className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
            />
            <span className="flex-1 text-sm text-text-secondary group-hover:text-text-primary transition-colors">
              {option.label}
            </span>
            <span className="text-xs text-text-tertiary bg-surface-secondary px-2 py-1 rounded-full">
              {option.count}
            </span>
          </label>
        ))}
      </div>
    </div>
  );

  if (isCollapsed) {
    return (
      <div className="lg:hidden fixed top-20 right-4 z-40">
        <Button
          variant="primary"
          size="sm"
          iconName="Filter"
          onClick={onToggleCollapse}
          className="shadow-lg"
        >
          Filters
          {getActiveFilterCount() > 0 && (
            <span className="ml-2 bg-white text-primary text-xs px-2 py-1 rounded-full">
              {getActiveFilterCount()}
            </span>
          )}
        </Button>
      </div>
    );
  }

  return (
    <div className={`bg-surface border-r border-border h-full overflow-y-auto ${
      isCollapsed ? 'hidden' : 'block'
    }`}>
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-text-primary">Filters</h2>
        <Button
          variant="ghost"
          size="sm"
          iconName="X"
          onClick={onToggleCollapse}
        />
      </div>

      <div className="p-6">
        {/* Roadmap Selection */}
        <div className="mb-6">
          <h3 className="font-medium text-text-primary mb-3">Select Roadmap</h3>
          <div className="space-y-2">
            {roadmaps.map(roadmap => (
              <div
                key={roadmap.id}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  selectedRoadmap === roadmap.id
                    ? 'border-primary bg-primary-50' :'border-border hover:border-primary-200 bg-surface'
                }`}
                onClick={() => onRoadmapChange(roadmap.id)}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-text-primary text-sm">
                    {roadmap.title}
                  </h4>
                  {selectedRoadmap === roadmap.id && (
                    <Icon name="Check" size={16} className="text-primary" />
                  )}
                </div>
                <p className="text-xs text-text-secondary mb-2">
                  {roadmap.description}
                </p>
                <div className="flex items-center justify-between text-xs text-text-tertiary">
                  <span>{roadmap.skills} skills</span>
                  <span>{roadmap.estimatedTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-medium text-text-primary">Filters</h3>
          {getActiveFilterCount() > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-text-secondary hover:text-text-primary"
            >
              Clear All
            </Button>
          )}
        </div>

        {/* Filter Sections */}
        {renderFilterSection('Category', 'categories', filterOptions.categories)}
        {renderFilterSection('Difficulty', 'difficulty', filterOptions.difficulty)}
        {renderFilterSection('Status', 'status', filterOptions.status)}
        {renderFilterSection('Estimated Time', 'estimatedTime', filterOptions.estimatedTime)}

        {/* Quick Actions */}
        <div className="mt-8 pt-6 border-t border-border">
          <h3 className="font-medium text-text-primary mb-3">Quick Actions</h3>
          <div className="space-y-2">
            <Button
              variant="ghost"
              size="sm"
              iconName="BookmarkCheck"
              className="w-full justify-start"
            >
              View Bookmarked
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="TrendingUp"
              className="w-full justify-start"
            >
              In Progress Skills
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="CheckCircle2"
              className="w-full justify-start"
            >
              Completed Skills
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapFilters;