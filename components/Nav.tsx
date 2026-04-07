"use client";

import Link from "next/link";
import { useState } from "react";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-[#1B2D4F] font-bold text-xl tracking-widest uppercase"
          onClick={() => setMenuOpen(false)}
        >
          PROVARX
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/product"
            className="text-[#1B2D4F] text-sm font-medium hover:text-[#4A90D9] transition-colors"
          >
            Product
          </Link>
          <Link
            href="/why-provarx"
            className="text-[#1B2D4F] text-sm font-medium hover:text-[#4A90D9] transition-colors"
          >
            Why Provarx
          </Link>
          <Link
            href="/about"
            className="text-[#1B2D4F] text-sm font-medium hover:text-[#4A90D9] transition-colors"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-[#1B2D4F] text-sm font-medium hover:text-[#4A90D9] transition-colors"
          >
            Contact
          </Link>
          <Link
            href="/contact"
            className="bg-[#1B2D4F] text-white text-sm font-medium px-5 py-2 rounded-md hover:bg-[#243d6b] transition-colors"
          >
            Talk to Us
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-[#1B2D4F]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="flex flex-col px-6 py-2">
            <Link
              href="/product"
              className="text-[#1B2D4F] text-base font-medium py-4 border-b border-gray-100"
              onClick={() => setMenuOpen(false)}
            >
              Product
            </Link>
            <Link
              href="/why-provarx"
              className="text-[#1B2D4F] text-base font-medium py-4 border-b border-gray-100"
              onClick={() => setMenuOpen(false)}
            >
              Why Provarx
            </Link>
            <Link
              href="/about"
              className="text-[#1B2D4F] text-base font-medium py-4 border-b border-gray-100"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-[#1B2D4F] text-base font-medium py-4 border-b border-gray-100"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="py-4">
              <Link
                href="/contact"
                className="block bg-[#1B2D4F] text-white text-base font-medium px-5 py-3 rounded-md text-center"
                onClick={() => setMenuOpen(false)}
              >
                Talk to Us
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
