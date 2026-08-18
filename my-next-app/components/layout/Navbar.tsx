"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu as MenuIcon, X } from "lucide-react";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
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

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#F5F5F2]/80 dark:bg-[#111111]/80 backdrop-blur-md border-b border-north-border py-4"
            : "bg-transparent py-6 md:py-8"
        }`}
      >
        <Container>
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="group flex items-center gap-1.5 text-xl font-bold tracking-tighter text-north-primary uppercase font-sans focus:outline-none"
              aria-label="Northstar Home"
            >
              <span>NORTHSTAR</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C7FF3D] transition-transform group-hover:scale-150" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8 lg:gap-10">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative text-sm font-medium transition-colors hover:text-north-primary ${
                      isActive ? "text-north-primary font-semibold" : "text-north-muted"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#C7FF3D] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Actions & Theme Toggle */}
            <div className="hidden md:flex items-center gap-4">
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-2.5 rounded-full border border-north-border hover:border-north-primary text-north-primary transition-colors focus:outline-none focus:ring-2 focus:ring-[#C7FF3D]"
                  aria-label="Toggle Dark Mode"
                >
                  {theme === "dark" ? (
                    <Sun className="w-4 h-4 text-[#C7FF3D]" />
                  ) : (
                    <Moon className="w-4 h-4 text-north-primary" />
                  )}
                </button>
              )}
              <Button href="/contact" variant="primary" size="sm" showArrow>
                Let&apos;s talk
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-3">
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-2 rounded-full border border-north-border text-north-primary"
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
                className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider px-3.5 py-2 border border-north-border rounded-sm text-north-primary focus:outline-none"
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
        </Container>
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
