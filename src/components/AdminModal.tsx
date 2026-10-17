import React, { useState } from 'react';
import { FoundationProfile, UnitDakwah, Article, Activity, Testimonial, MQCRegistration } from '../types';
import { X, ShieldCheck, Plus, Trash2, Edit, Save, CheckCircle2, FileText, Calendar, Users, BookOpen, Star, Upload } from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: FoundationProfile;
  setProfile: React.Dispatch<React.SetStateAction<FoundationProfile>>;
  units: UnitDakwah[];
  setUnits: React.Dispatch<React.SetStateAction<UnitDakwah[]>>;
  articles: Article[];
  setArticles: React.Dispatch<React.SetStateAction<Article[]>>;
  activities: Activity[];
  setActivities: React.Dispatch<React.SetStateAction<Activity[]>>;
  testimonials: Testimonial[];
  setTestimonials: React.Dispatch<React.SetStateAction<Testimonial[]>>;
  registrations: MQCRegistration[];
  setRegistrations: React.Dispatch<React.SetStateAction<MQCRegistration[]>>;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  profile,
  setProfile,
  units,
  setUnits,
  articles,
  setArticles,
  activities,
  setActivities,
  testimonials,
  setTestimonials,
  registrations,
  setRegistrations
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'units' | 'articles' | 'activities' | 'testimonials' | 'registrations'>('profile');
  const [successMsg, setSuccessMsg] = useState('');

  // Editing Unit state
  const [editingUnitId, setEditingUnitId] = useState<string | null>(null);
  const [editingUnitData, setEditingUnitData] = useState<Partial<UnitDakwah>>({});

  // Article form state for adding/editing
  const [newArticle, setNewArticle] = useState<Partial<Article>>({
    title: '',
    category: 'Kajian',
    summary: '',
    content: '',
    author: 'Ust. M. Ihsanuddin, Lc., M.Pd.',
    date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
    imageUrl: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&q=80&w=800'
  });
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);

  // Activity form state
  const [newActivity, setNewActivity] = useState<Partial<Activity>>({
    title: '',
    category: 'Kajian Rutin',
    schedule: 'Ahad | 09.00 WIB',
    location: 'Hidayah Indonesia Jatiasih',
    description: '',
    instructor: 'Tim Asatidz',
    imageUrl: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=800',
    isOnline: false
  });
  const [editingActivityId, setEditingActivityId] = useState<string | null>(null);

  if (!isOpen) return null;

  const showNotice = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'logoImageUrl' | 'heroBgImageUrl' | 'heroImageUrl') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target?.result as string;
        if (result) {
          setProfile({ ...profile, [field]: result });
          showNotice('Foto/logo berhasil diunggah dari galeri!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Unit Dakwah Update
  const handleSaveUnit = (id: string) => {
    setUnits(units.map(u => u.id === id ? { ...u, ...editingUnitData } as UnitDakwah : u));
    setEditingUnitId(null);
    showNotice('Unit dakwah berhasil diperbarui!');
  };

  // Article CRUD
  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newArticle.title || !newArticle.summary) return;

    if (editingArticleId) {
      setArticles(articles.map(a => a.id === editingArticleId ? { ...a, ...newArticle } as Article : a));
      setEditingArticleId(null);
      showNotice('Artikel berhasil diperbarui!');
    } else {
      const art: Article = {
        id: 'art-' + Date.now(),
        title: newArticle.title || '',
        category: newArticle.category as any || 'Kajian',
        summary: newArticle.summary || '',
        content: newArticle.content || newArticle.summary || '',
        author: newArticle.author || 'Admin',
        date: newArticle.date || 'Hari ini',
        imageUrl: newArticle.imageUrl || 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&q=80&w=800'
      };
      setArticles([art, ...articles]);
      showNotice('Artikel baru berhasil ditambahkan!');
    }
    setNewArticle({ title: '', category: 'Kajian', summary: '', content: '', author: 'Admin', imageUrl: '' });
  };

  const handleDeleteArticle = (id: string) => {
    if (confirm('Hapus artikel ini?')) {
      setArticles(articles.filter(a => a.id !== id));
      showNotice('Artikel berhasil dihapus.');
    }
  };

  // Activity CRUD
  const handleSaveActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActivity.title) return;

    if (editingActivityId) {
      setActivities(activities.map(a => a.id === editingActivityId ? { ...a, ...newActivity } as Activity : a));
      setEditingActivityId(null);
      showNotice('Kegiatan berhasil diperbarui!');
    } else {
      const act: Activity = {
        id: 'act-' + Date.now(),
        title: newActivity.title || '',
        category: newActivity.category || 'Kajian',
        schedule: newActivity.schedule || '',
        location: newActivity.location || '',
        description: newActivity.description || '',
        instructor: newActivity.instructor || '',
        imageUrl: newActivity.imageUrl || 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=800',
        isOnline: Boolean(newActivity.isOnline)
      };
      setActivities([act, ...activities]);
      showNotice('Kegiatan baru berhasil ditambahkan!');
    }
    setNewActivity({ title: '', category: 'Kajian', schedule: '', location: '', description: '', instructor: '', isOnline: false });
  };

  const handleDeleteActivity = (id: string) => {
    if (confirm('Hapus kegiatan ini?')) {
      setActivities(activities.filter(a => a.id !== id));
      showNotice('Kegiatan berhasil dihapus.');
    }
  };

  // Registration status toggle
  const handleUpdateRegStatus = (id: string, status: 'Pending' | 'Dikonfirmasi' | 'Aktif') => {
    setRegistrations(registrations.map(r => r.id === id ? { ...r, status } : r));
    showNotice('Status pendaftaran santri diperbarui.');
  };

  const handleDeleteReg = (id: string) => {
    if (confirm('Hapus data pendaftaran ini?')) {
      setRegistrations(registrations.filter(r => r.id !== id));
      showNotice('Data pendaftaran dihapus.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative animate-fadeIn text-slate-900">
        
        {/* Header */}
        <div className="sticky top-0 z-20 bg-[#0B192C] text-white px-6 py-5 flex items-center justify-between border-b border-blue-900">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Panel Admin Pusat Hidayah Indonesia</h2>
              <p className="text-xs text-blue-300">Kelola Seluruh Konten, Teks, Foto & Unit Dakwah Yayasan</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-blue-900/60 hover:bg-blue-800 text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Success Alert */}
        {successMsg && (
          <div className="mx-6 mt-6 bg-emerald-100 border border-emerald-400 text-emerald-800 px-4 py-3 rounded-xl text-sm font-semibold flex items-center space-x-2 animate-fadeIn">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Nav Tabs */}
        <div className="p-6 pb-2 border-b border-slate-200 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'profile' ? 'bg-[#0B192C] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Profil, Logo & Hero
          </button>
          <button
            onClick={() => setActiveTab('units')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'units' ? 'bg-[#0B192C] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            6 Unit Dakwah ({units.length})
          </button>
          <button
            onClick={() => setActiveTab('articles')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'articles' ? 'bg-[#0B192C] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Artikel & Kajian ({articles.length})
          </button>
          <button
            onClick={() => setActiveTab('activities')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'activities' ? 'bg-[#0B192C] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Kegiatan ({activities.length})
          </button>
          <button
            onClick={() => setActiveTab('testimonials')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'testimonials' ? 'bg-[#0B192C] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Testimoni ({testimonials.length})
          </button>
          <button
            onClick={() => setActiveTab('registrations')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'registrations' ? 'bg-[#0B192C] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            PSB MQC Registrants ({registrations.length})
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 space-y-6">
          
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-[#0B192C]">Edit Logo, Hero Section & Profil Yayasan</h3>
              
              {/* Image Upload Gallery Section */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                <h4 className="font-bold text-sm text-[#0B192C] flex items-center">
                  <Upload className="w-4 h-4 text-blue-600 mr-2" />
                  Upload Foto & Logo dari Galeri / Perangkat
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  {/* Logo Upload */}
                  <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2">
                    <p className="font-bold text-slate-700">Logo Header</p>
                    {profile.logoImageUrl && (
                      <img src={profile.logoImageUrl} alt="Logo preview" className="w-12 h-12 object-cover rounded-lg" />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'logoImageUrl')}
                      className="w-full text-xs text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  </div>

                  {/* Hero Background Upload */}
                  <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2">
                    <p className="font-bold text-slate-700">Foto Latar / Banner Hero</p>
                    {profile.heroBgImageUrl && (
                      <img src={profile.heroBgImageUrl} alt="Hero BG preview" className="w-full h-12 object-cover rounded-lg" />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'heroBgImageUrl')}
                      className="w-full text-xs text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  </div>

                  {/* Hero Right Photo Upload */}
                  <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2">
                    <p className="font-bold text-slate-700">Foto di Dalam Hero (Kanan)</p>
                    {profile.heroImageUrl && (
                      <img src={profile.heroImageUrl} alt="Hero photo preview" className="w-12 h-12 object-cover rounded-lg" />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'heroImageUrl')}
                      className="w-full text-xs text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  </div>
                </div>
              </div>

              {/* Logo text settings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                <div>
                  <label className="block text-xs font-bold text-blue-900 mb-1">Teks Logo Header</label>
                  <input
                    type="text"
                    value={profile.logoText || ''}
                    onChange={(e) => setProfile({ ...profile, logoText: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-blue-900 mb-1">Subteks Logo Header</label>
                  <input
                    type="text"
                    value={profile.logoSubtext || ''}
                    onChange={(e) => setProfile({ ...profile, logoSubtext: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600 bg-white"
                  />
                </div>
              </div>

              {/* Hero Section Content Settings */}
              <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <h4 className="font-bold text-sm text-[#0B192C]">Pengaturan Konten Hero Section</h4>
                
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Badge Hero (Label Atas)</label>
                  <input
                    type="text"
                    value={profile.heroBadge || ''}
                    onChange={(e) => setProfile({ ...profile, heroBadge: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600 bg-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Judul Utama (Hero Title)</label>
                  <input
                    type="text"
                    value={profile.heroTitle || ''}
                    onChange={(e) => setProfile({ ...profile, heroTitle: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600 bg-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Deskripsi Hero</label>
                  <textarea
                    rows={2}
                    value={profile.heroDescription || ''}
                    onChange={(e) => setProfile({ ...profile, heroDescription: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600 bg-white text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Nama Yayasan</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Tagline</label>
                  <input
                    type="text"
                    value={profile.tagline}
                    onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Deskripsi Yayasan</label>
                <textarea
                  rows={3}
                  value={profile.description}
                  onChange={(e) => setProfile({ ...profile, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Visi Yayasan</label>
                <textarea
                  rows={2}
                  value={profile.vision}
                  onChange={(e) => setProfile({ ...profile, vision: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600 text-sm"
                />
              </div>

              <button
                onClick={() => showNotice('Profil, Logo & Hero berhasil diperbarui!')}
                className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold text-sm shadow hover:bg-blue-700"
              >
                Simpan Perubahan Profil
              </button>
            </div>
          )}

          {activeTab === 'units' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-[#0B192C]">Kelola 6 Unit Dakwah Hidayah Indonesia</h3>
              <p className="text-xs text-slate-600">Setiap unit dakwah ditampilkan secara terpisah dan dapat diubah keterangannya oleh admin.</p>

              <div className="space-y-4">
                {units.map((unit) => (
                  <div key={unit.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="px-2.5 py-1 rounded bg-blue-600 text-white text-xs font-bold">{unit.badge}</span>
                        <h4 className="font-bold text-base text-[#0B192C]">{unit.title}</h4>
                      </div>
                      <span className="text-xs font-semibold text-amber-600">{unit.subtitle}</span>
                    </div>

                    {editingUnitId === unit.id ? (
                      <div className="space-y-3 pt-2">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 mb-1">Judul Unit</label>
                          <input
                            type="text"
                            value={editingUnitData.title || ''}
                            onChange={(e) => setEditingUnitData({ ...editingUnitData, title: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                            placeholder="Judul Unit"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 mb-1">Subjudul / Nama Singkat</label>
                          <input
                            type="text"
                            value={editingUnitData.subtitle || ''}
                            onChange={(e) => setEditingUnitData({ ...editingUnitData, subtitle: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                            placeholder="Subjudul Unit"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 mb-1">Link URL Akses Unit</label>
                          <input
                            type="text"
                            value={editingUnitData.url || ''}
                            onChange={(e) => setEditingUnitData({ ...editingUnitData, url: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white font-mono"
                            placeholder="https://... atau #mqc"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 mb-1">Poin-poin / Fitur Card (Pisahkan dengan koma)</label>
                          <input
                            type="text"
                            value={Array.isArray(editingUnitData.features) ? editingUnitData.features.join(', ') : ''}
                            onChange={(e) => setEditingUnitData({ ...editingUnitData, features: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                            placeholder="Poin 1, Poin 2, Poin 3"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 mb-1">Deskripsi Unit</label>
                          <textarea
                            rows={2}
                            value={editingUnitData.description || ''}
                            onChange={(e) => setEditingUnitData({ ...editingUnitData, description: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                            placeholder="Deskripsi Unit"
                          />
                        </div>
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => setEditingUnitId(null)}
                            className="px-4 py-1.5 rounded-xl bg-slate-200 text-slate-700 text-xs font-semibold"
                          >
                            Batal
                          </button>
                          <button
                            onClick={() => handleSaveUnit(unit.id)}
                            className="px-4 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-semibold"
                          >
                            Simpan Unit
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-slate-600 line-clamp-2 max-w-2xl">{unit.description}</p>
                        <button
                          onClick={() => {
                            setEditingUnitId(unit.id);
                            setEditingUnitData(unit);
                          }}
                          className="px-4 py-2 rounded-xl bg-blue-100 text-blue-800 text-xs font-bold hover:bg-blue-200 flex items-center space-x-1 shrink-0 ml-4"
                        >
                          <Edit className="w-3.5 h-3.5 mr-1" />
                          <span>Edit Unit</span>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'articles' && (
            <div className="space-y-6">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <h3 className="text-base font-bold text-[#0B192C] mb-4">
                  {editingArticleId ? 'Edit Artikel' : 'Tambah Artikel / Kajian Baru'}
                </h3>
                
                <form onSubmit={handleSaveArticle} className="space-y-4 text-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Judul Artikel</label>
                      <input
                        type="text"
                        required
                        placeholder="Judul kajian..."
                        value={newArticle.title || ''}
                        onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Kategori</label>
                      <select
                        value={newArticle.category || 'Kajian'}
                        onChange={(e) => setNewArticle({ ...newArticle, category: e.target.value as any })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600"
                      >
                        <option value="Kajian">Kajian</option>
                        <option value="Sanad">Sanad</option>
                        <option value="Berita">Berita</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Ringkasan (Summary)</label>
                    <textarea
                      rows={2}
                      required
                      placeholder="Ringkasan singkat..."
                      value={newArticle.summary || ''}
                      onChange={(e) => setNewArticle({ ...newArticle, summary: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Konten Lengkap</label>
                    <textarea
                      rows={4}
                      placeholder="Isi artikel / kajian lengkap..."
                      value={newArticle.content || ''}
                      onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600 text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs shadow hover:bg-blue-700"
                  >
                    {editingArticleId ? 'Simpan Perubahan' : 'Tambah Artikel'}
                  </button>
                </form>
              </div>

              {/* List of articles */}
              <div className="space-y-3">
                <h4 className="font-bold text-sm text-[#0B192C]">Daftar Artikel & Kajian</h4>
                {articles.map((art) => (
                  <div key={art.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-blue-100 text-blue-800">{art.category}</span>
                      <h5 className="font-bold text-sm text-slate-900 mt-1">{art.title}</h5>
                      <p className="text-xs text-slate-500">{art.date} • {art.author}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setEditingArticleId(art.id);
                          setNewArticle(art);
                        }}
                        className="p-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteArticle(art.id)}
                        className="p-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'activities' && (
            <div className="space-y-6">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <h3 className="text-base font-bold text-[#0B192C] mb-4">
                  {editingActivityId ? 'Edit Kegiatan' : 'Tambah Kegiatan / Kajian Rutin Baru'}
                </h3>
                
                <form onSubmit={handleSaveActivity} className="space-y-4 text-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Nama Kegiatan</label>
                      <input
                        type="text"
                        required
                        placeholder="Nama majelis / kajian..."
                        value={newActivity.title || ''}
                        onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Kategori</label>
                      <input
                        type="text"
                        value={newActivity.category || ''}
                        onChange={(e) => setNewActivity({ ...newActivity, category: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Jadwal</label>
                      <input
                        type="text"
                        placeholder="Ahad | 09.00 WIB"
                        value={newActivity.schedule || ''}
                        onChange={(e) => setNewActivity({ ...newActivity, schedule: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Lokasi</label>
                      <input
                        type="text"
                        placeholder="Aula Hidayah Indonesia / Zoom"
                        value={newActivity.location || ''}
                        onChange={(e) => setNewActivity({ ...newActivity, location: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Deskripsi Kegiatan</label>
                    <textarea
                      rows={2}
                      value={newActivity.description || ''}
                      onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600 text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs shadow hover:bg-blue-700"
                  >
                    {editingActivityId ? 'Simpan Perubahan' : 'Tambah Kegiatan'}
                  </button>
                </form>
              </div>

              {/* List of activities */}
              <div className="space-y-3">
                <h4 className="font-bold text-sm text-[#0B192C]">Daftar Kegiatan</h4>
                {activities.map((act) => (
                  <div key={act.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-blue-100 text-blue-800">{act.category}</span>
                      <h5 className="font-bold text-sm text-slate-900 mt-1">{act.title}</h5>
                      <p className="text-xs text-slate-500">{act.schedule} • {act.location}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleDeleteActivity(act.id)}
                        className="p-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'testimonials' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-[#0B192C]">Daftar Testimoni</h3>
              <p className="text-xs text-slate-600">Testimoni dari ulama, jemaah, donatur, orang tua asuh, dan wali santri.</p>
              
              <div className="space-y-3">
                {testimonials.map((testi) => (
                  <div key={testi.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-amber-100 text-amber-800">{testi.role}</span>
                      <h5 className="font-bold text-sm text-slate-900 mt-1">{testi.name}</h5>
                      <p className="text-xs text-slate-600 italic">"{testi.comment}"</p>
                    </div>
                    <button
                      onClick={() => {
                        if (confirm('Hapus testimoni ini?')) {
                          setTestimonials(testimonials.filter(t => t.id !== testi.id));
                          showNotice('Testimoni dihapus.');
                        }
                      }}
                      className="p-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 shrink-0 ml-4"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'registrations' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#0B192C]">Data Pendaftaran Santri Baru (PSB MQC)</h3>
                  <p className="text-xs text-slate-600">Daftar calon santri yang mendaftar melalui website.</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-bold text-xs">
                  Total: {registrations.length} Pendaftar
                </span>
              </div>

              {registrations.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-slate-500 text-sm">
                  Belum ada pendaftar santri baru saat ini.
                </div>
              ) : (
                <div className="space-y-3">
                  {registrations.map((reg) => (
                    <div key={reg.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-sm text-[#0B192C]">{reg.fullName}</span>
                          <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold">{reg.gender}</span>
                          <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">{reg.classType}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${reg.status === 'Aktif' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                            {reg.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600">
                          📱 WhatsApp: <strong>{reg.whatsapp}</strong> • Level: <strong>{reg.level}</strong> • Metode: <strong>{reg.mode}</strong>
                        </p>
                      </div>

                      <div className="flex items-center space-x-2 shrink-0">
                        <select
                          value={reg.status}
                          onChange={(e) => handleUpdateRegStatus(reg.id, e.target.value as any)}
                          className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs bg-white font-medium"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Dikonfirmasi">Dikonfirmasi</option>
                          <option value="Aktif">Aktif</option>
                        </select>
                        <button
                          onClick={() => handleDeleteReg(reg.id)}
                          className="p-2 rounded-xl bg-red-100 text-red-700 hover:bg-red-200"
                          title="Hapus"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
