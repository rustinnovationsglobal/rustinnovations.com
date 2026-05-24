export interface Employee {
  id: string;
  employeeId: string;
  name: string;
  fatherName: string;
  role: string;
  joiningDate: string;
  status: 'Active' | 'Inactive';
  image?: string;
  isCoreMember?: boolean;
  createdAt: string;
}

export interface Blog {
  id: string;
  title: string;
  author: string;
  content: string;
  coverImage: string;
  keywords: string[];
  altText: string;
  publishedDate: string;
  createdAt: string;
}

export interface Admin {
  id: string;
  email: string;
  password?: string;
  createdAt: string;
}
