export function generateEmployeeId(name: string, fatherName: string): string {
  const nameInitial = name.charAt(0).toUpperCase();
  const fatherInitial = fatherName.charAt(0).toUpperCase();
  const randomNum = Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, '0');
  return `#${nameInitial}${fatherInitial}-${randomNum}`;
}

export function generateQRData(employee: {
  employeeId: string;
  name: string;
  fatherName: string;
  role: string;
  joiningDate: string;
  status: string;
}): string {
  return JSON.stringify({
    employeeId: employee.employeeId,
    name: employee.name,
    fatherName: employee.fatherName,
    role: employee.role,
    joiningDate: employee.joiningDate,
    status: employee.status,
    verifiedAt: new Date().toISOString(),
  });
}

export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toISOString().split('T')[0];
}

export function formatDateDisplay(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
