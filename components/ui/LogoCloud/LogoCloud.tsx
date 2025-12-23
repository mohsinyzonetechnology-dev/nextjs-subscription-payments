export default function LogoCloud() {
  return (
    <section className="relative mt-32 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-green-400/20 via-yellow-200/10 to-blue-500/20" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-[300px] w-[300px] rounded-full bg-blue-500/20 blur-[140px]" />

      <div className="max-w-6xl mx-auto text-center px-6 py-20 rounded-3xl
        bg-gradient-to-b from-gray-900/80 via-gray-800/60 to-gray-700/90
        border border-gray-700 backdrop-blur-xl shadow-2xl">

        <p className="text-xs uppercase tracking-widest font-semibold text-green-400 mb-12">
          Trusted by modern platforms
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-10">
          {[
            { href: 'https://nextjs.org', src: '/nextjs.svg', alt: 'Next.js' },
            { href: 'https://vercel.com', src: '/vercel.svg', alt: 'Vercel' },
            { href: 'https://stripe.com', src: '/stripe.svg', alt: 'Stripe' },
            { href: 'https://supabase.com', src: '/supabase.svg', alt: 'Supabase' },
            { href: 'https://github.com', src: '/github.svg', alt: 'GitHub' }
          ].map((logo) => (
            <a
              key={logo.alt}
              href={logo.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={logo.alt}
              className="
                group relative flex items-center justify-center
                rounded-2xl border border-gray-700
                bg-gradient-to-br from-gray-800 to-gray-700
                p-8 transition-all duration-300
                hover:-translate-y-2 hover:shadow-xl
              "
            >
              {/* Always visible glow */}
              <span className="
                absolute inset-0 rounded-2xl
                bg-gradient-to-r from-green-400/20 to-blue-400/20
                blur-lg
              " />

              <img
                src={logo.src}
                alt={logo.alt}
                className="
                  relative h-10 opacity-100 grayscale-0
                  transition-all duration-300
                "
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
