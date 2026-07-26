"use client";

import { useState } from "react";
import { companyInfo } from "@/lib/data";
import {
  Send,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  MessageCircle,
} from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          source: "contact_page",
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to send message.");
      }

      setSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-navy via-navy-light to-navy-accent pt-28 pb-16">
        <div className="absolute inset-0 hero-grid-pattern opacity-50" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Contact <span className="text-orange">Us</span>
          </h1>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Get in touch for quotes, technical support, or any instrumentation
            inquiries.
          </p>
        </div>
      </section>

      <section className="section-padding bg-eng-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Contact Info Cards */}
            <div className="lg:col-span-2 space-y-5">
              {/* Phone */}
              <div className="bg-white rounded-2xl border border-border/50 p-6 card-hover">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-orange/10 flex items-center justify-center shrink-0">
                    <Phone size={22} className="text-orange" />
                  </div>
                  <div>
                    <h3 className="text-navy font-bold text-sm mb-1">
                      Call Us
                    </h3>
                    <a
                      href={`tel:${companyInfo.phone1}`}
                      className="text-slate-muted text-sm hover:text-navy transition-colors block"
                    >
                      {companyInfo.phone1}
                    </a>
                    <a
                      href={`tel:${companyInfo.phone2}`}
                      className="text-slate-muted text-sm hover:text-navy transition-colors block"
                    >
                      {companyInfo.phone2}
                    </a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="bg-white rounded-2xl border border-border/50 p-6 card-hover">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan/10 flex items-center justify-center shrink-0">
                    <Mail size={22} className="text-cyan" />
                  </div>
                  <div>
                    <h3 className="text-navy font-bold text-sm mb-1">
                      Email Us
                    </h3>
                    <a
                      href={`mailto:${companyInfo.email1}`}
                      className="text-slate-muted text-sm hover:text-navy transition-colors block"
                    >
                      {companyInfo.email1}
                    </a>
                    <a
                      href={`mailto:${companyInfo.email2}`}
                      className="text-slate-muted text-sm hover:text-navy transition-colors block"
                    >
                      {companyInfo.email2}
                    </a>
                  </div>
                </div>
              </div>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/${companyInfo.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-[#25D366] rounded-2xl p-6 text-white card-hover"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                    <MessageCircle size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm mb-0.5">
                      WhatsApp Us
                    </h3>
                    <p className="text-white/80 text-sm">
                      Quick response guaranteed
                    </p>
                  </div>
                </div>
              </a>

              {/* Address */}
              <div className="bg-white rounded-2xl border border-border/50 p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-navy/5 flex items-center justify-center shrink-0">
                    <MapPin size={22} className="text-navy" />
                  </div>
                  <div>
                    <h3 className="text-navy font-bold text-sm mb-1">
                      Visit Us
                    </h3>
                    <p className="text-slate-muted text-sm leading-relaxed">
                      {companyInfo.address}
                    </p>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-white rounded-2xl border border-border/50 p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-navy/5 flex items-center justify-center shrink-0">
                    <Clock size={22} className="text-navy" />
                  </div>
                  <div>
                    <h3 className="text-navy font-bold text-sm mb-1">
                      Business Hours
                    </h3>
                    <p className="text-slate-muted text-sm">
                      Mon – Sat: 9:00 AM – 6:00 PM
                    </p>
                    <p className="text-slate-muted text-sm">
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl border border-border/50 p-8">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center min-h-[400px] text-center animate-fade-in">
                    <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mb-4">
                      <CheckCircle size={32} className="text-success" />
                    </div>
                    <h3 className="text-navy font-bold text-xl mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-slate-muted text-sm max-w-sm">
                      Thank you for reaching out. Our team will get back to
                      you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <>
                    <h2 className="text-navy font-bold text-xl mb-1">
                      Send a Message
                    </h2>
                    <p className="text-slate-muted text-sm mb-6">
                      Fill in the form below and we&apos;ll respond within 24
                      hours.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-navy uppercase tracking-wider mb-1.5">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                name: e.target.value,
                              })
                            }
                            className="w-full px-4 py-3 border border-border rounded-xl text-sm text-navy focus:outline-none focus:border-cyan focus:ring-2 focus:ring-cyan/20 transition-all bg-eng-white"
                            placeholder="Your name"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-navy uppercase tracking-wider mb-1.5">
                            Email *
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                            className="w-full px-4 py-3 border border-border rounded-xl text-sm text-navy focus:outline-none focus:border-cyan focus:ring-2 focus:ring-cyan/20 transition-all bg-eng-white"
                            placeholder="you@company.com"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-navy uppercase tracking-wider mb-1.5">
                            Phone *
                          </label>
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                phone: e.target.value,
                              })
                            }
                            className="w-full px-4 py-3 border border-border rounded-xl text-sm text-navy focus:outline-none focus:border-cyan focus:ring-2 focus:ring-cyan/20 transition-all bg-eng-white"
                            placeholder="+91 9876543210"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-navy uppercase tracking-wider mb-1.5">
                            Location
                          </label>
                          <input
                            type="text"
                            value={formData.location}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                location: e.target.value,
                              })
                            }
                            className="w-full px-4 py-3 border border-border rounded-xl text-sm text-navy focus:outline-none focus:border-cyan focus:ring-2 focus:ring-cyan/20 transition-all bg-eng-white"
                            placeholder="City, State"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-navy uppercase tracking-wider mb-1.5">
                          Message *
                        </label>
                        <textarea
                          required
                          rows={5}
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              message: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-border rounded-xl text-sm text-navy focus:outline-none focus:border-cyan focus:ring-2 focus:ring-cyan/20 transition-all bg-eng-white resize-none"
                          placeholder="Tell us about your requirements..."
                        />
                      </div>

                      {errorMessage && (
                        <div className="p-3 rounded-xl bg-red-50 text-red-600 border border-red-200 text-xs leading-relaxed">
                          {errorMessage}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 px-8 py-3.5 bg-orange hover:bg-orange-hover text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-orange/20 active:scale-[0.98] text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <Send size={16} />
                            Send Message
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>

              {/* Map */}
              <div className="mt-6 rounded-2xl overflow-hidden border border-border/50 h-64">
                <iframe
                  src={companyInfo.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Star Instrument Engineers Location"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
