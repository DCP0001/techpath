import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const TemplateSelector = ({ isOpen, onClose, onTemplateSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Templates', icon: 'Grid3X3' },
    { id: 'web', name: 'Web Development', icon: 'Globe' },
    { id: 'mobile', name: 'Mobile Development', icon: 'Smartphone' },
    { id: 'data', name: 'Data Science', icon: 'BarChart3' },
    { id: 'devops', name: 'DevOps', icon: 'Server' },
    { id: 'ai', name: 'AI/ML', icon: 'Brain' }
  ];

  const templates = [
    {
      id: 'fullstack-web',
      name: 'Full Stack Web Developer',
      category: 'web',
      description: 'Complete roadmap for becoming a full-stack web developer with modern technologies',
      duration: '6-8 months',
      skills: 12,
      difficulty: 'Intermediate',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop',
      nodes: [
        { id: 'html', name: 'HTML', x: 100, y: 100, difficulty: 'Beginner', duration: '2 weeks', color: '#E34F26' },
        { id: 'css', name: 'CSS', x: 250, y: 100, difficulty: 'Beginner', duration: '3 weeks', color: '#1572B6' },
        { id: 'js', name: 'JavaScript', x: 400, y: 100, difficulty: 'Intermediate', duration: '6 weeks', color: '#F7DF1E' },
        { id: 'react', name: 'React', x: 550, y: 100, difficulty: 'Intermediate', duration: '4 weeks', color: '#61DAFB' },
        { id: 'nodejs', name: 'Node.js', x: 400, y: 250, difficulty: 'Intermediate', duration: '5 weeks', color: '#339933' }
      ],
      connections: [
        { from: 'html', to: 'css' },
        { from: 'css', to: 'js' },
        { from: 'js', to: 'react' },
        { from: 'js', to: 'nodejs' }
      ]
    },
    {
      id: 'react-developer',
      name: 'React Developer',
      category: 'web',
      description: 'Focused path for mastering React and its ecosystem',
      duration: '3-4 months',
      skills: 8,
      difficulty: 'Intermediate',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop',
      nodes: [
        { id: 'js-basics', name: 'JavaScript Fundamentals', x: 100, y: 100, difficulty: 'Beginner', duration: '4 weeks', color: '#F7DF1E' },
        { id: 'react-basics', name: 'React Basics', x: 300, y: 100, difficulty: 'Intermediate', duration: '3 weeks', color: '#61DAFB' },
        { id: 'react-hooks', name: 'React Hooks', x: 500, y: 100, difficulty: 'Intermediate', duration: '2 weeks', color: '#61DAFB' },
        { id: 'state-mgmt', name: 'State Management', x: 400, y: 250, difficulty: 'Advanced', duration: '3 weeks', color: '#764ABC' }
      ],
      connections: [
        { from: 'js-basics', to: 'react-basics' },
        { from: 'react-basics', to: 'react-hooks' },
        { from: 'react-hooks', to: 'state-mgmt' }
      ]
    },
    {
      id: 'mobile-dev',
      name: 'Mobile App Developer',
      category: 'mobile',
      description: 'Cross-platform mobile development with React Native and Flutter',
      duration: '4-5 months',
      skills: 10,
      difficulty: 'Intermediate',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=200&fit=crop',
      nodes: [
        { id: 'mobile-basics', name: 'Mobile Development Basics', x: 100, y: 100, difficulty: 'Beginner', duration: '2 weeks', color: '#FF6B6B' },
        { id: 'react-native', name: 'React Native', x: 300, y: 100, difficulty: 'Intermediate', duration: '6 weeks', color: '#61DAFB' },
        { id: 'flutter', name: 'Flutter', x: 300, y: 250, difficulty: 'Intermediate', duration: '6 weeks', color: '#02569B' }
      ],
      connections: [
        { from: 'mobile-basics', to: 'react-native' },
        { from: 'mobile-basics', to: 'flutter' }
      ]
    },
    {
      id: 'data-science',
      name: 'Data Science Fundamentals',
      category: 'data',
      description: 'Essential skills for data analysis and machine learning',
      duration: '5-6 months',
      skills: 9,
      difficulty: 'Intermediate',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop',
      nodes: [
        { id: 'python', name: 'Python', x: 100, y: 100, difficulty: 'Beginner', duration: '4 weeks', color: '#3776AB' },
        { id: 'pandas', name: 'Pandas', x: 300, y: 100, difficulty: 'Intermediate', duration: '3 weeks', color: '#150458' },
        { id: 'numpy', name: 'NumPy', x: 300, y: 200, difficulty: 'Intermediate', duration: '2 weeks', color: '#013243' },
        { id: 'ml', name: 'Machine Learning', x: 500, y: 150, difficulty: 'Advanced', duration: '8 weeks', color: '#FF6B6B' }
      ],
      connections: [
        { from: 'python', to: 'pandas' },
        { from: 'python', to: 'numpy' },
        { from: 'pandas', to: 'ml' },
        { from: 'numpy', to: 'ml' }
      ]
    },
    {
      id: 'devops-engineer',
      name: 'DevOps Engineer',
      category: 'devops',
      description: 'Infrastructure, automation, and deployment pipeline mastery',
      duration: '4-6 months',
      skills: 11,
      difficulty: 'Advanced',
      image: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=400&h=200&fit=crop',
      nodes: [
        { id: 'linux', name: 'Linux', x: 100, y: 100, difficulty: 'Intermediate', duration: '3 weeks', color: '#FCC624' },
        { id: 'docker', name: 'Docker', x: 300, y: 100, difficulty: 'Intermediate', duration: '3 weeks', color: '#2496ED' },
        { id: 'kubernetes', name: 'Kubernetes', x: 500, y: 100, difficulty: 'Advanced', duration: '4 weeks', color: '#326CE5' },
        { id: 'aws', name: 'AWS', x: 400, y: 250, difficulty: 'Advanced', duration: '6 weeks', color: '#FF9900' }
      ],
      connections: [
        { from: 'linux', to: 'docker' },
        { from: 'docker', to: 'kubernetes' },
        { from: 'kubernetes', to: 'aws' }
      ]
    },
    {
      id: 'ai-ml-engineer',
      name: 'AI/ML Engineer',
      category: 'ai',
      description: 'Advanced machine learning and artificial intelligence development',
      duration: '6-8 months',
      skills: 13,
      difficulty: 'Advanced',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop',
      nodes: [
        { id: 'python-adv', name: 'Advanced Python', x: 100, y: 100, difficulty: 'Intermediate', duration: '3 weeks', color: '#3776AB' },
        { id: 'tensorflow', name: 'TensorFlow', x: 300, y: 100, difficulty: 'Advanced', duration: '6 weeks', color: '#FF6F00' },
        { id: 'pytorch', name: 'PyTorch', x: 300, y: 200, difficulty: 'Advanced', duration: '6 weeks', color: '#EE4C2C' },
        { id: 'deep-learning', name: 'Deep Learning', x: 500, y: 150, difficulty: 'Advanced', duration: '8 weeks', color: '#4CAF50' }
      ],
      connections: [
        { from: 'python-adv', to: 'tensorflow' },
        { from: 'python-adv', to: 'pytorch' },
        { from: 'tensorflow', to: 'deep-learning' },
        { from: 'pytorch', to: 'deep-learning' }
      ]
    }
  ];

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(template => template.category === selectedCategory);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'text-success bg-success-50';
      case 'Intermediate': return 'text-warning bg-warning-50';
      case 'Advanced': return 'text-error bg-error-50';
      default: return 'text-text-secondary bg-surface-secondary';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-surface rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-text-primary">Choose a Template</h2>
            <p className="text-text-secondary text-sm mt-1">
              Start with a pre-built roadmap or create from scratch
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClose}
            className="text-text-secondary"
          />
        </div>

        {/* Categories */}
        <div className="p-6 border-b border-border">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
                  selectedCategory === category.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-surface-secondary text-text-secondary hover:bg-surface-tertiary'
                }`}
              >
                <Icon name={category.icon} size={16} />
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Create from Scratch Option */}
            <div
              onClick={() => onTemplateSelect(null)}
              className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary hover:bg-primary-50 transition-smooth"
            >
              <Icon name="Plus" size={48} className="text-text-tertiary mx-auto mb-4" />
              <h3 className="text-lg font-medium text-text-primary mb-2">
                Start from Scratch
              </h3>
              <p className="text-text-secondary text-sm">
                Create a completely custom roadmap tailored to your specific needs
              </p>
            </div>

            {/* Template Cards */}
            {filteredTemplates.map(template => (
              <div
                key={template.id}
                onClick={() => onTemplateSelect(template)}
                className="bg-surface-secondary rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-smooth border border-border hover:border-primary"
              >
                <div className="h-32 overflow-hidden">
                  <Image
                    src={template.image}
                    alt={template.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-text-primary text-sm">
                      {template.name}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(template.difficulty)}`}>
                      {template.difficulty}
                    </span>
                  </div>
                  
                  <p className="text-text-secondary text-xs mb-3 line-clamp-2">
                    {template.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-text-tertiary">
                    <span>{template.skills} skills</span>
                    <span>{template.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border">
          <div className="flex justify-end space-x-3">
            <Button
              variant="ghost"
              onClick={onClose}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector;