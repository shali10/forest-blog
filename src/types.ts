export interface Env {
  DB: D1Database;
  R2?: R2Bucket;
  SITE_TITLE?: string;
  SITE_SUBTITLE?: string;
  SITE_DESCRIPTION?: string;
  SITE_AUTHOR?: string;
  ADMIN_USERNAME?: string;
  ADMIN_PASSWORD?: string;
  JWT_SECRET?: string;
}

export interface Post {
  id: number;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  category_id: number | null;
  category_name: string;
  tags: string;
  status: 'published' | 'draft';
  pinned: number;
  views: number;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  slug: string;
  name: string;
  description: string;
  created_at: string;
  post_count?: number;
}

export interface Tag {
  id: number;
  name: string;
  post_count?: number;
}

export interface Link {
  id: number;
  name: string;
  url: string;
  avatar: string;
  description: string;
  sort_order: number;
  created_at: string;
}

export interface SiteSettings {
  site_title: string;
  site_subtitle: string;
  site_description: string;
  site_author: string;
  site_avatar: string;
  site_favicon: string;
  admin_username: string;
  giscus_repo?: string;
  giscus_repo_id?: string;
  giscus_category?: string;
  giscus_category_id?: string;
  giscus_mapping?: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}
