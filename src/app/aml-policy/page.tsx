
'use client';

import { Animated, fadeUp } from '@/components/ui/animated';
import TOC from '@/components/aml/TOC';

const SECTIONS = [
    { id: 'introduction', label: 'Introduction' },
    { id: 'objectives', label: 'Objectives' },
    { id: 'cdd', label: 'Client Due Diligence (CDD)' },
    { id: 'transactions', label: 'Transaction Transparency' },
    { id: 'risk', label: 'Risk-Based Approach' },
    { id: 'sanctions', label: 'Sanctions Screening' },
    { id: 'jurisdiction', label: 'Jurisdictional Compliance' },
    { id: 'controls', label: 'Internal Controls & Recordkeeping' },
    { id: 'training', label: 'Employee Awareness & Training' },
]

export default function AMLPolicyPage() {
    return (
        <div className="container mx-auto max-w-6xl px-4 py-16 md:py-24 scroll-smooth">
            <Animated variants={fadeUp}>
                <header className="mb-8 text-center">
                    <h1 className="font-headline text-3xl font-bold md:text-5xl">
                        Anti-Money Laundering (AML) Policy
                    </h1>
                    <p className="mt-2 text-muted-foreground">Last updated: 1 Jan 2026</p>
                </header>
            </Animated>

            <Animated variants={fadeUp} delay={0.2}>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    <aside className="md:col-span-1">
                        <TOC sections={SECTIONS} />
                    </aside>

                    <main className="md:col-span-2">
                        <section>
                            <p className="text-muted-foreground">
                                Rust Innovations is committed to preventing money laundering and any activity that facilitates money laundering or the funding of terrorist or criminal activities.
                            </p>

                            <h2 id="introduction" className="font-headline text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
                            <p className="text-muted-foreground">
                                Rust Innovations is committed to combating money laundering, terrorist financing, and financial
                                crimes. This policy is designed to ensure compliance with all applicable AML regulations in Pakistan and
                                internationally, while maintaining the integrity of our operations across all jurisdictions where we
                                operate.
                            </p>

                            <h2 id="objectives" className="font-headline text-2xl font-semibold mt-8 mb-4">2. Objectives</h2>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                <li>
                                    Prevent misuse of Rust Innovations’s services for illegal financial activity.
                                </li>
                                <li>
                                    Ensure all clients are properly verified and monitored.
                                </li>
                                <li>
                                    Maintain a secure financial environment through transparency, due diligence, and cooperation with financial institutions and regulatory authorities.
                                </li>
                                <li>
                                    Comply fully with local and international AML and Counter-Terrorist Financing (CTF) laws.
                                </li>
                            </ul>

                            <h2 id="cdd" className="font-headline text-2xl font-semibold mt-8 mb-4">3. Client Due Diligence (CDD)</h2>
                            <p className="text-muted-foreground">We strictly follow Customer Due Diligence (CDD) and Enhanced Due Diligence (EDD) procedures. No business activity is conducted with any client without proper due diligence. This includes:</p>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                <li>
                                    <strong>Full identification:</strong> CNIC/passport, valid contact number, current address.
                                </li>
                                <li>
                                    <strong>Payment source verification:</strong> All clients are required to confirm that their payment source is clean, legal, and not related to any illicit activity.
                                </li>
                                <li>
                                    <strong>Client location:</strong> Geographical location is recorded and preserved for compliance review.
                                </li>
                                <li>
                                    <strong>Secure record-keeping:</strong> All client data including identity proof, contact details, and trade/payment history are securely stored in compliance with data protection policies.
                                </li>
                            </ul>

                            <h2 id="transactions" className="font-headline text-2xl font-semibold mt-8 mb-4">4. Transaction Transparency & Banking Cooperation</h2>
                            <p className="text-muted-foreground">
                                All business transactions are processed through official banking channels. We maintain detailed
                                trade/payment history for each client to:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                <li>Provide transparency for audits or inquiries.</li>
                                <li>Respond to bank compliance teams during periodic reviews.</li>
                                <li>Submit client transaction justifications when required by financial institutions.</li>
                            </ul>

                            <h2 id="risk" className="font-headline text-2xl font-semibold mt-8 mb-4">5. Risk-Based Approach & Monitoring</h2>
                            <p className="text-muted-foreground">
                                We apply a risk-based approach based on the nature of the client, country of origin, and transaction
                                behavior. Higher-risk clients (e.g., cross-border payments) are subject to enhanced monitoring and
                                documentation.
                            </p>

                            <h2 id="sanctions" className="font-headline text-2xl font-semibold mt-8 mb-4">6. Sanctions Screening</h2>
                            <p className="text-muted-foreground">
                                Rust Innovations strictly screens all clients and partners against the following international sanctions
                                lists:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                <li>Office of Financial Sanctions Implementation HMT (OFSI)</li>
                                <li>United Nations Security Council Sanctions List (UN)</li>
                                <li>U.S. Department of the Treasury – Office of Foreign Assets Control (OFAC)</li>
                                <li>European Union Consolidated Sanctions List (EU)</li>
                            </ul>
                            <p className="text-muted-foreground mt-2">
                                We do not engage in any transactions involving:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                <li>Entities or individuals listed on the above sanctions lists.</li>
                                <li>Clients from restricted, blacklisted, or high-risk countries.</li>
                                <li>Any person or organization under financial, economic, or trade sanctions.</li>
                            </ul>

                            <h2 id="jurisdiction" className="font-headline text-2xl font-semibold mt-8 mb-4">7. Jurisdictional Compliance</h2>
                            <p className="text-muted-foreground">
                                We ensure full compliance with local AML and anti-terror financing laws in every country where we
                                operate. These include:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                <li>Pakistan (FATF guidelines & SBP directives)</li>
                                <li>UAE, Indonesia, and other jurisdictions where we offer services.</li>
                                <li>International AML best practices as advised by FATF and global regulators.</li>
                            </ul>

                            <h2 id="controls" className="font-headline text-2xl font-semibold mt-8 mb-4">8. Internal Controls, Reporting, and Recordkeeping</h2>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                <li>All suspicious transactions are internally flagged and, if necessary, reported to authorities such as FIA or respective financial institutions.</li>
                                <li>Comprehensive internal logs are maintained for at least 3 years.</li>
                                <li>AML policy is reviewed annually and updated as per regulatory or operational changes.</li>
                            </ul>

                            <h2 id="training" className="font-headline text-2xl font-semibold mt-8 mb-4">9. Employee Awareness & Training</h2>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                <li>Key staff and compliance team are trained to identify high-risk transactions and report them immediately.</li>
                                <li>All employees are informed of their responsibility under this AML Policy.</li>
                            </ul>

                            {/* Signature and contact */}
                            <div className="mt-12 border-t pt-8 text-foreground">
                                <p className="whitespace-pre-line">
                                    <span className="font-semibold text-primary">Signed,</span>{"\n"}
                                    <span >President Director | Rust Innovations</span>{"\n"}
                                    <span >Authorized Signatory</span>{"\n"}
                                    <span >Shahid Mahmood</span>{"\n"}
                                    <span >info@rustinnovations.com</span>
                                </p>

                            </div>
                        </section>
                    </main>
                </div>
            </Animated>
        </div>
    );
}
