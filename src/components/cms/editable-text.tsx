'use client';

import React, { useState, useRef, useEffect } from 'react';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { Edit2 } from 'lucide-react';
import { useAuth } from '../../lib/auth';
import { db } from '../../lib/auth/firebase-config';

interface EditableTextProps {
  pageId: string;
  sectionKey: string;
  initialContent: string;
  className?: string;
  placeholder?: string;
  multiline?: boolean;
  richText?: boolean;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
}

export function EditableText({
  pageId,
  sectionKey,
  initialContent,
  className = '',
  placeholder = 'Click to edit...',
  multiline = false,
  richText = false,
  as: Component = 'div',
}: EditableTextProps) {
  const { role } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(initialContent);
  const [isSaving, setIsSaving] = useState(false);
  const editableRef = useRef<HTMLDivElement>(null);

  const isAdmin = role === 'admin';

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  const startEditing = () => {
    if (!isAdmin) return;
    setIsEditing(true);
    
    // Focus the editable element after it's rendered
    setTimeout(() => {
      if (editableRef.current) {
        editableRef.current.focus();
        
        // Select all text
        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNodeContents(editableRef.current);
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
    }, 0);
  };

  const saveContent = async () => {
    if (!isAdmin || !editableRef.current) return;

    const newContent = richText 
      ? editableRef.current.innerHTML
      : editableRef.current.textContent || '';

    if (newContent === content) {
      setIsEditing(false);
      return;
    }

    setIsSaving(true);

    try {
      // Update Firestore
      const pageRef = doc(db, 'pages', pageId);
      await updateDoc(pageRef, {
        [`sections.${sectionKey}`]: {
          content: newContent,
          updatedAt: serverTimestamp(),
        }
      });

      setContent(newContent);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving content:', error);
      // Revert content on error
      if (editableRef.current) {
        if (richText) {
          editableRef.current.innerHTML = content;
        } else {
          editableRef.current.textContent = content;
        }
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      saveContent();
    } else if (e.key === 'Escape') {
      // Revert changes
      if (editableRef.current) {
        if (richText) {
          editableRef.current.innerHTML = content;
        } else {
          editableRef.current.textContent = content;
        }
      }
      setIsEditing(false);
    }
  };

  if (!isAdmin) {
    // Regular users see static content
    if (richText) {
      return React.createElement(Component, {
        className,
        dangerouslySetInnerHTML: { __html: content || placeholder }
      });
    }
    return React.createElement(Component, { className }, content || placeholder);
  }

  return (
    <div className="group relative">
      {React.createElement(Component, {
        ref: editableRef,
        className: `${className} ${isEditing ? 'ring-2 ring-blue-500 ring-opacity-50' : ''} ${!content && !isEditing ? 'text-zinc-500' : ''}`,
        contentEditable: isEditing,
        suppressContentEditableWarning: true,
        onBlur: saveContent,
        onKeyDown: handleKeyDown,
        onClick: startEditing,
        dangerouslySetInnerHTML: richText ? { __html: content || placeholder } : undefined,
      }, richText ? undefined : content || placeholder)}
      
      {!isEditing && (
        <button
          onClick={startEditing}
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-800 hover:bg-zinc-700 text-white p-1 rounded"
          title="Edit content"
        >
          <Edit2 className="w-3 h-3" />
        </button>
      )}
      
      {isSaving && (
        <div className="absolute top-2 left-2 text-xs text-zinc-400">
          Saving...
        </div>
      )}
    </div>
  );
}