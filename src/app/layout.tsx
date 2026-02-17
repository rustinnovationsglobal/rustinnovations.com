import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { PageProgress } from '@/components/page-progress';
import { WhatsappFAB } from '@/components/whatsapp-fab';
import { TooltipProvider } from '@/components/ui/tooltip';
import LenisProvider from './lenis-provider';
import dynamic from 'next/dynamic';

export const metadata: Metadata = {
  title: {
    default: 'Rust Innovations | Digital Solutions & Tech Services',
    template: '%s | Rust Innovations',
  },
  description:
    'Your one-stop solution for digital needs: web and app development, paid software, e-commerce, digital marketing, and expert consultancy. Let\'s build your digital future.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Space+Grotesk:wght@300..700&family=Inter:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <LenisProvider>
          <TooltipProvider>
            <PageProgress />
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1 pt-4">{children}</main>
              <Footer />
            </div>
            <WhatsappFAB phoneNumber="+923264692997" />
            <Toaster />
          </TooltipProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
