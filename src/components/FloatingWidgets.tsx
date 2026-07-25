"use client";

import { useState, useEffect } from "react";
import { MessageCircle, Phone, Mail, X } from "lucide-react";
import { companyInfo } from "@/lib/data";

interface Widget {
  id: string;
  icon: React.ElementType;
  label: string;
  href: string;
  color: string;
  hoverColor: string;
  bgColor: string;
}

const widgets: Widget[] = [
  {
    id: "whatsapp",
    icon: MessageCircle,
    label: "WhatsApp",
    href: `https://wa.me/${companyInfo.whatsapp}`,
    color: "#25D366",
    hoverColor: "#128C7E",
    bgColor: "bg-[#25D366] hover:bg-[#128C7E]",
  },
  {
    id: "phone",
    icon: Phone,
    label: "Call Us",
    href: `tel:${companyInfo.phone1}`,
    color: "#F97316",
    hoverColor: "#EA580C",
    bgColor: "bg-orange hover:bg-orange-hover",
  },
  {
    id: "email",
    icon: Mail,
    label: "Email Us",
    href: `mailto:${companyInfo.email1}`,
    color: "#06B6D4",
    hoverColor: "#0891B2",
    bgColor: "bg-cyan hover:bg-[#0891B2]",
  },
];

export default function FloatingWidgets() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col-reverse items-end gap-3">
      {/* Toggle Button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 ${
          expanded
            ? "bg-navy hover:bg-navy-light rotate-0"
            : "bg-orange hover:bg-orange-hover animate-pulse-glow"
        }`}
        aria-label="Toggle contact widgets"
      >
        {expanded ? (
          <X size={22} className="text-white" />
        ) : (
          <MessageCircle size={22} className="text-white" />
        )}
      </button>

      {/* Widget Buttons */}
      {expanded &&
        widgets.map((widget, index) => {
          const Icon = widget.icon;
          return (
            <div
              key={widget.id}
              className="flex items-center gap-2 animate-fade-in-up"
              style={{ animationDelay: `${index * 80}ms` }}
              onMouseEnter={() => setHoveredId(widget.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Tooltip */}
              {hoveredId === widget.id && (
                <span className="px-3 py-1.5 bg-navy text-white text-xs font-medium rounded-lg shadow-lg animate-fade-in whitespace-nowrap">
                  {widget.label}
                </span>
              )}
              <a
                href={widget.href}
                target={widget.id === "whatsapp" ? "_blank" : undefined}
                rel={
                  widget.id === "whatsapp"
                    ? "noopener noreferrer"
                    : undefined
                }
                className={`w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 ${widget.bgColor}`}
                aria-label={widget.label}
              >
                <Icon size={20} className="text-white" />
              </a>
            </div>
          );
        })}
    </div>
  );
}
