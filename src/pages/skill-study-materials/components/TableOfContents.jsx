import React from 'react';
import Icon from '../../../components/AppIcon';

const TableOfContents = ({ activeTab, onTabChange, tabs, skill }) => {
  const tocSections = {
    overview: [
      { id: 'objectives', title: 'Learning Objectives', icon: 'Target' },
      { id: 'prerequisites', title: 'Prerequisites', icon: 'BookOpen' },
      { id: 'concepts', title: 'Key Concepts', icon: 'Lightbulb' },
      { id: 'skills', title: 'Skills You\'ll Gain', icon: 'Award' }
    ],
    resources: [
      { id: 'articles', title: 'Articles', icon: 'FileText' },
      { id: 'videos', title: 'Videos', icon: 'Play' },
      { id: 'documentation', title: 'Documentation', icon: 'Book' },
      { id: 'tutorials', title: 'Tutorials', icon: 'Monitor' }
    ],
    practice: [
      { id: 'exercises', title: 'Coding Exercises', icon: 'Code' },
      { id: 'projects', title: 'Projects', icon: 'Folder' },
      { id: 'challenges', title: 'Challenges', icon: 'Zap' }
    ],
    assessment: [
      { id: 'quizzes', title: 'Knowledge Checks', icon: 'HelpCircle' },
      { id: 'tests', title: 'Assessments', icon: 'FileText' },
      { id: 'certification', title: 'Certification', icon: 'Award' }
    ]
  };

  const currentSections = tocSections[activeTab] || [];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="hidden lg:block w-64 flex-shrink-0">
      <div className="sticky top-32 bg-surface border border-border rounded-lg p-4">
        <h3 className="font-heading font-semibold text-text-primary mb-4 flex items-center gap-2">
          <Icon name="List" size={18} />
          Table of Contents
        </h3>
        
        {/* Main Tabs */}
        <div className="space-y-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-primary bg-primary-50' :'text-text-secondary hover:text-text-primary hover:bg-surface-secondary'
              }`}
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Current Tab Sections */}
        {currentSections.length > 0 && (
          <div className="border-t border-border pt-4">
            <h4 className="text-sm font-medium text-text-secondary mb-3 uppercase tracking-wide">
              {tabs.find(tab => tab.id === activeTab)?.label} Sections
            </h4>
            <div className="space-y-1">
              {currentSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-surface-secondary transition-colors"
                >
                  <Icon name={section.icon} size={14} />
                  <span>{section.title}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Progress Summary */}
        <div className="border-t border-border pt-4 mt-6">
          <h4 className="text-sm font-medium text-text-secondary mb-3 uppercase tracking-wide">
            Progress
          </h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary">Overall</span>
              <span className="font-medium text-text-primary">{skill.progress}%</span>
            </div>
            <div className="w-full bg-surface-tertiary rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
                style={{ width: `${skill.progress}%` }}
              ></div>
            </div>
            <div className="flex items-center gap-2 text-xs text-text-secondary">
              <Icon name="Clock" size={12} />
              <span>{skill.timeSpent} of {skill.estimatedTime}</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="border-t border-border pt-4 mt-6">
          <h4 className="text-sm font-medium text-text-secondary mb-3 uppercase tracking-wide">
            Quick Actions
          </h4>
          <div className="space-y-2">
            <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-surface-secondary transition-colors">
              <Icon name="Download" size={14} />
              <span>Download PDF</span>
            </button>
            <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-surface-secondary transition-colors">
              <Icon name="Share" size={14} />
              <span>Share Skill</span>
            </button>
            <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-surface-secondary transition-colors">
              <Icon name="MessageCircle" size={14} />
              <span>Get Help</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableOfContents;