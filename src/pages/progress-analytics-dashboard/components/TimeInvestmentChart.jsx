import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const TimeInvestmentChart = () => {
  const timeData = [
    { category: 'Frontend Development', hours: 45, color: '#2563EB' },
    { category: 'Backend Development', hours: 32, color: '#7C3AED' },
    { category: 'Database Management', hours: 18, color: '#059669' },
    { category: 'DevOps & Cloud', hours: 15, color: '#F59E0B' },
    { category: 'Testing & QA', hours: 12, color: '#EF4444' },
    { category: 'Mobile Development', hours: 8, color: '#8B5CF6' }
  ];

  const totalHours = timeData.reduce((sum, item) => sum + item.hours, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = ((data.hours / totalHours) * 100).toFixed(1);
      return (
        <div className="bg-surface border border-border rounded-lg p-3 elevation-2">
          <p className="text-sm font-medium text-text-primary">{data.category}</p>
          <p className="text-sm text-primary">
            {data.hours} hours ({percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }) => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-text-secondary truncate">
              {entry.value}
            </span>
            <span className="text-sm font-medium text-text-primary ml-auto">
              {timeData[index].hours}h
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-surface rounded-xl border border-border p-6 elevation-1">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Time Investment</h3>
          <p className="text-sm text-text-secondary">Hours spent by category</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-primary">{totalHours}h</p>
          <p className="text-sm text-text-secondary">Total Time</p>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={timeData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="hours"
            >
              {timeData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4 pt-4 border-t border-border">
        <div className="text-center">
          <p className="text-lg font-semibold text-text-primary">5.2h</p>
          <p className="text-xs text-text-secondary">Daily Avg</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-text-primary">36h</p>
          <p className="text-xs text-text-secondary">Weekly Avg</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-text-primary">+12%</p>
          <p className="text-xs text-text-secondary">vs Last Month</p>
        </div>
      </div>
    </div>
  );
};

export default TimeInvestmentChart;