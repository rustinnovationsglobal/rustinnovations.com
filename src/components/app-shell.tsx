'use client';

import { ReactNode } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { WhatsappFAB } from '@/components/whatsapp-fab';

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-4">{children}</main>
      <Footer />
      <WhatsappFAB phoneNumber="+923264692997" />
    </div>
  );
}
