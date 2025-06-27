import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SkillProgressChart = () => {
  const skillData = [
    { skill: 'React', completed: 85, total: 100, category: 'Frontend' },
    { skill: 'Node.js', completed: 72, total: 100, category: 'Backend' },
    { skill: 'TypeScript', completed: 68, total: 100, category: 'Language' },
    { skill: 'MongoDB', completed: 55, total: 100, category: 'Database' },
    { skill: 'Docker', completed: 45, total: 100, category: 'DevOps' },
    { skill: 'AWS', completed: 38, total: 100, category: 'Cloud' },
    { skill: 'GraphQL', completed: 32, total: 100, category: 'API' },
    { skill: 'Jest', completed: 28, total: 100, category: 'Testing' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-surface border border-border rounded-lg p-3 elevation-2">
          <p className="text-sm font-medium text-text-primary">{label}</p>
          <p className="text-sm text-primary">
            Progress: {data.completed}%
          </p>
          <p className="text-sm text-text-secondary">
            Category: {data.category}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-surface rounded-xl border border-border p-6 elevation-1">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Skills Progress</h3>
          <p className="text-sm text-text-secondary">Completion percentage by skill</p>
        </div>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={skillData} 
            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            layout="horizontal"
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              type="number"
              domain={[0, 100]}
              stroke="var(--color-text-tertiary)"
              fontSize={12}
            />
            <YAxis 
              type="category"
              dataKey="skill"
              stroke="var(--color-text-tertiary)"
              fontSize={12}
              width={80}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="completed" 
              fill="var(--color-primary)"
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-border">
        <div className="text-center">
          <p className="text-lg font-semibold text-success">3</p>
          <p className="text-xs text-text-secondary">Completed</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-warning">4</p>
          <p className="text-xs text-text-secondary">In Progress</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-text-secondary">1</p>
          <p className="text-xs text-text-secondary">Not Started</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-primary">62%</p>
          <p className="text-xs text-text-secondary">Avg Progress</p>
        </div>
      </div>
    </div>
  );
};

export default SkillProgressChart;