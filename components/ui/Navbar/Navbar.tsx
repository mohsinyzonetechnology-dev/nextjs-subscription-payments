import { createClient } from '@/utils/supabase/server';
import Navlinks from './Navlinks';

export default async function Navbar() {
  const supabase = createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  return (
    <nav className="fixed w-full z-50 bg-gradient-to-r from-sky-900 via-cyan-900 to-indigo-950 shadow-lg backdrop-blur-md">
      <a href="#skip" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
          CloudArmors
        </a>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <Navlinks user={user} />

          {/* CTA / Button */}
          {/* {user ? (
            <a
              href="/dashboard"
              className="px-4 py-2 rounded-lg bg-cyan-400 hover:bg-cyan-500 text-sky-900 font-semibold transition"
            >
              Dashboard
            </a>
          ) : (
            <a
              href="/signin"
              className="px-4 py-2 rounded-lg bg-purple-400 hover:bg-purple-500 text-sky-900 font-semibold transition"
            >
            
            </a>
          )} */}
        </div>
      </div>
    </nav>
  );
}
