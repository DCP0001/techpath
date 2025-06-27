import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ResourcesTab = ({ resources }) => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const resourceTypes = [
    { id: 'all', label: 'All Resources', icon: 'Grid3X3' },
    { id: 'article', label: 'Articles', icon: 'FileText' },
    { id: 'video', label: 'Videos', icon: 'Play' },
    { id: 'documentation', label: 'Documentation', icon: 'Book' },
    { id: 'tutorial', label: 'Tutorials', icon: 'Monitor' },
  ];

  const filteredResources = resources.filter(resource => {
    const matchesFilter = filter === 'all' || resource.type === filter;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getResourceIcon = (type) => {
    const iconMap = {
      article: 'FileText',
      video: 'Play',
      documentation: 'Book',
      tutorial: 'Monitor',
      course: 'GraduationCap'
    };
    return iconMap[type] || 'Link';
  };

  const getResourceColor = (type) => {
    const colorMap = {
      article: 'text-blue-600',
      video: 'text-red-600',
      documentation: 'text-green-600',
      tutorial: 'text-purple-600',
      course: 'text-orange-600'
    };
    return colorMap[type] || 'text-gray-600';
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="bg-surface border border-border rounded-lg p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-tertiary" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {resourceTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setFilter(type.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  filter === type.id
                    ? 'bg-primary text-white' :'bg-surface-secondary text-text-secondary hover:text-text-primary hover:bg-surface-tertiary'
                }`}
              >
                <Icon name={type.icon} size={16} />
                <span>{type.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredResources.map((resource) => (
          <div key={resource.id} className="bg-surface border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
            {resource.thumbnail && (
              <div className="aspect-video overflow-hidden">
                <Image
                  src={resource.thumbnail}
                  alt={resource.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Icon 
                    name={getResourceIcon(resource.type)} 
                    size={18} 
                    className={getResourceColor(resource.type)}
                  />
                  <span className={`text-sm font-medium capitalize ${getResourceColor(resource.type)}`}>
                    {resource.type}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="Clock" size={14} className="text-text-tertiary" />
                  <span className="text-sm text-text-tertiary">{resource.duration}</span>
                </div>
              </div>
              
              <h3 className="text-lg font-heading font-semibold text-text-primary mb-2 line-clamp-2">
                {resource.title}
              </h3>
              
              <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-3">
                {resource.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Icon name="Star" size={14} className="text-warning fill-current" />
                    <span className="text-sm font-medium text-text-primary">{resource.rating}</span>
                  </div>
                  <span className="text-text-tertiary">•</span>
                  <span className="text-sm text-text-secondary">{resource.author}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Bookmark"
                    onClick={() => {}}
                  >
                    <span className="sr-only">Bookmark</span>
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    iconName="ExternalLink"
                    onClick={() => window.open(resource.url, '_blank')}
                  >
                    View
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Search" size={48} className="text-text-tertiary mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">No resources found</h3>
          <p className="text-text-secondary">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default ResourcesTab;