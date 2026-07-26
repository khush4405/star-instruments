import React, { useState } from 'react';
import { Trash2, Image as ImageIcon, PlusCircle } from 'lucide-react';

export default function CertificatesManager({ data, setData }: { data: any; setData: any }) {
  // Gallery Form State
  const [galleryTitle, setGalleryTitle] = useState('');
  const [galleryCategory, setGalleryCategory] = useState('Installation');
  const [galleryImagePath, setGalleryImagePath] = useState('');

  // Handler for saving a gallery photo
  const handleSaveGallery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryTitle.trim() || !galleryImagePath.trim()) return;

    const newGalleryItem = {
      id: Date.now().toString(),
      title: galleryTitle.trim(),
      category: galleryCategory.trim() || 'General',
      image: galleryImagePath.trim(),
    };

    setData({ ...data, galleryImages: [...(data.galleryImages || []), newGalleryItem] });
    setGalleryTitle('');
    setGalleryCategory('Installation');
    setGalleryImagePath('');
  };

  // Handler for deleting a photo
  const handleDeleteGallery = (id: string) => {
    if (!confirm('Are you sure you want to delete this gallery photo?')) return;
    setData({ ...data, galleryImages: (data.galleryImages || []).filter((g: any) => g.id !== id) });
  };

  return (
    <div className="p-6 h-full overflow-y-auto text-slate-200">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Module Header */}
        <div className="flex items-center justify-between bg-slate-800 border border-slate-700 p-5 rounded-2xl">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <ImageIcon className="text-blue-400" size={24} />
              Project Gallery Manager
            </h2>
            <p className="text-slate-400 text-xs mt-1">
              Add and manage project photos, facility images, and installation showcase on the website.
            </p>
          </div>
          <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold rounded-full">
            {data.galleryImages?.length || 0} Total Photos
          </span>
        </div>

        {/* Add Photo Form */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-xl">
          <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2 border-b border-slate-700/80 pb-3">
            <PlusCircle size={18} className="text-blue-400" />
            Add New Photo to Project Gallery
          </h3>
          <form onSubmit={handleSaveGallery} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Photo Title / Caption <span className="text-red-400">*</span>
                </label>
                <input
                  required
                  value={galleryTitle}
                  onChange={(e) => setGalleryTitle(e.target.value)}
                  placeholder="e.g. Electromagnetic Flow Meter Installation at Chemical Plant"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white outline-none focus:border-blue-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Category Tag
                </label>
                <select
                  value={galleryCategory}
                  onChange={(e) => setGalleryCategory(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white outline-none focus:border-blue-500 text-sm cursor-pointer"
                >
                  <option value="Installation">Installation</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Calibration">Calibration</option>
                  <option value="Quality">Quality Testing</option>
                  <option value="Facility">Facility & Plant</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                Image File Path <span className="text-red-400">*</span>
              </label>
              <input
                required
                value={galleryImagePath}
                onChange={(e) => setGalleryImagePath(e.target.value)}
                placeholder="e.g. /images/hero-bg.png or /images/facility.png"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white outline-none focus:border-blue-500 text-sm"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-sm transition-all shadow-md flex items-center gap-1.5"
              >
                <ImageIcon size={16} /> Add Photo to Gallery
              </button>
            </div>
          </form>
        </div>

        {/* Existing Gallery Photos Showcase */}
        <div>
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
            Active Gallery Photos ({data.galleryImages?.length || 0})
          </h3>

          {(!data.galleryImages || data.galleryImages.length === 0) ? (
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-8 text-center text-slate-500 text-sm">
              No gallery photos added yet. Use the form above to add your first photo.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {data.galleryImages.map((g: any) => (
                <div
                  key={g.id}
                  className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden shadow-lg group hover:border-blue-500/50 transition-colors flex flex-col justify-between"
                >
                  <div className="relative aspect-video bg-slate-950">
                    <img
                      src={g.image}
                      alt={g.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/images/facility.png";
                      }}
                    />
                    <div className="absolute top-2 right-2">
                      <button
                        onClick={() => handleDeleteGallery(g.id)}
                        className="p-1.5 bg-black/60 hover:bg-red-600 text-white rounded-lg transition-colors backdrop-blur"
                        title="Delete Photo"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="p-4">
                    <h4 className="font-bold text-white text-sm mb-1 line-clamp-2">{g.title}</h4>
                    <span className="inline-block px-2.5 py-0.5 bg-slate-900 border border-slate-700 rounded text-[11px] text-blue-400 font-semibold">
                      {g.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
