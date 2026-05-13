"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const industries = [
  { name: "Meat Processing", href: "/industries/meat-processing" },
  { name: "Beverage Manufacturing", href: "/industries/beverage-manufacturing" },
  { name: "Dairy Plants", href: "/industries/dairy" },
  { name: "Nutraceutical", href: "/industries/nutraceutical" },
  { name: "Frozen Foods", href: "/industries/frozen-foods" },
  { name: "Co-Packers", href: "/industries/co-packers" },
];

const tools = [
  { name: "FSMA 204 Gap Assessment", href: "/tools/fsma-gap-assessment" },
  { name: "Recall Trace Simulator", href: "/tools/recall-trace-simulator" },
  { name: "Cpk Calculator", href: "/tools/cpk-calculator" },
  { name: "FSMA Deadline Tracker", href: "/tools/fsma-deadline-tracker" },
];

interface DropdownProps {
  label: string;
  items: { name: string; href: string }[];
  indexHref: string;
}

function DesktopDropdown({ label, items, indexHref }: DropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className="flex items-center gap-1 text-[#1B2D4F] text-sm font-medium hover:text-[#00C9A7] transition-colors"
        aria-expanded={open}
        aria-haspopup="true"
      >
        {label}
        <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-2">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-2.5 text-sm text-[#1B2D4F] hover:bg-[#F8FAFC] hover:text-[#00C9A7] transition-colors"
            >
              {item.name}
            </Link>
          ))}
          <div className="border-t border-gray-100 mt-1 pt-1">
            <Link
              href={indexHref}
              className="block px-4 py-2.5 text-xs font-semibold text-[#00C9A7] hover:bg-[#F8FAFC] transition-colors uppercase tracking-wider"
            >
              View all →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);

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
            className="text-[#1B2D4F] text-sm font-medium hover:text-[#00C9A7] transition-colors"
          >
            Product
          </Link>

          <DesktopDropdown
            label="Industries"
            items={industries}
            indexHref="/industries"
          />

          <DesktopDropdown
            label="Tools"
            items={tools}
            indexHref="/tools"
          />

          <Link
            href="/blog"
            className="text-[#1B2D4F] text-sm font-medium hover:text-[#00C9A7] transition-colors"
          >
            Blog
          </Link>

          <Link
            href="/about"
            className="text-[#1B2D4F] text-sm font-medium hover:text-[#00C9A7] transition-colors"
          >
            About
          </Link>

          <Link
            href="/contact"
            className="bg-[#0A2540] text-white text-sm font-medium px-5 py-2 rounded-md hover:bg-[#0d3060] transition-colors"
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
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col px-6 py-2">
            <Link
              href="/product"
              className="text-[#1B2D4F] text-base font-medium py-4 border-b border-gray-100"
              onClick={() => setMenuOpen(false)}
            >
              Product
            </Link>

            {/* Industries accordion */}
            <div className="border-b border-gray-100">
              <button
                className="w-full flex items-center justify-between text-[#1B2D4F] text-base font-medium py-4"
                onClick={() => setMobileIndustriesOpen(!mobileIndustriesOpen)}
              >
                Industries
                <ChevronDown size={16} className={`transition-transform ${mobileIndustriesOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileIndustriesOpen && (
                <div className="pb-3 pl-3 flex flex-col gap-1">
                  {industries.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-[#64748B] text-sm py-2 hover:text-[#00C9A7]"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Link
                    href="/industries"
                    className="text-[#00C9A7] text-xs font-semibold uppercase tracking-wider pt-1"
                    onClick={() => setMenuOpen(false)}
                  >
                    View all industries →
                  </Link>
                </div>
              )}
            </div>

            {/* Tools accordion */}
            <div className="border-b border-gray-100">
              <button
                className="w-full flex items-center justify-between text-[#1B2D4F] text-base font-medium py-4"
                onClick={() => setMobileToolsOpen(!mobileToolsOpen)}
              >
                Free Tools
                <ChevronDown size={16} className={`transition-transform ${mobileToolsOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileToolsOpen && (
                <div className="pb-3 pl-3 flex flex-col gap-1">
                  {tools.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-[#64748B] text-sm py-2 hover:text-[#00C9A7]"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Link
                    href="/tools"
                    className="text-[#00C9A7] text-xs font-semibold uppercase tracking-wider pt-1"
                    onClick={() => setMenuOpen(false)}
                  >
                    View all tools →
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/blog"
              className="text-[#1B2D4F] text-base font-medium py-4 border-b border-gray-100"
              onClick={() => setMenuOpen(false)}
            >
              Blog
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
                className="block bg-[#0A2540] text-white text-base font-medium px-5 py-3 rounded-md text-center"
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
