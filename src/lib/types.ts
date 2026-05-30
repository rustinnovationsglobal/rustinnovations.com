
import type { LucideIcon } from 'lucide-react';

export type NavLink = {
  href: string;
  label: string;
};

export type Service = {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  icon: LucideIcon;
  imageUrl: string;
  imageHint: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  specifications: string[];
  href?: string;
};

export type TeamMember = {
  id: string;
  name: string;
  title: string;
  description?: string;
  imageUrl: string;
  imageHint: string;
};

export type FooterLinks = {
  quickLinks: NavLink[];
  ourPolicy: NavLink[];
  countries: string[];
};

export type BlogPost = {
    id: string;
    title: string;
    author: string;
    date: string;
    tags: string[];
    imageUrl: string;
    imageHint: string;
    altText: string;
    excerpt: string;
    content: string;
};

export type Blog = {
  id: string;
  featured_image: string;
  title: string;
  slug: string;
  created_at: string;
  content: string;
  image_alt: string;
  author: string;
  keyword: string | string[];
  meta_html: string;
};
