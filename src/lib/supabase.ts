import { createClient } from '@supabase/supabase-js';
import { blogPosts } from './data';
import type { BlogPost } from './types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';
const storageBucket = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET ?? 'public';

if (!supabaseAnonKey) {
  console.warn(
    'Missing NEXT_PUBLIC_SUPABASE_ANON_KEY in environment. Supabase auth will not work correctly.'
  );
}

const supabaseOptions = {
  auth: {
    persistSession: true,
    storageKey: 'supabase.auth.token',
  },
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, supabaseOptions);

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export type EmployeeRecord = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  created_at: string;
  image_url: string;
};

export type QuoteRecord = {
  id: string;
  quote: string;
  author: string;
  created_at: string;
};

function mapBlogRow(row: any): BlogPost {
  return {
    id: String(row.id ?? ''),
    title: row.title ?? '',
    author: row.author ?? '',
    date:
      row.published_at && typeof row.published_at === 'string'
        ? row.published_at.slice(0, 10)
        : row.date ?? new Date().toISOString().slice(0, 10),
    tags: Array.isArray(row.keywords) ? row.keywords : row.tags ?? [],
    imageUrl: row.image_url ?? row.imageUrl ?? row.image ?? '',
    imageHint: row.image_hint ?? row.imageHint ?? '',
    excerpt: row.excerpt ?? row.description ?? '',
    content: row.content ?? row.body ?? '',
  };
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!isSupabaseConfigured) {
    return blogPosts;
  }

  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .order('published_at', { ascending: false });

  if (error || !data) {
    return blogPosts;
  }

  return data.map(mapBlogRow);
}

export async function getBlogPost(id: string): Promise<BlogPost | undefined> {
  if (!isSupabaseConfigured) {
    return blogPosts.find((post) => post.id === id);
  }

  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('id', id)
    .limit(1)
    .single();

  if (error || !data) {
    return blogPosts.find((post) => post.id === id);
  }

  return mapBlogRow(data);
}

export async function getEmployees(): Promise<EmployeeRecord[]> {
  if (!isSupabaseConfigured) {
    return [];
  }

  const { data, error } = await supabase.from('employees').select('*').order('created_at', { ascending: false });

  if (error || !data) {
    return [];
  }

  return data as EmployeeRecord[];
}

export async function getEmployee(id: string): Promise<EmployeeRecord | null> {
  if (!isSupabaseConfigured) {
    return null;
  }

  const { data, error } = await supabase
    .from('employees')
    .select('*')
    .eq('id', id)
    .limit(1)
    .single();

  if (error || !data) {
    return null;
  }

  return data as EmployeeRecord;
}

export async function getQuotes(): Promise<QuoteRecord[]> {
  if (!isSupabaseConfigured) {
    return [];
  }

  const { data, error } = await supabase.from('quotes').select('*').order('created_at', { ascending: false });

  if (error || !data) {
    return [];
  }

  return data as QuoteRecord[];
}

export async function uploadSupabaseFile(file: File | Blob, folder: string) {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured.');
  }

  const filePath = `${folder}/${crypto.randomUUID()}-${(file as File).name || 'upload'}`;
  const { error } = await supabase.storage.from(storageBucket).upload(filePath, file as File, {
    upsert: true,
  });

  if (error) {
    throw error;
  }

  const { data } = supabase.storage.from(storageBucket).getPublicUrl(filePath);

  return data.publicUrl;
}

export async function upsertEmployee(employee: EmployeeRecord) {
  if (!isSupabaseConfigured) {
    return null;
  }

  const { error } = await supabase.from('employees').upsert([employee], {
    onConflict: 'id',
  });
  return error;
}

export async function deleteEmployee(id: string) {
  if (!isSupabaseConfigured) {
    return null;
  }

  const { error } = await supabase.from('employees').delete().eq('id', id);
  return error;
}

export type BlogRecord = {
  id: string;
  title: string;
  author: string;
  published_at: string;
  keywords: string[];
  image_url: string;
  excerpt: string;
  content: string;
};

export async function upsertBlog(blog: BlogRecord) {
  if (!isSupabaseConfigured) {
    return null;
  }

  const { error } = await supabase.from('blogs').upsert([blog], {
    onConflict: 'id',
  });
  return error;
}

export async function deleteBlog(id: string) {
  if (!isSupabaseConfigured) {
    return null;
  }

  const { error } = await supabase.from('blogs').delete().eq('id', id);
  return error;
}

export async function deleteAllBlogs() {
  if (!isSupabaseConfigured) {
    return null;
  }

  const { error } = await supabase.from('blogs').delete().neq('id', '');
  return error;
}
