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
      icon: '👆',
      description: 'Secure employee verification and identity management',
      link: '/rustpass',
      highlight: true,
    },
  ];

  return (
    <section className="py-16 px-4 bg-slate-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-3">Our Production</h2>
          <p className="text-slate-400">
            Innovative solutions and services we offer
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              href={product.link}
              className={`group rounded-xl p-6 transition transform hover:scale-105 ${
                product.highlight
                  ? 'bg-gradient-to-br from-red-600 to-red-700 border-2 border-red-500'
                  : 'bg-slate-800 border border-slate-700 hover:border-slate-600'
              }`}
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                {product.icon}
              </div>
              <h3 className={`text-xl font-bold mb-2 ${
                product.highlight ? 'text-white' : 'text-white'
              }`}>
                {product.name}
              </h3>
              <p className={`text-sm ${
                product.highlight ? 'text-red-100' : 'text-slate-400'
              }`}>
                {product.description}
              </p>
              <div className="mt-4 flex items-center gap-2 text-sm font-semibold">
                <span className={product.highlight ? 'text-white' : 'text-red-600'}>
                  Learn more
                </span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
