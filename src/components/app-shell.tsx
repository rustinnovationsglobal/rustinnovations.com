'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { WhatsappFAB } from '@/components/whatsapp-fab';

export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  return (
    <div className="flex min-h-screen flex-col">
      {!isAdmin && <Header />}
      <main className={isAdmin ? 'flex-1' : 'flex-1 pt-4'}>{children}</main>
      {!isAdmin && <Footer />}
      {!isAdmin && <WhatsappFAB phoneNumber="+923264692997" />}
    </div>
  );
}
