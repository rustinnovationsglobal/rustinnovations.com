
'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { teamMembers } from '@/lib/data';
import { Quote, ChevronDown, ChevronUp } from 'lucide-react';
import { Animated, fadeUp, scaleUp } from '@/components/ui/animated';
import { cn } from '@/lib/utils';

const registrations = [
    { name: "SECP", logo: "/assets/SECP.png" },
    { name: "State Bank of Pakistan", logo: "/assets/SBP.png" },
    { name: "OJK", logo: "/assets/ojk.png" },
    { name: "Lahore Chamber", logo: "/assets/chamber_lahore.png" },
    { name: "IPO", logo: "/assets/IPO.png" },
    { name: "FBR", logo: "/assets/FBR.jpeg"},
    { name: "PT Bank Mandiri", logo: "/assets/PT_Bank_Mandiri.png"},
    { name: "Bank Central Asia", logo: "/assets/Bank Central Asia.jpeg"},
    { name: "Direktorat Jenderal Pajak", logo: "/assets/Direktorat Jenderal Pajak.jpeg"},
    { name: "Ministry of Law and Human Rights", logo: "/assets/MINISTRY OF LAW AND HUMAN RIGHTS.jpeg"}
];

const ScrollingLogos = () => (
    <div className="relative mt-12 w-full overflow-hidden mask-gradient">
        <div className="flex w-max animate-scroll">
            {[...registrations, ...registrations].map((reg, index) => (
                <div key={`${reg.name}-${index}`} className="w-72 px-4">
                    <Card className="group h-full w-full transform border-none bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/20">
                        <CardContent className="flex h-full flex-col items-center justify-center p-6">
                            <div className="relative flex h-24 w-full items-center justify-center">
                                <Image 
                                    src={reg.logo} 
                                    alt={`${reg.name} logo`} 
                                    width={120}
                                    height={80}
                                    className="object-contain transition-transform duration-300 group-hover:scale-110" 
                                />
                            </div>
                            <p className="mt-4 text-center font-headline text-sm font-bold text-black uppercase tracking-wider">{reg.name}</p>
                        </CardContent>
                    </Card>
                </div>
            ))}
        </div>
    </div>
);

const LeadershipCard = ({ member }: { member: any }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 border-border/50 h-full group bg-background/40 backdrop-blur-sm">
            <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                    <Avatar className={cn(
                        "h-24 w-24 border-4 border-primary/20 shrink-0",
                        member.imageUrl.includes('male.png') || member.imageUrl.includes('female.png') ? "bg-muted" : ""
                    )}>
                        <AvatarImage src={member.imageUrl} alt={member.name} className="object-cover" />
                        <AvatarFallback>{member.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <h3 className="font-headline text-2xl font-bold group-hover:text-primary transition-colors">{member.name}</h3>
                        <p className="font-headline text-sm font-bold text-primary uppercase tracking-tighter mb-4">{member.title}</p>
                        {member.description && (
                            <div className="relative">
                                <p className={cn(
                                    "text-sm text-muted-foreground leading-relaxed transition-all duration-300",
                                    !isExpanded && "line-clamp-3"
                                )}>
                                    {member.description}
                                </p>
                                <Button 
                                    variant="link" 
                                    size="sm" 
                                    onClick={() => setIsExpanded(!isExpanded)}
                                    className="mt-2 h-auto p-0 text-primary font-bold hover:no-underline"
                                >
                                    {isExpanded ? (
                                        <span className="flex items-center gap-1">See less <ChevronUp className="h-4 w-4" /></span>
                                    ) : (
                                        <span className="flex items-center gap-1">See more <ChevronDown className="h-4 w-4" /></span>
                                    )}
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

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
                        <div className="flex items-center gap-2 mb-6 text-primary">
                            <Quote className="h-8 w-8 fill-current" />
                            <h2 className="font-headline text-3xl font-bold md:text-4xl">Message</h2>
                        </div>
                        <div className="space-y-6 text-base leading-relaxed text-muted-foreground italic">
                            <p>
                                "Every meaningful journey starts with a simple idea and the courage to pursue it. As the founder and CEO of Rust Innovations, Shahid Rajpot, I have always believed that progress comes from persistence, learning, and the willingness to build something that creates real value for people."
                            </p>
                            <p>
                                "My journey with Rust Innovations began with a vision to create a platform where innovation, creativity, and technology could come together to open new opportunities for businesses and entrepreneurs around the world. Along the way, we have not only worked with amazing clients but also started building our own projects such as Rust Wheel, which reflects our belief that ideas should turn into real platforms that help people connect, trade, and grow."
                            </p>
                            <p>
                                "Personally, my motivation has always been to keep moving forward, keep building, and keep improving every day. I am grateful for the trust people have placed in Shahid Rajpot and Rust Innovations, whether through our technology initiatives or through communities where we have served thousands of users, including more than 3200+ clients with a 99% positive rating on OKX P2P."
                            </p>
                            <p>
                                "Looking ahead, my vision is simple: to continue growing Rust Innovations into a global innovation ecosystem and expand our presence into regions like Europe, Turkey, Brazil, and Argentina while inspiring others to believe that with focus, discipline, and innovation, great things can be built."
                            </p>
                        </div>
                        <div className="mt-10">
                            <p className="font-headline text-2xl font-bold text-foreground">Shahid Rajpot</p>
                            <p className="text-primary font-semibold">Founder & CEO</p>
                        </div>
                    </Animated>
                    <Animated as="div" variants={scaleUp} className="order-first overflow-hidden rounded-2xl md:order-2 shadow-2xl shadow-primary/10">
                        <Image
                            src="/assets/CEO.jpeg"
                            alt="Shahid Rajpot - Founder & CEO"
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
                    <div className="mt-12 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-2">
                        {teamMembers.map((member, i) => (
                             <Animated as="div" key={member.id} variants={scaleUp} delay={i * 0.1}>
                                <LeadershipCard member={member} />
                            </Animated>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
