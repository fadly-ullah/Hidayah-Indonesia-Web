import React, { useState } from 'react';
import { FoundationProfile } from '../types';
import { ShieldCheck, Target, Eye, FileText, MapPin, Phone, CheckCircle2, Award } from 'lucide-react';

interface ProfileSectionProps {
  profile: FoundationProfile;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({ profile }) => {
  const [activeSubTab, setActiveSubTab] = useState<'profile' | 'vision' | 'legal' | 'management'>('profile');

  return (
    <section className="py-20 bg-slate-50 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Profil Yayasan Resmi</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0B192C] tracking-tight">
            Tentang {profile.name}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            {profile.tagline}
          </p>
        </div>

        {/* Sub Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <button
            onClick={() => setActiveSubTab('profile')}
            className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all shadow-sm ${
              activeSubTab === 'profile'
                ? 'bg-[#0B192C] text-white shadow-md scale-105'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Profil & Sejarah
          </button>
          <button
            onClick={() => setActiveSubTab('vision')}
            className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all shadow-sm ${
              activeSubTab === 'vision'
                ? 'bg-[#0B192C] text-white shadow-md scale-105'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Visi & Misi
          </button>
          <button
            onClick={() => setActiveSubTab('legal')}
            className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all shadow-sm ${
              activeSubTab === 'legal'
                ? 'bg-[#0B192C] text-white shadow-md scale-105'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Nomor Legalitas
          </button>
          <button
            onClick={() => setActiveSubTab('management')}
            className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all shadow-sm ${
              activeSubTab === 'management'
                ? 'bg-[#0B192C] text-white shadow-md scale-105'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Kepengurusan
          </button>
        </div>

        {/* Tab Content Bento Container */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-slate-200 max-w-5xl mx-auto">
          
          {activeSubTab === 'profile' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="border-l-4 border-blue-600 pl-6 py-2 bg-blue-50/50 rounded-r-2xl">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B192C]">{profile.name}</h3>
                <p className="text-sm font-semibold text-blue-600 mt-1">{profile.tagline}</p>
              </div>

              <p className="text-slate-700 leading-relaxed text-base sm:text-lg">
                {profile.description}
              </p>

              <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white p-8 rounded-3xl shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>
                <h4 className="font-extrabold text-xl mb-3 flex items-center text-amber-300">
                  <FileText className="w-6 h-6 mr-2.5 text-amber-400" />
                  Sejarah Singkat Yayasan
                </h4>
                <p className="text-blue-100 leading-relaxed text-base sm:text-lg">
                  {profile.history}
                </p>
              </div>

              {/* Contact Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                <div className="flex items-start space-x-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Alamat Sekretariat</p>
                    <p className="text-sm font-semibold text-slate-800 mt-1 leading-snug">{profile.contact.address}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Kontak / WhatsApp</p>
                    <p className="text-sm font-semibold text-slate-800 mt-1 leading-snug">{profile.contact.whatsapp}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{profile.contact.email}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSubTab === 'vision' && (
            <div className="space-y-8 animate-fadeIn">
              {/* Vision Card */}
              <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-[#0B192C] text-white p-8 sm:p-10 rounded-3xl shadow-xl">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                    <Eye className="w-7 h-7 text-amber-400" />
                  </div>
                  <h3 className="text-2xl font-bold">Visi Yayasan</h3>
                </div>
                <p className="text-xl sm:text-2xl font-semibold text-blue-100 leading-relaxed italic">
                  "{profile.vision}"
                </p>
              </div>

              {/* Mission Card */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                    <Target className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0B192C]">Misi Yayasan</h3>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {profile.mission.map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-4 p-5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm hover:border-blue-400 transition-colors">
                      <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-extrabold text-sm flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <p className="text-slate-800 font-semibold text-base sm:text-lg leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSubTab === 'legal' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="border-l-4 border-blue-600 pl-6 py-2 bg-blue-50/50 rounded-r-2xl">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B192C]">Nomor Legalitas & Perizinan</h3>
                <p className="text-sm text-slate-600 mt-1">Yayasan Hidayah Indonesia beroperasi secara resmi di bawah hukum Negara Kesatuan Republik Indonesia.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {profile.legalities.map((item, idx) => (
                  <div key={idx} className="bg-slate-50 p-6 rounded-3xl border border-slate-200 flex flex-col justify-between hover:border-blue-500 transition-all shadow-md group hover:-translate-y-1">
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center mb-5 font-bold text-lg shadow-md group-hover:scale-110 transition-transform">
                        <Award className="w-6 h-6" />
                      </div>
                      <h4 className="font-bold text-[#0B192C] text-lg mb-2">{item.title}</h4>
                      <p className="text-blue-800 font-mono font-bold text-sm bg-blue-50 p-3 rounded-xl border border-blue-200 inline-block mb-3">
                        {item.number}
                      </p>
                      {item.notary && (
                        <p className="text-xs font-semibold text-slate-600">Notaris: {item.notary}</p>
                      )}
                    </div>
                    <div className="pt-4 mt-4 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-slate-500">
                      <span>Tahun: {item.year}</span>
                      <span className="text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center">
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Resmi
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSubTab === 'management' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="border-l-4 border-blue-600 pl-6 py-2 bg-blue-50/50 rounded-r-2xl">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B192C]">Struktur Kepengurusan Yayasan</h3>
                <p className="text-sm text-slate-600 mt-1">Dewan Pembina, Pengurus Harian, dan Pimpinan Unit Dakwah Hidayah Indonesia.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {profile.management.map((m, idx) => (
                  <div key={idx} className="bg-slate-50 p-6 rounded-3xl border border-slate-200 text-center hover:shadow-lg transition-all group hover:-translate-y-1">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-700 to-indigo-600 text-white font-extrabold text-2xl flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-105 transition-transform">
                      {m.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <h4 className="font-extrabold text-[#0B192C] text-lg mb-1">{m.name}</h4>
                    <span className="inline-block px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-900 text-xs font-bold">
                      {m.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
