"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "../ui/Container";
import { ArrowUpRight, Check } from "lucide-react";

export function Footer() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText("hello@northstar.agency");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer className="relative w-full bg-north-surface border-t border-north-border pt-20 sm:pt-28 pb-12 transition-colors overflow-hidden">
      {/* Background Watermark Typographic Branding */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none select-none overflow-hidden w-full text-center z-0 opacity-[0.03] dark:opacity-[0.04]">
        <span className="font-serif font-bold text-[18vw] leading-none tracking-tighter text-north-primary uppercase block">
          NORTHSTAR
        </span>
      </div>

      <Container className="relative z-10">
        {/* Upper Big Editorial Headline with Stagger Entrance */}
        <div className="border-b border-north-border pb-16 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="lg:col-span-8"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-north-accent animate-pulse" />
                <span className="text-xs font-mono font-semibold tracking-widest uppercase text-north-muted">
                  GET IN TOUCH
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif tracking-tight text-north-primary leading-[1.05]">
                Let&apos;s build something <br />
                <span className="italic relative inline-block text-north-accent group/word cursor-pointer">
                  extraordinary
                  <span className="absolute bottom-1 left-0 w-full h-[2px] bg-north-accent origin-left scale-x-0 group-hover/word:scale-x-100 transition-transform duration-500" />
                </span>{" "}
                together.
              </h2>
            </motion.div>

            {/* Interactive Email Copy Button Pill */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-4 flex lg:justify-end"
            >
              <div className="relative">
                <button
                  onClick={handleCopyEmail}
                  className="group relative inline-flex items-center gap-4 px-6 py-4 rounded-full bg-north-bg border border-north-border hover:border-north-accent hover:bg-north-accent hover:text-north-bg transition-all duration-500 shadow-xl cursor-pointer"
                >
                  <span className="text-base sm:text-lg font-mono font-bold tracking-tight">
                    hello@northstar.agency
                  </span>
                  <span className="p-2.5 rounded-full bg-north-surface border border-north-border group-hover:bg-north-bg group-hover:border-north-bg text-north-primary transition-all duration-300">
                    {copied ? (
                      <Check className="w-4 h-4 text-north-accent group-hover:text-north-primary" />
                    ) : (
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    )}
                  </span>
                </button>

                {/* Toast Copy Confirmation Feedback */}
                <AnimatePresence>
                  {copied && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: -45, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-0 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-[#C7FF3D] text-[#111111] text-xs font-mono font-bold uppercase tracking-widest shadow-xl pointer-events-none whitespace-nowrap border border-[#C7FF3D]"
                    >
                      ✓ COPIED TO CLIPBOARD
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Middle Links & Offices Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-10 border-b border-north-border pb-16 mb-12">
          {/* Brand Col */}
          <div className="col-span-2 lg:col-span-4 flex flex-col justify-between space-y-6">
            <div>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-2xl font-bold tracking-tighter text-north-primary uppercase font-sans mb-4 group"
              >
                <span>NORTHSTAR</span>
                <span className="w-2.5 h-2.5 rounded-full bg-north-accent transition-transform duration-300 group-hover:scale-125" />
              </Link>
              <p className="text-sm text-north-muted max-w-sm leading-relaxed">
                Northstar partners with ambitious companies to design, build and scale digital products that move businesses forward.
              </p>
            </div>
          </div>

          {/* Navigation Links with Hover Slide Effect */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-mono font-semibold tracking-widest uppercase text-north-muted mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-north-accent" />
              NAVIGATION
            </h4>
            <ul className="space-y-3.5 text-sm">
              {[
                { name: "Work", href: "/work" },
                { name: "Services", href: "/services" },
                { name: "About", href: "/about" },
                { name: "Insights", href: "/insights" },
                { name: "Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-north-primary hover:text-north-accent transition-all duration-300"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-north-accent opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    <span className="transition-transform duration-300 group-hover:translate-x-1 font-medium">
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-mono font-semibold tracking-widest uppercase text-north-muted mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-north-accent" />
              SERVICES
            </h4>
            <ul className="space-y-3.5 text-sm text-north-muted">
              {[
                "Digital Strategy",
                "Brand & Experience",
                "Web Development",
                "Product Design",
                "Growth & SEO",
              ].map((service) => (
                <li key={service} className="hover:text-north-primary transition-colors cursor-default">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Office Locations with Live Status Pulsing Dots */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-mono font-semibold tracking-widest uppercase text-north-muted mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-north-accent" />
              OFFICES
            </h4>
            <div className="space-y-5 text-xs text-north-muted">
              <div>
                <span className="font-semibold text-north-primary flex items-center gap-1.5 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-north-accent animate-pulse" />
                  NEW YORK
                </span>
                <span>540 Broadway, 4th Fl</span>
              </div>
              <div>
                <span className="font-semibold text-north-primary flex items-center gap-1.5 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-north-accent" />
                  LONDON
                </span>
                <span>25 Broadwick St, Soho</span>
              </div>
              <div>
                <span className="font-semibold text-north-primary flex items-center gap-1.5 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-north-accent" />
                  BERLIN
                </span>
                <span>Torstraße 177, Mitte</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-north-muted gap-4">
          <p>© {new Date().getFullYear()} NORTHSTAR AGENCY INC. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-6 font-mono text-[11px]">
            <span className="hover:text-north-primary transition-colors">Built with Next.js & Framer Motion</span>
            <span className="hover:text-north-primary transition-colors">CMS Ready</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
