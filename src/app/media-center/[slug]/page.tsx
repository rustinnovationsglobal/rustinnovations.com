import { getBlogBySlug } from '@/lib/supabase';
import BlogContent from '@/components/BlogContent';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const blog = await getBlogBySlug(params.slug);
  if (!blog) return { title: 'Not found' };

  const keywords = Array.isArray(blog.keyword)
    ? blog.keyword.map((item) => String(item).trim()).filter(Boolean)
    : typeof blog.keyword === 'string'
    ? blog.keyword.split(',').map((item) => item.trim()).filter(Boolean)
    : undefined;

  return {
    title: blog.title,
    description: blog.meta_html || blog.content.slice(0, 160),
    keywords: keywords && keywords.length > 0 ? keywords : undefined,
    openGraph: {
      title: blog.title,
      description: blog.meta_html || blog.content.slice(0, 160),
      images: blog.featured_image ? [{ url: blog.featured_image, alt: blog.image_alt || blog.title }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.meta_html || blog.content.slice(0, 160),
      images: blog.featured_image ? [blog.featured_image] : undefined,
    },
  };
}

export default async function BlogPage({ params }: Props) {
  const blog = await getBlogBySlug(params.slug);

  if (!blog) notFound();

  return (
    <main className="container mx-auto px-4 py-12">
      <article className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link
            href="/media-center"
            className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-900"
          >
            ← Back to Media Center
          </Link>
        </div>
        {blog.featured_image && (
          <div className="relative h-72 w-full mb-6 rounded-lg overflow-hidden">
            <Image src={blog.featured_image} alt={blog.image_alt ?? blog.title} fill className="object-cover" />
          </div>
        )}

        <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
        <div className="text-sm text-muted-foreground mb-6">By {blog.author ?? 'Unknown'} · {new Date(blog.created_at).toLocaleDateString()}</div>

        <section className="prose max-w-none">
          <BlogContent html={blog.content} />
        </section>
      </article>
    </main>
  );
}
