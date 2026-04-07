import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1B2D4F] text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Left: wordmark + tagline */}
          <div>
            <div className="text-xl font-bold tracking-widest uppercase mb-3">
              PROVARX
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Every record. Proven. Permanent.
            </p>
          </div>

          {/* Center: links */}
          <div className="flex flex-col gap-3">
            <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Navigation</p>
            <Link href="/product" className="text-white/70 text-sm hover:text-white transition-colors">
              Product
            </Link>
            <Link href="/why-provarx" className="text-white/70 text-sm hover:text-white transition-colors">
              Why Provarx
            </Link>
            <Link href="/about" className="text-white/70 text-sm hover:text-white transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-white/70 text-sm hover:text-white transition-colors">
              Contact
            </Link>
          </div>

          {/* Right: email */}
          <div>
            <p className="text-white/40 text-xs uppercase tracking-wider mb-3">Contact</p>
            <a
              href="mailto:clinton@provarx.com"
              className="text-white/70 text-sm hover:text-white transition-colors"
            >
              clinton@provarx.com
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <p className="text-white/40 text-xs text-center">
            © 2026 Provarx LLC. All rights reserved. Built for food and beverage manufacturers navigating FSMA 204 compliance.
          </p>
        </div>
      </div>
    </footer>
  );
}
