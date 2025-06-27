import React from 'react';
import Icon from '../../../components/AppIcon';

const TabNavigation = ({ activeTab, onTabChange, tabs }) => {
  return (
    <div className="bg-surface border-b border-border sticky top-16 lg:top-18 z-40">
      <div className="max-w-4xl mx-auto">
        <div className="flex overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'text-primary border-primary bg-primary-50' :'text-text-secondary border-transparent hover:text-text-primary hover:border-border-secondary'
              }`}
            >
              <Icon name={tab.icon} size={18} />
              <span>{tab.label}</span>
              {tab.count && (
                <span className={`px-2 py-0.5 text-xs rounded-full ${
                  activeTab === tab.id 
                    ? 'bg-primary text-white' :'bg-surface-tertiary text-text-secondary'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TabNavigation;