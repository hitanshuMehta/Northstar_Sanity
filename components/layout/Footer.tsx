import React from "react";
import Link from "next/link";
import { Container } from "../ui/Container";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-north-surface border-t border-north-border pt-20 pb-12 transition-colors">
      <Container>
        {/* Upper Big Editorial Headline */}
        <div className="border-b border-north-border pb-16 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <span className="text-xs font-semibold tracking-widest uppercase text-north-muted mb-4 block">
                GET IN TOUCH
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif tracking-tight text-north-primary leading-[1.05]">
                Let&apos;s build something <br />
                <span className="italic">extraordinary</span> together.
              </h2>
            </div>
            <div className="lg:col-span-4 flex lg:justify-end">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 text-lg font-medium text-north-primary hover:text-north-accent transition-colors"
              >
                <span>hello@northstar.agency</span>
                <span className="p-3 rounded-full bg-north-bg border border-north-border group-hover:border-north-accent group-hover:bg-north-accent group-hover:text-north-bg transition-all">
                  <ArrowUpRight className="w-5 h-5" />
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Middle Links & Offices Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-10 border-b border-north-border pb-16 mb-12">
          {/* Brand Col */}
          <div className="col-span-2 lg:col-span-4 flex flex-col justify-between">
            <div>
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-2xl font-bold tracking-tighter text-north-primary uppercase font-sans mb-4"
              >
                <span>NORTHSTAR</span>
                <span className="w-2 h-2 rounded-full bg-north-accent" />
              </Link>
              <p className="text-sm text-north-muted max-w-sm leading-relaxed">
                Northstar partners with ambitious companies to design, build and scale digital products that move businesses forward.
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold tracking-widest uppercase text-north-muted mb-6">
              Navigation
            </h4>
            <ul className="space-y-3 text-sm">
              {["Work", "Services", "About", "Insights", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="text-north-primary hover:text-north-muted transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold tracking-widest uppercase text-north-muted mb-6">
              Services
            </h4>
            <ul className="space-y-3 text-sm text-north-muted">
              <li>Digital Strategy</li>
              <li>Brand & Experience</li>
              <li>Web Development</li>
              <li>Product Design</li>
              <li>Growth & SEO</li>
            </ul>
          </div>

          {/* Locations */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold tracking-widest uppercase text-north-muted mb-6">
              Offices
            </h4>
            <div className="space-y-4 text-xs text-north-muted">
              <div>
                <span className="font-semibold text-north-primary block">NEW YORK</span>
                <span>540 Broadway, 4th Fl</span>
              </div>
              <div>
                <span className="font-semibold text-north-primary block">LONDON</span>
                <span>25 Broadwick St, Soho</span>
              </div>
              <div>
                <span className="font-semibold text-north-primary block">BERLIN</span>
                <span>Torstraße 177, Mitte</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-north-muted gap-4">
          <p>© {new Date().getFullYear()} NORTHSTAR AGENCY INC. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-6">
            <span>Built with Next.js & Framer Motion</span>
            <span>CMS Ready</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
