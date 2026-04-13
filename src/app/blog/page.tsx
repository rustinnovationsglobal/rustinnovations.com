
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { blogPosts } from '@/lib/data';
import type { Metadata } from 'next';
import { format } from 'date-fns';
import { Animated, fadeUp, scaleUp } from '@/components/ui/animated';

export const metadata: Metadata = {
    title: 'Blog | Tech Trends, Insights, and Articles',
    description: 'Read the latest from Rust Innovations. Explore articles on web development, UI/UX design, technology trends, and digital strategy.',
};

export default function BlogPage() {
    return (
        <div className="container mx-auto px-4 py-16 md:py-24">
            <Animated as="section" variants={fadeUp} className="text-center">
                <h1 className="font-headline text-4xl font-bold md:text-5xl">From the Blog</h1>
                <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                    Insights, articles, and news from the team at Rust Innovations.
                </p>
            </Animated>

            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {blogPosts.map((post, i) => (
                    <Animated key={post.id} variants={scaleUp} delay={i * 0.1}>
                        <Card className="group flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
                             <Link href={`/blog/${post.id}`} className="block" aria-label={`Read the full article about ${post.title}`}>
                                <div className="relative h-56 w-full">
                                    <Image
                                        src={post.imageUrl}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        data-ai-hint={post.imageHint}
                                    />
                                </div>
                            </Link>
                            <CardHeader>
                                <div className="flex flex-wrap gap-2">
                                    {post.tags.map(tag => (
                                        <Badge key={tag} variant="secondary">{tag}</Badge>
                                    ))}
                                </div>
                                <CardTitle className="pt-2 font-headline text-xl">
                                    <Link href={`/blog/${post.id}`} className="hover:text-primary transition-colors" aria-label={`Go to article: ${post.title}`}>
                                        {post.title}
                                    </Link>
                                </CardTitle>
                                 <p className="text-sm text-muted-foreground">
                                    By {post.author} on {format(new Date(post.date), 'MMMM d, yyyy')}
                                </p>
                            </CardHeader>
                            <CardContent className="flex-1">
                               <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
                            </CardContent>
                        </Card>
                    </Animated>
                ))}
            </div>
        </div>
    );
}
