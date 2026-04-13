
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import './header.css';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { navLinks, products } from '@/lib/data';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isProductsModalOpen, setProductsModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mainNavLinks = navLinks.filter(
    (link) => link.href !== '/contact'
  );

  const handleProductsClick = () => {
    setMenuOpen(false);
    setProductsModalOpen(true);
  };

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 transition-all duration-300',
          isScrolled ? 'top-4 px-4' : 'top-0'
        )}
      >
        <div
          className={cn(
            'container transition-all duration-300',
            isScrolled
              ? 'mx-auto max-w-6xl rounded-full border border-primary/50 bg-black/80 backdrop-blur-md shadow-lg'
              : 'rounded-none border-b border-transparent'
          )}
        >
          <div className="flex h-16 items-center justify-between px-2">
            <Logo iconOnly={false} />

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-6 md:flex" aria-label="Primary navigation">
              {mainNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm',
                    pathname === link.href ? 'text-primary' : 'text-muted-foreground'
                  )}
                  aria-current={pathname === link.href ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              {/* Products Dropdown */}
              <div className="hidden md:flex">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" aria-label="Open our digital product ecosystem menu" className="p-2">
                      <span className="dot-grid-3x3" aria-hidden="true">
                        {Array.from({ length: 9 }).map((_, i) => (
                          <span key={i} className="dot-grid-3x3-dot" />
                        ))}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[360px] p-4" align="end">
                    {products.length > 0 ? (
                      <div className="grid grid-cols-3 gap-4">
                        {products.slice(0, 9).map((product) => (
                          <DropdownMenuItem key={product.id} asChild className="p-0 focus:bg-transparent">
                            <Link
                              href={{
                                pathname: '/contact',
                                query: { subject: `Inquiry about ${product.name}` },
                              }}
                              className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-md p-2 text-center transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-primary outline-none"
                              aria-label={`Inquire about our ${product.name} product`}
                            >
                              <Image
                                src={product.imageUrl}
                                alt=""
                                width={48}
                                height={48}
                                className="rounded-md object-cover"
                                data-ai-hint={product.imageHint}
                              />
                              <p className="w-full truncate text-xs font-semibold">{product.name}</p>
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </div>
                    ) : (
                      <div className="flex h-32 items-center justify-center text-muted-foreground">
                        No item found
                      </div>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Contact Button */}
              <Button asChild className="hidden md:flex transition-transform duration-300 hover:scale-110" aria-label="Contact the Rust Innovations team for your project">
                <Link href="/contact">Contact Us</Link>
              </Button>

              {/* Mobile Navigation */}
              <div className="flex items-center md:hidden">
                <Sheet open={isMenuOpen} onOpenChange={setMenuOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" aria-label="Open mobile navigation menu">
                      <Menu className="h-6 w-6" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-full sm:w-[320px]">
                    <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-8">
                        <Logo />
                      </div>
                      <nav className="flex flex-col gap-4">
                        {mainNavLinks.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            className={cn(
                              'text-lg font-medium transition-colors hover:text-primary py-2',
                              pathname === link.href ? 'text-primary' : 'text-foreground'
                            )}
                            aria-current={pathname === link.href ? 'page' : undefined}
                          >
                            {link.label}
                          </Link>
                        ))}
                        <button
                          onClick={handleProductsClick}
                          className="text-left text-lg font-medium text-foreground transition-colors hover:text-primary py-2"
                        >
                          Products
                        </button>
                        <Link
                          href="/contact"
                          onClick={() => setMenuOpen(false)}
                          className={cn(
                            'text-lg font-medium transition-colors hover:text-primary py-2',
                            pathname === '/contact' ? 'text-primary' : 'text-foreground'
                          )}
                          aria-label="Contact us to discuss your digital needs"
                        >
                          Contact Us
                        </Link>
                      </nav>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Products Modal */}
      <Dialog open={isProductsModalOpen} onOpenChange={setProductsModalOpen}>
        <DialogContent className="sm:max-w-[calc(100vw-2rem)] w-[calc(100vw-2rem)] rounded-lg">
          <DialogHeader>
            <DialogTitle>Our Products</DialogTitle>
          </DialogHeader>
          {products.length > 0 ? (
            <div className="grid grid-cols-3 gap-4 py-4 overflow-y-auto max-h-[60vh]">
              {products.slice(0, 9).map((product) => (
                <Link
                  key={product.id}
                  href={{
                    pathname: '/contact',
                    query: { subject: `Inquiry about ${product.name}` },
                  }}
                  onClick={() => setProductsModalOpen(false)}
                  className="flex flex-col items-center gap-2 rounded-md p-2 text-center transition-colors hover:bg-accent"
                  aria-label={`Inquire about our ${product.name} product`}
                >
                  <Image
                    src={product.imageUrl}
                    alt=""
                    width={64}
                    height={64}
                    className="rounded-md object-cover"
                    data-ai-hint={product.imageHint}
                  />
                  <p className="w-full truncate text-xs font-semibold">{product.name}</p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex h-32 items-center justify-center text-muted-foreground">
              No item found
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
