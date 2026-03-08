import type { Metadata } from 'next';
import './globals.css';
import { Inter, PT_Sans, Space_Grotesk } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { PageProgress } from '@/components/page-progress';
import { WhatsappFAB } from '@/components/whatsapp-fab';
import { TooltipProvider } from '@/components/ui/tooltip';
import LenisProvider from './lenis-provider';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap',
});

const ptSans = PT_Sans({ 
  weight: ['400', '700'], 
  subsets: ['latin'], 
  variable: '--font-pt-sans',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'], 
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.rustinnovations.com'),
  title: {
    default: 'Rust Innovations | Digital Solutions & Tech Services',
    template: '%s | Rust Innovations',
  },
  description:
    'Your one-stop solution for digital needs: web and app development, software, e-commerce, digital marketing, and expert consultancy. Let\'s build your digital future.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
    ],
  },
  verification: {
    google: 'KhnVgH0wCXMFmWVYchm9x-sRcbTwS2JjnRZY-JnpwhQ',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("dark", inter.variable, ptSans.variable, spaceGrotesk.variable)}>
      <body className="font-body antialiased bg-background text-foreground">
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

// Helper to handle multiple variables
function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
