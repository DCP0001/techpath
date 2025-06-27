import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const OverviewTab = ({ skill }) => {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  return (
    <div className="space-y-6">
      {/* Learning Objectives */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4 flex items-center gap-2">
          <Icon name="Target" size={20} className="text-primary" />
          Learning Objectives
        </h3>
        <ul className="space-y-3">
          {skill.objectives.map((objective, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon name="Check" size={14} className="text-primary" />
              </div>
              <span className="text-text-secondary leading-relaxed">{objective}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Prerequisites */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4 flex items-center gap-2">
          <Icon name="BookOpen" size={20} className="text-secondary" />
          Prerequisites
        </h3>
        <div className="flex flex-wrap gap-2">
          {skill.prerequisites.map((prereq, index) => (
            <span
              key={index}
              className="px-3 py-1.5 bg-secondary-50 text-secondary text-sm font-medium rounded-full border border-secondary-200"
            >
              {prereq}
            </span>
          ))}
        </div>
      </div>

      {/* Key Concepts */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4 flex items-center gap-2">
          <Icon name="Lightbulb" size={20} className="text-accent" />
          Key Concepts
        </h3>
        <div className="space-y-4">
          {skill.concepts.map((concept, index) => (
            <div key={index} className="border border-border rounded-lg">
              <button
                onClick={() => toggleSection(`concept-${index}`)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-surface-secondary transition-colors"
              >
                <div>
                  <h4 className="font-medium text-text-primary">{concept.title}</h4>
                  <p className="text-sm text-text-secondary mt-1">{concept.summary}</p>
                </div>
                <Icon 
                  name={expandedSections[`concept-${index}`] ? "ChevronUp" : "ChevronDown"} 
                  size={20} 
                  className="text-text-tertiary flex-shrink-0 ml-4"
                />
              </button>
              {expandedSections[`concept-${index}`] && (
                <div className="px-4 pb-4 border-t border-border">
                  <div className="pt-4 prose prose-sm max-w-none">
                    <p className="text-text-secondary leading-relaxed">{concept.details}</p>
                    {concept.example && (
                      <div className="mt-4 p-4 bg-surface-tertiary rounded-lg">
                        <h5 className="font-medium text-text-primary mb-2">Example:</h5>
                        <p className="text-text-secondary text-sm">{concept.example}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Skills You'll Gain */}
      <div className="bg-gradient-to-br from-primary-50 to-secondary-50 border border-primary-200 rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4 flex items-center gap-2">
          <Icon name="Award" size={20} className="text-primary" />
          Skills You'll Gain
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {skill.skillsGained.map((skillGained, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-primary-200">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="Zap" size={16} className="text-white" />
              </div>
              <span className="font-medium text-text-primary">{skillGained}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;