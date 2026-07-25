import React, { useState } from 'react';
import { Folder, FileText, Plus, ChevronRight, Image as ImageIcon, Trash2, Edit2 } from 'lucide-react';

export type Spec = { label: string; value: string };

export type ProductNode = {
  id: string; // Slug
  type: 'product';
  title: string;
  shortDesc: string; 
  fullDesc: string;
  imagePath: string;
  imageClassName?: string;
  pdfPath?: string;
  externalLink?: string;
  specs: Spec[];
};

export type FolderNode = {
  id: string;
  type: 'folder';
  title: string;
  folderCover: string;
  imageClassName?: string;
  description: string;
  subFolders: FolderNode[];
  products: ProductNode[];
};

export default function CatalogManager({ data, setData }: { data: any, setData: any }) {
  const [activePath, setActivePath] = useState<string[]>([]);
  
  // Modals state
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null); // To handle edit vs add

  // Tree helper
  const getCurrentFolder = (path: string[], nodes: FolderNode[] = data.tree): { currentList: FolderNode[], activeNode: FolderNode | null } => {
    let currentList = nodes;
    let activeNode = null;
    for (const p of path) {
      const found = currentList.find(n => n.id === p);
      if (found) {
        activeNode = found;
        currentList = found.subFolders;
      }
    }
    return { currentList, activeNode };
  };

  const { currentList, activeNode } = getCurrentFolder(activePath);
  const activeProducts = activeNode ? activeNode.products : [];

  const handleSaveFolder = (folderData: FolderNode, oldId?: string) => {
    const newData = { ...data };
    
    if (oldId) {
      // Editing an existing folder
      if (activePath.length === 0) {
        const idx = newData.tree.findIndex((n: any) => n.id === oldId);
        if (idx !== -1) {
          // Keep subFolders and products
          folderData.subFolders = newData.tree[idx].subFolders;
          folderData.products = newData.tree[idx].products;
          newData.tree[idx] = folderData;
        }
      } else {
        const { activeNode: targetNode } = getCurrentFolder(activePath, newData.tree);
        if (targetNode) {
          const idx = targetNode.subFolders.findIndex((f: any) => f.id === oldId);
          if (idx !== -1) {
            folderData.subFolders = targetNode.subFolders[idx].subFolders;
            folderData.products = targetNode.subFolders[idx].products;
            targetNode.subFolders[idx] = folderData;
          }
        }
      }
    } else {
      // Creating a new folder
      if (activePath.length === 0) {
        newData.tree.push(folderData);
      } else {
        const { activeNode: targetNode } = getCurrentFolder(activePath, newData.tree);
        if (targetNode) targetNode.subFolders.push(folderData);
      }
    }
    
    setData(newData);
    setShowFolderModal(false);
    setEditingItem(null);
  };

  const handleSaveProduct = (productData: ProductNode, oldId?: string) => {
    const newData = { ...data };
    const { activeNode: targetNode } = getCurrentFolder(activePath, newData.tree);
    
    if (!targetNode) {
      alert("Products must be added inside a folder, not at the root level.");
      return;
    }
    
    if (oldId) {
      const idx = targetNode.products.findIndex((p: any) => p.id === oldId);
      if (idx !== -1) {
        targetNode.products[idx] = productData;
      }
    } else {
      targetNode.products.push(productData);
    }
    
    setData(newData);
    setShowProductModal(false);
    setEditingItem(null);
  };

  const handleDelete = (id: string, isProduct: boolean) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    const newData = { ...data };
    if (activePath.length === 0) {
      if (!isProduct) newData.tree = newData.tree.filter((n: any) => n.id !== id);
    } else {
      const { activeNode: targetNode } = getCurrentFolder(activePath, newData.tree);
      if (targetNode) {
        if (isProduct) {
          targetNode.products = targetNode.products.filter(p => p.id !== id);
        } else {
          targetNode.subFolders = targetNode.subFolders.filter(f => f.id !== id);
        }
      }
    }
    setData(newData);
  };

  return (
    <div className="flex h-full text-slate-200">
      {/* Left Pane - Tree */}
      <div className="w-1/3 bg-slate-800/50 border-r border-slate-700 overflow-y-auto p-4 flex flex-col">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-700 pb-2">
          Directory Tree
        </h3>
        <div className="flex-1">
          <div 
            className={`flex items-center gap-2 p-2 rounded cursor-pointer ${activePath.length === 0 ? 'bg-blue-600/20 text-blue-400' : 'hover:bg-slate-800'}`}
            onClick={() => setActivePath([])}
          >
            <Folder size={18} />
            <span className="font-semibold">Root (Home)</span>
          </div>
          
          <div className="mt-2 pl-4 border-l border-slate-700/50 ml-2 space-y-1">
            <RecursiveTree nodes={data.tree} currentPath={[]} activePath={activePath} setActivePath={setActivePath} />
          </div>
        </div>
      </div>

      {/* Right Pane - Workspace */}
      <div className="flex-1 bg-slate-900 overflow-y-auto p-6">
        {/* Breadcrumbs */}
        <div className="flex flex-wrap items-center gap-2 mb-6 text-sm text-slate-400 bg-slate-800 p-3 rounded-xl border border-slate-700">
          <span className="cursor-pointer hover:text-white" onClick={() => setActivePath([])}>Home</span>
          {activePath.map((pathSlug, idx) => {
            const upToNow = activePath.slice(0, idx + 1);
            const { activeNode: crumbNode } = getCurrentFolder(upToNow);
            return (
              <React.Fragment key={pathSlug}>
                <ChevronRight size={14} className="text-slate-600" />
                <span 
                  className={`cursor-pointer hover:text-white ${idx === activePath.length - 1 ? 'text-white font-bold' : ''}`}
                  onClick={() => setActivePath(upToNow)}
                >
                  {crumbNode?.title || pathSlug}
                </span>
              </React.Fragment>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex gap-4 mb-8">
          <button 
            onClick={() => { setEditingItem(null); setShowFolderModal(true); }}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg border border-slate-600 transition-colors"
          >
            <Plus size={16} /> Create Sub-Folder Here
          </button>
          {activePath.length > 0 && (
            <button 
              onClick={() => { setEditingItem(null); setShowProductModal(true); }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
            >
              <Plus size={16} /> Add Product Here
            </button>
          )}
        </div>

        {/* Folders Grid */}
        {currentList.length > 0 && (
          <div className="mb-10">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Folders ({currentList.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {currentList.map(folder => (
                <div key={folder.id} className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden group">
                  <div 
                    className="h-32 bg-slate-900 relative cursor-pointer"
                    onClick={() => setActivePath([...activePath, folder.id])}
                  >
                    {folder.folderCover ? (
                      <img src={folder.folderCover} alt={folder.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-600">
                        <ImageIcon size={32} />
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex-1 min-w-0 pr-2">
                      <h4 className="font-bold text-white truncate" title={folder.title}>{folder.title}</h4>
                      <p className="text-xs text-slate-400 mt-1 truncate" title={folder.description}>{folder.description || "No description"}</p>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <button type="button" onClick={(e) => { e.stopPropagation(); setEditingItem(folder); setShowFolderModal(true); }} className="text-blue-400 hover:text-blue-300 p-2 bg-blue-500/10 hover:bg-blue-500/20 rounded-md transition-all" title="Edit Folder"><Edit2 size={16}/></button>
                      <button type="button" onClick={(e) => { e.stopPropagation(); handleDelete(folder.id, false); }} className="text-red-400 hover:text-red-300 p-2 bg-red-500/10 hover:bg-red-500/20 rounded-md transition-all" title="Delete Folder"><Trash2 size={16}/></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Products Table */}
        {activeProducts.length > 0 && (
          <div>
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Products ({activeProducts.length})
            </h3>
            <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-900/50 text-slate-400">
                  <tr>
                    <th className="px-4 py-3 font-medium">Image</th>
                    <th className="px-4 py-3 font-medium">Title</th>
                    <th className="px-4 py-3 font-medium">Short Desc</th>
                    <th className="px-4 py-3 font-medium">Specs</th>
                    <th className="px-4 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {activeProducts.map(product => (
                    <tr key={product.id} className="hover:bg-slate-700/30">
                      <td className="px-4 py-3">
                        {product.imagePath ? (
                          <img src={product.imagePath} alt="" className="w-10 h-10 rounded bg-slate-900 object-cover" />
                        ) : (
                          <div className="w-10 h-10 rounded bg-slate-900 flex items-center justify-center text-slate-600"><FileText size={16}/></div>
                        )}
                      </td>
                      <td className="px-4 py-3 font-semibold text-white">{product.title}</td>
                      <td className="px-4 py-3 text-slate-400 max-w-[200px] truncate" title={product.shortDesc}>{product.shortDesc}</td>
                      <td className="px-4 py-3 text-slate-400">{product.specs?.length || 0} rows</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-1 shrink-0">
                          <button type="button" onClick={(e) => { e.stopPropagation(); setEditingItem(product); setShowProductModal(true); }} className="text-blue-400 hover:text-blue-300 p-2 bg-blue-500/10 hover:bg-blue-500/20 rounded-md transition-all" title="Edit Product"><Edit2 size={16}/></button>
                          <button type="button" onClick={(e) => { e.stopPropagation(); handleDelete(product.id, true); }} className="text-red-400 hover:text-red-300 p-2 bg-red-500/10 hover:bg-red-500/20 rounded-md transition-all" title="Delete Product"><Trash2 size={16}/></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {currentList.length === 0 && activeProducts.length === 0 && (
          <div className="text-center py-20 border-2 border-dashed border-slate-700 rounded-xl text-slate-500">
            <Folder size={48} className="mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">This folder is empty.</p>
            <p className="text-sm mt-1">Add a sub-folder or product to get started.</p>
          </div>
        )}

      </div>

      {/* Folder Modal */}
      {showFolderModal && <FolderModal onClose={() => { setShowFolderModal(false); setEditingItem(null); }} onSave={handleSaveFolder} initialData={editingItem} />}
      
      {/* Product Modal */}
      {showProductModal && <ProductModal onClose={() => { setShowProductModal(false); setEditingItem(null); }} onSave={handleSaveProduct} initialData={editingItem} />}
    </div>
  );
}

// ── Recursive Tree Component ──
function RecursiveTree({ nodes, currentPath, activePath, setActivePath }: { nodes: FolderNode[], currentPath: string[], activePath: string[], setActivePath: any }) {
  if (!nodes || nodes.length === 0) return null;
  
  return (
    <>
      {nodes.map(node => {
        const fullPath = [...currentPath, node.id];
        const isActive = activePath.join('/') === fullPath.join('/');
        const isExpanded = activePath.join('/').startsWith(fullPath.join('/'));
        
        return (
          <div key={node.id} className="mt-1">
            <div 
              className={`flex items-center gap-2 p-1.5 rounded cursor-pointer ${isActive ? 'bg-blue-600/20 text-blue-400' : 'hover:bg-slate-800 text-slate-300'}`}
              onClick={() => setActivePath(fullPath)}
            >
              <ChevronRight size={14} className={`transition-transform ${isExpanded ? 'rotate-90 text-blue-400' : 'text-slate-600'}`} />
              <Folder size={14} className={isActive ? 'text-blue-400' : 'text-slate-500'} />
              <span className="text-sm truncate font-medium">{node.title}</span>
            </div>
            {isExpanded && node.subFolders.length > 0 && (
              <div className="pl-4 ml-1.5 border-l border-slate-700/50">
                <RecursiveTree nodes={node.subFolders} currentPath={fullPath} activePath={activePath} setActivePath={setActivePath} />
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}

// ── Folder Modal ──
function FolderModal({ onClose, onSave, initialData }: any) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [desc, setDesc] = useState(initialData?.description || '');
  const [cover, setCover] = useState(initialData?.folderCover || '');
  const [imageClassName, setImageClassName] = useState(initialData?.imageClassName || '');

  const generateSlug = (str: string) => str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    onSave({
      id: initialData ? initialData.id : generateSlug(title),
      type: 'folder',
      title,
      description: desc,
      folderCover: cover || '/images/products/photos/no-image.png',
      imageClassName,
      subFolders: initialData?.subFolders || [],
      products: initialData?.products || []
    }, initialData?.id);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 w-full max-w-md shadow-2xl">
        <h2 className="text-xl font-bold text-white mb-6">{initialData ? 'Edit Folder' : 'Create Sub-Folder'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Folder Title</label>
            <input required type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white focus:border-blue-500 outline-none" placeholder="e.g. Flow Transmitters" />
            <p className="text-xs text-slate-500 mt-1">Slug: {generateSlug(title)}</p>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Description (Optional)</label>
            <input type="text" value={desc} onChange={e => setDesc(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white focus:border-blue-500 outline-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Cover Image Path</label>
              <input type="text" value={cover} onChange={e => setCover(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white focus:border-blue-500 outline-none" placeholder="/images/example.png" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Image CSS (scale, mt, etc)</label>
              <input type="text" value={imageClassName} onChange={e => setImageClassName(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white focus:border-blue-500 outline-none" placeholder="e.g. scale-75 mt-2" />
            </div>
          </div>
          <div className="flex gap-3 justify-end pt-4 border-t border-slate-800 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 text-slate-400 hover:text-white">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded">{initialData ? 'Save Changes' : 'Create Folder'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Product Modal ──
function ProductModal({ onClose, onSave, initialData }: any) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [shortDesc, setShortDesc] = useState(initialData?.shortDesc || '');
  const [fullDesc, setFullDesc] = useState(initialData?.fullDesc || '');
  const [imagePath, setImagePath] = useState(initialData?.imagePath || '');
  const [imageClassName, setImageClassName] = useState(initialData?.imageClassName || '');
  const [pdfPath, setPdfPath] = useState(initialData?.pdfPath || '');
  const [externalLink, setExternalLink] = useState(initialData?.externalLink || '');
  const [isExternal, setIsExternal] = useState(!!initialData?.externalLink);
  const [specs, setSpecs] = useState<Spec[]>(initialData?.specs || []);

  const [isBulkMode, setIsBulkMode] = useState(false);
  const [bulkText, setBulkText] = useState('');

  const isOverLimit = shortDesc.length > 500;
  const generateSlug = (str: string) => str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  const handleAddSpec = () => setSpecs([...specs, { label: '', value: '' }]);
  const updateSpec = (idx: number, field: 'label'|'value', val: string) => {
    const newSpecs = [...specs];
    newSpecs[idx][field] = val;
    setSpecs(newSpecs);
  };
  const removeSpec = (idx: number) => setSpecs(specs.filter((_, i) => i !== idx));

  const handleBulkParse = () => {
    if (!bulkText.trim()) return;
    const lines = bulkText.split('\n');
    const newSpecs: Spec[] = [];
    
    lines.forEach(line => {
      if (!line.trim()) return;
      // Try tab first (Excel/Sheets)
      let parts = line.split('\t');
      if (parts.length < 2) {
        // Fallback to colon or hyphen
        if (line.includes(':')) parts = line.split(':');
        else if (line.includes('-')) parts = line.split('-');
      }
      
      if (parts.length >= 2) {
        const label = parts[0].trim();
        const value = parts.slice(1).join(' ').trim();
        if (label && value) newSpecs.push({ label, value });
      } else {
        // Just add the whole line as a label if it can't be parsed
        newSpecs.push({ label: line.trim(), value: '' });
      }
    });

    setSpecs([...specs, ...newSpecs]);
    setBulkText('');
    setIsBulkMode(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || isOverLimit) return;
    
    onSave({
      id: initialData ? initialData.id : generateSlug(title),
      type: 'product',
      title,
      shortDesc,
      fullDesc,
      imagePath: imagePath || '/images/products/photos/no-image.png',
      imageClassName,
      pdfPath: isExternal ? '' : pdfPath,
      externalLink: isExternal ? externalLink : undefined,
      specs: isExternal ? [] : specs.filter(s => s.label.trim())
    }, initialData?.id);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <h2 className="text-xl font-bold text-white mb-6">{initialData ? 'Edit Product' : 'Add New Product'}</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Product Title</label>
            <input required type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white focus:border-blue-500 outline-none" />
            <p className="text-xs text-slate-500 mt-1">Slug: {generateSlug(title)}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Image Path</label>
              <input type="text" value={imagePath} onChange={e => setImagePath(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white focus:border-blue-500 outline-none" placeholder="/images/products/photos/..." />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Image CSS (scale, mt, etc)</label>
              <input type="text" value={imageClassName} onChange={e => setImageClassName(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white focus:border-blue-500 outline-none" placeholder="e.g. scale-90 mt-4" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1 flex justify-between">
              <span>Short Summary</span>
              <span className={isOverLimit ? 'text-red-400 font-bold' : 'text-slate-500'}>
                {shortDesc.length} / 500
              </span>
            </label>
            <input 
              required type="text" value={shortDesc} 
              onChange={e => setShortDesc(e.target.value)} 
              className={`w-full bg-slate-800 border rounded p-2 text-white outline-none ${isOverLimit ? 'border-red-500 focus:border-red-500' : 'border-slate-700 focus:border-blue-500'}`} 
            />
            {isOverLimit && <p className="text-xs text-red-400 mt-1">Symmetry Error: You must remain under 500 characters.</p>}
          </div>

          <div className="flex items-center gap-2 mb-4 p-3 bg-slate-800/50 border border-slate-700 rounded-lg">
            <input type="checkbox" id="isExternal" checked={isExternal} onChange={e => setIsExternal(e.target.checked)} className="w-4 h-4 rounded border-slate-600 text-blue-600 focus:ring-blue-600 bg-slate-700" />
            <label htmlFor="isExternal" className="text-sm font-semibold text-white">This product redirects to an External Website (e.g. Phoenix Contact)</label>
          </div>

          {isExternal ? (
            <div className="p-4 bg-blue-900/20 border border-blue-900/50 rounded-lg">
              <label className="block text-xs font-bold text-blue-400 uppercase mb-1">External Website URL</label>
              <input required type="url" value={externalLink} onChange={e => setExternalLink(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white focus:border-blue-500 outline-none" placeholder="https://www.phoenixcontact.com/..." />
            </div>
          ) : (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Full Engineering Description</label>
                <textarea value={fullDesc} onChange={e => setFullDesc(e.target.value)} rows={3} className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white focus:border-blue-500 outline-none" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Datasheet PDF Path (Optional)</label>
                <input type="text" value={pdfPath} onChange={e => setPdfPath(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white focus:border-blue-500 outline-none" placeholder="/pdfs/spec.pdf" />
              </div>

              <div className="border border-slate-800 rounded-lg p-4 bg-slate-900/50">
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-xs font-bold text-slate-400 uppercase">Technical Specs</label>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => setIsBulkMode(!isBulkMode)} className="text-xs bg-slate-800 hover:bg-slate-700 border border-slate-700 px-2 py-1 rounded text-white transition-colors">
                      {isBulkMode ? 'Cancel Bulk' : 'Bulk Paste (Excel)'}
                    </button>
                    <button type="button" onClick={handleAddSpec} className="text-xs bg-slate-700 hover:bg-slate-600 px-2 py-1 rounded text-white flex items-center gap-1"><Plus size={12}/> Add Row</button>
                  </div>
                </div>

                {isBulkMode ? (
                  <div className="mb-4 animate-in fade-in duration-200">
                    <p className="text-xs text-slate-400 mb-2">Paste table data directly from Excel or Google Sheets. It will automatically convert to rows.</p>
                    <textarea 
                      value={bulkText}
                      onChange={e => setBulkText(e.target.value)}
                      placeholder={"Example:\nDiameter\t100mm\nMaterial\tStainless Steel"}
                      className="w-full h-32 bg-slate-800 border border-slate-700 rounded p-2 text-sm text-white focus:border-blue-500 outline-none mb-2 font-mono"
                    />
                    <button type="button" onClick={handleBulkParse} className="w-full bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 text-sm py-2 rounded font-bold transition-colors border border-blue-500/30">
                      Parse and Add Rows
                    </button>
                  </div>
                ) : null}

                {specs.map((spec, idx) => (
                  <div key={idx} className="flex gap-2 mb-2">
                    <input placeholder="Label (e.g. Type)" value={spec.label} onChange={e => updateSpec(idx, 'label', e.target.value)} className="w-1/3 bg-slate-800 border border-slate-700 rounded p-1.5 text-sm text-white outline-none focus:border-blue-500" />
                    <input placeholder="Value (e.g. Industrial)" value={spec.value} onChange={e => updateSpec(idx, 'value', e.target.value)} className="flex-1 bg-slate-800 border border-slate-700 rounded p-1.5 text-sm text-white outline-none focus:border-blue-500" />
                    <button type="button" onClick={() => removeSpec(idx)} className="p-1.5 text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 rounded-md transition-all"><Trash2 size={16}/></button>
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="flex gap-3 justify-end pt-4 border-t border-slate-800">
            <button type="button" onClick={onClose} className="px-4 py-2 text-slate-400 hover:text-white">Cancel</button>
            <button disabled={isOverLimit || !title.trim()} type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-bold rounded">
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
