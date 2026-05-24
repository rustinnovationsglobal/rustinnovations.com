'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { formatDateDisplay } from '@/lib/admin-utils';

export default function BlogDetailPage() {
  const params = useParams();

  // Mock data - replace with database fetch
  const article = {
    id: params.id,
    title: 'The Future of Web Development: Trends to Watch in 2025',
    author: 'Shahid Mahmood',
    image: '/blog-cover.jpg',
    publishedDate: '2026-05-05',
    keywords: ['web', 'development', 'trends', '2025'],
    content: `
The web development landscape is in a constant state of flux. As we look towards 2025, several key trends are emerging that will shape the future of how we build and interact with web applications.

## Artificial Intelligence and Machine Learning Integration

One of the most significant trends we're seeing is the deep integration of AI and ML capabilities directly into web applications. This goes beyond simple chatbots—we're talking about intelligent features that can predict user behavior, personalize experiences in real-time, and automate complex workflows.

## Edge Computing and Serverless Architecture

The shift towards edge computing continues to accelerate. Developers are increasingly leveraging serverless architectures and edge functions to build faster, more scalable applications. This trend allows for reduced latency, improved performance, and more efficient resource utilization.

## Web Components and Micro Frontends

As applications grow more complex, the adoption of web components and micro frontend architectures is becoming standard practice. These approaches enable better code organization, easier maintenance, and improved team collaboration on large-scale projects.

## Enhanced Security and Privacy

With increasing data breaches and privacy concerns, security is no longer an afterthought. Zero-trust security models and privacy-first design patterns are becoming essential considerations in web development.

## Real-time Collaboration Features

The demand for real-time collaboration has led to the development of sophisticated frameworks and tools. From collaborative editing to live previews, real-time features are becoming standard expectations in modern web applications.

## Conclusion

The future of web development is exciting and full of possibilities. By staying informed about these trends and continuously learning, developers can position themselves to build the next generation of innovative web applications.
    `,
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <div className="bg-slate-900 border-b border-slate-800 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link href="/media-center" className="text-slate-400 hover:text-white transition">
            ← Back to Media Center
          </Link>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Cover Image */}
        <div className="w-full h-96 rounded-2xl overflow-hidden mb-12 border border-slate-800">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Header */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {article.title}
          </h1>

          <div className="flex items-center justify-between flex-wrap gap-4 text-slate-400 text-sm">
            <div className="flex items-center gap-4">
              <span>By {article.author}</span>
              <span>•</span>
              <span>{formatDateDisplay(article.publishedDate)}</span>
            </div>
          </div>

          {/* Keywords */}
          <div className="flex flex-wrap gap-2 mt-6">
            {article.keywords.map((keyword) => (
              <span
                key={keyword}
                className="px-3 py-1 bg-red-600/20 text-red-400 rounded-full text-sm"
              >
                #{keyword}
              </span>
            ))}
          </div>
        </header>

        {/* Article Content */}
        <div className="prose prose-invert max-w-none mb-12">
          <div className="text-slate-300 leading-relaxed space-y-6">
            {article.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('##')) {
                return (
                  <h2
                    key={index}
                    className="text-2xl font-bold text-white mt-8 mb-4"
                  >
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              }
              return (
                <p key={index} className="text-base leading-8">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </div>

        {/* Share and Navigation */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-wrap justify-between items-center gap-6">
            <div>
              <p className="text-slate-400 text-sm mb-2">Share Article</p>
              <div className="flex gap-4">
                <a
                  href={`https://twitter.com/intent/tweet?text=${article.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-red-600 transition"
                >
                  𝕏
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=rustinnovations.com/blog/${article.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-red-600 transition"
                >
                  in
                </a>
                <a
                  href={`https://www.facebook.com/sharer.php?u=rustinnovations.com/blog/${article.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-red-600 transition"
                >
                  f
                </a>
              </div>
            </div>

            <Link
              href="/media-center"
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition font-medium"
            >
              View More Articles
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}