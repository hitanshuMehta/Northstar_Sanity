"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu as MenuIcon, X, ArrowRight } from "lucide-react";
import { MobileMenu } from "./MobileMenu";

const NAV_LINKS = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="fixed top-3 sm:top-5 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 pointer-events-none">
        <div
          className={`pointer-events-auto w-full max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 rounded-full border border-north-border bg-north-bg shadow-xl transition-all duration-300 ${
            scrolled
              ? "shadow-2xl shadow-black/15 dark:shadow-black/80 py-2 sm:py-2.5"
              : "shadow-lg shadow-black/10 dark:shadow-black/60"
          }`}
        >
          {/* Logo */}
          <Link
            href="/"
            onClick={handleLogoClick}
            className="group flex items-center gap-2 text-base sm:text-lg font-extrabold tracking-tighter text-north-primary uppercase font-sans focus:outline-none pl-2 cursor-pointer"
            aria-label="Northstar Home"
          >
            <span className="tracking-tight text-north-primary">NORTHSTAR</span>
            <span className="w-2 h-2 rounded-full bg-north-accent transition-transform group-hover:scale-150 shadow-sm" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-1.5 bg-north-surface p-1 rounded-full border border-north-border shadow-xs">
            {NAV_LINKS.map((link) => {
              const isActive =
                pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-xs font-extrabold uppercase tracking-wider px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-1.5 ${
                    isActive
                      ? "bg-north-primary text-north-bg font-extrabold shadow-sm scale-105"
                      : "text-north-primary hover:bg-north-bg/80"
                  }`}
                >
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-north-accent animate-pulse" />
                  )}
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Actions & Theme Toggle */}
          <div className="hidden md:flex items-center gap-3 pr-1">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 sm:p-2.5 rounded-full bg-north-surface border border-north-border hover:border-north-primary text-north-primary transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none shadow-xs"
                aria-label="Toggle Dark Mode"
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4 text-north-accent" />
                ) : (
                  <Moon className="w-4 h-4 text-north-primary" />
                )}
              </button>
            )}
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider px-5 py-2.5 rounded-full bg-[#C7FF3D] text-[#111111] hover:bg-[#b5f228] transition-all duration-200 shadow-md shadow-[#C7FF3D]/20 hover:scale-105 active:scale-95 group"
            >
              <span>Let&apos;s talk</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Mobile Navigation Trigger */}
          <div className="flex md:hidden items-center gap-2">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full bg-north-surface border border-north-border text-north-primary"
                aria-label="Toggle Dark Mode"
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4 text-[#C7FF3D]" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3.5 py-2 rounded-full border border-north-border bg-north-surface text-north-primary focus:outline-none"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle Mobile Menu"
            >
              <span>{mobileMenuOpen ? "Close" : "Menu"}</span>
              {mobileMenuOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <MenuIcon className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navLinks={NAV_LINKS}
      />
    </>
  );
}


