'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import QRCode from 'qrcode.react';
import { generateQRData, formatDateDisplay } from '@/lib/admin-utils';
import { Employee } from '@/types/admin';

export default function EmployeeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [employee, setEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    // Mock data - replace with actual database fetch
    const mockEmployee: Employee = {
      id: params.id as string,
      employeeId: '#RM-293893',
      name: 'RASHID MAHMOOD',
      fatherName: 'ZAHID MAHMOOD',
      role: 'COUNTRY HEAD-PAK',
      joiningDate: '2023-09-30',
      status: 'Active',
      image: '/placeholder-avatar.jpg',
      isCoreMember: true,
      createdAt: new Date().toISOString(),
    };
    setEmployee(mockEmployee);
  }, [params.id]);

  if (!employee) {
    return <div className="text-white">Loading...</div>;
  }

  const qrData = generateQRData(employee);

  return (
    <div className="space-y-6">
      <Link href="/admin/employees" className="text-slate-400 hover:text-white transition">
        &lt; Back
      </Link>

      <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 space-y-8">
        {/* Profile Section */}
        <div className="flex items-start gap-8">
          <div className="w-32 h-32 rounded-full bg-slate-700 flex-shrink-0 overflow-hidden border-2 border-red-600">
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
            <p className="text-3xl font-bold text-red-600 mb-6">{employee.employeeId}</p>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-slate-400 text-xs mb-1">Name</p>
                <p className="font-bold text-lg">{employee.name}</p>
              </div>
              <div>
                <p className="text-slate-400 text-xs mb-1">F-Name</p>
                <p className="font-bold text-lg">{employee.fatherName}</p>
              </div>
              <div>
                <p className="text-slate-400 text-xs mb-1">Role</p>
                <p className="font-bold text-lg">{employee.role}</p>
              </div>
              <div>
                <p className="text-slate-400 text-xs mb-1">Joining Date</p>
                <p className="font-bold text-lg">{formatDateDisplay(employee.joiningDate)}</p>
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="mb-4">
              <span
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  employee.status === 'Active'
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-red-500/20 text-red-400'
                }`}
              >
                {employee.status}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <Link
                href={`/admin/employees/${employee.id}/edit`}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition font-medium"
              >
                ✎ Edit
              </Link>
            </div>
          </div>
        </div>

        {/* QR Code Section */}
        <div className="border-t border-slate-700 pt-8">
          <h2 className="text-xl font-bold mb-4">QR Code</h2>
          <div className="flex items-center gap-8">
            <div className="bg-white p-4 rounded-lg">
              <QRCode value={qrData} size={200} level="H" includeMargin={true} />
            </div>
            <div>
              <p className="text-slate-400 text-sm mb-2">Employee Verification QR</p>
              <p className="text-slate-300 text-sm mb-4">
                Scan this QR to verify employee information
              </p>
              <a
                href={`data:image/png;base64,${btoa(qrData)}`}
                download={`${employee.employeeId}-qr.png`}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded transition font-medium inline-block"
              >
                ⬇ Download QR Code
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}