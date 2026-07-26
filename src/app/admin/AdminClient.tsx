"use client";
import React, { useState } from 'react';
import CatalogManager from './components/CatalogManager';
import VideosManager from './components/VideosManager';
import CertificatesManager from './components/CertificatesManager';

export default function AdminClient({ initialData }: { initialData: any }) {
  const [activeTab, setActiveTab] = useState(1);
  const [data, setData] = useState(initialData);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/save-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to save');
      alert('Success! Content saved to disk and is now live.');
    } catch (err) {
      alert('Error saving content. Check console.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDownloadBackup = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `backup_masterContent_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex h-full w-full">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <h1 className="text-xl font-bold text-white tracking-wide">Admin Portal</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <div className="px-3 py-2 text-xs font-bold text-slate-500 uppercase tracking-wider">Modules</div>
          {[
            { id: 1, name: "1. Catalog Manager" },
            { id: 3, name: "2. Video Showcase" },
            { id: 4, name: "3. Project Gallery" }
          ].map(tab => (
            <div
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-2 rounded-lg cursor-pointer transition-colors font-medium ${activeTab === tab.id
                ? 'bg-blue-600/20 text-blue-400 border border-blue-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
                }`}
            >
              {tab.name}
            </div>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-800 text-xs text-slate-600">
          Local Environment CMS
        </div>
      </aside>

      {/* Main Workspace */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-slate-900 relative">
        {/* Sticky Top Bar */}
        <header className="h-16 bg-slate-800 border-b border-slate-700 flex items-center justify-between px-6 shrink-0 sticky top-0 z-10">
          <h2 className="text-lg font-semibold text-white">
            {activeTab === 1 && "Catalog & Products Manager (Multi-Tier)"}
            {activeTab === 3 && "Video Showcase Manager"}
            {activeTab === 4 && "Project Gallery Manager"}
          </h2>
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadBackup}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Backup Current JSON
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-lg transition-colors disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Save Changes & Sync Live Website"}
            </button>
          </div>
        </header>

        {/* Tab Content Area */}
        <div className="flex-1 overflow-hidden relative">
          {activeTab === 1 && <CatalogManager data={data} setData={setData} />}
          {activeTab === 3 && <VideosManager data={data} setData={setData} />}
          {activeTab === 4 && <CertificatesManager data={data} setData={setData} />}
        </div>
      </main>
    </div>
  );
}
