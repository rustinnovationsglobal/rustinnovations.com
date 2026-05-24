'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Employee } from '@/types/admin';

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([
    {
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
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this employee?')) {
      setEmployees(employees.filter((emp) => emp.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Employees</h1>
        <Link
          href="/admin/employees/new"
          className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
        >
          <span>+</span>
          <span>Register Employee</span>
        </Link>
      </div>

      {/* Search */}
      <div>
        <input
          type="text"
          placeholder="Search employees..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-red-600"
        />
      </div>

      {/* Employees List */}
      <div className="space-y-3">
        {filteredEmployees.length > 0 ? (
          filteredEmployees.map((employee) => (
            <div
              key={employee.id}
              className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition"
            >
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 rounded-full bg-slate-700 flex-shrink-0 overflow-hidden">
                  {employee.image && (
                    <img
                      src={employee.image}
                      alt={employee.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                <div className="flex-1">
                  <p className="text-slate-400 text-sm">Employee ID</p>
                  <p className="text-xl font-bold text-red-600 mb-3">
                    {employee.employeeId}
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-slate-400 text-xs">Name</p>
                      <p className="font-semibold">{employee.name}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs">Role</p>
                      <p className="font-semibold">{employee.role}</p>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="mb-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        employee.status === 'Active'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {employee.status}
                    </span>
                  </div>

                  <div className="flex gap-2 justify-end">
                    <Link
                      href={`/admin/employees/${employee.id}`}
                      className="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded transition text-sm"
                    >
                      View
                    </Link>
                    <Link
                      href={`/admin/employees/${employee.id}/edit`}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded transition text-sm"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(employee.id)}
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded transition text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-400">No employees found</p>
          </div>
        )}
      </div>
    </div>
  );
}