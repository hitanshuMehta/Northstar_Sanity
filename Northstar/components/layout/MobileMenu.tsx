"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { Button } from "../ui/Button";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: { label: string; href: string }[];
}

export function MobileMenu({ isOpen, onClose, navLinks }: MobileMenuProps) {
  const pathname = usePathname();

  useEffect(() => {
    onClose();
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-40 bg-north-bg flex flex-col justify-between p-6 pt-24 sm:p-10 sm:pt-28 md:hidden"
        >
          <div className="flex flex-col gap-6">
            <span className="text-xs font-semibold tracking-widest uppercase text-north-muted">
              Navigation
            </span>
            <nav className="flex flex-col gap-4">
              {navLinks.map((link, idx) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * idx, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className={`flex items-center justify-between text-3xl sm:text-4xl font-serif tracking-tight py-2 border-b border-north-border ${
                        isActive ? "text-north-primary font-normal" : "text-north-muted"
                      }`}
                    >
                      <span>{link.label}</span>
                      <ArrowRight className="w-5 h-5 text-north-muted" />
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
          </div>

          <div className="flex flex-col gap-6 mt-8">
            <Button href="/contact opacity-90" variant="primary" size="lg" showArrow className="w-full">
              Start a conversation
            </Button>
            <div className="flex items-center justify-between text-xs text-north-muted">
              <span>© {new Date().getFullYear()} NORTHSTAR AGENCY</span>
              <span>NEW YORK / LONDON</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
