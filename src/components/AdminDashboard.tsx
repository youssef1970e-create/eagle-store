import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Edit2, Trash2, X, Save, Image as ImageIcon, Link as LinkIcon, LayoutGrid, Search, LogOut } from 'lucide-react';
import { AndroidApp, Category } from '../types';
import { appService } from '../services/appService';
import { authService } from '../services/authService';
import { toast } from 'sonner';
import { cn } from '../lib/utils';

interface AdminDashboardProps {
  onLogout: () => void;
}

const CATEGORIES: Category[] = ['Games', 'Apps', 'Tools', 'Modded'];

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [apps, setApps] = useState<AndroidApp[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingApp, setEditingApp] = useState<AndroidApp | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [appToDelete, setAppToDelete] = useState<string | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    imageUrl: '',
    downloadUrl: '',
    category: 'Apps' as Category,
  });

  useEffect(() => {
    loadApps();
  }, []);

  const loadApps = () => {
    setApps(appService.getApps());
  };

  const handleOpenModal = (app?: AndroidApp) => {
    if (app) {
      setEditingApp(app);
      setFormData({
        name: app.name,
        description: app.description,
        imageUrl: app.imageUrl,
        downloadUrl: app.downloadUrl,
        category: app.category,
      });
    } else {
      setEditingApp(null);
      setFormData({
        name: '',
        description: '',
        imageUrl: '',
        downloadUrl: '',
        category: 'Apps',
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingApp) {
        appService.updateApp(editingApp.id, formData);
        toast.success('App updated successfully');
      } else {
        appService.addApp(formData);
        toast.success('New app added successfully');
      }
      setIsModalOpen(false);
      loadApps();
    } catch (error) {
      toast.error('Failed to save app');
    }
  };

  const confirmDelete = (id: string) => {
    setAppToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () => {
    if (appToDelete) {
      appService.deleteApp(appToDelete);
      toast.success('App deleted');
      setIsDeleteModalOpen(false);
      setAppToDelete(null);
      loadApps();
    }
  };

  const filteredApps = apps.filter(app => 
    app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <LayoutGrid className="text-accent" size={32} />
              Admin Dashboard
            </h1>
            <p className="text-white/40">Manage your store inventory and applications</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleOpenModal()}
              className="flex items-center gap-2 bg-accent hover:bg-accent/80 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-accent/20"
            >
              <Plus size={20} />
              Add New App
            </button>
            <button
              onClick={onLogout}
              className="p-3 glass glass-hover rounded-2xl text-white/40 hover:text-red-400 transition-colors"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>

        {/* Stats & Search */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-3 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-accent transition-colors" size={20} />
            <input
              type="text"
              placeholder="Search apps by name or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-accent/30 transition-all"
            />
          </div>
          <div className="glass rounded-2xl p-4 flex flex-col justify-center items-center">
            <span className="text-white/40 text-xs uppercase tracking-widest font-bold">Total Apps</span>
            <span className="text-3xl font-bold text-accent">{apps.length}</span>
          </div>
        </div>

        {/* Apps Table/Grid */}
        <div className="glass rounded-3xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 bg-white/5">
                  <th className="px-6 py-4 text-xs font-bold text-white/40 uppercase tracking-wider">App Info</th>
                  <th className="px-6 py-4 text-xs font-bold text-white/40 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-xs font-bold text-white/40 uppercase tracking-wider">Date Added</th>
                  <th className="px-6 py-4 text-xs font-bold text-white/40 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredApps.map((app) => (
                  <tr key={app.id} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img src={app.imageUrl} alt="" className="w-12 h-12 rounded-xl object-cover border border-white/10" />
                        <div>
                          <div className="font-bold text-white">{app.name}</div>
                          <div className="text-xs text-white/40 line-clamp-1 max-w-xs">{app.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/60">
                        {app.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-white/40">
                      {new Date(app.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenModal(app)}
                          className="p-2 glass glass-hover rounded-xl text-white/40 hover:text-accent transition-colors"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => confirmDelete(app.id)}
                          className="p-2 glass glass-hover rounded-xl text-white/40 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredApps.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-20 text-center text-white/20">
                      No applications found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-background/90 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-sm glass rounded-[32px] p-8 text-center space-y-6 border border-red-500/20 shadow-2xl shadow-red-500/10"
            >
              <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto text-red-500">
                <Trash2 size={32} />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">Confirm Deletion</h3>
                <p className="text-white/40 text-sm">Are you sure you want to delete this application? This action cannot be undone.</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="flex-1 py-3 glass glass-hover text-white font-bold rounded-2xl transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-2xl transition-all shadow-lg shadow-red-500/20"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-2xl glass rounded-3xl p-8 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-accent"></div>
              
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white">
                  {editingApp ? 'Edit Application' : 'Add New Application'}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 glass glass-hover rounded-full text-white/40 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/40 uppercase tracking-wider ml-1">App Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-4 text-white focus:outline-none focus:border-accent/50 transition-all"
                    placeholder="e.g. WhatsApp"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/40 uppercase tracking-wider ml-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as Category })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-4 text-white focus:outline-none focus:border-accent/50 transition-all appearance-none"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat} className="bg-surface text-white">{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold text-white/40 uppercase tracking-wider ml-1">Description</label>
                  <textarea
                    required
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-4 text-white focus:outline-none focus:border-accent/50 transition-all resize-none"
                    placeholder="Enter a brief description of the app..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/40 uppercase tracking-wider ml-1 flex items-center gap-2">
                    <ImageIcon size={14} /> Image URL
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-4 text-white focus:outline-none focus:border-accent/50 transition-all"
                    placeholder="https://example.com/image.png"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/40 uppercase tracking-wider ml-1 flex items-center gap-2">
                    <LinkIcon size={14} /> Download URL
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.downloadUrl}
                    onChange={(e) => setFormData({ ...formData, downloadUrl: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-4 text-white focus:outline-none focus:border-accent/50 transition-all"
                    placeholder="https://play.google.com/..."
                  />
                </div>

                <div className="md:col-span-2 pt-4">
                  <button
                    type="submit"
                    className="w-full bg-accent hover:bg-accent/80 text-white font-bold py-4 rounded-2xl shadow-lg shadow-accent/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    <Save size={20} />
                    {editingApp ? 'Update Application' : 'Create Application'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
