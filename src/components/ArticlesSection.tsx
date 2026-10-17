import React, { useState } from 'react';
import { Article } from '../types';
import { BookOpen, Calendar, User, Search, ArrowRight, X } from 'lucide-react';

interface ArticlesSectionProps {
  articles: Article[];
}

export const ArticlesSection: React.FC<ArticlesSectionProps> = ({ articles }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const categories = ['All', 'Kajian', 'Sanad', 'Berita'];

  const filteredArticles = articles.filter(art => {
    const matchesSearch = art.title.toLowerCase().includes(search.toLowerCase()) || art.summary.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="py-20 bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>Pusat Informasi & Syiar</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B192C] tracking-tight">
              Artikel & Kajian Pilihan
            </h2>
          </div>

          {/* Search bar */}
          <div className="mt-4 md:mt-0 relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Cari artikel / kajian..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-blue-600"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#0B192C] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat === 'All' ? 'Semua Kategori' : cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((art) => (
            <div 
              key={art.id}
              onClick={() => setSelectedArticle(art)}
              className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-200 hover:border-blue-500 shadow-md transition-all cursor-pointer flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={art.imageUrl}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#0B192C]/80 backdrop-blur-md text-white text-xs font-bold">
                    {art.category}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center space-x-4 text-xs text-slate-500 font-medium">
                    <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-1 text-blue-600" /> {art.date}</span>
                    <span className="flex items-center"><User className="w-3.5 h-3.5 mr-1 text-blue-600" /> {art.author}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[#0B192C] group-hover:text-blue-600 transition-colors line-clamp-2">
                    {art.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {art.summary}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <span className="inline-flex items-center space-x-1 text-sm font-bold text-blue-600 group-hover:underline">
                  <span>Baca Selengkapnya</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Read Article Modal */}
        {selectedArticle && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative animate-fadeIn">
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-4">
                {selectedArticle.category}
              </span>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B192C] mb-4">
                {selectedArticle.title}
              </h2>

              <div className="flex items-center space-x-4 text-xs text-slate-500 mb-6 pb-4 border-b border-slate-100">
                <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-1 text-blue-600" /> {selectedArticle.date}</span>
                <span className="flex items-center"><User className="w-3.5 h-3.5 mr-1 text-blue-600" /> {selectedArticle.author}</span>
              </div>

              <div className="rounded-2xl overflow-hidden mb-6 h-64">
                <img src={selectedArticle.imageUrl} alt={selectedArticle.title} className="w-full h-full object-cover" />
              </div>

              <div className="prose text-slate-700 space-y-4 text-sm sm:text-base leading-relaxed">
                <p className="font-semibold text-slate-900">{selectedArticle.summary}</p>
                <p>{selectedArticle.content}</p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 text-right">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-6 py-2.5 rounded-xl bg-[#0B192C] text-white text-sm font-semibold"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
