"use client";

import { useState } from "react";
import { Send, X, FileText, CheckCircle } from "lucide-react";

export default function QuickInquiryPanel({ navCategories = [] }: { navCategories?: any[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    productInterest: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, submit to Firebase
    console.log("Inquiry submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsOpen(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        location: "",
        productInterest: "",
        message: "",
      });
    }, 3000);
  };

  return (
    <>
      {/* Toggle Tab */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-30 bg-orange hover:bg-orange-hover text-white py-3 px-2 rounded-l-lg shadow-xl transition-all hover:pr-4 group hidden md:block"
        style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        aria-label="Open quick inquiry"
      >
        <span className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase">
          <FileText size={14} className="rotate-90" />
          Quick Inquiry
        </span>
      </button>

      {/* Panel Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0 bg-navy/40 backdrop-blur-sm animate-fade-in"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative w-full max-w-md bg-white shadow-2xl animate-slide-in-right overflow-y-auto">
            {/* Header */}
            <div className="bg-gradient-to-r from-navy to-navy-accent p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-bold text-lg">
                    Quick Inquiry
                  </h3>
                  <p className="text-white/60 text-sm mt-1">
                    Get a response within 24 hours
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                  aria-label="Close inquiry panel"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Form */}
            {submitted ? (
              <div className="p-8 flex flex-col items-center justify-center min-h-[400px] text-center animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mb-4">
                  <CheckCircle size={32} className="text-success" />
                </div>
                <h4 className="text-navy font-bold text-xl mb-2">
                  Inquiry Submitted!
                </h4>
                <p className="text-slate-muted text-sm">
                  Thank you for your interest. Our team will contact you within
                  24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-navy uppercase tracking-wider mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-border rounded-xl text-sm text-navy focus:outline-none focus:border-cyan focus:ring-2 focus:ring-cyan/20 transition-all bg-eng-white"
                    placeholder="John Doe"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-navy uppercase tracking-wider mb-1.5">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-2.5 border border-border rounded-xl text-sm text-navy focus:outline-none focus:border-cyan focus:ring-2 focus:ring-cyan/20 transition-all bg-eng-white"
                      placeholder="you@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-navy uppercase tracking-wider mb-1.5">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-4 py-2.5 border border-border rounded-xl text-sm text-navy focus:outline-none focus:border-cyan focus:ring-2 focus:ring-cyan/20 transition-all bg-eng-white"
                      placeholder="+91 9876543210"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-navy uppercase tracking-wider mb-1.5">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-border rounded-xl text-sm text-navy focus:outline-none focus:border-cyan focus:ring-2 focus:ring-cyan/20 transition-all bg-eng-white"
                    placeholder="City, State"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-navy uppercase tracking-wider mb-1.5">
                    Product Interest
                  </label>
                  <select
                    value={formData.productInterest}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        productInterest: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 border border-border rounded-xl text-sm text-navy focus:outline-none focus:border-cyan focus:ring-2 focus:ring-cyan/20 transition-all bg-eng-white appearance-none"
                  >
                    <option value="">Select a product category</option>
                    {navCategories.map((cat) => (
                      <option key={cat.id} value={cat.slug}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-navy uppercase tracking-wider mb-1.5">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-border rounded-xl text-sm text-navy focus:outline-none focus:border-cyan focus:ring-2 focus:ring-cyan/20 transition-all bg-eng-white resize-none"
                    placeholder="Describe your requirements, including quantity, pipe size, medium, etc."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-orange hover:bg-orange-hover text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-orange/20 active:scale-[0.98] text-sm"
                >
                  <Send size={16} />
                  Submit Inquiry
                </button>

                <p className="text-[10px] text-slate-muted text-center leading-relaxed">
                  By submitting, you agree to be contacted regarding your
                  inquiry. We respect your privacy.
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
