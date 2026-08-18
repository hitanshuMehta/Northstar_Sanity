"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, Mail, MapPin, Phone } from "lucide-react";

const PROJECT_TYPES = [
  "Digital Strategy",
  "Brand Experience",
  "Web Application",
  "E-Commerce Store",
  "Design System",
  "Growth & SEO",
];

const BUDGET_RANGES = [
  "$25k – $50k",
  "$50k – $100k",
  "$100k – $250k",
  "$250k+",
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "Web Application",
    budget: "$50k – $100k",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate clean frontend submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <Section className="pt-32 sm:pt-40 md:pt-48 pb-24">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Heading & Contact Info */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <Reveal>
                <span className="text-xs font-semibold tracking-widest uppercase text-[#C7FF3D] mb-4 block">
                  START A CONVERSATION
                </span>
                <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-north-primary font-normal leading-[1.05] tracking-tight mb-6">
                  Let&apos;s build something worth talking about.
                </h1>
                <p className="text-base sm:text-lg text-north-muted leading-relaxed mb-10">
                  Have a project in mind or want to learn more about how Northstar can elevate your product? Tell us about your goals.
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="space-y-6 border-t border-north-border pt-8 text-sm">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-north-surface border border-north-border">
                      <Mail className="w-5 h-5 text-north-primary" />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-north-muted block uppercase">EMAIL</span>
                      <a href="mailto:hello@northstar.agency" className="text-north-primary font-semibold text-base hover:text-north-accent">
                        hello@northstar.agency
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-north-surface border border-north-border">
                      <MapPin className="w-5 h-5 text-north-primary" />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-north-muted block uppercase">STUDIO HEADQUARTERS</span>
                      <span className="text-north-primary font-medium block">540 Broadway, 4th Floor, New York</span>
                      <span className="text-xs text-north-muted">Also in London & Berlin</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-7 bg-north-surface border border-north-border rounded-sm p-8 sm:p-12">
            {submitted ? (
              <Reveal>
                <div className="py-16 text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-[#C7FF3D]/20 text-[#C7FF3D] flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-4xl text-north-primary font-normal mb-4">
                    Message Received
                  </h3>
                  <p className="text-north-muted text-base max-w-md mb-8">
                    Thank you, {formData.name}. A partner at Northstar will review your project requirements and respond within 24 hours.
                  </p>
                  <Button onClick={() => setSubmitted(false)} variant="secondary">
                    Send another inquiry
                  </Button>
                </div>
              </Reveal>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-north-muted mb-2">
                      YOUR NAME *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-north-bg border border-north-border rounded-sm px-4 py-3.5 text-sm text-north-primary placeholder-north-muted/50 focus:outline-none focus:border-[#C7FF3D] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-north-muted mb-2">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-north-bg border border-north-border rounded-sm px-4 py-3.5 text-sm text-north-primary placeholder-north-muted/50 focus:outline-none focus:border-[#C7FF3D] transition-colors"
                    />
                  </div>
                </div>

                {/* Company */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-north-muted mb-2">
                    COMPANY / ORGANIZATION
                  </label>
                  <input
                    type="text"
                    placeholder="Acme Corp"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-north-bg border border-north-border rounded-sm px-4 py-3.5 text-sm text-north-primary placeholder-north-muted/50 focus:outline-none focus:border-[#C7FF3D] transition-colors"
                  />
                </div>

                {/* Project Type Chips */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-north-muted mb-3">
                    PROJECT TYPE
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {PROJECT_TYPES.map((type) => (
                      <button
                        type="button"
                        key={type}
                        onClick={() => setFormData({ ...formData, projectType: type })}
                        className={`text-xs font-medium px-4 py-2 rounded-full border transition-all ${
                          formData.projectType === type
                            ? "bg-[#C7FF3D] text-[#111111] border-[#C7FF3D] font-semibold"
                            : "bg-north-bg border-north-border text-north-muted hover:text-north-primary"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget Selectors */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-north-muted mb-3">
                    ESTIMATED BUDGET (USD)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {BUDGET_RANGES.map((b) => (
                      <button
                        type="button"
                        key={b}
                        onClick={() => setFormData({ ...formData, budget: b })}
                        className={`text-xs font-mono text-center py-2.5 px-3 rounded-sm border transition-all ${
                          formData.budget === b
                            ? "bg-north-primary text-north-bg border-north-primary font-bold"
                            : "bg-north-bg border-north-border text-north-muted hover:text-north-primary"
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-north-muted mb-2">
                    PROJECT DETAILS & GOALS *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us about your timeline, current challenge, and what success looks like..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-north-bg border border-north-border rounded-sm px-4 py-3.5 text-sm text-north-primary placeholder-north-muted/50 focus:outline-none focus:border-[#C7FF3D] transition-colors resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  variant="primary"
                  size="lg"
                  showArrow
                  className="w-full"
                >
                  {loading ? "Sending inquiry..." : "Send project inquiry"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
