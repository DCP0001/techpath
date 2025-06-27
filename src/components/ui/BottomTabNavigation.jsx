import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const BottomTabNavigation = () => {
  const location = useLocation();

  const tabItems = [
    { name: 'Dashboard', path: '/learning-dashboard', icon: 'Home' },
    { name: 'Roadmaps', path: '/interactive-roadmap-viewer', icon: 'Map' },
    { name: 'Profile', path: '/user-registration-login', icon: 'User' },
  ];

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-90 bg-surface border-t border-border elevation-2">
      <div className="flex items-center justify-around px-4 py-2 pb-safe">
        {tabItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-1 transition-smooth ${
              isActivePath(item.path)
                ? 'text-primary' :'text-text-secondary hover:text-text-primary'
            }`}
          >
            <div className={`p-1 rounded-lg transition-smooth ${
              isActivePath(item.path) ? 'bg-primary-50' : ''
            }`}>
              <Icon 
                name={item.icon} 
                size={24} 
                className={isActivePath(item.path) ? 'text-primary' : 'text-current'}
              />
            </div>
            <span className={`text-xs font-medium mt-1 truncate ${
              isActivePath(item.path) ? 'text-primary' : 'text-current'
            }`}>
              {item.name}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default BottomTabNavigation;