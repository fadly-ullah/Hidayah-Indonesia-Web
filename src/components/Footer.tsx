import React from 'react';
import { BookOpen, Heart, MapPin, Phone, Mail, ExternalLink, ShieldCheck } from 'lucide-react';
import { FoundationProfile } from '../types';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onOpenAdmin: () => void;
  profile: FoundationProfile;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenAdmin, profile }) => {
  return (
    <footer className="bg-[#07101E] text-white border-t border-blue-950 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center overflow-hidden">
                {profile.logoImageUrl ? (
                  <img src={profile.logoImageUrl} alt="Logo" className="w-full h-full object-cover" />
                ) : (
                  <BookOpen className="w-5 h-5 text-white" />
                )}
              </div>
              <span className="text-lg font-bold">{profile.logoText || "Hidayah Indonesia"}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Yayasan resmi berbadan hukum yang berkhidmat dalam pembinaan umat melalui pendidikan Al-Quran, sosial kemanusiaan, dakwah, dan bisnis syariah.
            </p>
            <div className="pt-2 flex flex-wrap gap-2">
              <a
                href="https://mariberbagi.net"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow transition-all"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>Mari Berbagi (Donasi)</span>
              </a>

              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold transition-all"
              >
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span>Panel Admin</span>
              </button>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-bold text-base mb-4 text-blue-200">Menu Utama</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
              <li>
                <button onClick={() => { setActiveTab('profile'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-blue-400 transition-colors">
                  Profil & Visi Misi
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('units'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-blue-400 transition-colors">
                  Unit Dakwah
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('mqc'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-blue-400 transition-colors">
                  Madrasah Qur'an Center
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('articles-activities'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-blue-400 transition-colors">
                  Kajian & Kegiatan
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('testimonials'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-blue-400 transition-colors">
                  Testimoni
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Unit Dakwah */}
          <div>
            <h4 className="font-bold text-base mb-4 text-blue-200">Unit Dakwah</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
              <li>
                <button onClick={() => { setActiveTab('mqc'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-blue-400 transition-colors">
                  Pendidikan: Madrasah Qur'an
                </button>
              </li>
              <li>
                <a href="https://mariberbagi.net" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors flex items-center">
                  <span>Sosial: Mari Berbagi</span>
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </li>
              <li>
                <button onClick={() => { setActiveTab('articles-activities'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-blue-400 transition-colors">
                  Dakwah: Majlis & Kajian
                </button>
              </li>
              <li>
                <span className="text-slate-400">Bisnis: HI Mart Syariah</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 className="font-bold text-base mb-4 text-blue-200">Sekretariat</h4>
            <div className="space-y-3 text-xs sm:text-sm text-slate-300">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-1" />
                <span>{profile.contact.address}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{profile.contact.whatsapp}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{profile.contact.email}</span>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-blue-950 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {profile.logoText || "Yayasan Hidayah Indonesia"}. Hak Cipta Dilindungi Undang-Undang.</p>
          <p className="mt-2 sm:mt-0">Pusat Dakwah, Pendidikan, Sosial & Ekonomi Umat</p>
        </div>
      </div>
    </footer>
  );
};
