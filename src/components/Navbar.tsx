import React, { useState } from 'react';
import { BookOpen, Menu, X, Heart } from 'lucide-react';
import { FoundationProfile } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  profile: FoundationProfile;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, profile }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'profile', label: 'Profil & Visi Misi' },
    { id: 'units', label: 'Unit Dakwah' },
    { id: 'articles-activities', label: 'Kajian & Kegiatan' },
    { id: 'testimonials', label: 'Testimoni' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0B192C]/95 backdrop-blur-md border-b border-blue-900/40 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand (Editable by Admin) */}
          <div 
            onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-md shadow-blue-900/50 group-hover:scale-105 transition-transform overflow-hidden">
              {profile.logoImageUrl ? (
                <img src={profile.logoImageUrl} alt="Logo" className="w-full h-full object-cover" />
              ) : (
                <BookOpen className="w-6 h-6 text-white" />
              )}
            </div>
            <div>
              <span className="text-base sm:text-lg font-bold tracking-tight bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
                {profile.logoText || "Hidayah Indonesia"}
              </span>
              {profile.logoSubtext && (
            <p className="text-[10px] text-blue-300 font-medium tracking-wider uppercase">
              {profile.logoSubtext}
            </p>
          )}
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeTab === item.id 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30 font-semibold' 
                    : 'text-slate-300 hover:text-white hover:bg-blue-900/40'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right CTA: Donasi (Mari Berbagi) */}
          <div className="hidden md:flex items-center space-x-3">
            <a
              href="https://mariberbagi.net"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-sm font-semibold shadow-md shadow-amber-500/20 transition-all hover:scale-105"
            >
              <Heart className="w-4 h-4 fill-white text-white" />
              <span>Donasi (Mari Berbagi)</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 lg:hidden">
            <a
              href="https://mariberbagi.net"
              target="_blank"
              rel="noopener noreferrer"
              className="md:hidden px-3 py-1.5 rounded-lg bg-amber-500 text-white text-xs font-semibold flex items-center space-x-1"
            >
              <Heart className="w-3.5 h-3.5 fill-white" />
              <span>Donasi</span>
            </a>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-blue-900/60 text-slate-200 hover:text-white focus:outline-none"
              aria-label="Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="lg:hidden bg-[#0B192C] border-b border-blue-900/60 px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all ${
                activeTab === item.id 
                  ? 'bg-blue-600 text-white font-semibold' 
                  : 'text-slate-200 hover:bg-blue-900/50'
              }`}
            >
              {item.label}
            </button>
          ))}
          
          <div className="pt-4 border-t border-blue-900/60">
            <a
              href="https://mariberbagi.net"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold flex items-center justify-center space-x-2 shadow"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Donasi ke Mari Berbagi</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
