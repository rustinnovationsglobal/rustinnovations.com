'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Employee } from '@/types/admin';
import { formatDateDisplay } from '@/lib/admin-utils';

export default function RustPassPage() {
  const [employeeId, setEmployeeId] = useState('');
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setEmployee(null);

    await new Promise((resolve) => setTimeout(resolve, 500));

    if (employeeId === '#RM-293893') {
      setEmployee({
        id: '1',
        employeeId: '#RM-293893',
        name: 'RASHID MAHMOOD',
        fatherName: 'ZAHID MAHMOOD',
        role: 'COUNTRY HEAD-PAK',
        joiningDate: '2023-09-30',
        status: 'Active',
        image: '/placeholder-avatar.jpg',
        isCoreMember: true,
        createdAt: new Date().toISOString(),
      });
    } else {
      setError('Employee ID not found in system');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center font-bold text-white">
              RI
            </div>
            <span className="text-lg font-bold text-red-600 hidden sm:inline">RUSTINNOVATIONS</span>
          </Link>
          <Link href="/" className="text-slate-400 hover:text-white transition">
            ← Back to Website
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">👆</div>
          <h1 className="text-4xl font-bold text-white mb-4">RustPass Verification</h1>
          <p className="text-slate-400">Secure employee identity verification system</p>
        </div>

        {/* Search Form */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 mb-8">
          <form onSubmit={handleSearch} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Enter Employee ID
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value.toUpperCase())}
                  placeholder="#RM-293893"
                  className="flex-1 px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-red-600 transition"
                  required
                />
              </div>
              <p className="text-xs text-slate-500 mt-1">Demo ID: #RM-293893</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 disabled:bg-red-600/50 text-white font-semibold rounded-lg transition"
            >
              {loading ? 'Verifying...' : 'Verify Employee'}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}
        </div>

        {/* Employee Details */}
        {employee && (
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 space-y-8 animate-in">
            <div className="text-center mb-8">
              <div className="w-32 h-32 rounded-full bg-slate-700 mx-auto mb-6 overflow-hidden border-4 border-red-600 flex items-center justify-center">
                {employee.image ? (
                  <img
                    src={employee.image}
                    alt={employee.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-5xl">👤</span>
                )}
              </div>

              <h2 className="text-3xl font-bold text-white mb-2">{employee.name}</h2>
              <p className="text-slate-400 mb-4">{employee.role}</p>

              <div className="flex flex-wrap justify-center gap-2">
                <span
                  className={`px-4 py-2 rounded-full font-medium ${
                    employee.status === 'Active'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}
                >
                  {employee.status}
                </span>
                <span className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-full font-medium">
                  ✓ RustPass Verified
                </span>
              </div>
            </div>

            {/* Details */}
            <div className="border-t border-slate-700 pt-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-700/50 p-3 rounded-lg">
                  <p className="text-slate-400 text-xs mb-1">Full Name</p>
                  <p className="font-bold">{employee.name}</p>
                </div>

                <div className="bg-slate-700/50 p-3 rounded-lg">
                  <p className="text-slate-400 text-xs mb-1">Employee ID</p>
                  <p className="font-bold text-red-600">{employee.employeeId}</p>
                </div>

                <div className="bg-slate-700/50 p-3 rounded-lg">
                  <p className="text-slate-400 text-xs mb-1">Father Name</p>
                  <p className="font-bold">{employee.fatherName}</p>
                </div>

                <div className="bg-slate-700/50 p-3 rounded-lg">
                  <p className="text-slate-400 text-xs mb-1">Joined</p>
                  <p className="font-bold">{formatDateDisplay(employee.joiningDate)}</p>
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="border-t border-slate-700 pt-8 text-center">
              <div className="inline-flex items-center justify-center gap-2 mb-2">
                <span className="text-2xl">✓</span>
                <span className="text-green-400 font-semibold">Identity Verified</span>
              </div>
              <p className="text-slate-400 text-sm">{new Date().toLocaleString()}</p>
            </div>

            <button
              onClick={() => {
                setEmployee(null);
                setEmployeeId('');
              }}
              className="w-full px-4 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition font-medium"
            >
              Verify Another ID
            </button>
          </div>
        )}

        {/* Info Card */}
        {!employee && (
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 text-center">
            <p className="text-slate-400 text-sm">
              RustPass is our secure employee verification system. Enter an employee ID to verify their information.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}