import React from 'react';
import Button from '../../../components/ui/Button';


const CreationHeader = ({ 
  roadmapTitle, 
  onSave, 
  onPublish, 
  onUndo, 
  onRedo, 
  canUndo, 
  canRedo, 
  isSaving, 
  onTitleChange 
}) => {
  return (
    <div className="bg-surface border-b border-border px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Title Section */}
        <div className="flex-1 max-w-md">
          <input
            type="text"
            value={roadmapTitle}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="Untitled Roadmap"
            className="text-lg font-semibold bg-transparent border-none outline-none text-text-primary placeholder-text-tertiary w-full"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          {/* Undo/Redo - Desktop Only */}
          <div className="hidden md:flex items-center space-x-1">
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
            <div className="w-px h-6 bg-border mx-2" />
          </div>

          {/* Save & Publish */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onSave}
            loading={isSaving}
            className="text-text-secondary"
          >
            Save Draft
          </Button>
          <Button
            variant="primary"
            size="sm"
            iconName="Upload"
            onClick={onPublish}
          >
            <span className="hidden sm:inline">Publish</span>
            <span className="sm:hidden">Publish</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreationHeader;