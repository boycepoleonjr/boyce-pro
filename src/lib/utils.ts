import { Role, Tier } from './types';

/**
 * Check if a user role can access content of a specific tier
 */
export function canAccessTier(userRole: Role, contentTier: Tier): boolean {
  if (!userRole) return contentTier === 'free'; // Anonymous users can only see free content
  
  if (userRole === 'admin') return true; // Admins can see everything
  if (userRole === 'pro') return true; // Pro users can see everything
  if (userRole === 'free') return contentTier === 'free'; // Free users can only see free content
  
  return false;
}

/**
 * Get the role hierarchy level (higher number = more permissions)
 */
export function getRoleLevel(role: Role): number {
  const levels: Record<NonNullable<Role>, number> = {
    admin: 3,
    pro: 2,
    free: 1,
  };
  
  return role ? levels[role] : 0;
}

/**
 * Check if a user role has at least the required role level
 */
export function hasRoleAccess(userRole: Role, requiredRole: Role): boolean {
  if (!requiredRole) return true;
  if (!userRole) return false;
  
  return getRoleLevel(userRole) >= getRoleLevel(requiredRole);
}

/**
 * Generate a URL-friendly slug from a string
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/**
 * Format a date for display
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Get a friendly role display name
 */
export function getRoleDisplayName(role: Role): string {
  switch (role) {
    case 'admin':
      return 'Administrator';
    case 'pro':
      return 'Pro Member';
    case 'free':
      return 'Free Member';
    default:
      return 'Guest';
  }
}

/**
 * Generate frontmatter for MDX content
 */
export function generateFrontmatter(data: {
  title: string;
  description: string;
  tier: Tier;
  tags: string[];
  publishedAt?: Date | string;
}): string {
  const publishedAt = data.publishedAt 
    ? (typeof data.publishedAt === 'string' ? data.publishedAt : data.publishedAt.toISOString())
    : new Date().toISOString();

  return `---
title: "${data.title}"
description: "${data.description}"
tier: ${data.tier}
tags: [${data.tags.map(tag => `"${tag}"`).join(', ')}]
publishedAt: "${publishedAt}"
---`;
}

/**
 * Validate an email address
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Truncate text to a specified length
 */
export function truncateText(text: string, maxLength: number = 100): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}