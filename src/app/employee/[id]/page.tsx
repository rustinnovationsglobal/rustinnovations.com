import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getEmployee } from '@/lib/supabase';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const employee = await getEmployee(params.id);

  if (!employee) {
    return { title: 'Employee Not Found' };
  }

  return {
    title: `${employee.first_name} ${employee.last_name} | Employee Verification`,
    description: `Verified employee record for ${employee.first_name} ${employee.last_name}.`,
  };
}

export default async function EmployeeVerificationPage({ params }: Props) {
  const employee = await getEmployee(params.id);

  if (!employee) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-16 text-white">
      <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-primary">Employment Verification</p>
            <h1 className="text-4xl font-semibold text-white">
              {employee.first_name} {employee.last_name}
            </h1>
            <p className="text-sm text-slate-400">Verified employee record from the Rust Innovations admin panel.</p>
          </div>
          <div className="flex items-center gap-4 rounded-3xl border border-white/10 bg-slate-950/80 p-4">
            {employee.image_url ? (
              <Image
                src={employee.image_url}
                alt={`${employee.first_name} ${employee.last_name}`}
                width={120}
                height={120}
                className="h-28 w-28 rounded-3xl object-cover"
              />
            ) : (
              <div className="flex h-28 w-28 items-center justify-center rounded-3xl bg-white/5 text-sm text-slate-400">
                No image
              </div>
            )}
          </div>
        </div>

        <div className="mt-10 grid gap-6 rounded-3xl border border-white/10 bg-slate-950/80 p-6 sm:grid-cols-2">
          <div className="space-y-3">
            <p className="text-sm text-slate-400">Employee ID</p>
            <p className="text-lg font-semibold text-white">{employee.id}</p>
          </div>
          <div className="space-y-3">
            <p className="text-sm text-slate-400">Role</p>
            <p className="text-lg font-semibold text-white">{employee.role}</p>
          </div>
          <div className="space-y-3">
            <p className="text-sm text-slate-400">Email</p>
            <p className="text-lg font-semibold text-white">{employee.email}</p>
          </div>
          <div className="space-y-3">
            <p className="text-sm text-slate-400">Record created</p>
            <p className="text-lg font-semibold text-white">{new Date(employee.created_at).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-slate-950/80 p-6 text-slate-300">
          <p className="text-sm uppercase tracking-[0.3em] text-primary">Verification details</p>
          <p className="mt-4 text-base leading-7">
            This employee verification page is generated from the secure admin portal. If you see this page, the supplied QR code and employee data are valid for public verification.
          </p>
        </div>
      </div>
    </div>
  );
}
