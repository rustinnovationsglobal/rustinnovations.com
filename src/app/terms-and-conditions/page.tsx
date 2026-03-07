
import { Animated, fadeUp } from '@/components/ui/animated';
import TOC from '@/components/aml/TOC';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms and Conditions',
    description: 'Read the Terms and Conditions for using the services and website of Rust Innovations. Includes payment terms, delivery policy, and more.',
};

const SECTIONS = [
    { id: 'introduction', label: '1. Introduction' },
    { id: 'services', label: '2. Services Offered' },
    { id: 'payment', label: '3. Payment Terms' },
    { id: 'delivery', label: '4. Delivery Policy' },
    { id: 'revisions', label: '5. Revisions and Changes' },
    { id: 'intellectual-property', label: '6. Intellectual Property' },
    { id: 'confidentiality', label: '7. Confidentiality' },
    { id: 'liability', label: '8. Liability' },
    { id: 'cancellation', label: '9. Cancellation and Termination' },
    { id: 'governing-law', label: '10. Governing Law' },
    { id: 'contact', label: '11. Contact Information' }
];

export default function TermsAndConditionsPage() {
    return (
        <div className="container mx-auto max-w-4xl px-4 py-16 md:py-24">
            <Animated variants={fadeUp}>
                <header className="mb-8 text-center">
                    <h1 className="font-headline text-3xl font-bold md:text-5xl">
                        Terms & Conditions
                    </h1>
                    <p className="mt-2 text-muted-foreground">
                        Last updated: 1 Jan 2026
                    </p>
                </header>
            </Animated>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                <aside className="md:col-span-1">
                    <TOC sections={SECTIONS} />
                </aside>

                <main className="md:col-span-2">
                    <Animated 
                        variants={fadeUp}
                        delay={0.2}
                        className="prose prose-invert max-w-none prose-p:text-muted-foreground prose-headings:text-foreground"
                    >
                        <section id="introduction">
                            <h2 className="font-headline text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
                            <p className="text-muted-foreground">
                                These Terms & Conditions outline the rules and regulations for using the services provided by Rust Innovations. By accessing our services, you agree to comply with these terms.
                            </p>
                        </section>

                        <section id="services">
                            <h2 className="font-headline text-2xl font-semibold mt-8 mb-4">2. Services Offered</h2>
                            <p className="text-foreground">
                                We provide a range of digital services, including but not limited to:
                            </p>
                            <ul className="space-y-2 mt-4">
                                <li className="flex items-start">
                                    <span className="mr-2 mt-1">•</span>
                                    <p className="text-muted-foreground">Web & App Development</p>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2 mt-1">•</span>
                                    <p className="text-muted-foreground">Digital Marketing & SEO</p>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2 mt-1">•</span>
                                    <p className="text-muted-foreground">Social Media Management & Ads</p>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2 mt-1">•</span>
                                    <p className="text-muted-foreground">Photography & Video Editing</p>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2 mt-1">•</span>
                                    <p className="text-muted-foreground">E-commerce Solutions</p>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2 mt-1">•</span>
                                    <p className="text-muted-foreground">Consultancy & Training</p>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2 mt-1">•</span>
                                    <p className="text-muted-foreground">Reselling of Digital Tools</p>
                                </li>
                            </ul>
                        </section>

                        <section id="payment">
                            <h2 className="font-headline text-2xl font-semibold mt-8 mb-4">3. Payment Terms</h2>
                            <ul className="space-y-2 mt-4">
                                <li className="flex items-start">
                                    <span className="mr-2 mt-1">•</span>
                                    <div>
                                        <h3 className="text-foreground font-medium">Advance Payment:</h3>
                                        <p className="text-muted-foreground"> Most services require 100% advance payment unless otherwise stated.</p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2 mt-1">•</span>
                                    <div>
                                        <h3 className="text-foreground font-medium">Installment Payment:</h3>
                                        <p className="text-muted-foreground"> For certain services, payment is divided into 60% upfront, 20% mid-project, and 20% upon completion. For Crypto OTC services all payment must be in Advance.</p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2 mt-1">•</span>
                                    <div>
                                        <h3 className="text-foreground font-medium">Consultancy Fees:</h3>
                                        <p className="text-muted-foreground"> Non-refundable and charged upfront.</p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2 mt-1">•</span>
                                    <div>
                                        <h3 className="text-foreground font-medium">Performance-Based Services:</h3>
                                        <p className="text-muted-foreground"> Payments are based on campaign budgets, with specific consultancy fees as mentioned.</p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2 mt-1">•</span>
                                    <div>
                                        <h3 className="text-foreground font-medium">No Refund Policy:</h3>
                                        <p className="text-muted-foreground"> Once a service has started, payments are non-refundable.</p>
                                    </div>
                                </li>
                            </ul>
                        </section>

                        <section id="delivery">
                            <h2 className="font-headline text-2xl font-semibold mt-8 mb-4">4. Delivery Policy</h2>
                            <ul className="space-y-2 mt-4">
                                <li className="flex items-start">
                                    <span className="mr-2 mt-1">•</span>
                                    <div>
                                        <h3 className="text-foreground font-medium">Standard Delivery Times:</h3>
                                        <p className="text-muted-foreground"> Delivery timelines are specified for each service. Delays will be communicated in advance.</p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2 mt-1">•</span>
                                    <div>
                                        <h3 className="text-foreground font-medium">Same-Day Services:</h3>
                                        <p className="text-muted-foreground"> Available for select services with prior approval and full payment.</p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2 mt-1">•</span>
                                    <div>
                                        <h3 className="text-foreground font-medium">Ongoing Services:</h3>
                                        <p className="text-muted-foreground"> Ads and campaigns are managed and optimized on a daily basis.</p>
                                    </div>
                                </li>
                            </ul>
                        </section>

                        <section id="revisions">
                            <h2 className="font-headline text-2xl font-semibold mt-8 mb-4">5. Revisions and Changes</h2>
                            <ul className="space-y-2 mt-4">
                                <li className="flex items-start">
                                    <span className="mr-2 mt-1">•</span>
                                    <p className="text-muted-foreground">One round of revisions is included unless otherwise specified.</p>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2 mt-1">•</span>
                                    <p className="text-muted-foreground">Additional revisions or changes beyond the agreed scope will incur extra charges.</p>
                                </li>
                            </ul>
                        </section>

                        <section id="intellectual-property">
                            <h2 className="font-headline text-2xl font-semibold mt-8 mb-4">6. Intellectual Property</h2>
                            <ul className="space-y-2 mt-4">
                                <li className="flex items-start">
                                    <span className="mr-2 mt-1">•</span>
                                    <p className="text-muted-foreground">Ownership of deliverables transfers to the client after full payment.</p>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2 mt-1">•</span>
                                    <p className="text-muted-foreground">We retain the right to feature completed projects in our portfolio unless explicitly agreed otherwise.</p>
                                </li>
                            </ul>
                        </section>

                        <section id="confidentiality">
                            <h2 className="font-headline text-2xl font-semibold mt-8 mb-4">7. Confidentiality</h2>
                            <ul className="space-y-2 mt-4">
                                <li className="flex items-start">
                                    <span className="mr-2 mt-1">•</span>
                                    <p className="text-muted-foreground">We maintain strict confidentiality regarding all client data and project details.</p>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2 mt-1">•</span>
                                    <p className="text-muted-foreground">Any data shared will be used solely for project execution purposes.</p>
                                </li>
                            </ul>
                        </section>

                        <section id="liability">
                            <h2 className="font-headline text-2xl font-semibold mt-8 mb-4">8. Liability</h2>
                            <ul className="space-y-2 mt-4">
                                <li className="flex items-start">
                                    <span className="mr-2 mt-1">•</span>
                                    <p className="text-muted-foreground">We are not liable for any indirect, incidental, or consequential damages arising from the use of our services.</p>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2 mt-1">•</span>
                                    <p className="text-muted-foreground">Clients are responsible for providing accurate information and project details.</p>
                                </li>
                            </ul>
                        </section>

                        <section id="cancellation">
                            <h2 className="font-headline text-2xl font-semibold mt-8 mb-4">9. Cancellation and Termination</h2>
                            <ul className="space-y-2 mt-4">
                                <li className="flex items-start">
                                    <span className="mr-2 mt-1">•</span>
                                    <p className="text-muted-foreground">Services can only be canceled before work begins.</p>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2 mt-1">•</span>
                                    <p className="text-muted-foreground">Any payments made prior to cancellation are non-refundable.</p>
                                </li>
                            </ul>
                        </section>

                        <section id="governing-law">
                            <h2 className="font-headline text-2xl font-semibold mt-8 mb-4">10. Governing Law</h2>
                            <p className="text-muted-foreground">
                                These Terms & Conditions are governed by the laws of the jurisdiction where Rust Innovations is registered.
                            </p>
                        </section>

                        <section id="contact">
                            <h2 className="font-headline text-2xl font-semibold mt-8 mb-4">11. Contact Information</h2>
                            <p className="text-foreground">
                                For questions or concerns regarding these Terms & Conditions, contact us at:
                            </p>
                            <ul className="space-y-2 mt-4">
                                <li className="flex items-start">
                                    <span className="mr-2 mt-1">•</span>
                                    <div>
                                        <h3 className="text-foreground font-medium">Email:</h3>
                                        <p className="text-muted-foreground"> info@rustinnovations.com</p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2 mt-1">•</span>
                                    <div>
                                        <h3 className="text-foreground font-medium">Phone:</h3>
                                        <p className="text-muted-foreground"> +92 326 4692 997</p>
                                    </div>
                                </li>
                            </ul>
                        </section>
                    </Animated>
                </main>
            </div>
        </div>
    );
}
