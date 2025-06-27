import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = ({ customItems = null }) => {
  const location = useLocation();

  const routeMap = {
    '/learning-dashboard': { name: 'Dashboard', icon: 'Home' },
    '/interactive-roadmap-viewer': { name: 'Roadmaps', icon: 'Map' },
    '/skill-study-materials': { name: 'Study Materials', icon: 'BookOpen' },
    '/progress-analytics-dashboard': { name: 'Analytics', icon: 'BarChart3' },
    '/roadmap-creation-studio': { name: 'Create Roadmap', icon: 'Plus' },
    '/user-registration-login': { name: 'Account', icon: 'User' },
  };

  const generateBreadcrumbs = () => {
    if (customItems) {
      return customItems;
    }

    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [];

    // Always start with Dashboard as home
    if (location.pathname !== '/learning-dashboard') {
      breadcrumbs.push({
        name: 'Dashboard',
        path: '/learning-dashboard',
        icon: 'Home'
      });
    }

    // Add current page
    const currentRoute = routeMap[location.pathname];
    if (currentRoute && location.pathname !== '/learning-dashboard') {
      breadcrumbs.push({
        name: currentRoute.name,
        path: location.pathname,
        icon: currentRoute.icon,
        current: true
      });
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length <= 1 && location.pathname === '/learning-dashboard') {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm font-medium text-text-secondary mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs.map((item, index) => (
          <li key={item.path || index} className="flex items-center">
            {index > 0 && (
              <Icon 
                name="ChevronRight" 
                size={16} 
                className="text-text-tertiary mx-2" 
              />
            )}
            
            {item.current ? (
              <span className="flex items-center space-x-1 text-text-primary font-medium">
                <Icon name={item.icon} size={16} />
                <span className="hidden sm:inline">{item.name}</span>
                <span className="sm:hidden truncate max-w-32">{item.name}</span>
              </span>
            ) : (
              <Link
                to={item.path}
                className="flex items-center space-x-1 hover:text-text-primary transition-smooth"
              >
                <Icon name={item.icon} size={16} />
                <span className="hidden sm:inline">{item.name}</span>
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;