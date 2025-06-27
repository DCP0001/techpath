import React from 'react';
import Button from '../../../components/ui/Button';

const MobileToolbar = ({ 
  onUndo, 
  onRedo, 
  canUndo, 
  canRedo, 
  onToggleLibrary, 
  isLibraryOpen,
  onTemplateSelect 
}) => {
  return (
    <div className="lg:hidden fixed bottom-20 left-4 right-4 z-40">
      <div className="bg-surface border border-border rounded-lg shadow-lg p-3">
        <div className="flex items-center justify-between">
          {/* Undo/Redo */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              iconName="Undo"
              onClick={onUndo}
              disabled={!canUndo}
              className="text-text-secondary"
            />
            <Button
              variant="ghost"
              size="sm"
              iconName="Redo"
              onClick={onRedo}
              disabled={!canRedo}
              className="text-text-secondary"
            />
          </div>

          {/* Center Actions */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              iconName="Layout"
              onClick={() => onTemplateSelect()}
              className="text-text-secondary"
            />
          </div>

          {/* Library Toggle */}
          <Button
            variant={isLibraryOpen ? "primary" : "ghost"}
            size="sm"
            iconName="Library"
            onClick={onToggleLibrary}
            className={isLibraryOpen ? "" : "text-text-secondary"}
          />
        </div>
      </div>
    </div>
  );
};

export default MobileToolbar;