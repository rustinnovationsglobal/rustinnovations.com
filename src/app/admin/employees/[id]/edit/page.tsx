'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { generateEmployeeId, generateQRData } from '@/lib/admin-utils';
import { Employee } from '@/types/admin';

export default function EmployeeFormPage() {
  const params = useParams();
  const router = useRouter();
  const isEdit = params.id !== 'new' && params.id;

  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    role: '',
    joiningDate: '',
    status: 'Active' as const,
  });

  const [employeeId, setEmployeeId] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isCoreMember, setIsCoreMember] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      // Load existing employee data
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
      setFormData({
        name: mockEmployee.name,
        fatherName: mockEmployee.fatherName,
        role: mockEmployee.role,
        joiningDate: mockEmployee.joiningDate,
        status: mockEmployee.status,
      });
      setEmployeeId(mockEmployee.employeeId);
      setIsCoreMember(mockEmployee.isCoreMember || false);
      setImage(mockEmployee.image || null);
    }
  }, [params.id, isEdit]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateEmployeeId = () => {
    if (formData.name && formData.fatherName) {
      const newId = generateEmployeeId(formData.name, formData.fatherName);
      setEmployeeId(newId);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
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

    // Mock save - replace with actual database save
    await new Promise((resolve) => setTimeout(resolve, 500));

    console.log('Saving employee:', {
      ...formData,
      employeeId,
      image,
      isCoreMember,
    });

    setLoading(false);
    router.push('/admin/employees');
  };

  return (
    <div className="space-y-6">
      <Link href="/admin/employees" className="text-slate-400 hover:text-white transition">
        &lt; Back
      </Link>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image Upload */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-8">
          <div className="flex items-center gap-6">
            <div className="w-32 h-32 rounded-full bg-slate-700 flex-shrink-0 overflow-hidden border-2 border-slate-600 flex items-center justify-center">
              {image ? (
                <img src={image} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <span className="text-3xl">👤</span>
              )}
            </div>

            <div className="flex-1">
              <label className="block">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <span className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded transition cursor-pointer inline-block">
                  ⬆ Upload New Image
                </span>
              </label>
              <p className="text-slate-400 text-xs mt-2">PNG, JPG or WEBP</p>
            </div>

            <div>
              <p className="text-slate-400 text-xs mb-1">Employee ID</p>
              <p className="text-2xl font-bold text-red-600">{employeeId || '#NE-000000'}</p>
              <button
                type="button"
                onClick={handleGenerateEmployeeId}
                className="mt-2 px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded text-sm transition"
              >
                Generate ID
              </button>
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="John Smith"
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-red-600"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Father Name
              </label>
              <input
                type="text"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleInputChange}
                placeholder="John David"
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-red-600"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Role</label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                placeholder="Founder, CEO"
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-red-600"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Joining Date
              </label>
              <input
                type="date"
                name="joiningDate"
                value={formData.joiningDate}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-red-600"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-red-600"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div>
              <label className="flex items-center gap-3 mt-8">
                <input
                  type="checkbox"
                  checked={isCoreMember}
                  onChange={(e) => setIsCoreMember(e.target.checked)}
                  className="w-4 h-4 rounded"
                />
                <span className="text-sm font-medium text-slate-300">Core Team Member</span>
              </label>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 justify-end">
          <Link
            href="/admin/employees"
            className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition font-medium"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-red-600/50 rounded-lg transition font-medium"
          >
            {loading ? 'Saving...' : isEdit ? 'Update Employee' : 'Save Employee'}
          </button>
        </div>
      </form>
    </div>
  );
}