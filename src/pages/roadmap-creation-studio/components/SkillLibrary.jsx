import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SkillLibrary = ({ isOpen, onToggle, onDragStart }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Skills", count: 156 },
    { id: "frontend", name: "Frontend", count: 45 },
    { id: "backend", name: "Backend", count: 38 },
    { id: "database", name: "Database", count: 22 },
    { id: "devops", name: "DevOps", count: 28 },
    { id: "mobile", name: "Mobile", count: 23 }
  ];

  const skills = [
    {
      id: "html",
      name: "HTML",
      category: "frontend",
      difficulty: "Beginner",
      duration: "2 weeks",
      description: "Markup language for creating web pages",
      color: "#E34F26"
    },
    {
      id: "css",
      name: "CSS",
      category: "frontend",
      difficulty: "Beginner",
      duration: "3 weeks",
      description: "Styling language for web pages",
      color: "#1572B6"
    },
    {
      id: "javascript",
      name: "JavaScript",
      category: "frontend",
      difficulty: "Intermediate",
      duration: "6 weeks",
      description: "Programming language for web development",
      color: "#F7DF1E"
    },
    {
      id: "react",
      name: "React",
      category: "frontend",
      difficulty: "Intermediate",
      duration: "4 weeks",
      description: "JavaScript library for building user interfaces",
      color: "#61DAFB"
    },
    {
      id: "nodejs",
      name: "Node.js",
      category: "backend",
      difficulty: "Intermediate",
      duration: "5 weeks",
      description: "JavaScript runtime for server-side development",
      color: "#339933"
    },
    {
      id: "python",
      name: "Python",
      category: "backend",
      difficulty: "Beginner",
      duration: "4 weeks",
      description: "High-level programming language",
      color: "#3776AB"
    },
    {
      id: "mongodb",
      name: "MongoDB",
      category: "database",
      difficulty: "Intermediate",
      duration: "3 weeks",
      description: "NoSQL document database",
      color: "#47A248"
    },
    {
      id: "docker",
      name: "Docker",
      category: "devops",
      difficulty: "Intermediate",
      duration: "3 weeks",
      description: "Containerization platform",
      color: "#2496ED"
    }
  ];

  const filteredSkills = skills.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         skill.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || skill.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDragStart = (e, skill) => {
    e.dataTransfer.setData('application/json', JSON.stringify(skill));
    onDragStart(skill);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner": return "text-success bg-success-50";
      case "Intermediate": return "text-warning bg-warning-50";
      case "Advanced": return "text-error bg-error-50";
      default: return "text-text-secondary bg-surface-secondary";
    }
  };

  return (
    <>
      {/* Mobile Bottom Sheet */}
      <div className={`lg:hidden fixed inset-x-0 bottom-0 z-50 bg-surface border-t border-border transition-transform duration-300 ${
        isOpen ? 'translate-y-0' : 'translate-y-full'
      }`}>
        <div className="h-96 flex flex-col">
          {/* Handle */}
          <div className="flex justify-center py-2">
            <div className="w-12 h-1 bg-border rounded-full" />
          </div>
          
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-border">
            <h3 className="text-lg font-semibold text-text-primary">Skill Library</h3>
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={onToggle}
              className="text-text-secondary"
            />
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden">
            <SkillLibraryContent
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              categories={categories}
              filteredSkills={filteredSkills}
              handleDragStart={handleDragStart}
              getDifficultyColor={getDifficultyColor}
            />
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className={`hidden lg:block fixed right-0 top-16 bottom-0 w-80 bg-surface border-l border-border transition-transform duration-300 z-40 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <h3 className="text-lg font-semibold text-text-primary">Skill Library</h3>
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={onToggle}
              className="text-text-secondary"
            />
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden">
            <SkillLibraryContent
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              categories={categories}
              filteredSkills={filteredSkills}
              handleDragStart={handleDragStart}
              getDifficultyColor={getDifficultyColor}
            />
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={onToggle}
        />
      )}
    </>
  );
};

const SkillLibraryContent = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  categories,
  filteredSkills,
  handleDragStart,
  getDifficultyColor
}) => {
  return (
    <div className="h-full flex flex-col">
      {/* Search */}
      <div className="p-4 border-b border-border">
        <Input
          type="search"
          placeholder="Search skills..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>

      {/* Categories */}
      <div className="p-4 border-b border-border">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-smooth ${
                selectedCategory === category.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-surface-secondary text-text-secondary hover:bg-surface-tertiary'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>
      </div>

      {/* Skills List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredSkills.map(skill => (
          <div
            key={skill.id}
            draggable
            onDragStart={(e) => handleDragStart(e, skill)}
            className="bg-surface-secondary rounded-lg p-3 cursor-move hover:bg-surface-tertiary transition-smooth border border-border"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: skill.color }}
                />
                <h4 className="font-medium text-text-primary">{skill.name}</h4>
              </div>
              <Icon name="GripVertical" size={16} className="text-text-tertiary" />
            </div>
            
            <p className="text-sm text-text-secondary mb-2">{skill.description}</p>
            
            <div className="flex items-center justify-between text-xs">
              <span className={`px-2 py-1 rounded-full font-medium ${getDifficultyColor(skill.difficulty)}`}>
                {skill.difficulty}
              </span>
              <span className="text-text-tertiary">{skill.duration}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillLibrary;