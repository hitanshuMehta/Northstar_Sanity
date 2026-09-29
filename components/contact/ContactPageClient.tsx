"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, Mail, MapPin, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FormErrors {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
}

interface ContactPageClientProps {
  data: {
    hero?: { label?: string; title?: string; description?: string };
    contactInfo?: { email?: string; address?: string; additionalLocations?: string };
    formOptions?: { projectTypes?: string[]; budgetRanges?: string[] };
  };
}

export function ContactPageClient({ data }: ContactPageClientProps) {
  const projectTypes = Array.isArray(data.formOptions?.projectTypes) && data.formOptions!.projectTypes.length > 0
    ? data.formOptions!.projectTypes
    : ["Digital Strategy", "Web Application", "E-Commerce", "Design System"];

  const budgetRanges = Array.isArray(data.formOptions?.budgetRanges) && data.formOptions!.budgetRanges.length > 0
    ? data.formOptions!.budgetRanges
    : ["$25k – $50k", "$50k – $100k", "$100k – $250k", "$250k+"];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: projectTypes[0] || "Web Application",
    budget: budgetRanges[0] || "$50k – $100k",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = "Please enter your full name (at least 2 characters).";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address (e.g. name@company.com).";
    }

    if (!formData.company.trim() || formData.company.trim().length < 2) {
      newErrors.company = "Please enter your company or organization name (at least 2 characters).";
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = "Please describe your project details (at least 10 characters).";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      company: "",
      projectType: projectTypes[0] || "Web Application",
      budget: budgetRanges[0] || "$50k – $100k",
      message: "",
    });
    setErrors({});
    setSubmitted(false);
  };

  return (
    <Section className="pt-32 sm:pt-40 md:pt-48 pb-24">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Heading & Contact Info */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <Reveal>
                {data.hero?.label && (
                  <span className="text-xs font-mono font-bold tracking-widest uppercase text-north-accent mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-north-accent animate-pulse" />
                    {data.hero.label}
                  </span>
                )}
                {data.hero?.title && (
                  <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-north-primary font-normal leading-[1.05] tracking-tight mb-6">
                    {data.hero.title}
                  </h1>
                )}
                {data.hero?.description && (
                  <p className="text-base sm:text-lg text-north-muted leading-relaxed mb-10">
                    {data.hero.description}
                  </p>
                )}
              </Reveal>

              {data.contactInfo && (data.contactInfo.email || data.contactInfo.address) && (
                <Reveal delay={0.1}>
                  <div className="space-y-6 border-t border-north-border pt-8 text-sm">
                    {data.contactInfo.email && (
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-full bg-north-surface border border-north-border">
                          <Mail className="w-5 h-5 text-north-primary" />
                        </div>
                        <div>
                          <span className="text-xs font-mono text-north-muted block uppercase">EMAIL</span>
                          <a href={`mailto:${data.contactInfo.email}`} className="text-north-primary font-semibold text-base hover:text-north-accent transition-colors">
                            {data.contactInfo.email}
                          </a>
                        </div>
                      </div>
                    )}

                    {data.contactInfo.address && (
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-full bg-north-surface border border-north-border">
                          <MapPin className="w-5 h-5 text-north-primary" />
                        </div>
                        <div>
                          <span className="text-xs font-mono text-north-muted block uppercase">STUDIO HEADQUARTERS</span>
                          <span className="text-north-primary font-medium block">{data.contactInfo.address}</span>
                          {data.contactInfo.additionalLocations && (
                            <span className="text-xs text-north-muted">{data.contactInfo.additionalLocations}</span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </Reveal>
              )}
            </div>
          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-7 bg-north-surface border border-north-border rounded-sm p-8 sm:p-12 shadow-2xl">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="py-12 text-center flex flex-col items-center"
                >
                  <div className="w-20 h-20 rounded-full bg-north-accent/10 text-north-accent border border-north-accent/30 flex items-center justify-center mb-6 shadow-xl shadow-north-accent/10">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-north-accent mb-2">
                    ✓ SENT SUCCESSFULLY
                  </span>

                  <h3 className="font-serif text-3xl sm:text-4xl text-north-primary font-normal mb-4">
                    Inquiry Received!
                  </h3>

                  <p className="text-north-muted text-base max-w-md mb-8 leading-relaxed">
                    Thank you, <span className="text-north-primary font-semibold">{formData.name}</span>. A partner at Northstar has received your inquiry for <span className="text-north-accent font-medium">{formData.projectType}</span> ({formData.budget}) and will respond to <span className="text-north-primary font-medium">{formData.email}</span> within 24 hours.
                  </p>

                  <div className="w-full bg-north-bg border border-north-border rounded-sm p-4 text-xs font-mono text-left mb-8 space-y-1.5 text-north-muted">
                    <div className="flex justify-between">
                      <span>PROJECT TYPE:</span>
                      <span className="text-north-primary font-semibold">{formData.projectType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ESTIMATED BUDGET:</span>
                      <span className="text-north-primary font-semibold">{formData.budget}</span>
                    </div>
                    {formData.company && (
                      <div className="flex justify-between">
                        <span>ORGANIZATION:</span>
                        <span className="text-north-primary font-semibold">{formData.company}</span>
                      </div>
                    )}
                  </div>

                  <Button onClick={handleReset} variant="secondary" size="md">
                    Send another inquiry
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-8"
                  noValidate
                >
                  {/* Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-north-muted mb-2">
                        YOUR NAME *
                      </label>
                      <input
                        type="text"
                        placeholder="Jane Doe"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: undefined });
                        }}
                        className={`w-full bg-north-bg border rounded-sm px-4 py-3.5 text-sm text-north-primary placeholder-north-muted/50 focus:outline-none transition-colors ${
                          errors.name
                            ? "border-red-500 focus:border-red-500"
                            : "border-north-border focus:border-[#C7FF3D]"
                        }`}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs font-mono mt-1.5 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-north-muted mb-2">
                        EMAIL ADDRESS *
                      </label>
                      <input
                        type="email"
                        placeholder="jane@company.com"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: undefined });
                        }}
                        className={`w-full bg-north-bg border rounded-sm px-4 py-3.5 text-sm text-north-primary placeholder-north-muted/50 focus:outline-none transition-colors ${
                          errors.email
                            ? "border-red-500 focus:border-red-500"
                            : "border-north-border focus:border-[#C7FF3D]"
                        }`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs font-mono mt-1.5 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-north-muted mb-2">
                      COMPANY / ORGANIZATION *
                    </label>
                    <input
                      type="text"
                      placeholder="Acme Corp"
                      value={formData.company}
                      onChange={(e) => {
                        setFormData({ ...formData, company: e.target.value });
                        if (errors.company) setErrors({ ...errors, company: undefined });
                      }}
                      className={`w-full bg-north-bg border rounded-sm px-4 py-3.5 text-sm text-north-primary placeholder-north-muted/50 focus:outline-none transition-colors ${
                        errors.company
                          ? "border-red-500 focus:border-red-500"
                          : "border-north-border focus:border-[#C7FF3D]"
                      }`}
                    />
                    {errors.company && (
                      <p className="text-red-500 text-xs font-mono mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.company}</span>
                      </p>
                    )}
                  </div>

                  {/* Project Type Chips */}
                  {projectTypes.length > 0 && (
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-north-muted mb-3">
                        PROJECT TYPE
                      </label>
                      <div className="flex flex-wrap gap-2.5">
                        {projectTypes.map((type) => (
                          <button
                            type="button"
                            key={type}
                            onClick={() => setFormData({ ...formData, projectType: type })}
                            className={`text-xs font-medium px-4 py-2 rounded-full border transition-all cursor-pointer ${
                              formData.projectType === type
                                ? "bg-[#C7FF3D] text-[#111111] border-[#C7FF3D] font-bold shadow-md shadow-[#C7FF3D]/20 scale-105"
                                : "bg-north-bg border-north-border text-north-muted hover:text-north-primary hover:border-north-muted"
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Budget Selectors */}
                  {budgetRanges.length > 0 && (
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-north-muted mb-3">
                        ESTIMATED BUDGET (USD)
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {budgetRanges.map((b) => (
                          <button
                            type="button"
                            key={b}
                            onClick={() => setFormData({ ...formData, budget: b })}
                            className={`text-xs font-mono text-center py-3 px-3 rounded-sm border transition-all cursor-pointer ${
                              formData.budget === b
                                ? "bg-[#C7FF3D] text-[#111111] border-[#C7FF3D] font-bold shadow-md shadow-[#C7FF3D]/20 scale-[1.02]"
                                : "bg-north-bg border-north-border text-north-muted hover:text-north-primary hover:border-north-muted"
                            }`}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-north-muted mb-2">
                      PROJECT DETAILS & GOALS *
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your timeline, current challenge, and what success looks like..."
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: undefined });
                      }}
                      className={`w-full bg-north-bg border rounded-sm px-4 py-3.5 text-sm text-north-primary placeholder-north-muted/50 focus:outline-none transition-colors resize-none ${
                        errors.message
                          ? "border-red-500 focus:border-red-500"
                          : "border-north-border focus:border-[#C7FF3D]"
                      }`}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-xs font-mono mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.message}</span>
                      </p>
                    )}
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
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </Section>
  );
}
