'use client';

import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export function Logo({ iconOnly = false }: { iconOnly?: boolean }) {
  return (
    <Link
      href="/"
      className="flex flex-row items-center gap-1.5 md:gap-1.5 ml-2 md:ml-4"
      aria-label="Rust Innovations Home"
    >
      <Image
        src="/assets/logo.svg"
        alt="Rust Innovations Logo"
        width={64}
        height={64}
        className="h-16 w-16"
        priority
      />
      <div
        className={cn(
          'flex flex-col justify-center overflow-hidden transition-all duration-300',
          iconOnly ? 'w-0 opacity-0' : 'w-auto opacity-100'
        )}
      >
        <span className="font-headline font-bold text-foreground whitespace-nowrap leading-tight text-lg sm:text-xl md:text-2xl md:text-left text-left">
          Rust Innovations
        </span>
      </div>
    </Link>
  );
}
