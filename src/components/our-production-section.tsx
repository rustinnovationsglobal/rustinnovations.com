import Link from 'next/link';

export function OurProductionSection() {
  const products = [
    {
      id: '1',
      name: 'Custom Development',
      icon: '💻',
      description: 'Bespoke web and app development tailored to your needs',
      link: '/services',
    },
    {
      id: '2',
      name: 'Cloud Solutions',
      icon: '☁️',
      description: 'Scalable cloud infrastructure and deployment services',
      link: '/services',
    },
    {
      id: '3',
      name: 'Data Analytics',
      icon: '📊',
      description: 'Advanced analytics and business intelligence solutions',
      link: '/services',
    },
    {
      id: '4',
      name: 'RustPass',
      icon: '🔐',
      description: 'Secure employee verification and identity management',
      link: '/rustpass',
      highlight: true,
    },
  ];

  return (
    <section className="px-4 py-20 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="mx-auto max-w-6xl">
        {/* Header with accent line */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-wider uppercase text-red-400 bg-red-400/10 rounded-full border border-red-400/20">
            What We Build
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our <span className="text-red-500">Production</span>
          </h2>
          <div className="w-20 h-1 mx-auto bg-gradient-to-r from-red-500 to-red-600 rounded-full" />
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
            Innovative solutions and services we offer
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              href={product.link}
              className={`group relative rounded-2xl p-6 transition-all duration-300 ${
                product.highlight
                  ? 'bg-gradient-to-br from-red-600 to-red-700 shadow-lg shadow-red-500/30 hover:shadow-red-500/50'
                  : 'bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20'
              } hover:-translate-y-2`}
            >
              {/* Glow effect for highlighted card */}
              {product.highlight && (
                <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
              )}
              
              <div className="relative">
                {/* Icon with circular background */}
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 text-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 ${
                  product.highlight
                    ? 'bg-white/20'
                    : 'bg-white/10'
                }`}>
                  {product.icon}
                </div>
                
                <h3 className={`text-xl font-bold mb-2 ${
                  product.highlight ? 'text-white' : 'text-white'
                }`}>
                  {product.name}
                </h3>
                
                <p className={`text-sm leading-relaxed ${
                  product.highlight ? 'text-red-100' : 'text-slate-400'
                }`}>
                  {product.description}
                </p>
                
                {/* Learn more link */}
                <div className={`mt-5 flex items-center gap-2 text-sm font-semibold transition-all duration-300 ${
                  product.highlight 
                    ? 'text-white group-hover:gap-3' 
                    : 'text-red-500 group-hover:gap-3'
                }`}>
                  <span>Learn more</span>
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>

                {/* Decorative corner accent */}
                <div className={`absolute top-3 right-3 w-1.5 h-1.5 rounded-full ${
                  product.highlight ? 'bg-white/50' : 'bg-slate-600'
                }`} />
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-red-600 rounded-full hover:bg-red-700 transition-all hover:gap-3 hover:scale-105"
          >
            View All Services
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
