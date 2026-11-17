
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
import { navLinks } from '@/lib/data';
import { getProducts } from '@/lib/supabase';
import type { Product } from '@/lib/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';

function isSvgImageUrl(url: string) {
  return /\.svg(?:[?#]|$)/i.test(url);
}

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isProductsModalOpen, setProductsModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [isProductsLoading, setProductsLoading] = useState(true);
  const [productsLoadFailed, setProductsLoadFailed] = useState(false);

  useEffect(() => {
    let active = true;

    getProducts()
      .then((loadedProducts) => {
        if (active) {
          setProducts(loadedProducts);
        }
      })
      .catch((error: unknown) => {
        console.error('Unable to load products from Supabase:', error);
        if (active) {
          setProductsLoadFailed(true);
        }
      })
      .finally(() => {
        if (active) {
          setProductsLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

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
                    {isProductsLoading ? (
                      <div className="flex h-32 items-center justify-center text-muted-foreground">
                        Loading products...
                      </div>
                    ) : productsLoadFailed ? (
                      <div className="flex h-32 items-center justify-center text-muted-foreground">
                        Products could not be loaded
                      </div>
                    ) : products.length > 0 ? (
                      <div className="grid grid-cols-3 gap-5">
                        {products.map((product) => (
                          <DropdownMenuItem key={product.id} asChild className="p-0 focus:bg-transparent">
                            <a
                              href={product.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group flex min-h-[120px] w-full flex-col items-center justify-center gap-2 p-3 text-center transition-transform duration-200 hover:scale-105"
                              aria-label={`Visit ${product.name} external page`}
                            >
                              <span className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/5 p-2 transition-transform duration-200 transform-gpu group-hover:scale-110">
                                <Image
                                  src={product.img_url}
                                  alt={product.name}
                                  width={64}
                                  height={64}
                                  unoptimized
                                  className={cn(
                                    'h-full w-full object-contain',
                                    isSvgImageUrl(product.img_url) && 'brightness-0 invert'
                                  )}
                                />
                              </span>
                              <p className="w-full truncate text-xs font-semibold text-foreground">
                                {product.name}
                              </p>
                            </a>
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
          {isProductsLoading ? (
            <div className="flex h-32 items-center justify-center text-muted-foreground">
              Loading products...
            </div>
          ) : productsLoadFailed ? (
            <div className="flex h-32 items-center justify-center text-muted-foreground">
              Products could not be loaded
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-3 gap-5 py-4 overflow-y-auto max-h-[60vh]">
              {products.map((product) => (
                <a
                  key={product.id}
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setProductsModalOpen(false)}
                  className="group flex h-[120px] w-full flex-col items-center justify-center gap-2 p-3 text-center transition-transform duration-200 hover:scale-105"
                  aria-label={`Visit ${product.name} external page`}
                >
                  <span className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/5 p-2 transition-transform duration-200 transform-gpu group-hover:scale-110">
                    <Image
                      src={product.img_url}
                      alt={product.name}
                      width={64}
                      height={64}
                      unoptimized
                      className={cn(
                        'h-full w-full object-contain',
                        isSvgImageUrl(product.img_url) && 'brightness-0 invert'
                      )}
                    />
                  </span>
                  <p className="w-full truncate text-xs font-semibold text-foreground">{product.name}</p>
                </a>
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
