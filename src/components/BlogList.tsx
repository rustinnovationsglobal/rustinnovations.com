import BlogCard from './BlogCard';
import type { Blog } from '@/lib/types';

export default function BlogList({ blogs }: { blogs: Blog[] }) {
  if (!blogs || blogs.length === 0) {
    return <div className="text-center text-muted-foreground">No posts found.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((b) => (
        <BlogCard key={b.id} blog={b} />
      ))}
    </div>
  );
}
