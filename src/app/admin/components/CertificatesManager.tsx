import React, { useState } from 'react';
import { Trash2, Award } from 'lucide-react';

export default function CertificatesManager({ data, setData }: { data: any, setData: any }) {
  const [name, setName] = useState('');
  const [authority, setAuthority] = useState('');
  const [validUntil, setValidUntil] = useState('');
  const [imagePath, setImagePath] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    const newCert = {
      id: Date.now().toString(),
      name,
      authority,
      validUntil,
      imagePath: imagePath || '/images/placeholders/no-image.png'
    };
    
    setData({ ...data, certificates: [...(data.certificates || []), newCert] });
    setName(''); setAuthority(''); setValidUntil(''); setImagePath('');
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete this certificate?")) return;
    setData({ ...data, certificates: data.certificates.filter((c: any) => c.id !== id) });
  };

  return (
    <div className="p-6 h-full overflow-y-auto text-slate-200">
      <div className="max-w-4xl mx-auto">
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-6">Add New Certificate</h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Certificate Name</label>
                <input required value={name} onChange={e => setName(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white outline-none focus:border-blue-500" placeholder="e.g. ISO 9001:2015" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Issuing Authority</label>
                <input value={authority} onChange={e => setAuthority(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white outline-none focus:border-blue-500" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Valid Until (Year)</label>
                <input value={validUntil} onChange={e => setValidUntil(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white outline-none focus:border-blue-500" placeholder="e.g. 2028" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Image / PDF Path</label>
                <input value={imagePath} onChange={e => setImagePath(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white outline-none focus:border-blue-500" placeholder="/images/certificates/..." />
              </div>
            </div>
            <button type="submit" className="px-6 py-2 bg-blue-600 hover:bg-blue-500 font-bold rounded text-white">Save Certificate</button>
          </form>
        </div>

        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">Active Certificates</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(data.certificates || []).map((c: any) => (
            <div key={c.id} className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden flex flex-col p-4">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center text-blue-400">
                  <Award size={24} />
                </div>
                <button onClick={() => handleDelete(c.id)} className="p-2 text-red-400/50 hover:text-red-400"><Trash2 size={16}/></button>
              </div>
              <h4 className="font-bold text-white text-lg mb-1">{c.name}</h4>
              <p className="text-slate-400 text-sm mb-2">Issued by: {c.authority || 'N/A'}</p>
              {c.validUntil && <p className="text-emerald-400 text-xs font-bold">Valid Until: {c.validUntil}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
