// Shared types for the auth and CMS system

export type Role = 'admin' | 'pro' | 'free' | null;

export type Tier = 'free' | 'pro';

export type SiteId = 'boyce-pro' | 'agentbolt';

export interface User {
  uid: string;
  email: string;
  role: Role;
  createdAt: Date;
  stripeCustomerId?: string;
}

export interface PageSection {
  content: string;
  updatedAt: Date;
}

export interface Page {
  id: string;
  siteId: SiteId;
  slug: string;
  sections: Record<string, PageSection>;
}

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  slug: string;
  tier: Tier;
  tags: string[];
  siteId: SiteId;
  publishedAt: Date;
  updatedAt?: Date;
}

export interface WaitlistEntry {
  id: string;
  email: string;
  source?: string;
  createdAt: Date;
}