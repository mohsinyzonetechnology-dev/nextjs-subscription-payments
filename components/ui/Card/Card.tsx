import { ReactNode } from 'react';

interface Props {
  title: string;
  description?: string;
  footer?: ReactNode;
  children: ReactNode;
}

export default function Card({ title, description, footer, children }: Props) {
  return (
    <div className="relative w-full max-w-3xl mx-auto my-12 rounded-2xl bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 border border-zinc-800 shadow-xl overflow-hidden animate-fadeIn">
      
      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b border-zinc-800">
        <h3 className="text-2xl font-semibold text-white tracking-tight">
          {title}
        </h3>
        {description && (
          <p className="mt-1 text-sm text-zinc-400">
            {description}
          </p>
        )}
      </div>

      {/* Content */}
      <div className="px-6 py-6 text-zinc-200">
        {children}
      </div>

      {/* Footer */}
      {footer && (
        <div className="
          px-6 py-4
          bg-zinc-900/80 backdrop-blur
          border-t border-zinc-800
          text-sm text-zinc-400
        ">
          {footer}
        </div>
      )}
    </div>
  );
}
