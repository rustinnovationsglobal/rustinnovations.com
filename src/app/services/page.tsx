
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { services } from '@/lib/data';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Animated, scaleUp, fadeUp } from '@/components/ui/animated';

export const metadata: Metadata = {
    title: 'Our Services | Web Development, SEO, & Digital Strategy',
    description: 'Explore our services: web/app development, e-commerce, SEO, digital marketing, crypto OTC, and more. Request a quote today.',
};

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <Animated as="section" variants={fadeUp} className="text-center">
        <h1 className="font-headline text-4xl font-bold md:text-5xl">Our Services</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          We provide a wide array of services designed to empower your business and drive growth in the digital age.
        </p>
      </Animated>

      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => (
          <Animated key={service.id} variants={scaleUp} delay={i * 0.1}>
            <Card className="flex flex-col transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 hover:scale-105">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <service.icon className="h-10 w-10 shrink-0 text-primary" />
                  <CardTitle className="font-headline text-2xl">{service.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col">
                <CardDescription className="flex-1">{service.longDescription}</CardDescription>
                <Button asChild className="mt-6 w-full transition-transform duration-300 hover:scale-110" aria-label={`Request a quote for our ${service.title} service`}>
                  <Link href={{ pathname: '/contact', query: { subject: `Quote for ${service.title}` }}}>Request a Quote</Link>
                </Button>
              </CardContent>
            </Card>
          </Animated>
        ))}
      </div>
    </div>
  );
}
