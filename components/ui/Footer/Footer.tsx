import Link from 'next/link';
import Logo from '@/components/icons/Logo';
import GitHub from '@/components/icons/GitHub';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-100">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Logo */}
        <div className="col-span-1 md:col-span-3 flex items-center space-x-3">
          <Link href="/" className="flex items-center space-x-2">
            <span className="p-3 bg-indigo-600 rounded-full shadow-lg border border-indigo-500">
              <Logo className="text-white" />
            </span>
            <span className="text-2xl font-bold tracking-wide text-indigo-400">ACME</span>
          </Link>
        </div>

        {/* Main Links */}
        <div className="col-span-1 md:col-span-3 space-y-3">
          <h4 className="font-semibold text-lg mb-2 text-indigo-400">Explore</h4>
          <ul className="space-y-2">
            {['Home', 'About', 'Careers', 'Blog'].map((item) => (
              <li key={item}>
                <Link
                  href="/"
                  className="hover:text-indigo-300 transition-colors duration-300"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div className="col-span-1 md:col-span-3 space-y-3">
          <h4 className="font-semibold text-lg mb-2 text-indigo-400">Legal</h4>
          <ul className="space-y-2">
            {['Privacy Policy', 'Terms of Use'].map((item) => (
              <li key={item}>
                <Link
                  href="/"
                  className="hover:text-indigo-300 transition-colors duration-300"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div className="col-span-1 md:col-span-3 flex md:justify-end items-center space-x-6">
          <a
            aria-label="Github Repository"
            href="https://github.com/vercel/nextjs-subscription-payments"
            className="hover:text-indigo-300 transition-colors duration-300"
          >
            <GitHub className="w-6 h-6" />
          </a>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 mt-10 py-6 px-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <span className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} ACME, Inc. All rights reserved.
        </span>
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <span>Crafted by Next</span>
          <a
            href="https://vercel.com"
            aria-label="Vercel.com Link"
            className="hover:text-indigo-300 transition-colors duration-300"
          >
            <img src="/vercel.svg" alt="Vercel Logo" className="h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
}
