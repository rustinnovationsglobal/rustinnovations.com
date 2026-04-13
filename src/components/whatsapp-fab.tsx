
'use client';

import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const WhatsAppIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className={cn("h-7 w-7 fill-current", className)}
        aria-hidden="true"
    >
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.58C8.75 21.39 10.36 21.82 12.04 21.82C17.5 21.82 21.95 17.37 21.95 11.91C21.95 9.27 20.92 6.83 19.16 4.99C17.41 3.16 14.89 2 12.04 2ZM12.04 3.67C14.25 3.67 16.31 4.54 17.87 6.13C19.42 7.72 20.28 9.77 20.28 11.91C20.28 16.47 16.6 20.15 12.04 20.15C10.56 20.15 9.14 19.78 7.9 19.09L7.54 18.89L4.42 19.68L5.23 16.64L5.02 16.27C4.24 15 3.8 13.47 3.8 11.91C3.8 7.35 7.48 3.67 12.04 3.67ZM16.53 14.23C16.33 14.71 15.35 15.24 14.9 15.29C14.45 15.34 13.84 15.36 13.41 15.19C12.98 15.02 12.04 14.69 10.95 13.75C9.62 12.58 8.73 11.13 8.54 10.83C8.35 10.53 7.99 9.94 7.99 9.38C7.99 8.82 8.21 8.64 8.38 8.47C8.56 8.3 8.76 8.21 8.94 8.21C9.11 8.21 9.29 8.21 9.44 8.23C9.59 8.25 9.71 8.28 9.86 8.57C10.02 8.88 10.37 9.7 10.45 9.84C10.53 9.98 10.61 10.13 10.53 10.27C10.45 10.41 10.04 10.89 9.89 11.04C9.75 11.19 9.61 11.23 9.79 11.4C9.97 11.58 10.44 11.97 10.97 12.44C11.75 13.1 12.35 13.43 12.63 13.57C12.91 13.71 13.06 13.68 13.2 13.54C13.34 13.39 13.72 12.89 13.89 12.66C14.07 12.43 14.24 12.38 14.44 12.43C14.64 12.48 15.51 12.93 15.75 13.05C15.99 13.17 16.14 13.24 16.2 13.33C16.25 13.42 16.22 13.8 16.12 13.97L16.53 14.23Z"></path>
    </svg>
);


export function WhatsappFAB({ phoneNumber }: { phoneNumber: string }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 100);
    });

    const fabVariants = {
        initial: { scale: 0, opacity: 0 },
        animate: { scale: 1, opacity: 1, transition: { delay: 1, type: 'spring', stiffness: 300, damping: 20 } },
    };

    const bgVariants = {
        initial: { backgroundColor: '#ffffff', color: '#25D366' },
        scrolled: { backgroundColor: '#25D366', color: '#ffffff' },
    };

    return (
        <TooltipProvider>
            <motion.div
                variants={fabVariants}
                initial="initial"
                animate="animate"
                className="fixed bottom-6 right-6 z-50"
            >
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link 
                            href={`https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            aria-label="Contact us on WhatsApp for immediate support"
                            className="focus-visible:ring-4 focus-visible:ring-primary rounded-full block"
                        >
                            <motion.div
                                className="flex h-14 w-14 items-center justify-center rounded-full shadow-lg"
                                variants={bgVariants}
                                initial="initial"
                                animate={isScrolled ? "scrolled" : "initial"}
                                transition={{ duration: 0.3 }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <WhatsAppIcon />
                            </motion.div>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Contact us on Whatsapp</p>
                    </TooltipContent>
                </Tooltip>
            </motion.div>
        </TooltipProvider>
    );
}
