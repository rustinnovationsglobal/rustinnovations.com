
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ShieldCheck,
  Lightbulb,
  TrendingUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { services } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Animated, fadeUp, scaleUp } from '@/components/ui/animated';

const features = [
  {
    icon: <ShieldCheck className="h-10 w-10 text-primary" aria-hidden="true" />,
    title: 'Unmatched Reliability',
    description:
      'Our solutions are built on a foundation of security and trust, ensuring your operations are always protected.',
  },
  {
    icon: <Lightbulb className="h-10 w-10 text-primary" aria-hidden="true" />,
    title: 'Innovative Strategies',
    description:
      'We pioneer new approaches and leverage cutting-edge technology to keep you ahead of the curve.',
  },
  {
    icon: <TrendingUp className="h-10 w-10 text-primary" aria-hidden="true" />,
    title: 'Growth-Oriented Results',
    description:
      'Our focus is on delivering tangible outcomes that drive growth and maximize your return on investment.',
  },
];

const testimonials = [
  {
    name: 'Muhammad Abdullah',
    title: 'Business Owner',
    image: PlaceHolderImages.find(p => p.id === 'testimonial3')!.imageUrl,
    imageHint: PlaceHolderImages.find(p => p.id === 'testimonial3')!.imageHint,
    quote:
      "Great experience with the Rust Innovations team. I needed a custom CRM system with reporting features, and they delivered more than I expected. They also helped me understand how to use it with step-by-step guidance. Everything is working perfectly. For any business owner who wants reliable digital systems, this is the company to go with.",
  },
  {
    name: 'Shayan Khan',
    title: 'Client',
    image: PlaceHolderImages.find(p => p.id === 'testimonial4')!.imageUrl,
    imageHint: PlaceHolderImages.find(p => p.id === 'testimonial4')!.imageHint,
    quote:
      'Rust Innovations is a reliable and forward-thinking company, known for its professionalism, quality service, and innovative solutions. Highly recommended!',
  },
  {
    name: 'Irfan Ahmad',
    title: 'Entrepreneur',
    image: PlaceHolderImages.find(p => p.id === 'testimonial5')!.imageUrl,
    imageHint: PlaceHolderImages.find(p => p.id === 'testimonial5')!.imageHint,
    quote:
      'They built my landing page just how I wanted. It was quick and looked clean. I liked how simple they kept everything. Communication was easy and straight to the point. I’d work with them again.',
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full overflow-hidden text-white md:h-[80vh]">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-10"
          aria-label="Abstract background video showing digital connections"
          poster="/assets/video-poster.jpg"
        >
          <source src="/assets/bg.mp4" type="video/mp4" />
          <track kind="captions" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/80 to-black/60" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4">
            <Animated variants={fadeUp}>
              <h1
                className="relative select-none font-headline font-extrabold text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-[6rem] leading-[1.05] animated-pinkred-gradient group"
              >
                Rust Innovations
              </h1>
            </Animated>
            <Animated variants={fadeUp} delay={0.1}>
              <p className="mt-10 max-w-xs sm:max-w-md md:max-w-2xl text-base sm:text-xl md:text-3xl font-semibold text-secondary-foreground tracking-wide" style={{ letterSpacing: '0.08em' }}>
                .Optimise .Accurate .Succeed
              </p>
            </Animated>
            <Animated variants={fadeUp} delay={0.2}>
              <p className="mt-4 max-w-xs sm:max-w-md md:max-w-lg text-xs sm:text-sm md:text-base text-gray-300 line-clamp-3">
                Rust Innovations is your one-stop solution for all digital needs. We offer freelancing services, including web and app development, paid software solutions, learning courses, e-commerce store creation, and more.
              </p>
            </Animated>
            <Animated variants={fadeUp} delay={0.3}>
              <Button asChild size="lg" className="mt-8 group transition-transform duration-300 hover:scale-110" aria-label="Explore our digital services">
                <Link href="/services">
                  Explore Our Services
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" aria-hidden="true" />
                </Link>
              </Button>
            </Animated>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Animated variants={fadeUp}>
            <h2 className="text-center font-headline text-3xl font-bold md:text-4xl">
              Why Choose Us?
            </h2>
          </Animated>
          <Animated variants={fadeUp} delay={0.1}>
            <p className="mx-auto mt-4 max-w-3xl text-center text-lg text-muted-foreground">
              We blend strategic vision with technological expertise to deliver
              solutions that are not just effective, but transformative.
            </p>
          </Animated>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {features.map((feature, i) => (
              <Animated key={feature.title} variants={scaleUp} delay={i * 0.1}>
                <Card
                  className="transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20"
                >
                  <CardHeader className="items-center text-center">
                    {feature.icon}
                    <CardTitle className="mt-4 font-headline text-xl">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </Animated>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="bg-card py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Animated variants={fadeUp}>
            <h2 className="text-center font-headline text-3xl font-bold md:text-4xl">
              Our Core Services
            </h2>
          </Animated>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {services.slice(0, 4).map((service, i) => (
              <Animated
                key={service.id}
                variants={scaleUp}
                delay={i * 0.1}
              >
                <div className="group relative overflow-hidden rounded-lg aspect-video">
                  <Image
                    src={service.imageUrl}
                    alt={`${service.title} - Digital service representation`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    data-ai-hint={service.imageHint}
                  />
                  <div className="absolute inset-0 bg-black/60 transition-colors group-hover:bg-black/70" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="font-headline text-2xl font-bold text-white">
                      {service.title}
                    </h3>
                    <Button
                      asChild
                      variant="link"
                      className="p-0 text-white"
                      aria-label={`Learn more about ${service.title}`}
                    >
                      <Link href="/services">
                        Learn More <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </Animated>
            ))}
          </div>
          <Animated variants={fadeUp} className="mt-12 text-center">
            <Button asChild size="lg" variant="outline" className="transition-transform duration-300 hover:scale-110" aria-label="View all of our core services">
              <Link href="/services">View All Services</Link>
            </Button>
          </Animated>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Animated variants={fadeUp}>
            <h2 className="text-center font-headline text-3xl font-bold md:text-4xl">
              What Our Clients Say
            </h2>
          </Animated>
          <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, i) => (
              <Animated key={testimonial.name} variants={scaleUp} delay={i * 0.1}>
                <Card className="flex flex-col h-full">
                  <CardContent className="flex-1 p-6">
                    <blockquote className="italic text-muted-foreground">
                      "{testimonial.quote}"
                    </blockquote>
                  </CardContent>
                  <CardHeader className="flex-row items-center gap-4 border-t pt-6">
                    <Avatar>
                      <AvatarImage
                        src={testimonial.image}
                        alt={`${testimonial.name} - ${testimonial.title}`}
                        data-ai-hint={testimonial.imageHint ?? ''}
                      />
                      <AvatarFallback aria-hidden="true">{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.title}
                      </p>
                    </div>
                  </CardHeader>
                </Card>
              </Animated>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
