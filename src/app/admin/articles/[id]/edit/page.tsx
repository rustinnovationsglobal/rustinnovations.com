'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Blog } from '@/types/admin';

export default function BlogFormPage() {
  const params = useParams();
  const router = useRouter();
  const isEdit = params.id !== 'new' && params.id;

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    content: '',
    keywords: [] as string[],
    altText: '',
  });

  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [keywordInput, setKeywordInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      // Load existing blog data
      const mockBlog: Blog = {
        id: params.id as string,
        title: 'The Future of Web Development: Trends to Watch in 2025',
        author: 'Shahid Mahmood',
        content: 'The web development landscape is in a constant state of flux...',
        coverImage: '/blog-cover.jpg',
        keywords: ['web', 'development', 'trends'],
        altText: 'Web development trends',
        publishedDate: '2026-05-05',
        createdAt: new Date().toISOString(),
      };
      setFormData({
        title: mockBlog.title,
        author: mockBlog.author,
        content: mockBlog.content,
        keywords: mockBlog.keywords,
        altText: mockBlog.altText,
      });
      setCoverImage(mockBlog.coverImage);
    }
  }, [params.id, isEdit]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (150KB - 200KB)
      const fileSizeKB = file.size / 1024;
      if (fileSizeKB < 150 || fileSizeKB > 200) {
        alert('File size must be between 150KB and 200KB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddKeyword = () => {
    if (keywordInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        keywords: [...prev.keywords, keywordInput.trim()],
      }));
      setKeywordInput('');
    }
  };

  const handleRemoveKeyword = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      keywords: prev.keywords.filter((_, i) => i !== index),
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddKeyword();
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mock save
    await new Promise((resolve) => setTimeout(resolve, 500));

    console.log('Saving blog:', {
      ...formData,
      coverImage,
    });

    setLoading(false);
    router.push('/admin/articles');
  };

  return (
    <div className="space-y-6">
      <Link href="/admin/articles" className="text-slate-400 hover:text-white transition">
        &lt; Back
      </Link>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image Upload */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-8">
          <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center">
            {coverImage ? (
              <div className="space-y-4">
                <img
                  src={coverImage}
                  alt="Preview"
                  className="w-full max-h-48 object-cover rounded-lg"
                />
                <label className="block">
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <span className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded transition cursor-pointer inline-block">
                    Change Image
                  </span>
                </label>
              </div>
            ) : (
              <label className="block cursor-pointer">
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <div className="space-y-2">
                  <p className="text-3xl">⬆</p>
                  <p className="text-white font-medium">Upload Blog Image</p>
                  <p className="text-slate-400 text-sm">(PNG, JPG, WEBP) 150-200kB</p>
                </div>
              </label>
            )}
          </div>
        </div>

        {/* Form Fields */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter Blog Title"
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-red-600"
              maxLength={200}
              required
            />
            <p className="text-xs text-slate-500 mt-1">{formData.title.length}/200</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Author Name</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              placeholder="Enter Author Name"
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-red-600"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Content</label>
            <div className="bg-slate-700 border border-slate-600 rounded-lg p-4 mb-2">
              <div className="flex flex-wrap gap-2 mb-4 pb-4 border-b border-slate-600">
                <button
                  type="button"
                  className="px-3 py-1 bg-slate-600 hover:bg-slate-500 rounded text-xs font-semibold"
                  title="Bold"
                >
                  B
                </button>
                <button
                  type="button"
                  className="px-3 py-1 bg-slate-600 hover:bg-slate-500 rounded text-xs italic font-semibold"
                  title="Italic"
                >
                  I
                </button>
                <button
                  type="button"
                  className="px-3 py-1 bg-slate-600 hover:bg-slate-500 rounded text-xs font-semibold"
                  title="Link"
                >
                  🔗
                </button>
                <button
                  type="button"
                  className="px-3 py-1 bg-slate-600 hover:bg-slate-500 rounded text-xs font-semibold"
                  title="Bullet List"
                >
                  ⋮
                </button>
                <button
                  type="button"
                  className="px-3 py-1 bg-slate-600 hover:bg-slate-500 rounded text-xs font-semibold"
                  title="Number List"
                >
                  1.
                </button>
                <div className="ml-auto flex gap-2">
                  <input
                    type="number"
                  defaultValue="14"
                    min="10"
                    max="32"
                    className="w-12 px-2 py-1 bg-slate-600 rounded text-xs text-center"
                  />
                  <span className="text-xs">px</span>
                </div>
              </div>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="Write your blog content here..."
                className="w-full h-48 bg-slate-700 text-white placeholder-slate-500 focus:outline-none p-0 resize-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Keywords <span className="text-slate-500">(Press Enter to add)</span>
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter keyword"
                className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-red-600"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-red-600/20 text-red-400 rounded-full text-sm flex items-center gap-2"
                >
                  {keyword}
                  <button
                    type="button"
                    onClick={() => handleRemoveKeyword(index)}
                    className="hover:text-red-300 font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Alt Text <span className="text-slate-500">(Max 125 characters)</span>
            </label>
            <textarea
              name="altText"
              value={formData.altText}
              onChange={handleInputChange}
              placeholder="Describe the image for accessibility"
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-red-600 h-20 resize-none"
              maxLength={125}
            />
            <p className="text-xs text-slate-500 mt-1">{formData.altText.length}/125</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 justify-end">
          <Link
            href="/admin/articles"
            className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition font-medium"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-red-600/50 rounded-lg transition font-medium"
          >
            {loading ? 'Posting...' : isEdit ? 'Update Blog' : 'Post Blog'}
          </button>
        </div>
      </form>
    </div>
  );
}