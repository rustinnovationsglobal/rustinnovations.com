import { createClient } from '@supabase/supabase-js';
import { blogPosts } from './data';
import type { BlogPost, Blog } from './types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? '';
const storageBucket = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET ?? 'Bob';
const blogTable = process.env.NEXT_PUBLIC_SUPABASE_BLOG_TABLE ?? 'Blogs';

if (!supabaseUrl) {
  console.warn(
    'Missing NEXT_PUBLIC_SUPABASE_URL in environment. Supabase client cannot connect without this value.'
  );
}

if (!supabaseAnonKey) {
  console.warn(
    'Missing NEXT_PUBLIC_SUPABASE_ANON_KEY or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in environment. Supabase auth will not work correctly.'
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
  employee_id: string;
  first_name: string;
  last_name: string;
  father_name: string;
  email: string;
  role: string;
  joining_date: string;
  status: 'Active' | 'Inactive';
  is_core_member: boolean;
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
    altText: row.alt_text ?? row.altText ?? row.description ?? '',
    content: row.content ?? row.body ?? '',
  };
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!isSupabaseConfigured) {
    return blogPosts;
  }

  const { data, error } = await supabase
    .from(blogTable)
    .select('*')
    .order('created_at', { ascending: false });

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
    .from(blogTable)
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

export async function getEmployeeByEmployeeId(employeeId: string): Promise<EmployeeRecord | null> {
  if (!isSupabaseConfigured) {
    return null;
  }

  const { data, error } = await supabase
    .from('employees')
    .select('*')
    .eq('employee_id', employeeId)
    .limit(1)
    .single();

  if (error || !data) {
    return null;
  }

  return data as EmployeeRecord;
}

export async function getCoreTeamMembers(): Promise<EmployeeRecord[]> {
  if (!isSupabaseConfigured) {
    return [];
  }

  const { data, error } = await supabase
    .from('employees')
    .select('*')
    .eq('is_core_member', true)
    .order('created_at', { ascending: false });

  if (error || !data) {
    return [];
  }

  return data as EmployeeRecord[];
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

  const { error } = await supabase.from(blogTable).upsert([blog], {
    onConflict: 'id',
  });
  return error;
}

export async function deleteBlog(id: string) {
  if (!isSupabaseConfigured) {
    return null;
  }

  const { error } = await supabase.from(blogTable).delete().eq('id', id);
  return error;
}

// New helpers returning the public `Blog` shape used by the media center pages
function mapBlogRowToBlog(row: any): Blog {
  return {
    id: String(row.id ?? ''),
    featured_image: row.featured_image ?? row.featured_image ?? row.featured_image ?? '',
    title: row.title ?? '',
    slug: row.slug ?? row.id ?? '',
    created_at: row.created_at ?? new Date().toISOString(),
    content: row.content ?? row.body ?? '',
    image_alt: row.image_alt ?? row.image_alt ?? row.image_alt ?? '',
    author: row.author ?? '',
    keyword: Array.isArray(row.keyword)
      ? row.keyword.map((item: any) => String(item))
      : typeof row.keyword === 'string'
      ? row.keyword
      : [],
    meta_html: row.meta_html ?? '',
  };
}

export async function getAllBlogs(): Promise<Blog[]> {
  try {
    if (!isSupabaseConfigured) {
      // Fallback: map blogPosts if available
      return (blogPosts || []).map((row: any) => mapBlogRowToBlog(row));
    }

    const { data, error } = await supabase
      .from(blogTable)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase getAllBlogs error:', JSON.stringify(error, null, 2));
      return [];
    }

    return (data ?? []).map((row: any) => mapBlogRowToBlog(row));
  } catch (err) {
    console.error('Unexpected error in getAllBlogs:', err);
    return [];
  }
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  try {
    if (!isSupabaseConfigured) return null;

    const { data, error } = await supabase
      .from(blogTable)
      .select('*')
      .eq('slug', slug)
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error(`Supabase getBlogBySlug(${slug}) error:`, JSON.stringify(error, null, 2));
      return null;
    }

    return data ? mapBlogRowToBlog(data) : null;
  } catch (err) {
    console.error(`Unexpected error in getBlogBySlug(${slug}):`, err);
    return null;
  }
}

export async function deleteAllBlogs() {
  if (!isSupabaseConfigured) {
    return null;
  }

  const { error } = await supabase.from(blogTable).delete().neq('id', '');
  return error;
}
