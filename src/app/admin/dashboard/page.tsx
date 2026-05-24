'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  supabase,
  getEmployees,
  getBlogPosts,
  getQuotes,
  uploadSupabaseFile,
  upsertEmployee,
  deleteEmployee,
  upsertBlog,
  deleteBlog,
  deleteAllBlogs,
} from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import QRCode from 'qrcode';

const defaultEmployee = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  role: '',
  createdAt: '',
  imageUrl: '',
};

const defaultBlogForm = {
  id: '',
  title: '',
  author: '',
  excerpt: '',
  description: '',
  content: '',
  imageUrl: '',
  keywords: [] as string[],
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [quotes, setQuotes] = useState<Array<{ id: string; quote: string; author: string }>>([]);
  const [employees, setEmployees] = useState<Array<any>>([]);
  const [blogs, setBlogs] = useState<Array<any>>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [employeeForm, setEmployeeForm] = useState({ ...defaultEmployee });
  const [employeeImageFile, setEmployeeImageFile] = useState<File | null>(null);
  const [employeeImagePreview, setEmployeeImagePreview] = useState('');
  const [quoteAuthor, setQuoteAuthor] = useState('');
  const [quoteText, setQuoteText] = useState('');
  const [blogForm, setBlogForm] = useState({
    ...defaultBlogForm,
  });
  const [keywordInput, setKeywordInput] = useState('');
  const [blogImageFile, setBlogImageFile] = useState<File | null>(null);
  const [blogImagePreview, setBlogImagePreview] = useState('');
  const [qrCode, setQrCode] = useState('');
  const blogContentRef = useRef<HTMLTextAreaElement | null>(null);

  const [authState, setAuthState] = useState<'unknown' | 'signed-in' | 'signed-out'>('unknown');
  const [session, setSession] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'employees' | 'blogs'>('employees');
  const [editingEmployeeId, setEditingEmployeeId] = useState<string | null>(null);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    // Get the session first, then subscribe to changes.
    // onAuthStateChange alone can fire SIGNED_OUT before the token is ready.
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      if (data.session) {
        setSession(data.session);
        setAuthState('signed-in');
      } else {
        setAuthState('signed-out');
      }
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;
      // Ignore transient events that don't reflect actual sign-in state
      if (event === 'TOKEN_REFRESHED' || event === 'INITIAL_SESSION') return;

      if (session) {
        setSession(session);
        setAuthState('signed-in');
      } else {
        setAuthState('signed-out');
      }
    });

    return () => {
      mounted = false;
      authListener?.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    // Only redirect once we've confirmed there's no session (not while still loading)
    if (authState === 'signed-out') {
      router.replace('/admin/login');
    }
  }, [authState, router]);

  useEffect(() => {
    if (authState !== 'signed-in') {
      return;
    }

    setLoading(true);
    Promise.all([getEmployees(), getBlogPosts(), getQuotes()])
      .then(([employeeList, blogList, quoteList]) => {
        setEmployees(employeeList);
        setBlogs(blogList);
        setQuotes(quoteList);
        if (!selectedEmployee && employeeList.length > 0) {
          setSelectedEmployee(employeeList[0]);
        }
      })
      .catch((fetchError) => {
        console.error(fetchError);
        setError('Unable to load admin data.');
      })
      .finally(() => setLoading(false));
  }, [authState]);

  useEffect(() => {
    if (!selectedEmployee) {
      setQrCode('');
      return;
    }

    const employeeUrl = `${window.location.origin}/employee/${selectedEmployee.id}`;
    QRCode.toDataURL(employeeUrl, { width: 280 })
      .then(setQrCode)
      .catch(() => setQrCode(''));
  }, [selectedEmployee]);

  const refreshData = async () => {
    setLoading(true);
    const [employeeList, blogList, quoteList] = await Promise.all([getEmployees(), getBlogPosts(), getQuotes()]);
    setEmployees(employeeList);
    setBlogs(blogList);
    setQuotes(quoteList);
    setLoading(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.replace('/admin/login');
  };

  const MAX_IMAGE_SIZE = 4 * 1024 * 1024;

  const handleEmployeeFile = (file: File | null) => {
    setEmployeeImageFile(file);
    setEmployeeImagePreview(file ? URL.createObjectURL(file) : '');
  };

  const handleBlogImageFile = (file: File | null) => {
    if (file && file.size > MAX_IMAGE_SIZE) {
      setError('Blog image must be 4MB or smaller.');
      return;
    }
    setBlogImageFile(file);
    setBlogImagePreview(file ? URL.createObjectURL(file) : '');
  };

  const handleBlogImageDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0] ?? null;
    handleBlogImageFile(file);
  };

  const uploadImage = async (file: File | null) => {
    if (!file) {
      return '';
    }

    try {
      return await uploadSupabaseFile(file, 'uploads');
    } catch (uploadError) {
      console.warn(uploadError);
      return URL.createObjectURL(file);
    }
  };

  const resetEmployeeForm = () => {
    setEditingEmployeeId(null);
    setEmployeeForm({ ...defaultEmployee });
    setEmployeeImageFile(null);
    setEmployeeImagePreview('');
  };

  const handleNewEmployee = () => {
    resetEmployeeForm();
    setActiveTab('employees');
  };

  const handleEmployeeEdit = (employee: any) => {
    setActiveTab('employees');
    setEditingEmployeeId(employee.id);
    setEmployeeForm({
      id: employee.id,
      firstName: employee.first_name,
      lastName: employee.last_name,
      email: employee.email,
      role: employee.role,
      createdAt: employee.created_at ? employee.created_at.slice(0, 10) : '',
      imageUrl: employee.image_url ?? '',
    });
    setEmployeeImagePreview(employee.image_url ?? '');
  };

  const handleEmployeeRemove = async (employee: any) => {
    if (!confirm(`Delete ${employee.first_name} ${employee.last_name} from employees?`)) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const error = await deleteEmployee(employee.id);
      if (error) {
        throw error;
      }
      if (editingEmployeeId === employee.id) {
        resetEmployeeForm();
      }
      await refreshData();
    } catch (deleteError: any) {
      console.error(deleteError);
      setError(deleteError.message || 'Failed to delete employee.');
    } finally {
      setLoading(false);
    }
  };

  const handleEmployeeSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const image_url =
        employeeImageFile && employeeImageFile.size > 0
          ? await uploadImage(employeeImageFile)
          : employeeForm.imageUrl;

      const record = {
        id: employeeForm.id || crypto.randomUUID(),
        first_name: employeeForm.firstName,
        last_name: employeeForm.lastName,
        email: employeeForm.email,
        role: employeeForm.role,
        created_at: employeeForm.createdAt || new Date().toISOString(),
        image_url,
      };

      const error = await upsertEmployee(record);
      if (error) {
        throw error;
      }

      resetEmployeeForm();
      await refreshData();
    } catch (saveError: any) {
      console.error(saveError);
      setError(saveError.message || 'Failed to save employee.');
    } finally {
      setLoading(false);
    }
  };

  const handleBlogEdit = (blog: any) => {
    setActiveTab('blogs');
    setEditingBlogId(blog.id);
    setBlogForm({
      id: blog.id,
      title: blog.title,
      author: blog.author,
      excerpt: blog.excerpt,
      description: blog.description ?? '',
      content: blog.content,
      imageUrl: blog.imageUrl,
      keywords: blog.tags ?? [],
    });
    setKeywordInput('');
    setBlogImagePreview(blog.imageUrl || '');
  };

  const handleBlogRemove = async (blog: any) => {
    if (!confirm(`Delete blog “${blog.title}”?`)) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const error = await deleteBlog(blog.id);
      if (error) {
        throw error;
      }
      if (editingBlogId === blog.id) {
        setEditingBlogId(null);
        setBlogForm({ ...defaultBlogForm });
        setBlogImageFile(null);
        setBlogImagePreview('');
        setKeywordInput('');
      }
      await refreshData();
    } catch (deleteError: any) {
      console.error(deleteError);
      setError(deleteError.message || 'Failed to delete blog.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAllBlogs = async () => {
    if (!confirm('Delete all blogs permanently?')) {
      return;
    }
    setLoading(true);
    setError('');
    try {
      const error = await deleteAllBlogs();
      if (error) {
        throw error;
      }
      setEditingBlogId(null);
      setBlogForm({ ...defaultBlogForm });
      setBlogImageFile(null);
      setBlogImagePreview('');
      setKeywordInput('');
      await refreshData();
    } catch (deleteError: any) {
      console.error(deleteError);
      setError(deleteError.message || 'Failed to delete all blogs.');
    } finally {
      setLoading(false);
    }
  };

  const handleBlogSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const image_url =
        blogImageFile && blogImageFile.size > 0
          ? await uploadImage(blogImageFile)
          : blogForm.imageUrl;

      const record = {
        id: editingBlogId || blogForm.id || crypto.randomUUID(),
        title: blogForm.title,
        author: blogForm.author,
        published_at: new Date().toISOString(),
        keywords: blogForm.keywords,
        image_url,
        excerpt: blogForm.excerpt,
        description: blogForm.description,
        content: blogForm.content,
      };

      const error = await upsertBlog(record);
      if (error) {
        throw error;
      }

      setEditingBlogId(null);
      setBlogForm({ ...defaultBlogForm });
      setKeywordInput('');
      setBlogImageFile(null);
      setBlogImagePreview('');
      await refreshData();
    } catch (saveError: any) {
      console.error(saveError);
      setError(saveError.message || 'Failed to save blog.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuoteSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error: createError } = await supabase.from('quotes').insert([
        {
          id: crypto.randomUUID(),
          quote: quoteText,
          author: quoteAuthor,
          created_at: new Date().toISOString(),
        },
      ]);

      if (createError) {
        throw createError;
      }

      setQuoteAuthor('');
      setQuoteText('');
      await refreshData();
    } catch (saveError: any) {
      console.error(saveError);
      setError(saveError.message || 'Failed to save quote.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeywordKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') {
      return;
    }

    event.preventDefault();

    const value = keywordInput.trim();
    if (!value) {
      return;
    }

    setBlogForm((current) => {
      if (current.keywords.length >= 8) {
        setError('Maximum 8 keywords allowed for SEO.');
        return current;
      }

      const nextKeywords = Array.from(new Set([...current.keywords, value]));
      return {
        ...current,
        keywords: nextKeywords,
      };
    });
    setKeywordInput('');
  };

  const removeKeyword = (keyword: string) => {
    setBlogForm((current) => ({
      ...current,
      keywords: current.keywords.filter((item) => item !== keyword),
    }));
  };

  const formatSelection = (wrapper: (selected: string) => string) => {
    const textarea = blogContentRef.current;
    if (!textarea) {
      return;
    }

    const selectionStart = textarea.selectionStart;
    const selectionEnd = textarea.selectionEnd;
    const selectedText = blogForm.content.slice(selectionStart, selectionEnd) || 'Text';

    const nextContent =
      blogForm.content.slice(0, selectionStart) +
      wrapper(selectedText) +
      blogForm.content.slice(selectionEnd);

    setBlogForm((current) => ({ ...current, content: nextContent }));
  };

  const applyFormat = (
    type: 'bold' | 'italic' | 'underline' | 'boldItalic' | 'size' | 'heading' | 'link'
  ) => {
    if (type === 'bold') {
      formatSelection((text) => `<strong>${text}</strong>`);
      return;
    }
    if (type === 'italic') {
      formatSelection((text) => `<em>${text}</em>`);
      return;
    }
    if (type === 'underline') {
      formatSelection((text) => `<u>${text}</u>`);
      return;
    }
    if (type === 'boldItalic') {
      formatSelection((text) => `<strong><em>${text}</em></strong>`);
      return;
    }
    if (type === 'size') {
      formatSelection((text) => `<span style="font-size:1.1rem">${text}</span>`);
      return;
    }
    if (type === 'heading') {
      formatSelection((text) => `<h1 style="font-family:Ubuntu, sans-serif; font-weight:700;">${text}</h1>`);
      return;
    }
    if (type === 'link') {
      const url = window.prompt('Enter the URL for the link');
      if (!url) {
        return;
      }
      formatSelection((text) => `<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>`);
    }
  };

  const employeeDetails = useMemo(() => {
    if (!selectedEmployee) return null;
    return (
      <div className="rounded-xl border border-white/10 bg-slate-900/80 p-6">
        <div className="flex items-center gap-4">
          <div className="h-20 w-20 overflow-hidden rounded-2xl bg-white/5">
            {selectedEmployee.image_url ? (
              <img src={selectedEmployee.image_url} alt={selectedEmployee.first_name} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center bg-white/5 text-sm text-slate-400">No image</div>
            )}
          </div>
          <div>
            <p className="text-lg font-semibold text-white">
              {selectedEmployee.first_name} {selectedEmployee.last_name}
            </p>
            <p className="text-sm text-slate-400">{selectedEmployee.role}</p>
          </div>
        </div>
        <div className="mt-6 space-y-3 text-sm text-slate-300">
          <p>
            <span className="font-semibold text-slate-200">Employee ID:</span> {selectedEmployee.id}
          </p>
          <p>
            <span className="font-semibold text-slate-200">Email:</span> {selectedEmployee.email}
          </p>
          <p>
            <span className="font-semibold text-slate-200">Created on:</span>{' '}
            {new Date(selectedEmployee.created_at).toLocaleDateString()}
          </p>
        </div>
        {qrCode ? (
          <div className="mt-6 space-y-3">
            <img src={qrCode} alt="Employee QR code" className="h-48 w-48 rounded-xl border border-white/10 bg-white/5 p-3" />
            <Button type="button" onClick={() => {
              const link = document.createElement('a');
              link.href = qrCode;
              link.download = `employee-${selectedEmployee.id}.png`;
              link.click();
            }}>
              Download QR Code
            </Button>
          </div>
        ) : null}
      </div>
    );
  }, [qrCode, selectedEmployee]);

  if (authState === 'unknown') {
    return (
      <div className="min-h-screen bg-slate-950 px-4 py-20 text-white">
        <div className="mx-auto max-w-xl rounded-3xl border border-white/10 bg-slate-900/80 p-8 text-center">
          <p className="text-lg font-semibold">Loading admin dashboard…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8">
      <div className="mx-auto max-w-[1600px] space-y-6">
        <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-slate-900/90 p-6 shadow-xl sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-primary">Admin Portal</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">Employment Verification Dashboard</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              Manage employees, publish blog posts, and maintain quotes for the public site. The QR codes link to employee verification pages.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button variant="secondary" onClick={handleSignOut}>
              Sign Out
            </Button>
            <Button variant="outline" onClick={refreshData}>
              Refresh Data
            </Button>
          </div>
        </div>

        {error ? (
          <div className="rounded-3xl border border-destructive/20 bg-destructive/10 p-4 text-sm text-destructive">
            {error}
          </div>
        ) : null}

        <section className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-white/10 bg-slate-900/80 p-4">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${activeTab === 'employees'
                    ? 'bg-white text-slate-950 border-white/90'
                    : 'bg-slate-950 text-slate-400 border-white/10 hover:border-white/20'
                  }`}
                onClick={() => setActiveTab('employees')}
              >
                Employees
              </button>
              <button
                type="button"
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${activeTab === 'blogs'
                    ? 'bg-white text-slate-950 border-white/90'
                    : 'bg-slate-950 text-slate-400 border-white/10 hover:border-white/20'
                  }`}
                onClick={() => setActiveTab('blogs')}
              >
                Blogs
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" onClick={refreshData}>
                Refresh Data
              </Button>
              <Button variant="outline" onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>
          </div>

          <div className="grid gap-8 xl:grid-cols-[1fr_420px]">
            <div className="space-y-6">
              {activeTab === 'employees' ? (
                <>
                  <Card className="rounded-3xl border-white/10 bg-slate-900/80">
                    <CardHeader>
                      <div>
                        <CardTitle>Employees</CardTitle>
                        <p className="text-sm text-slate-400">
                          Manage employees in the database, edit details, or remove records as needed.
                        </p>
                      </div>
                      <Button onClick={handleNewEmployee}>
                        New Employee
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {employees.length === 0 ? (
                          <p className="text-sm text-slate-400">No employees found yet.</p>
                        ) : (
                          <div className="space-y-3">
                            {employees.map((employee) => (
                              <div
                                key={employee.id}
                                className="rounded-3xl border border-white/10 bg-slate-950/80 p-4"
                              >
                                <div className="flex flex-wrap items-center justify-between gap-3">
                                  <div>
                                    <p className="text-lg font-semibold text-white">
                                      {employee.first_name} {employee.last_name}
                                    </p>
                                    <p className="text-sm text-slate-400">{employee.role}</p>
                                  </div>
                                  <div className="flex gap-2">
                                    <Button size="sm" variant="outline" onClick={() => handleEmployeeEdit(employee)}>
                                      Edit
                                    </Button>
                                    <Button size="sm" variant="destructive" onClick={() => handleEmployeeRemove(employee)}>
                                      Remove
                                    </Button>
                                  </div>
                                </div>
                                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                                  <p className="text-sm text-slate-400">ID: {employee.id}</p>
                                  <p className="text-sm text-slate-400">Joined: {new Date(employee.created_at).toLocaleDateString()}</p>
                                </div>
                                <p className="mt-3 text-sm leading-6 text-slate-300">
                                  {employee.description ?? 'No description available.'}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="rounded-3xl border-white/10 bg-slate-900/80">
                    <CardHeader>
                      <CardTitle>{editingEmployeeId ? 'Edit Employee' : 'Add New Employee'}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleEmployeeSave} className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="employeeFirstName">First name</Label>
                            <Input
                              id="employeeFirstName"
                              value={employeeForm.firstName}
                              onChange={(event) => setEmployeeForm((form) => ({ ...form, firstName: event.target.value }))}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="employeeLastName">Last name</Label>
                            <Input
                              id="employeeLastName"
                              value={employeeForm.lastName}
                              onChange={(event) => setEmployeeForm((form) => ({ ...form, lastName: event.target.value }))}
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="employeeRole">Role</Label>
                          <Input
                            id="employeeRole"
                            value={employeeForm.role}
                            onChange={(event) => setEmployeeForm((form) => ({ ...form, role: event.target.value }))}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="employeeEmail">Email address</Label>
                          <Input
                            id="employeeEmail"
                            type="email"
                            value={employeeForm.email}
                            onChange={(event) => setEmployeeForm((form) => ({ ...form, email: event.target.value }))}
                            placeholder="Optional for now"
                          />
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="employeeCreatedAt">Joining date</Label>
                            <Input
                              id="employeeCreatedAt"
                              type="date"
                              value={employeeForm.createdAt.slice(0, 10)}
                              onChange={(event) => setEmployeeForm((form) => ({ ...form, createdAt: event.target.value }))}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="employeeImage">Picture upload</Label>
                            <Input
                              id="employeeImage"
                              type="file"
                              accept="image/png,image/jpeg,image/webp"
                              onChange={(event) => handleEmployeeFile(event.target.files?.[0] ?? null)}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="employeeImageUrl">Picture URL</Label>
                          <Input
                            id="employeeImageUrl"
                            value={employeeForm.imageUrl}
                            onChange={(event) => setEmployeeForm((form) => ({ ...form, imageUrl: event.target.value }))}
                            placeholder="https://..."
                          />
                        </div>
                        {employeeImagePreview ? (
                          <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80">
                            <img src={employeeImagePreview} alt="Employee preview" className="h-64 w-full object-cover" />
                          </div>
                        ) : null}
                        <div className="flex flex-wrap gap-3">
                          <Button type="submit" disabled={loading}>
                            {loading ? 'Saving…' : editingEmployeeId ? 'Update Employee' : 'Create Employee'}
                          </Button>
                          <Button type="button" variant="secondary" onClick={resetEmployeeForm}>
                            Clear form
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <>
                  <Card className="rounded-3xl border-white/10 bg-slate-900/80">
                    <CardHeader>
                      <div>
                        <CardTitle>Blog Manager</CardTitle>
                        <p className="text-sm text-slate-400">
                          Upload and edit blogs with SEO metadata, image control, and rich formatting.
                        </p>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleBlogSave} className="space-y-4">
                        <div className="grid gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="blogTitle">Title</Label>
                            <Input
                              id="blogTitle"
                              value={blogForm.title}
                              onChange={(event) => setBlogForm((form) => ({ ...form, title: event.target.value }))}
                              required
                            />
                          </div>
                          <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                              <Label htmlFor="blogAuthor">Author</Label>
                              <Input
                                id="blogAuthor"
                                value={blogForm.author}
                                onChange={(event) => setBlogForm((form) => ({ ...form, author: event.target.value }))}
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="blogDescription">SEO description</Label>
                              <Textarea
                                id="blogDescription"
                                value={blogForm.description}
                                onChange={(event) => setBlogForm((form) => ({ ...form, description: event.target.value }))}
                                rows={3}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>Formatting tools</Label>
                            <div className="flex flex-wrap gap-2">
                              <Button size="sm" variant="outline" type="button" onClick={() => applyFormat('bold')}>
                                Bold
                              </Button>
                              <Button size="sm" variant="outline" type="button" onClick={() => applyFormat('italic')}>
                                Italic
                              </Button>
                              <Button size="sm" variant="outline" type="button" onClick={() => applyFormat('underline')}>
                                Underline
                              </Button>
                              <Button size="sm" variant="outline" type="button" onClick={() => applyFormat('heading')}>
                                H1
                              </Button>
                              <Button size="sm" variant="outline" type="button" onClick={() => applyFormat('link')}>
                                Link
                              </Button>
                            </div>
                          </div>
                          <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                              <Label htmlFor="blogKeywords">SEO keywords</Label>
                              <Input
                                id="blogKeywords"
                                value={keywordInput}
                                onKeyDown={handleKeywordKeyDown}
                                onChange={(event) => setKeywordInput(event.target.value)}
                                placeholder="Type a keyword and press Enter"
                              />
                              <p className="text-xs text-slate-500">Max 8 keywords for SEO best practice.</p>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="blogImage">Cover image</Label>
                              <div
                                onDrop={handleBlogImageDrop}
                                onDragOver={(event) => event.preventDefault()}
                                className="rounded-3xl border border-dashed border-white/20 bg-slate-950/70 p-4 text-sm text-slate-400"
                              >
                                <p>Drag & drop a PNG, JPEG, or WEBP image here, or choose a file.</p>
                                <Input
                                  id="blogImage"
                                  type="file"
                                  accept="image/png,image/jpeg,image/webp"
                                  onChange={(event) => handleBlogImageFile(event.target.files?.[0] ?? null)}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="blogExcerpt">Excerpt</Label>
                            <Textarea
                              id="blogExcerpt"
                              value={blogForm.excerpt}
                              onChange={(event) => setBlogForm((form) => ({ ...form, excerpt: event.target.value }))}
                              rows={3}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="blogContent">Content</Label>
                            <Textarea
                              id="blogContent"
                              ref={blogContentRef}
                              value={blogForm.content}
                              onChange={(event) => setBlogForm((form) => ({ ...form, content: event.target.value }))}
                              rows={12}
                              required
                            />
                          </div>
                          {blogImagePreview ? (
                            <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80">
                              <img
                                src={blogImagePreview}
                                alt="Blog preview"
                                className="h-64 w-full object-cover"
                                loading="lazy"
                              />
                            </div>
                          ) : null}
                          <div className="flex flex-wrap gap-3">
                            <Button type="submit" disabled={loading}>
                              {loading ? 'Saving blog…' : editingBlogId ? 'Update Blog' : 'Upload Blog'}
                            </Button>
                            <Button type="button" variant="secondary" onClick={() => {
                              setEditingBlogId(null);
                              setBlogForm({ ...defaultBlogForm });
                              setBlogImageFile(null);
                              setBlogImagePreview('');
                              setKeywordInput('');
                            }}>
                              Clear form
                            </Button>
                            <Button type="button" variant="destructive" onClick={handleDeleteAllBlogs}>
                              Delete all blogs
                            </Button>
                          </div>
                        </div>
                      </form>
                    </CardContent>
                  </Card>

                  <Card className="rounded-3xl border-white/10 bg-slate-900/80">
                    <CardHeader>
                      <CardTitle>Published Blogs</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {blogs.length === 0 ? (
                        <p className="text-sm text-slate-400">No blogs found.</p>
                      ) : (
                        <div className="space-y-4">
                          {blogs.map((blog) => (
                            <article key={blog.id} className="rounded-3xl border border-white/10 bg-slate-950/80 p-4">
                              <div className="flex flex-wrap items-center justify-between gap-4">
                                <div className="space-y-1">
                                  <p className="text-lg font-semibold text-white font-['Ubuntu',sans-serif]">{blog.title}</p>
                                  <p className="text-sm text-slate-400">By {blog.author} • {new Date(blog.date).toLocaleDateString()}</p>
                                </div>
                                <div className="flex gap-2">
                                  <Button size="sm" variant="outline" onClick={() => handleBlogEdit(blog)}>
                                    Edit
                                  </Button>
                                  <Button size="sm" variant="destructive" onClick={() => handleBlogRemove(blog)}>
                                    Delete
                                  </Button>
                                </div>
                              </div>
                              <p className="mt-3 text-sm text-slate-400">{blog.excerpt}</p>
                            </article>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </>
              )}
            </div>

            <div className="space-y-6">
              {activeTab === 'employees' ? (
                employeeDetails
              ) : (
                <Card className="rounded-3xl border-white/10 bg-slate-900/80">
                  <CardHeader>
                    <CardTitle>{editingBlogId ? 'Edit blog preview' : 'Blog preview'}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-4">
                        <p className="text-xl font-bold font-['Ubuntu',sans-serif] text-white">{blogForm.title || 'Blog title'}</p>
                        <p className="text-sm text-slate-400">By {blogForm.author || 'Author name'} • {new Date().toLocaleDateString()}</p>
                      </div>
                      {blogImagePreview ? (
                        <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80">
                          <img src={blogImagePreview} alt="Preview" className="h-56 w-full object-cover" loading="lazy" />
                        </div>
                      ) : null}
                      <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-4">
                        <p className="text-sm text-slate-400">{blogForm.excerpt || 'Blog excerpt will show here.'}</p>
                        <div className="mt-3 text-sm leading-7 text-slate-200" dangerouslySetInnerHTML={{ __html: blogForm.content || '<p>Content preview will appear here.</p>' }} />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {blogForm.keywords.map((keyword) => (
                          <Badge key={keyword} variant="secondary">{keyword}</Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>
        <Card className="rounded-3xl border-white/10 bg-slate-900/80">
          <CardHeader>
            <CardTitle>Quote section</CardTitle>
            <p className="text-sm text-slate-400">Use this section to keep verified quotes visible on the site.</p>
          </CardHeader>
          <CardContent className="grid gap-6 lg:grid-cols-[1fr_320px]">
            <div className="space-y-4">
              {quotes.length === 0 ? (
                <p className="text-sm text-slate-400">No quotes available yet.</p>
              ) : (
                <div className="space-y-3">
                  {quotes.map((quote) => (
                    <div key={quote.id} className="rounded-3xl border border-white/10 bg-slate-950/80 p-5">
                      <p className="text-lg italic text-white">“{quote.quote}”</p>
                      <p className="mt-3 text-sm text-slate-400">— {quote.author}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <form onSubmit={handleQuoteSave} className="space-y-4 rounded-3xl border border-white/10 bg-slate-950/80 p-6">
              <div className="space-y-2">
                <Label htmlFor="quoteText">Quote</Label>
                <Textarea
                  id="quoteText"
                  value={quoteText}
                  onChange={(event) => setQuoteText(event.target.value)}
                  rows={4}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quoteAuthor">Author</Label>
                <Input
                  id="quoteAuthor"
                  value={quoteAuthor}
                  onChange={(event) => setQuoteAuthor(event.target.value)}
                  placeholder="Quote author"
                  required
                />
              </div>
              <Button type="submit" disabled={loading}>
                {loading ? 'Saving quote…' : 'Save Quote'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}