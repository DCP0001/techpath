import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PracticeTab = ({ exercises }) => {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [copiedCode, setCopiedCode] = useState('');

  const copyToClipboard = async (code, exerciseId) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(exerciseId);
      setTimeout(() => setCopiedCode(''), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const getDifficultyColor = (difficulty) => {
    const colorMap = {
      'Easy': 'text-success bg-success-50 border-success-200',
      'Medium': 'text-warning bg-warning-50 border-warning-200',
      'Hard': 'text-error bg-error-50 border-error-200'
    };
    return colorMap[difficulty] || 'text-text-secondary bg-surface-secondary border-border';
  };

  return (
    <div className="space-y-6">
      {/* Exercise List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {exercises.map((exercise) => (
          <div key={exercise.id} className="bg-surface border border-border rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getDifficultyColor(exercise.difficulty)}`}>
                      {exercise.difficulty}
                    </span>
                    <div className="flex items-center gap-1">
                      <Icon name="Clock" size={14} className="text-text-tertiary" />
                      <span className="text-sm text-text-tertiary">{exercise.estimatedTime}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
                    {exercise.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {exercise.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Icon name="Users" size={14} className="text-text-tertiary" />
                    <span className="text-sm text-text-secondary">{exercise.completions} completed</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="Star" size={14} className="text-warning fill-current" />
                    <span className="text-sm text-text-secondary">{exercise.rating}</span>
                  </div>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  iconName="Code"
                  onClick={() => setSelectedExercise(exercise)}
                >
                  Start
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Exercise Modal/Detail View */}
      {selectedExercise && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-surface rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div>
                <h2 className="text-xl font-heading font-semibold text-text-primary">
                  {selectedExercise.title}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getDifficultyColor(selectedExercise.difficulty)}`}>
                    {selectedExercise.difficulty}
                  </span>
                  <span className="text-sm text-text-secondary">{selectedExercise.estimatedTime}</span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                onClick={() => setSelectedExercise(null)}
              >
                <span className="sr-only">Close</span>
              </Button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="space-y-6">
                {/* Problem Statement */}
                <div>
                  <h3 className="text-lg font-heading font-semibold text-text-primary mb-3">
                    Problem Statement
                  </h3>
                  <div className="prose prose-sm max-w-none">
                    <p className="text-text-secondary leading-relaxed">
                      {selectedExercise.problemStatement}
                    </p>
                  </div>
                </div>

                {/* Requirements */}
                <div>
                  <h3 className="text-lg font-heading font-semibold text-text-primary mb-3">
                    Requirements
                  </h3>
                  <ul className="space-y-2">
                    {selectedExercise.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Icon name="CheckCircle" size={16} className="text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-text-secondary text-sm">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Starter Code */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-heading font-semibold text-text-primary">
                      Starter Code
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName={copiedCode === selectedExercise.id ? "Check" : "Copy"}
                      onClick={() => copyToClipboard(selectedExercise.starterCode, selectedExercise.id)}
                    >
                      {copiedCode === selectedExercise.id ? "Copied!" : "Copy"}
                    </Button>
                  </div>
                  <div className="bg-gray-900 rounded-lg overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
                      <span className="text-sm text-gray-300">{selectedExercise.language}</span>
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                    </div>
                    <pre className="p-4 text-sm text-gray-100 overflow-x-auto">
                      <code>{selectedExercise.starterCode}</code>
                    </pre>
                  </div>
                </div>

                {/* Hints */}
                {selectedExercise.hints && (
                  <div>
                    <h3 className="text-lg font-heading font-semibold text-text-primary mb-3">
                      Hints
                    </h3>
                    <div className="space-y-3">
                      {selectedExercise.hints.map((hint, index) => (
                        <div key={index} className="bg-accent-50 border border-accent-200 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <Icon name="Lightbulb" size={16} className="text-accent flex-shrink-0 mt-0.5" />
                            <p className="text-text-secondary text-sm">{hint}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <Button
                    variant="primary"
                    iconName="Play"
                    onClick={() => {}}
                    className="flex-1 sm:flex-none"
                  >
                    Run Code
                  </Button>
                  <Button
                    variant="secondary"
                    iconName="CheckCircle"
                    onClick={() => {}}
                    className="flex-1 sm:flex-none"
                  >
                    Submit
                  </Button>
                  <Button
                    variant="ghost"
                    iconName="RotateCcw"
                    onClick={() => {}}
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PracticeTab;