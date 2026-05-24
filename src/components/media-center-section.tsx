import Link from 'next/link';
import { formatDateDisplay } from '@/lib/admin-utils';

export function MediaCenterSection() {
  const articles = [
    {
      id: '1',
      title: 'The Future of Web Development: Trends to Watch in 2025',
      author: 'Shahid Mahmood',
      excerpt: 'The web development landscape is in a constant state of flux. As we look towards 2025, several key trends are emerging...',
      publishedDate: '2026-05-05',
      image: '/blog-cover.jpg',
    },
    {
      id: '2',
      title: 'Building Scalable Applications with Modern Architecture',
      author: 'Rashid Mahmood',
      excerpt: 'Learn how to design and build applications that can scale seamlessly as your business grows...',
      publishedDate: '2026-04-28',
      image: '/blog-cover.jpg',
    },
    {
      id: '3',
      title: 'Security Best Practices for Production Systems',
      author: 'Technical Team',
      excerpt: 'Essential security measures every development team should implement before going live...',
      publishedDate: '2026-04-15',
      image: '/blog-cover.jpg',
    },
  ];

  return (
    <section className="py-16 px-4 bg-slate-950">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold text-white mb-3">Media Center</h2>
            <p className="text-slate-400">Latest articles and insights from our team</p>
          </div>
          <Link
            href="/media-center"
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition font-medium"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/blog/${article.id}`}
              className="group bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition"
            >
              <div className="w-full h-48 bg-slate-800 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-red-600 transition">
                  {article.title}
                </h3>
                <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>By {article.author}</span>
                  <span>{formatDateDisplay(article.publishedDate)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
