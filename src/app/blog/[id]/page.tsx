
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getBlogPost } from '@/lib/supabase';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { teamMembers } from '@/lib/data';
import type { Metadata, ResolvingMetadata } from 'next';
import { Animated, fadeUp } from '@/components/ui/animated';

type Props = {
  params: { id: string };
};

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const post = await getBlogPost(params.id);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.imageUrl, ...previousImages],
    },
  };
}

export default async function BlogPostPage({ params }: { params: { id: string } }) {
  const post = await getBlogPost(params.id);

  if (!post) {
    notFound();
  }

  const author = teamMembers.find((m) => m.name === post.author);

  return (
    <article className="container mx-auto max-w-4xl px-4 py-16 md:py-24">
      <Animated variants={fadeUp}>
        <header className="mb-8 text-center">
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <h1 className="font-headline text-3xl font-bold md:text-5xl">{post.title}</h1>
          <div className="mt-6 flex items-center justify-center gap-4">
            {author && (
              <Avatar>
                <AvatarImage src={author.imageUrl} alt={author.name} data-ai-hint={author.imageHint} />
                <AvatarFallback>{author.name.split(' ').map((n) => n[0]).join('')}</AvatarFallback>
              </Avatar>
            )}
            <div>
              <p className="font-semibold">{post.author}</p>
              <p className="text-sm text-muted-foreground">
                Published on {format(new Date(post.date), 'MMMM d, yyyy')}
              </p>
            </div>
          </div>
        </header>
      </Animated>

      <Animated variants={fadeUp} delay={0.2} className="relative mb-8 h-72 w-full md:h-96">
        <Image
          src={post.imageUrl}
          alt={post.title}
          fill
          className="rounded-lg object-cover"
          data-ai-hint={post.imageHint}
          priority
        />
      </Animated>

      <Animated variants={fadeUp} delay={0.4}>
        <div
          className="prose prose-invert max-w-none prose-p:text-muted-foreground prose-headings:text-foreground"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </Animated>
    </article>
  );
}

export async function generateStaticParams() {
  return [];
}
