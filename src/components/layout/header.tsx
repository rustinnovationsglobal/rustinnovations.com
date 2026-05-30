
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
                    <h3 className="mb-3 text-sm font-semibold text-foreground text-center">Our Products</h3>
                    {products.length > 0 ? (
                      <div className="grid grid-cols-3 gap-5">
                        {products.slice(0, 9).map((product) => {
                          const hasProductImage = ['rustwheel', 'rustpass'].includes(product.id);
                          return (
                            <DropdownMenuItem key={product.id} asChild className="p-0 focus:bg-transparent">
                              <Link
                                href={product.href || {
                                  pathname: '/contact',
                                  query: { subject: `Inquiry about ${product.name}` },
                                }}
                                target={product.href ? '_blank' : undefined}
                                rel={product.href ? 'noopener noreferrer' : undefined}
                                className={`group flex min-h-[120px] w-[120px] flex-col items-center justify-center gap-2 rounded-3xl border border-white/10 bg-slate-950/80 p-3 text-center shadow-sm shadow-black/10 transition-all duration-200 cursor-pointer hover:scale-105 hover:border-primary/60 hover:border-2`}
                                aria-label={product.href ? `Visit ${product.name} external page` : `Inquire about our ${product.name} product`}
                              >
                                {hasProductImage ? (
                                  <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 p-2 transition-transform duration-200 transform-gpu group-hover:scale-110">
                                    <Image
                                      src={product.imageUrl}
                                      alt={product.imageHint}
                                      width={48}
                                      height={48}
                                      className="h-full w-full object-contain"
                                      data-ai-hint={product.imageHint}
                                    />
                                  </span>
                                ) : (
                                  <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white/20 p-2 shadow-inner shadow-black/10 transition duration-300 group-hover:bg-white/25">
                                    <Image
                                      src={product.imageUrl}
                                      alt={product.imageHint}
                                      width={48}
                                      height={48}
                                      className="h-full w-full rounded-2xl object-contain"
                                      data-ai-hint={product.imageHint}
                                    />
                                  </span>
                                )}
                                <p className="w-full truncate text-xs font-semibold text-foreground">
                                  {product.name}
                                </p>
                              </Link>
                            </DropdownMenuItem>
                          );
                        })}
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
            <div className="grid grid-cols-3 gap-5 py-4 overflow-y-auto max-h-[60vh]">
              {products.slice(0, 9).map((product) => {
                const hasProductImage = ['rustwheel', 'rustpass'].includes(product.id);
                return (
                  <Link
                    key={product.id}
                    href={product.href || {
                      pathname: '/contact',
                      query: { subject: `Inquiry about ${product.name}` },
                    }}
                    target={product.href ? '_blank' : undefined}
                    rel={product.href ? 'noopener noreferrer' : undefined}
                    onClick={() => setProductsModalOpen(false)}
                    className={`group flex h-[120px] w-full flex-col items-center justify-center gap-2 rounded-3xl border border-white/10 bg-slate-950/80 p-3 text-center shadow-sm shadow-black/10 transition-all duration-200 cursor-pointer hover:scale-105 hover:border-primary hover:border-2`}
                    aria-label={product.href ? `Visit ${product.name} external page` : `Inquire about our ${product.name} product`}
                  >
                    {hasProductImage ? (
                      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 p-2 transition-transform duration-200 transform-gpu group-hover:scale-110">
                        <Image
                          src={product.imageUrl}
                          alt={product.imageHint}
                          width={48}
                          height={48}
                          className="h-full w-full object-contain"
                          data-ai-hint={product.imageHint}
                        />
                      </span>
                    ) : (
                      <span className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/20 p-2 shadow-inner shadow-black/10 transition duration-300 group-hover:bg-white/25">
                        <Image
                          src={product.imageUrl}
                          alt={product.imageHint}
                          width={64}
                          height={64}
                          className="h-full w-full rounded-2xl object-contain"
                          data-ai-hint={product.imageHint}
                        />
                      </span>
                    )}
                    <p className="w-full truncate text-xs font-semibold text-foreground">{product.name}</p>
                  </Link>
                );
              })}
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
