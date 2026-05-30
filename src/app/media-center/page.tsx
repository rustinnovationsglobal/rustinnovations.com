import { getAllBlogs } from '@/lib/supabase';
import BlogList from '@/components/BlogList';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Media Center - Rust Innovations',
  description: 'Latest news and articles from Rust Innovations',
};

export default async function MediaCenterPage() {
  const blogs = await getAllBlogs();

  return (
    <main className="container mx-auto px-4 py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Media Center</h1>
        <p className="text-muted-foreground">Latest updates, articles and announcements</p>
      </header>

      <section>
        <BlogList blogs={blogs} />
      </section>
    </main>
  );
}

