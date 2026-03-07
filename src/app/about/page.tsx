
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { teamMembers } from '@/lib/data';
import type { Metadata } from 'next';
import { Quote } from 'lucide-react';
import { Animated, fadeUp, scaleUp } from '@/components/ui/animated';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
    title: 'About Us | Our Mission, Values, and Team',
    description: 'Learn about the mission, values, and dedicated team behind Rust Innovations, driving innovation and excellence in the tech industry.',
};

const registrations = [
    { name: "SECP", logo: "/assets/SECP.png" },
    { name: "Bank of Indonesia", logo: "/assets/bank_indonesia.png" },
    { name: "State Bank of Pakistan", logo: "/assets/SBP.png" },
    { name: "OJK", logo: "/assets/ojk.png" },
    { name: "Lahore Chamber", logo: "/assets/chamber_lahore.png" },
    { name: "IPO", logo: "/assets/IPO.png" },
];

const ScrollingLogos = () => (
    <div className="relative mt-12 w-full overflow-hidden mask-gradient">
        <div className="flex w-max animate-scroll">
            {[...registrations, ...registrations].map((reg, index) => (
                <div key={`${reg.name}-${index}`} className="w-72 px-4">
                    <Card className="group h-full w-full transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10">
                        <CardContent className="flex h-full flex-col items-center justify-center p-4">
                            <div className="relative flex h-24 w-full items-center justify-center">
                                <Image 
                                    src={reg.logo} 
                                    alt={`${reg.name} logo`} 
                                    width={80}
                                    height={64}
                                    className="object-contain transition-transform duration-300 group-hover:scale-110" 
                                />
                            </div>
                            <p className="mt-2 text-center font-headline text-xs font-semibold">{reg.name}</p>
                        </CardContent>
                    </Card>
                </div>
            ))}
        </div>
    </div>
);


export default function AboutPage() {
    return (
        <div className="bg-background">
            {/* Hero Section */}
            <Animated as="section" variants={fadeUp} className="container mx-auto px-4 py-16 text-center md:py-24">
                <h1 className="font-headline text-4xl font-bold md:text-5xl">
                    About Rust Innovations
                </h1>
                <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
                    We are a team of passionate innovators, strategists, and technologists dedicated to solving complex challenges and driving business success.
                </p>
            </Animated>

            {/* CEO Message Section */}
            <section className="py-16 md:py-24 bg-card/50">
                <div className="container mx-auto grid grid-cols-1 items-center gap-12 px-4 md:grid-cols-2">
                    <Animated as="div" variants={fadeUp} className="md:order-1">
                        <div className="flex items-center gap-2 mb-4 text-primary">
                            <Quote className="h-8 w-8 fill-current" />
                            <h2 className="font-headline text-3xl font-bold md:text-4xl">Message</h2>
                        </div>
                        <div className="space-y-6 text-lg leading-relaxed text-muted-foreground italic">
                            <p>
                                "Growth is never by mere chance; it is the result of forces working together. At Rust Innovations, we are that force for your digital journey. We specialize in turning complex technological hurdles into seamless opportunities for expansion."
                            </p>
                            <p>
                                "Our commitment is to your success, providing the tools and strategies that not only attract customers but turn them into lifelong advocates of your brand. Let's innovate together and build a future that is secure, scalable, and spectacularly successful."
                            </p>
                        </div>
                        <div className="mt-10">
                            <p className="font-headline text-2xl font-bold text-foreground">Shahid Rajpoot</p>
                            <p className="text-primary font-semibold">Founder & CEO</p>
                        </div>
                    </Animated>
                    <Animated as="div" variants={scaleUp} className="order-first overflow-hidden rounded-2xl md:order-2 shadow-2xl shadow-primary/10">
                        <Image
                            src="/assets/CEO.jpeg"
                            alt="Shahid Rajpoot - Founder & CEO"
                            width={600}
                            height={800}
                            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                            priority
                        />
                    </Animated>
                </div>
            </section>
            
            {/* Registrations Section */}
            <section className="bg-background py-16 md:py-24 border-y border-border/10">
                <div className="container mx-auto px-4">
                    <Animated as="div" variants={fadeUp} className="text-center">
                        <h2 className="font-headline text-3xl font-bold md:text-4xl">Registered With</h2>
                        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                            We proudly adhere to regulatory standards across multiple jurisdictions.
                        </p>
                    </Animated>
                    <ScrollingLogos />
                </div>
            </section>


            {/* Team Section */}
            <section className="bg-card py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <Animated as="div" variants={fadeUp} className="text-center">
                        <h2 className="font-headline text-3xl font-bold md:text-4xl">Meet Our Leadership</h2>
                        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                            The driving force behind our innovation and success.
                        </p>
                    </Animated>
                    <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {teamMembers.map((member, i) => (
                             <Animated as="div" key={member.id} variants={scaleUp} delay={i * 0.1}>
                                <Card className="overflow-hidden text-center transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 border-border/50 h-full">
                                    <CardContent className="p-6">
                                        <Avatar className={cn(
                                            "mx-auto h-32 w-32 border-4 border-primary/20",
                                            member.imageUrl.includes('male.png') || member.imageUrl.includes('female.png') ? "bg-muted" : ""
                                        )}>
                                            <AvatarImage src={member.imageUrl} alt={member.name} />
                                            <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                        </Avatar>
                                        <h3 className="mt-4 font-headline text-xl font-semibold">{member.name}</h3>
                                        <p className="font-headline text-sm font-bold text-primary">{member.title}</p>
                                    </CardContent>
                                </Card>
                            </Animated>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
