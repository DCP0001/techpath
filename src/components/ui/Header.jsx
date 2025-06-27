import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: 'Dashboard', path: '/learning-dashboard', icon: 'Home' },
    { name: 'Roadmaps', path: '/interactive-roadmap-viewer', icon: 'Map' },
    { name: 'Study', path: '/skill-study-materials', icon: 'BookOpen' },
    { name: 'Analytics', path: '/progress-analytics-dashboard', icon: 'BarChart3' },
    { name: 'Create', path: '/roadmap-creation-studio', icon: 'Plus' },
  ];

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-100 bg-surface border-b border-border elevation-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              to="/learning-dashboard" 
              className="flex items-center space-x-2 group transition-smooth hover:opacity-80"
              onClick={closeMobileMenu}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  className="text-white"
                >
                  <path 
                    d="M12 2L2 7L12 12L22 7L12 2Z" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                  <path 
                    d="M2 17L12 22L22 17" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                  <path 
                    d="M2 12L12 17L22 12" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-xl font-heading font-semibold text-text-primary">
                TechPath
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-smooth hover:bg-surface-secondary ${
                  isActivePath(item.path)
                    ? 'text-primary bg-primary-50' :'text-text-secondary hover:text-text-primary'
                }`}
              >
                <Icon name={item.icon} size={18} />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Desktop User Menu */}
          <div className="hidden lg:flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              iconName="Bell"
              className="relative"
              onClick={() => {}}
            >
              <span className="sr-only">Notifications</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="User"
              onClick={() => {}}
            >
              Profile
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              iconName={isMobileMenuOpen ? 'X' : 'Menu'}
              onClick={toggleMobileMenu}
              className="text-text-secondary hover:text-text-primary"
            >
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-surface border-t border-border elevation-2 animate-slide-up">
          <div className="px-4 py-3 space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeMobileMenu}
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-base font-medium transition-smooth ${
                  isActivePath(item.path)
                    ? 'text-primary bg-primary-50' :'text-text-secondary hover:text-text-primary hover:bg-surface-secondary'
                }`}
              >
                <Icon name={item.icon} size={20} />
                <span>{item.name}</span>
              </Link>
            ))}
            
            {/* Mobile User Actions */}
            <div className="pt-3 mt-3 border-t border-border space-y-1">
              <button
                onClick={closeMobileMenu}
                className="flex items-center space-x-3 px-3 py-3 rounded-lg text-base font-medium text-text-secondary hover:text-text-primary hover:bg-surface-secondary transition-smooth w-full"
              >
                <Icon name="Bell" size={20} />
                <span>Notifications</span>
              </button>
              <button
                onClick={closeMobileMenu}
                className="flex items-center space-x-3 px-3 py-3 rounded-lg text-base font-medium text-text-secondary hover:text-text-primary hover:bg-surface-secondary transition-smooth w-full"
              >
                <Icon name="User" size={20} />
                <span>Profile</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;