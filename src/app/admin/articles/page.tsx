'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Blog } from '@/types/admin';
import { formatDateDisplay } from '@/lib/admin-utils';

export default function ArticlesPage() {
  const [blogs, setBlogs] = useState<Blog[]>([
    {
      id: '1',
      title: 'The Future of Web Development: Trends to Watch in 2025',
      author: 'Shahid Mahmood',
      content: 'The web development landscape is in a constant state of flux...',
      coverImage: '/blog-cover.jpg',
      keywords: ['web', 'development', 'trends'],
      altText: 'Web development trends',
      publishedDate: '2026-05-05',
      createdAt: new Date().toISOString(),
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this blog?')) {
      setBlogs(blogs.filter((blog) => blog.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Articles</h1>
        <Link
          href="/admin/articles/new"
          className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
        >
          <span>+</span>
          <span>Register New Blog</span>
        </Link>
      </div>

      {/* Search */}
      <div>
        <input
          type="text"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-red-600"
        />
      </div>

      {/* Blog List */}
      <div className="space-y-3">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition"
            >
              <div className="flex gap-6 items-start">
                <div className="w-32 h-24 rounded-lg bg-slate-700 flex-shrink-0 overflow-hidden">
                  {blog.coverImage && (
                    <img
                      src={blog.coverImage}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
                  <p className="text-slate-400 text-sm mb-3 line-clamp-2">{blog.content}</p>
                  <div className="flex gap-4 text-sm text-slate-400">
                    <span>By: {blog.author}</span>
                    <span>Published: {formatDateDisplay(blog.publishedDate)}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 flex-shrink-0">
                  <Link
                    href={`/admin/articles/${blog.id}`}
                    className="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded transition text-sm whitespace-nowrap"
                  >
                    View
                  </Link>
                  <Link
                    href={`/admin/articles/${blog.id}/edit`}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded transition text-sm whitespace-nowrap"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(blog.id)}
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded transition text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-400">No articles found</p>
          </div>
        )}
      </div>
    </div>
  );
}