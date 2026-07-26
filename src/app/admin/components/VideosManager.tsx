import React, { useState, useMemo } from 'react';
import { Trash2, Video, Sparkles, CheckCircle2, Image as ImageIcon, ExternalLink, Link2 } from 'lucide-react';

// Helper function to extract 11-char YouTube Video ID from any URL or raw ID
export function extractYouTubeId(urlOrId: string): string {
  if (!urlOrId) return '';
  const trimmed = urlOrId.trim();
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = trimmed.match(regExp);

  if (match && match[2] && match[2].length === 11) {
    return match[2];
  }

  // If already an 11-char ID
  if (trimmed.length === 11 && !trimmed.includes('/') && !trimmed.includes('.')) {
    return trimmed;
  }

  return trimmed;
}

export default function VideosManager({ data, setData }: { data: any; setData: any }) {
  const [title, setTitle] = useState('');
  const [urlOrIdInput, setUrlOrIdInput] = useState('');
  const [category, setCategory] = useState('');
  const [qualityOption, setQualityOption] = useState<'hqdefault' | 'maxresdefault' | 'mqdefault'>('hqdefault');
  const [customThumbnail, setCustomThumbnail] = useState('');

  // Automatically extract YouTube ID
  const extractedId = useMemo(() => extractYouTubeId(urlOrIdInput), [urlOrIdInput]);

  // Derived Extracted Thumbnail URL
  const autoExtractedThumbnail = useMemo(() => {
    if (!extractedId) return '';
    return `https://img.youtube.com/vi/${extractedId}/${qualityOption}.jpg`;
  }, [extractedId, qualityOption]);

  const activeThumbnail = customThumbnail.trim() || autoExtractedThumbnail;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !extractedId) {
      alert('Please enter a video title and a valid YouTube URL or Video ID.');
      return;
    }

    const finalThumbnail = activeThumbnail || `https://img.youtube.com/vi/${extractedId}/hqdefault.jpg`;

    const newVideo = {
      id: Date.now().toString(),
      title: title.trim(),
      youtubeId: extractedId,
      category: category.trim(),
      thumbnail: finalThumbnail,
      thumbnailPath: finalThumbnail,
    };

    setData({ ...data, videos: [...(data.videos || []), newVideo] });
    setTitle('');
    setUrlOrIdInput('');
    setCategory('');
    setCustomThumbnail('');
  };

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to delete this video showcase entry?')) return;
    setData({ ...data, videos: (data.videos || []).filter((v: any) => v.id !== id) });
  };

  return (
    <div className="p-6 h-full overflow-y-auto text-slate-200">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Banner */}
        <div className="flex items-center justify-between bg-slate-800/80 border border-slate-700/60 p-5 rounded-2xl">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Video className="text-orange-500" size={24} />
              Video Showcase & Thumbnail Extractor
            </h2>
            <p className="text-slate-400 text-xs mt-1">
              Paste any YouTube video link or ID. The system will automatically extract the Video ID & thumbnail preview.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-semibold">
            <Sparkles size={14} /> Auto Extractor Active
          </div>
        </div>

        {/* Form Box */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-xl">
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Left Column: Form Controls */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Video Title <span className="text-red-400">*</span>
                  </label>
                  <input
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Electromagnetic Flow Meter Working Principle"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white outline-none focus:border-blue-500 text-sm placeholder:text-slate-600 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    YouTube URL or Video ID <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      required
                      value={urlOrIdInput}
                      onChange={(e) => setUrlOrIdInput(e.target.value)}
                      placeholder="Paste link e.g. https://youtu.be/dQw4w9WgXcQ"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-white outline-none focus:border-blue-500 text-sm placeholder:text-slate-600 transition-colors"
                    />
                    <Link2 size={16} className="absolute left-3.5 top-3 text-slate-500" />
                  </div>
                  {extractedId && (
                    <div className="mt-2 flex items-center gap-1.5 text-emerald-400 text-xs font-medium">
                      <CheckCircle2 size={13} />
                      Extracted ID: <span className="font-mono bg-slate-900 px-1.5 py-0.5 rounded text-white">{extractedId}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Category Slug (Optional)
                  </label>
                  <input
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g. flow-measurement or Phoenix Contact-PLC"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white outline-none focus:border-blue-500 text-sm placeholder:text-slate-600 transition-colors"
                  />
                </div>

                {/* Quality Selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Extracted Thumbnail Resolution
                  </label>
                  <select
                    value={qualityOption}
                    onChange={(e) => setQualityOption(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white outline-none focus:border-blue-500 text-sm transition-colors cursor-pointer"
                  >
                    <option value="hqdefault">High Quality (480x360) — [Recommended / 100% Reliable]</option>
                    <option value="maxresdefault">Max Resolution (1280x720) — [HD Videos]</option>
                    <option value="mqdefault">Medium Quality (320x180)</option>
                  </select>
                </div>
              </div>

              {/* Right Column: Live Extracted Thumbnail Preview Card */}
              <div className="bg-slate-900 border border-slate-700/70 rounded-xl p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <ImageIcon size={14} className="text-cyan-400" />
                      Live Extracted Thumbnail Preview
                    </span>
                    {extractedId && (
                      <span className="text-[10px] bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2 py-0.5 rounded-full font-bold">
                        AUTO-EXTRACTED
                      </span>
                    )}
                  </div>

                  <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center group">
                    {activeThumbnail ? (
                      <>
                        <img
                          src={activeThumbnail}
                          alt="Thumbnail Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Fallback to hqdefault if maxresdefault 404s
                            const target = e.target as HTMLImageElement;
                            if (qualityOption === 'maxresdefault' && extractedId) {
                              target.src = `https://img.youtube.com/vi/${extractedId}/hqdefault.jpg`;
                            }
                          }}
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <a
                            href={`https://www.youtube.com/watch?v=${extractedId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-red-600 text-white text-xs font-bold rounded-lg flex items-center gap-1"
                          >
                            <ExternalLink size={12} /> Test YouTube Link
                          </a>
                        </div>
                      </>
                    ) : (
                      <div className="text-center p-6">
                        <Video size={40} className="mx-auto text-slate-700 mb-2" />
                        <p className="text-slate-500 text-xs">
                          Paste a YouTube URL or Video ID to extract thumbnail preview
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
                  <span>Thumbnail Source:</span>
                  <span className="font-mono text-slate-400 truncate max-w-[200px]">
                    {activeThumbnail ? activeThumbnail : 'Waiting for input...'}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={!extractedId || !title.trim()}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white font-bold rounded-xl shadow-lg transition-all text-sm flex items-center gap-2"
              >
                <Sparkles size={16} /> Save Video & Extracted Thumbnail
              </button>
            </div>
          </form>
        </div>

        {/* Existing Videos Showcase */}
        <div>
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-800 pb-2 flex items-center justify-between">
            <span>Existing Video Showcase ({data.videos?.length || 0})</span>
          </h3>

          {(!data.videos || data.videos.length === 0) ? (
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-8 text-center text-slate-500 text-sm">
              No videos added yet. Use the form above to add your first YouTube video.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {data.videos.map((v: any) => {
                const vidId = extractYouTubeId(v.youtubeId || '');
                const thumb = v.thumbnail || v.thumbnailPath || (vidId ? `https://img.youtube.com/vi/${vidId}/hqdefault.jpg` : '/images/placeholders/no-image.png');

                return (
                  <div
                    key={v.id}
                    className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden flex flex-col shadow-lg hover:border-slate-600 transition-colors"
                  >
                    <div className="relative aspect-video bg-slate-950 group">
                      <img
                        src={thumb}
                        alt={v.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          if (vidId) {
                            target.src = `https://img.youtube.com/vi/${vidId}/hqdefault.jpg`;
                          }
                        }}
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                        <a
                          href={`https://www.youtube.com/watch?v=${vidId || v.youtubeId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 rounded-full bg-red-600/90 hover:bg-red-600 text-white flex items-center justify-center shadow-xl transition-transform group-hover:scale-110"
                        >
                          <Video size={24} />
                        </a>
                      </div>
                      {vidId && (
                        <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/70 backdrop-blur text-[10px] text-slate-300 font-mono rounded">
                          ID: {vidId}
                        </div>
                      )}
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-white text-sm mb-1 line-clamp-2">{v.title}</h4>
                        {v.category && (
                          <span className="inline-block px-2.5 py-1 bg-slate-700/60 border border-slate-600/40 rounded-md text-[11px] text-slate-300">
                            Category: {v.category}
                          </span>
                        )}
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between">
                        <a
                          href={`https://www.youtube.com/watch?v=${vidId || v.youtubeId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 font-medium"
                        >
                          <ExternalLink size={12} /> Watch on YouTube
                        </a>
                        <button
                          onClick={() => handleDelete(v.id)}
                          className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                          title="Delete Video"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
