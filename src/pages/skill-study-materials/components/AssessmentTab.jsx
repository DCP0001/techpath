import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AssessmentTab = ({ assessments }) => {
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }));
  };

  const handleSubmitAssessment = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    if (!selectedAssessment) return 0;
    let correct = 0;
    selectedAssessment.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / selectedAssessment.questions.length) * 100);
  };

  const getAssessmentTypeIcon = (type) => {
    const iconMap = {
      'quiz': 'HelpCircle',
      'test': 'FileText',
      'practice': 'Target'
    };
    return iconMap[type] || 'HelpCircle';
  };

  const getAssessmentTypeColor = (type) => {
    const colorMap = {
      'quiz': 'text-primary bg-primary-50 border-primary-200',
      'test': 'text-secondary bg-secondary-50 border-secondary-200',
      'practice': 'text-accent bg-accent-50 border-accent-200'
    };
    return colorMap[type] || 'text-text-secondary bg-surface-secondary border-border';
  };

  return (
    <div className="space-y-6">
      {/* Assessment List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {assessments.map((assessment) => (
          <div key={assessment.id} className="bg-surface border border-border rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getAssessmentTypeColor(assessment.type)}`}>
                      {assessment.type.charAt(0).toUpperCase() + assessment.type.slice(1)}
                    </span>
                    <div className="flex items-center gap-1">
                      <Icon name="Clock" size={14} className="text-text-tertiary" />
                      <span className="text-sm text-text-tertiary">{assessment.duration}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
                    {assessment.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed mb-3">
                    {assessment.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-text-secondary">
                    <div className="flex items-center gap-1">
                      <Icon name="HelpCircle" size={14} />
                      <span>{assessment.questions.length} questions</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Users" size={14} />
                      <span>{assessment.attempts} attempts</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {assessment.bestScore && (
                    <div className="flex items-center gap-1">
                      <Icon name="Trophy" size={14} className="text-warning" />
                      <span className="text-sm font-medium text-text-primary">
                        Best: {assessment.bestScore}%
                      </span>
                    </div>
                  )}
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  iconName={getAssessmentTypeIcon(assessment.type)}
                  onClick={() => {
                    setSelectedAssessment(assessment);
                    setCurrentQuestion(0);
                    setSelectedAnswers({});
                    setShowResults(false);
                  }}
                >
                  Start {assessment.type}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Assessment Modal */}
      {selectedAssessment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-surface rounded-lg max-w-3xl w-full max-h-[90vh] overflow-hidden">
            {!showResults ? (
              <>
                {/* Assessment Header */}
                <div className="flex items-center justify-between p-6 border-b border-border">
                  <div>
                    <h2 className="text-xl font-heading font-semibold text-text-primary">
                      {selectedAssessment.title}
                    </h2>
                    <div className="flex items-center gap-4 mt-1 text-sm text-text-secondary">
                      <span>Question {currentQuestion + 1} of {selectedAssessment.questions.length}</span>
                      <div className="flex items-center gap-1">
                        <Icon name="Clock" size={14} />
                        <span>{selectedAssessment.duration}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="X"
                    onClick={() => setSelectedAssessment(null)}
                  >
                    <span className="sr-only">Close</span>
                  </Button>
                </div>

                {/* Progress Bar */}
                <div className="px-6 py-3 bg-surface-secondary">
                  <div className="w-full bg-surface-tertiary rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((currentQuestion + 1) / selectedAssessment.questions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Question Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
                        {selectedAssessment.questions[currentQuestion].question}
                      </h3>
                      
                      <div className="space-y-3">
                        {selectedAssessment.questions[currentQuestion].options.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => handleAnswerSelect(currentQuestion, index)}
                            className={`w-full text-left p-4 rounded-lg border transition-colors ${
                              selectedAnswers[currentQuestion] === index
                                ? 'border-primary bg-primary-50 text-primary' :'border-border hover:border-border-secondary hover:bg-surface-secondary'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                selectedAnswers[currentQuestion] === index
                                  ? 'border-primary bg-primary' :'border-border'
                              }`}>
                                {selectedAnswers[currentQuestion] === index && (
                                  <div className="w-2 h-2 bg-white rounded-full"></div>
                                )}
                              </div>
                              <span className="font-medium">{String.fromCharCode(65 + index)}.</span>
                              <span>{option}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between p-6 border-t border-border">
                  <Button
                    variant="ghost"
                    iconName="ChevronLeft"
                    onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                    disabled={currentQuestion === 0}
                  >
                    Previous
                  </Button>
                  
                  <div className="flex items-center gap-2">
                    {currentQuestion < selectedAssessment.questions.length - 1 ? (
                      <Button
                        variant="primary"
                        iconName="ChevronRight"
                        iconPosition="right"
                        onClick={() => setCurrentQuestion(currentQuestion + 1)}
                        disabled={selectedAnswers[currentQuestion] === undefined}
                      >
                        Next
                      </Button>
                    ) : (
                      <Button
                        variant="success"
                        iconName="CheckCircle"
                        onClick={handleSubmitAssessment}
                        disabled={Object.keys(selectedAnswers).length !== selectedAssessment.questions.length}
                      >
                        Submit
                      </Button>
                    )}
                  </div>
                </div>
              </>
            ) : (
              /* Results View */
              <div className="p-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Trophy" size={32} className="text-white" />
                  </div>
                  <h2 className="text-2xl font-heading font-bold text-text-primary mb-2">
                    Assessment Complete!
                  </h2>
                  <p className="text-text-secondary">
                    You scored {calculateScore()}% on this {selectedAssessment.type}
                  </p>
                </div>

                <div className="bg-surface-secondary rounded-lg p-6 mb-6">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">{calculateScore()}%</div>
                      <div className="text-sm text-text-secondary">Score</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-text-primary">
                        {Object.keys(selectedAnswers).filter(key => 
                          selectedAnswers[key] === selectedAssessment.questions[key].correctAnswer
                        ).length}
                      </div>
                      <div className="text-sm text-text-secondary">Correct</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-text-primary">
                        {selectedAssessment.questions.length}
                      </div>
                      <div className="text-sm text-text-secondary">Total</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    variant="primary"
                    iconName="RotateCcw"
                    onClick={() => {
                      setCurrentQuestion(0);
                      setSelectedAnswers({});
                      setShowResults(false);
                    }}
                    className="flex-1"
                  >
                    Retake
                  </Button>
                  <Button
                    variant="secondary"
                    iconName="X"
                    onClick={() => setSelectedAssessment(null)}
                    className="flex-1"
                  >
                    Close
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AssessmentTab;