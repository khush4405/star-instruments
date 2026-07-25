import React from 'react';



export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // We use fixed inset-0 to overlay on top of the root layout's header and footer.
  return (
    <div className="fixed inset-0 z-50 flex h-screen w-screen bg-slate-900 text-slate-200 overflow-hidden font-sans">
      {children}
    </div>
  );
}
