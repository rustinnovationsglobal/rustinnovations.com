'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      router.replace('/admin/dashboard');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Demo credentials - replace with actual auth service
    if (email === 'admin@rustinnovations.com' && password === 'admin123') {
      localStorage.setItem('adminToken', 'demo-token-' + Date.now());
      localStorage.setItem('adminEmail', email);
      router.replace('/admin/dashboard');
    } else {
      setError('Invalid email or password');
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 rounded-2xl mb-4">
            <span className="text-2xl font-bold text-white">RI</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">RUSTINNOVATIONS</h1>
          <p className="text-slate-400">Admin Portal</p>
        </div>

        {/* Login Card */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-8 backdrop-blur">
          <h2 className="text-2xl font-bold text-white mb-6">Admin Login</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@rustinnovations.com"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-red-600 transition"
                required
              />
              <p className="text-xs text-slate-500 mt-1">Demo: admin@rustinnovations.com</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-red-600 transition"
                required
              />
              <p className="text-xs text-slate-500 mt-1">Demo: admin123</p>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 disabled:bg-red-600/50 text-white font-semibold rounded-lg transition mt-6"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
