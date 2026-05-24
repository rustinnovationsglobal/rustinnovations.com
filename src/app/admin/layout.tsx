'use client';

import type { ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const email = localStorage.getItem('adminEmail');

    if (!token || pathname === '/admin/login') {
      setIsLoading(false);
      if (token && pathname === '/admin/login') {
        router.push('/admin/dashboard');
      }
      return;
    }

    if (token && email) {
      setIsAuthenticated(true);
      setUserEmail(email);
    } else {
      router.push('/admin/login');
    }
    setIsLoading(false);
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    router.push('/admin/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (pathname === '/admin/login') {
    return (
      <div className="min-h-screen bg-slate-950 text-white">{children}</div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex h-screen bg-slate-950 text-white">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-900 border-r border-slate-800 flex flex-col overflow-y-auto">
        <div className="p-6 border-b border-slate-800 flex-shrink-0">
          <Link href="/admin/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center font-bold text-sm">
              RI
            </div>
            <span className="text-lg font-bold text-red-600">RUST<br />INNOVATIONS</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link
            href="/admin/employees"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              pathname.startsWith('/admin/employees')
                ? 'bg-slate-800 text-white'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <span className="text-xl">👥</span>
            <span>Employees</span>
          </Link>

          <Link
            href="/admin/articles"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              pathname.startsWith('/admin/articles')
                ? 'bg-slate-800 text-white'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <span className="text-xl">📝</span>
            <span>Articles</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-800 flex-shrink-0">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition text-sm font-medium"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-slate-900 border-b border-slate-800 px-8 py-4 flex items-center justify-between flex-shrink-0">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <div className="flex items-center gap-4">
            <span className="text-slate-300 text-sm">{userEmail}</span>
            <button
              onClick={handleLogout}
              className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition"
              title="Logout"
            >
              👤
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
