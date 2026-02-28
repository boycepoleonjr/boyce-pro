'use client';

import React, { useState, useRef, useEffect } from 'react';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { Save, Eye, EyeOff, FileText, Settings } from 'lucide-react';
import { useAuth } from '../../lib/auth';
import { db } from '../../lib/auth/firebase-config';
import type { Firestore } from 'firebase/firestore';

interface Frontmatter {
  title: string;
  description: string;
  tier: 'free' | 'pro';
  tags: string[];
  publishedAt?: string;
}

interface MDXEditorProps {
  postId?: string;
  siteId: 'boyce-pro' | 'agentbolt';
  initialContent?: string;
  initialFrontmatter?: Frontmatter;
  onSave?: (postId: string) => void;
}

export function MDXEditor({
  postId,
  siteId,
  initialContent = '',
  initialFrontmatter,
  onSave,
}: MDXEditorProps) {
  const { role } = useAuth();
  const [showPreview, setShowPreview] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [content, setContent] = useState(initialContent);
  const [frontmatter, setFrontmatter] = useState<Frontmatter>(
    initialFrontmatter || {
      title: '',
      description: '',
      tier: 'free',
      tags: [],
    }
  );

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isAdmin = role === 'admin';

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [content]);

  if (!isAdmin) {
    return (
      <div className="text-center text-zinc-500 p-8">
        Admin access required to edit content.
      </div>
    );
  }

  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const saveToBlog = async () => {
    if (!frontmatter.title.trim()) {
      alert('Please enter a title');
      return;
    }

    setIsSaving(true);

    try {
      const slug = generateSlug(frontmatter.title);
      const currentPostId = postId || slug;
      
      // Save to Firestore (metadata)
      const blogRef = doc(db!, 'blog', currentPostId);
      await setDoc(blogRef, {
        title: frontmatter.title,
        description: frontmatter.description,
        slug: slug,
        tier: frontmatter.tier,
        tags: frontmatter.tags,
        siteId: siteId,
        publishedAt: frontmatter.publishedAt ? new Date(frontmatter.publishedAt) : serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      // TODO: Save to GitHub repo via API
      // This would commit the MDX file with frontmatter + content
      // For now, we'll just log what would be saved
      console.log('Would save to GitHub:', {
        path: `content/blog/${slug}.mdx`,
        content: generateMDXContent(),
      });

      onSave?.(currentPostId);
      alert('Post saved successfully!');
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Failed to save post');
    } finally {
      setIsSaving(false);
    }
  };

  const generateMDXContent = () => {
    const frontmatterYaml = `---
title: "${frontmatter.title}"
description: "${frontmatter.description}"
tier: ${frontmatter.tier}
tags: [${frontmatter.tags.map(tag => `"${tag}"`).join(', ')}]
publishedAt: "${frontmatter.publishedAt || new Date().toISOString()}"
---

${content}`;
    return frontmatterYaml;
  };

  const handleTagsChange = (tagsString: string) => {
    const tags = tagsString
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
    setFrontmatter(prev => ({ ...prev, tags }));
  };

  return (
    <div className="h-full flex flex-col bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          <span className="font-medium">MDX Editor</span>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`p-2 rounded ${showSettings ? 'bg-zinc-700' : 'hover:bg-zinc-800'} transition-colors`}
            title="Post settings"
          >
            <Settings className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => setShowPreview(!showPreview)}
            className={`p-2 rounded ${showPreview ? 'bg-zinc-700' : 'hover:bg-zinc-800'} transition-colors`}
            title="Toggle preview"
          >
            {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
          
          <button
            onClick={saveToBlog}
            disabled={isSaving}
            className="flex items-center gap-2 bg-white text-black px-3 py-2 rounded hover:bg-zinc-200 disabled:bg-zinc-700 disabled:text-zinc-400 transition-colors"
          >
            {isSaving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Post
              </>
            )}
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="p-4 bg-zinc-900 border-b border-zinc-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                value={frontmatter.title}
                onChange={(e) => setFrontmatter(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded text-sm"
                placeholder="Post title..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Tier</label>
              <select
                value={frontmatter.tier}
                onChange={(e) => setFrontmatter(prev => ({ ...prev, tier: e.target.value as 'free' | 'pro' }))}
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded text-sm"
              >
                <option value="free">Free</option>
                <option value="pro">Pro</option>
              </select>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Description</label>
              <input
                type="text"
                value={frontmatter.description}
                onChange={(e) => setFrontmatter(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded text-sm"
                placeholder="Brief description..."
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Tags (comma-separated)</label>
              <input
                type="text"
                value={frontmatter.tags.join(', ')}
                onChange={(e) => handleTagsChange(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded text-sm"
                placeholder="tag1, tag2, tag3"
              />
            </div>
          </div>
        </div>
      )}

      {/* Editor */}
      <div className="flex-1 flex">
        {/* Editor pane */}
        <div className={`${showPreview ? 'w-1/2' : 'w-full'} flex flex-col`}>
          <div className="p-2 bg-zinc-900 border-r border-zinc-800 text-xs text-zinc-400">
            Editor
          </div>
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="flex-1 p-4 bg-[#0a0a0a] text-white resize-none focus:outline-none font-mono text-sm"
            placeholder="Start writing your MDX content..."
          />
        </div>

        {/* Preview pane */}
        {showPreview && (
          <div className="w-1/2 flex flex-col">
            <div className="p-2 bg-zinc-900 text-xs text-zinc-400">
              Preview
            </div>
            <div className="flex-1 p-4 bg-zinc-950 overflow-y-auto">
              <div className="prose prose-invert prose-sm max-w-none">
                {/* This would render the MDX content in production */}
                <pre className="text-xs text-zinc-400 whitespace-pre-wrap">
                  {generateMDXContent()}
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}