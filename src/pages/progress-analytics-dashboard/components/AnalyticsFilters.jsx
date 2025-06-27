import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AnalyticsFilters = ({ onFiltersChange, isCollapsed, onToggleCollapse }) => {
  const [filters, setFilters] = useState({
    dateRange: '30days',
    skillCategory: 'all',
    roadmapId: 'all'
  });

  const dateRangeOptions = [
    { value: '7days', label: 'Last 7 Days' },
    { value: '30days', label: 'Last 30 Days' },
    { value: '90days', label: 'Last 3 Months' },
    { value: '1year', label: 'Last Year' },
    { value: 'all', label: 'All Time' }
  ];

  const skillCategories = [
    { value: 'all', label: 'All Categories' },
    { value: 'frontend', label: 'Frontend Development' },
    { value: 'backend', label: 'Backend Development' },
    { value: 'mobile', label: 'Mobile Development' },
    { value: 'devops', label: 'DevOps & Cloud' },
    { value: 'data', label: 'Data Science' },
    { value: 'ai', label: 'AI & Machine Learning' }
  ];

  const roadmapOptions = [
    { value: 'all', label: 'All Roadmaps' },
    { value: 'react-dev', label: 'React Developer' },
    { value: 'fullstack', label: 'Full Stack Developer' },
    { value: 'mobile-dev', label: 'Mobile Developer' },
    { value: 'devops-eng', label: 'DevOps Engineer' },
    { value: 'data-scientist', label: 'Data Scientist' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  return (
    <div className="bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-3">
            <Icon name="Filter" size={20} className="text-text-secondary" />
            <h2 className="text-lg font-semibold text-text-primary">Analytics Filters</h2>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            iconName={isCollapsed ? "ChevronDown" : "ChevronUp"}
            onClick={onToggleCollapse}
            className="lg:hidden"
          >
            {isCollapsed ? 'Show' : 'Hide'}
          </Button>
        </div>

        {!isCollapsed && (
          <div className="pb-4 space-y-4 lg:space-y-0 lg:flex lg:items-center lg:space-x-6">
            {/* Date Range Filter */}
            <div className="flex-1 min-w-0">
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Time Period
              </label>
              <select
                value={filters.dateRange}
                onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {dateRangeOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Skill Category Filter */}
            <div className="flex-1 min-w-0">
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Skill Category
              </label>
              <select
                value={filters.skillCategory}
                onChange={(e) => handleFilterChange('skillCategory', e.target.value)}
                className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {skillCategories.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Roadmap Filter */}
            <div className="flex-1 min-w-0">
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Roadmap
              </label>
              <select
                value={filters.roadmapId}
                onChange={(e) => handleFilterChange('roadmapId', e.target.value)}
                className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {roadmapOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Export Button */}
            <div className="flex-shrink-0 pt-6 lg:pt-0">
              <Button
                variant="outline"
                size="sm"
                iconName="Download"
                onClick={() => {}}
                className="w-full lg:w-auto"
              >
                Export Report
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsFilters;