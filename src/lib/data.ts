
import type { NavLink, Service, Product, TeamMember, FooterLinks, BlogPost } from './types';
import { PlaceHolderImages } from './placeholder-images';
import { Bot, Code, Brush, BarChart3, Database, Cloud, Bitcoin, PenSquare, Type, Video, ShoppingCart, Search, Building } from 'lucide-react';

export const navLinks: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About Us' },
  { href: '/media-center', label: 'Media Center' },
  { href: '/contact', label: 'Contact Us' },
];

export const services: Service[] = [
  {
    id: 'digital-strategy',
    title: 'Digital Strategy',
    description: 'Crafting bespoke digital strategies for sustainable growth.',
    longDescription: 'Crafting bespoke digital strategies to navigate the modern market for sustainable growth and a competitive edge.',
    icon: Bot,
    imageUrl: PlaceHolderImages.find(p => p.id === 'service-strategy')!.imageUrl,
    imageHint: PlaceHolderImages.find(p => p.id === 'service-strategy')!.imageHint,
  },
  {
    id: 'ui-ux-design',
    title: 'UI & UX Design',
    description: 'Intuitive and engaging user experiences that captivate.',
    longDescription: 'Creating intuitive and engaging user experiences that captivate your audience and drive conversion.',
    icon: Brush,
    imageUrl: PlaceHolderImages.find(p => p.id === 'service-design')!.imageUrl,
    imageHint: PlaceHolderImages.find(p => p.id === 'service-design')!.imageHint,
  },
  {
    id: 'app-development',
    title: 'App Development',
    description: 'Robust, scalable, and secure custom mobile applications.',
    longDescription: 'Building robust, scalable, and secure custom mobile applications tailored to your specific business needs.',
    icon: Code,
    imageUrl: PlaceHolderImages.find(p => p.id === 'service-development')!.imageUrl,
    imageHint: PlaceHolderImages.find(p => p.id === 'service-development')!.imageHint,
  },
  {
    id: 'website-development',
    title: 'Website Development',
    description: 'Full-stack development of high-performance websites.',
    longDescription: 'Specializing in full-stack development to create high-performance websites with a seamless user experience.',
    icon: Code,
    imageUrl: "https://picsum.photos/seed/108/600/400",
    imageHint: "website code"
  },
  {
    id: 'ecommerce',
    title: 'E-commerce',
    description: 'Complete e-commerce solutions to sell your products online.',
    longDescription: 'Providing complete e-commerce solutions, from store setup to payment gateway integration, to sell your products online effectively.',
    icon: ShoppingCart,
    imageUrl: "https://picsum.photos/seed/109/600/400",
    imageHint: "online store"
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    description: 'Data-driven digital marketing to amplify your brand\'s voice.',
    longDescription: 'Data-driven digital marketing services including SEO, content marketing, and paid advertising to amplify your brand\'s voice.',
    icon: BarChart3,
    imageUrl: PlaceHolderImages.find(p => p.id === 'service-marketing')!.imageUrl,
    imageHint: PlaceHolderImages.find(p => p.id === 'service-marketing')!.imageHint,
  },
  {
    id: 'video-editing',
    title: 'Video Editing',
    description: 'Professional video editing for compelling storytelling.',
    longDescription: 'Professional video editing services to create compelling visual stories for marketing, corporate, and creative projects.',
    icon: Video,
    imageUrl: "https://picsum.photos/seed/110/600/400",
    imageHint: "video editing"
  },
  {
    id: 'seo',
    title: 'SEO',
    description: 'Increase online visibility and generate qualified leads.',
    longDescription: 'Increasing your online visibility and generating qualified leads through thorough keyword research and optimization strategies.',
    icon: Search,
    imageUrl: "https://picsum.photos/seed/111/600/400",
    imageHint: "search engine"
  },
  {
    id: 'crypto-otc',
    title: 'Crypto OTC Services',
    description: 'Secure and efficient over-the-counter crypto trading.',
    longDescription: 'Providing secure and efficient over-the-counter (OTC) trading for large cryptocurrency transactions with privacy and minimal market impact.',
    icon: Bitcoin,
    imageUrl: "https://picsum.photos/seed/112/600/400",
    imageHint: "cryptocurrency trading"
  },
  {
    id: 'blogging',
    title: 'Blogging',
    description: 'Creating engaging content to connect with your audience.',
    longDescription: 'Developing and managing blogs with engaging content to connect with your audience and build a strong online presence.',
    icon: PenSquare,
    imageUrl: "https://picsum.photos/seed/113/600/400",
    imageHint: "writing blog"
  },
  {
    id: 'cms-development',
    title: 'CMS Development',
    description: 'Custom content management systems for easy content handling.',
    longDescription: 'Developing custom content management systems (CMS) that allow for easy and efficient handling of your website\'s content.',
    icon: Type,
    imageUrl: "https://picsum.photos/seed/114/600/400",
    imageHint: "content management"
  },
  {
    id: 'virtual-assets',
    title: 'Virtual Assets & NFTs',
    description: 'Expertise in the creation and management of virtual assets.',
    longDescription: 'Providing expertise in the creation, management, and trading of virtual assets and non-fungible tokens (NFTs).',
    icon: Building,
    imageUrl: "https://picsum.photos/seed/115/600/400",
    imageHint: "virtual reality"
  },
];

export const products: Product[] = [];

export const teamMembers: TeamMember[] = [
  {
    id: '2',
    name: 'Zahid Mahmood',
    title: 'Chief Financial Officer',
    description: 'Zahid Mahmood brings more than 25 years of financial and business experience to the Rust Innovations leadership team. A successful property entrepreneur in Pakistan and an established investor, he plays a vital role in guiding the company’s financial strategy and long-term growth. As CFO and board member, Zahid oversees financial planning, investment decisions, and corporate governance. His strategic insight and disciplined financial management have helped Rust Innovations strengthen its financial foundation and support its international expansion initiatives.',
    imageUrl: '/assets/CFO.jpeg',
    imageHint: 'Zahid Mahmood CFO',
  },
  {
    id: '3',
    name: 'Asadullah Zahid',
    title: 'Chief Operational Manager',
    description: 'Asadullah Zahid manages the global operations of Rust Innovations and ensures the smooth execution of projects for international clients. With strong expertise in operational management, cross-border logistics, and supply chain coordination, he plays a central role in maintaining efficient workflows across the company. His experience in China sourcing and e-commerce supply chains enables Rust Innovations to handle complex international projects while maintaining reliable documentation, delivery standards, and client coordination worldwide.',
    imageUrl: '/assets/coo.jpeg',
    imageHint: 'Asadullah Zahid Chief Operational Manager',
  },
  {
    id: '4',
    name: 'Zubair Mahmood',
    title: 'Head of Technology',
    description: 'Zubair Mahmood leads the technical vision of Rust Innovations. With five years of hands-on coding experience, he has successfully delivered several technology projects that generated significant revenue for the company. As the head of the technical team, he focuses on building scalable digital systems and innovative platforms. Zubair also leads Rust Wheel, the company’s pilot product initiative, where he oversees development, technical architecture, and the future roadmap of the platform.',
    imageUrl: '/assets/cto.png',
    imageHint: 'Zubair Mahmood Head of Technology',
  },
  {
    id: '5',
    name: 'Muhammad Usman',
    title: 'Country Head – UAE',
    description: 'Muhammad Usman leads Rust Innovations’ operations in the United Arab Emirates. With extensive experience working with UAE-based companies, he ensures regulatory compliance while expanding the company’s presence in the region. Under his leadership, the UAE division achieved approximately $3 million in turnover in 2025, marking a major milestone for Rust Innovations’ international growth. He continues to drive partnerships and strategic expansion across the Middle East.',
    imageUrl: '/assets/country_head_UAE.jpeg',
    imageHint: 'Muhammad Usman Country Head UAE',
  },
  {
    id: '6',
    name: 'Rashid Mahmood',
    title: 'Country Head – Pakistan',
    description: 'Rashid Mahmood oversees Rust Innovations’ operations in Pakistan, managing local teams and ensuring regulatory compliance. With previous management experience at leading UAE companies, he brings valuable international business expertise to the organization. His leadership has contributed to strengthening the company’s local presence, helping Rust Innovations Pakistan generate around $500,000 in business growth in 2025.',
    imageUrl: '/assets/ch.jpeg',
    imageHint: 'Rashid Mahmood Country Head Pakistan',
  },
  {
    id: '7',
    name: 'Farhan Kabeer',
    title: 'Operational Manager Pakistan',
    description: 'Farhan Kabeer plays an important role in maintaining operational efficiency and regulatory compliance at Rust Innovations Pakistan. As Operational Manager and Head of the Internal Anti-Money Laundering (AML) Unit, he ensures that company processes align with international compliance standards. With strong knowledge of the Pakistani market and experience working with leading companies, Farhan has significantly strengthened the organization’s risk management and compliance frameworks.',
    imageUrl: '/assets/male.png',
    imageHint: 'Farhan Kabeer Operational Manager',
  },
  {
    id: '8',
    name: 'Rubab Gull',
    title: 'Global Marketing Manager',
    description: 'Rubab Gull leads the global marketing strategy at Rust Innovations, helping strengthen the company’s brand presence and client relationships worldwide. With over 13 years of experience in design and digital marketing, she has worked with several leading companies in Pakistan and built a strong reputation in the creative industry. She is also a top-rated freelancer on Upwork, a recognition given to professionals who consistently deliver high-quality work and maintain strong client satisfaction. As a member of the Rust Innovations leadership team and board, Rubab plays a key role in shaping marketing strategy and supporting the company’s growth. Her expertise in global client engagement and digital branding has contributed significantly to Rust Innovations successfully serving 3,200+ clients worldwide, making her an important part of the company’s continued expansion.',
    imageUrl: '/assets/female.png',
    imageHint: 'Rubab Gull Global Marketing Manager',
  },
];

export const footerLinks: FooterLinks = {
  quickLinks: [
    { href: '/about', label: 'About Us' },
    { href: '/services', label: 'Services' },
    { href: '/media-center', label: 'Media Center' },
    { href: '/contact', label: 'Contact Us' },
  ],
  ourPolicy: [
    { href: '/privacy-policy', label: 'Privacy Policy' },
    { href: '/aml-policy', label: 'AML Policy' },
    { href: '/terms-and-conditions', label: 'Terms & Conditions' },
  ],
  countries: ['Pakistan', 'Indonesia', 'UAE'],
};

export const blogPosts: BlogPost[] = [
    {
        id: '1',
        title: 'The Future of Web Development: Trends to Watch in 2025',
        author: 'Aria Montgomery',
        date: '2024-07-20',
        tags: ['Web Development', 'Technology', 'Future'],
        imageUrl: 'https://picsum.photos/seed/blog1/800/400',
        imageHint: 'futuristic code',
        excerpt: 'Explore the upcoming trends in web development for 2025, from AI-powered tools to the evolution of JavaScript frameworks. Stay ahead of the curve and see what\'s next for the web.',
        content: `
<p>The web development landscape is in a constant state of flux. As we look towards 2025, several key trends are emerging that will shape the future of how we build and interact with websites and applications.</p>

<h3 class="font-headline text-xl font-semibold mt-6 mb-2">1. AI-Powered Development</h3>
<p>Artificial intelligence is no longer just a buzzword. AI-powered tools are becoming integral to the development process, assisting with everything from code completion and debugging to automated testing and deployment. Expect to see more sophisticated AI assistants that can understand complex requirements and generate entire components or even full applications.</p>

<h3 class="font-headline text-xl font-semibold mt-6 mb-2">2. The Rise of Meta-Frameworks</h3>
<p>Frameworks like Next.js, Nuxt.js, and SvelteKit, often called meta-frameworks, will continue to gain popularity. They build upon foundational libraries like React and Vue, providing a more structured and feature-rich environment out of the box, including server-side rendering, static site generation, and optimized performance.</p>

<h3 class="font-headline text-xl font-semibold mt-6 mb-2">3. WebAssembly (WASM)</h3>
<p>WebAssembly allows developers to run high-performance code written in languages like C++, Rust, and Go directly in the browser. This opens up new possibilities for web applications that require intensive computation, such as gaming, video editing, and scientific simulations.</p>
        `,
    },
    {
        id: '2',
        title: 'Mastering UI/UX: A Guide to User-Centric Design',
        author: 'Caleb Chen',
        date: '2024-07-18',
        tags: ['UI/UX', 'Design', 'User Experience'],
        imageUrl: 'https://picsum.photos/seed/blog2/800/400',
        imageHint: 'design wireframe',
        excerpt: 'A deep dive into the principles of user-centric design. Learn how to create interfaces that are not only beautiful but also intuitive, accessible, and a joy to use.',
        content: `
<p>In today\'s competitive digital world, a great user experience (UX) is not a luxury; it\'s a necessity. User-centric design is a philosophy that places the user at the heart of the design process. This guide will walk you through the core principles.</p>

<h3 class="font-headline text-xl font-semibold mt-6 mb-2">1. Empathize with Your Users</h3>
<p>Before you write a single line of code or draw a single pixel, you must understand your users. Conduct user research, create user personas, and map out user journeys to gain deep insights into their needs, goals, and pain points.</p>

<h3 class="font-headline text-xl font-semibold mt-6 mb-2">2. Clarity and Simplicity</h3>
<p>A good interface is one that is easy to understand and navigate. Avoid clutter, use clear language, and ensure that the most common user actions are the most accessible. As Antoine de Saint-Exupéry said, "Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away."</p>

<h3 class="font-headline text-xl font-semibold mt-6 mb-2">3. Consistency is Key</h3>
<p>A consistent design allows users to develop patterns of use. This means using consistent colors, typography, and interactive elements throughout your application. This predictability makes the interface feel familiar and easy to learn.</p>
        `,
    },
];
