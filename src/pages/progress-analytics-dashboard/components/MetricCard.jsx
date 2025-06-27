import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricCard = ({ title, value, subtitle, icon, trend, trendValue, color = 'primary' }) => {
  const colorClasses = {
    primary: 'text-primary bg-primary-50',
    success: 'text-success bg-success-50',
    warning: 'text-warning bg-warning-50',
    secondary: 'text-secondary bg-secondary-50'
  };

  const getTrendIcon = () => {
    if (!trend) return null;
    return trend === 'up' ? 'TrendingUp' : trend === 'down' ? 'TrendingDown' : 'Minus';
  };

  const getTrendColor = () => {
    if (!trend) return 'text-text-tertiary';
    return trend === 'up' ? 'text-success' : trend === 'down' ? 'text-error' : 'text-text-tertiary';
  };

  return (
    <div className="bg-surface rounded-xl border border-border p-6 elevation-1 hover:elevation-2 transition-smooth">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-text-secondary truncate">
            {title}
          </p>
          <p className="text-2xl font-bold text-text-primary mt-1">
            {value}
          </p>
          {subtitle && (
            <p className="text-sm text-text-tertiary mt-1">
              {subtitle}
            </p>
          )}
        </div>
        
        {icon && (
          <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
            <Icon name={icon} size={24} />
          </div>
        )}
      </div>

      {trend && trendValue && (
        <div className="flex items-center mt-4 pt-4 border-t border-border">
          <Icon 
            name={getTrendIcon()} 
            size={16} 
            className={getTrendColor()}
          />
          <span className={`text-sm font-medium ml-1 ${getTrendColor()}`}>
            {trendValue}
          </span>
          <span className="text-sm text-text-tertiary ml-1">
            vs last period
          </span>
        </div>
      )}
    </div>
  );
};

export default MetricCard;