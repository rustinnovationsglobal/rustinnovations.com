import Image from 'next/image';
import Link from 'next/link';
import type { Blog } from '@/lib/types';

function excerptFromHtml(html: string, length = 160) {
  const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + '...';
}

export default function BlogCard({ blog }: { blog: Blog }) {
  return (
    <article className="group rounded-lg overflow-hidden border bg-card">
      <Link href={`/media-center/${blog.slug}`} className="block">
        <div className="relative h-48 w-full bg-slate-800">
          {blog.featured_image ? (
            <Image
              src={blog.featured_image}
              alt={blog.image_alt ?? blog.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">No Image</div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-foreground mb-1">{blog.title}</h3>
          <div className="text-sm text-muted-foreground mb-3">
            By {blog.author ?? 'Unknown'} · {new Date(blog.created_at).toLocaleDateString()}
          </div>
          <p className="text-sm text-muted-foreground mb-4">{excerptFromHtml(blog.content)}</p>
          <div className="text-sm font-semibold text-primary">Read more →</div>
        </div>
      </Link>
    </article>
  );
}
