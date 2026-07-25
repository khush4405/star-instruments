import React, { useState } from 'react';
import { Trash2, Video } from 'lucide-react';

export default function VideosManager({ data, setData }: { data: any, setData: any }) {
  const [title, setTitle] = useState('');
  const [youtubeId, setYoutubeId] = useState('');
  const [category, setCategory] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !youtubeId.trim()) return;
    
    const newVideo = {
      id: Date.now().toString(),
      title,
      youtubeId,
      category,
      thumbnail: `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
    };
    
    setData({ ...data, videos: [...(data.videos || []), newVideo] });
    setTitle(''); setYoutubeId(''); setCategory('');
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete this video?")) return;
    setData({ ...data, videos: data.videos.filter((v: any) => v.id !== id) });
  };

  return (
    <div className="p-6 h-full overflow-y-auto text-slate-200">
      <div className="max-w-4xl mx-auto">
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-6">Add New Video</h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Video Title</label>
                <input required value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">YouTube Video ID</label>
                <input required value={youtubeId} onChange={e => setYoutubeId(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white outline-none focus:border-blue-500" placeholder="e.g. dQw4w9WgXcQ" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Associated Category Slug (Optional)</label>
              <input value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white outline-none focus:border-blue-500" placeholder="e.g. flow-transmitters" />
            </div>
            <button type="submit" className="px-6 py-2 bg-blue-600 hover:bg-blue-500 font-bold rounded text-white">Save Video</button>
          </form>
        </div>

        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">Existing Videos</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(data.videos || []).map((v: any) => (
            <div key={v.id} className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden flex flex-col">
              <div className="relative h-40 bg-slate-900">
                <img src={v.thumbnail} alt="" className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 flex items-center justify-center"><Video size={48} className="text-red-500 drop-shadow-md" /></div>
              </div>
              <div className="p-4 flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-white mb-1">{v.title}</h4>
                  {v.category && <span className="inline-block px-2 py-1 bg-slate-700 rounded text-xs text-slate-300">Category: {v.category}</span>}
                </div>
                <button onClick={() => handleDelete(v.id)} className="p-2 text-red-400/50 hover:text-red-400"><Trash2 size={16}/></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
