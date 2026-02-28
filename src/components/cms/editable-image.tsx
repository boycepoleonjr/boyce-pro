'use client';

import React, { useState, useRef } from 'react';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { useAuth } from '../../lib/auth';
import { db } from '../../lib/auth/firebase-config';
import type { Firestore } from 'firebase/firestore';

interface EditableImageProps {
  pageId: string;
  sectionKey: string;
  initialSrc?: string;
  alt?: string;
  className?: string;
  placeholder?: string;
  width?: number;
  height?: number;
}

export function EditableImage({
  pageId,
  sectionKey,
  initialSrc,
  alt = '',
  className = '',
  placeholder = 'Click to upload image',
  width,
  height,
}: EditableImageProps) {
  const { role } = useAuth();
  const [src, setSrc] = useState(initialSrc);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isAdmin = role === 'admin';

  const handleImageClick = () => {
    if (!isAdmin) return;
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !isAdmin) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image must be smaller than 5MB');
      return;
    }

    setIsUploading(true);

    try {
      // Convert file to base64 for preview (temporary solution)
      const reader = new FileReader();
      reader.onload = async (e) => {
        const result = e.target?.result as string;
        
        // TODO: Replace with actual upload to R2/S3
        // For now, we'll store the base64 data URL in Firestore (not recommended for production)
        // In production, you'd upload to R2/S3 and store the URL
        
        try {
          const pageRef = doc(db!, 'pages', pageId);
          await updateDoc(pageRef, {
            [`sections.${sectionKey}`]: {
              content: result, // This should be the uploaded URL in production
              alt: alt,
              updatedAt: serverTimestamp(),
            }
          });

          setSrc(result);
        } catch (error) {
          console.error('Error saving image:', error);
          alert('Failed to save image');
        } finally {
          setIsUploading(false);
        }
      };

      reader.onerror = () => {
        alert('Failed to read image file');
        setIsUploading(false);
      };

      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error processing image:', error);
      alert('Failed to process image');
      setIsUploading(false);
    }

    // Reset input
    e.target.value = '';
  };

  if (!isAdmin && !src) {
    return null; // Don't show anything if no image and not admin
  }

  if (!src) {
    // Admin placeholder when no image
    return (
      <div
        className={`group relative border-2 border-dashed border-zinc-700 hover:border-zinc-500 transition-colors cursor-pointer ${className}`}
        onClick={handleImageClick}
        style={{ width, height: height || 200 }}
      >
        <div className="flex flex-col items-center justify-center h-full p-4 text-zinc-500 group-hover:text-zinc-400 transition-colors">
          <ImageIcon className="w-8 h-8 mb-2" />
          <span className="text-sm text-center">{placeholder}</span>
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    );
  }

  return (
    <div className="group relative inline-block">
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`${className} ${isAdmin ? 'cursor-pointer' : ''}`}
        onClick={handleImageClick}
      />
      
      {isAdmin && (
        <>
          <button
            onClick={handleImageClick}
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-800 hover:bg-zinc-700 text-white p-1 rounded"
            title="Replace image"
            disabled={isUploading}
          >
            <Upload className="w-3 h-3" />
          </button>
          
          {isUploading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded">
              <div className="text-white text-sm flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Uploading...
              </div>
            </div>
          )}
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </>
      )}
    </div>
  );
}