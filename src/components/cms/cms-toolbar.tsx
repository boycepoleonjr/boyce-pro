'use client';

import React, { useState } from 'react';
import { Edit2, Plus, Save, LogOut, Settings, FileText, Image } from 'lucide-react';
import { useAuth } from '../../lib/auth';

interface CMSToolbarProps {
  editMode?: boolean;
  onEditModeToggle?: (enabled: boolean) => void;
  onNewPost?: () => void;
  onNewGuide?: () => void;
  onSave?: () => void;
  isSaving?: boolean;
  saveStatus?: 'idle' | 'saving' | 'saved' | 'error';
}

export function CMSToolbar({
  editMode = false,
  onEditModeToggle,
  onNewPost,
  onNewGuide,
  onSave,
  isSaving = false,
  saveStatus = 'idle',
}: CMSToolbarProps) {
  const { role, signOut } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isAdmin = role === 'admin';

  if (!isAdmin) {
    return null;
  }

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const getSaveStatusText = () => {
    switch (saveStatus) {
      case 'saving':
        return 'Saving...';
      case 'saved':
        return 'Saved';
      case 'error':
        return 'Error';
      default:
        return 'Save';
    }
  };

  const getSaveStatusColor = () => {
    switch (saveStatus) {
      case 'saving':
        return 'text-yellow-400';
      case 'saved':
        return 'text-green-400';
      case 'error':
        return 'text-red-400';
      default:
        return 'text-white';
    }
  };

  return (
    <>
      {/* Floating toolbar */}
      <div className="fixed top-4 right-4 z-50">
        <div className="bg-zinc-900 border border-zinc-700 rounded-lg shadow-lg overflow-hidden">
          {/* Collapsed state - just toggle button */}
          {isCollapsed ? (
            <button
              onClick={() => setIsCollapsed(false)}
              className="p-3 hover:bg-zinc-800 transition-colors"
              title="Expand CMS toolbar"
            >
              <Settings className="w-4 h-4" />
            </button>
          ) : (
            /* Expanded state */
            <div className="p-2 space-y-2 min-w-[200px]">
              {/* Header */}
              <div className="flex items-center justify-between pb-2 border-b border-zinc-700">
                <span className="text-sm font-medium">CMS Admin</span>
                <button
                  onClick={() => setIsCollapsed(true)}
                  className="p-1 hover:bg-zinc-800 rounded"
                  title="Collapse toolbar"
                >
                  <Settings className="w-3 h-3" />
                </button>
              </div>

              {/* Edit mode toggle */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">Edit Mode</span>
                <button
                  onClick={() => onEditModeToggle?.(!editMode)}
                  className={`relative w-10 h-5 rounded-full transition-colors ${
                    editMode ? 'bg-blue-600' : 'bg-zinc-600'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                      editMode ? 'transform translate-x-5' : ''
                    }`}
                  />
                </button>
              </div>

              {/* Save button */}
              {onSave && (
                <button
                  onClick={onSave}
                  disabled={isSaving}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-zinc-800 hover:bg-zinc-700 disabled:bg-zinc-800 disabled:cursor-not-allowed rounded transition-colors"
                >
                  {saveStatus === 'saving' ? (
                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                  ) : (
                    <Save className="w-3 h-3" />
                  )}
                  <span className={`text-xs ${getSaveStatusColor()}`}>
                    {getSaveStatusText()}
                  </span>
                </button>
              )}

              {/* Content creation buttons */}
              <div className="space-y-1">
                {onNewPost && (
                  <button
                    onClick={onNewPost}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800 rounded transition-colors"
                  >
                    <FileText className="w-3 h-3" />
                    New Post
                  </button>
                )}

                {onNewGuide && (
                  <button
                    onClick={onNewGuide}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800 rounded transition-colors"
                  >
                    <Image className="w-3 h-3" />
                    New Guide
                  </button>
                )}
              </div>

              {/* Sign out button */}
              <div className="pt-2 border-t border-zinc-700">
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-zinc-800 rounded transition-colors"
                >
                  <LogOut className="w-3 h-3" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Edit mode indicator */}
      {editMode && (
        <div className="fixed bottom-4 left-4 z-50">
          <div className="bg-blue-600 text-white px-3 py-2 rounded-lg shadow-lg text-sm font-medium flex items-center gap-2">
            <Edit2 className="w-4 h-4" />
            Edit Mode Active
          </div>
        </div>
      )}
    </>
  );
}