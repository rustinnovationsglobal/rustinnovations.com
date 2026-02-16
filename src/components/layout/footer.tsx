
import Link from 'next/link';
import { Linkedin, Facebook } from 'lucide-react';
import { Logo } from '@/components/logo';
import { footerLinks } from '@/lib/data';

const socialLinks = [
  { 
    href: 'https://www.facebook.com/share/1CydmYnm7x/', 
    label: 'Facebook',
    icon: <Facebook className="h-6 w-6 text-muted-foreground transition-colors hover:text-primary" />
  },
  { 
    href: 'https://whatsapp.com/channel/0029VaCYjYs11ulLGWLBaZ1c', 
    label: 'WhatsApp',
    icon: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-6 w-6 fill-current text-muted-foreground transition-colors hover:text-primary"
        >
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.58C8.75 21.39 10.36 21.82 12.04 21.82C17.5 21.82 21.95 17.37 21.95 11.91C21.95 9.27 20.92 6.83 19.16 4.99C17.41 3.16 14.89 2 12.04 2ZM12.04 3.67C14.25 3.67 16.31 4.54 17.87 6.13C19.42 7.72 20.28 9.77 20.28 11.91C20.28 16.47 16.6 20.15 12.04 20.15C10.56 20.15 9.14 19.78 7.9 19.09L7.54 18.89L4.42 19.68L5.23 16.64L5.02 16.27C4.24 15 3.8 13.47 3.8 11.91C3.8 7.35 7.48 3.67 12.04 3.67ZM16.53 14.23C16.33 14.71 15.35 15.24 14.9 15.29C14.45 15.34 13.84 15.36 13.41 15.19C12.98 15.02 12.04 14.69 10.95 13.75C9.62 12.58 8.73 11.13 8.54 10.83C8.35 10.53 7.99 9.94 7.99 9.38C7.99 8.82 8.21 8.64 8.38 8.47C8.56 8.3 8.76 8.21 8.94 8.21C9.11 8.21 9.29 8.21 9.44 8.23C9.59 8.25 9.71 8.28 9.86 8.57C10.02 8.88 10.37 9.7 10.45 9.84C10.53 9.98 10.61 10.13 10.53 10.27C10.45 10.41 10.04 10.89 9.89 11.04C9.75 11.19 9.61 11.23 9.79 11.4C9.97 11.58 10.44 11.97 10.97 12.44C11.75 13.1 12.35 13.43 12.63 13.57C12.91 13.71 13.06 13.68 13.2 13.54C13.34 13.39 13.72 12.89 13.89 12.66C14.07 12.43 14.24 12.38 14.44 12.43C14.64 12.48 15.51 12.93 15.75 13.05C15.99 13.17 16.14 13.24 16.2 13.33C16.25 13.42 16.22 13.8 16.12 13.97L16.53 14.23Z"></path>
        </svg>
    )
  },
  {
    href: 'https://www.tiktok.com/@rustinnovations?_t=ZS-90k5PaW5sCw&_r=1',
    label: 'TikTok',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="h-6 w-6 fill-current text-muted-foreground transition-colors hover:text-primary"
      >
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.3-4.08-1.03-2.02-1.22-3.44-3.34-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"></path>
      </svg>
    ),
  },
  { 
    href: 'https://www.linkedin.com/company/rust-innovations/', 
    label: 'LinkedIn',
    icon: <Linkedin className="h-6 w-6 text-muted-foreground transition-colors hover:text-primary" />
  },
];


export function Footer() {
  const quickLinks = footerLinks.quickLinks;
  return (
    <footer className="border-t bg-card text-card-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Company Info */}
          <div className="flex flex-col gap-4 lg:col-span-5">
            <Logo />
             <p className="text-lg font-semibold text-primary">
              Let’s Build Your Digital Future with Rust Innovations.
            </p>
            <p className="text-sm text-muted-foreground max-w-md">
              Rust Innovations is your one-stop digital solution for web and app development, software, courses, e-commerce, and more.
            </p>
            <div className="flex gap-4">
              {socialLinks.map(link => (
                <Link key={link.href} href={link.href} aria-label={link.label} target="_blank" rel="noopener noreferrer">
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 lg:col-span-7 lg:grid-cols-3">
              {/* Quick Links */}
              <div>
                <h3 className="font-headline text-lg font-semibold">Quick Links</h3>
                <ul className="mt-4 space-y-2">
                  {quickLinks.map(link => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Our Policy */}
              <div>
                <h3 className="font-headline text-lg font-semibold">Our Policy</h3>
                <ul className="mt-4 space-y-2">
                  {footerLinks.ourPolicy.map(link => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Operational Countries */}
              <div>
                <h3 className="font-headline text-lg font-semibold whitespace-nowrap">
                  Operational Countries
                </h3>
                <ul className="mt-4 space-y-2">
                  {footerLinks.countries.map(country => (
                    <li key={country} className="text-sm text-muted-foreground">
                      {country}
                    </li>
                  ))}
                </ul>
              </div>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2026 Rust Innovations. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
