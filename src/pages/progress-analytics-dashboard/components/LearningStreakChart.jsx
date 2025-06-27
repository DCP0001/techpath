import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const LearningStreakChart = () => {
  const streakData = [
    { date: '2024-01-01', streak: 0, studyTime: 0 },
    { date: '2024-01-02', streak: 1, studyTime: 45 },
    { date: '2024-01-03', streak: 2, studyTime: 60 },
    { date: '2024-01-04', streak: 3, studyTime: 30 },
    { date: '2024-01-05', streak: 4, studyTime: 90 },
    { date: '2024-01-06', streak: 5, studyTime: 75 },
    { date: '2024-01-07', streak: 6, studyTime: 120 },
    { date: '2024-01-08', streak: 7, studyTime: 45 },
    { date: '2024-01-09', streak: 8, studyTime: 80 },
    { date: '2024-01-10', streak: 9, studyTime: 65 },
    { date: '2024-01-11', streak: 10, studyTime: 100 },
    { date: '2024-01-12', streak: 11, studyTime: 55 },
    { date: '2024-01-13', streak: 12, studyTime: 85 },
    { date: '2024-01-14', streak: 13, studyTime: 70 },
    { date: '2024-01-15', streak: 14, studyTime: 95 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-surface border border-border rounded-lg p-3 elevation-2">
          <p className="text-sm font-medium text-text-primary">
            {new Date(label).toLocaleDateString()}
          </p>
          <p className="text-sm text-primary">
            Streak: {data.streak} days
          </p>
          <p className="text-sm text-secondary">
            Study Time: {data.studyTime} minutes
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
          <h3 className="text-lg font-semibold text-text-primary">Learning Streak</h3>
          <p className="text-sm text-text-secondary">Daily consistency tracking</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-primary">14</p>
          <p className="text-sm text-text-secondary">Current Streak</p>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={streakData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="date" 
              stroke="var(--color-text-tertiary)"
              fontSize={12}
              tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            />
            <YAxis 
              stroke="var(--color-text-tertiary)"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="streak" 
              stroke="var(--color-primary)" 
              strokeWidth={3}
              dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: 'var(--color-primary)', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4 pt-4 border-t border-border">
        <div className="text-center">
          <p className="text-lg font-semibold text-text-primary">14</p>
          <p className="text-xs text-text-secondary">Current</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-text-primary">21</p>
          <p className="text-xs text-text-secondary">Best</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-text-primary">8.5</p>
          <p className="text-xs text-text-secondary">Average</p>
        </div>
      </div>
    </div>
  );
};

export default LearningStreakChart;