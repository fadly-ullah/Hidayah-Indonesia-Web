import React from 'react';
import { BookOpen, Sparkles, ArrowRight } from 'lucide-react';
import type { FoundationProfile } from '../types';

interface HeroProps {
  setActiveTab: (tab: string) => void;
  profile: FoundationProfile;
}

/** Main hero content is sourced from the Rumahweb CMS profile. */
export const Hero: React.FC<HeroProps> = ({ setActiveTab, profile }) => {
  const bgStyle: React.CSSProperties = profile.heroBgImageUrl
    ? {
        backgroundImage: `linear-gradient(to bottom, rgba(11, 25, 44, 0.9), rgba(11, 25, 44, 0.95)), url(${profile.heroBgImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : {};

  return (
    <div
      style={bgStyle}
      className="relative bg-gradient-to-b from-[#0B192C] via-[#1E3E62] to-[#0B192C] text-white overflow-hidden py-16 lg:py-24"
    >
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {profile.heroBadge && (
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-900/80 border border-blue-700/60 text-blue-200 text-xs sm:text-sm font-medium shadow-inner">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>{profile.heroBadge}</span>
              </div>
            )}

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              {profile.heroTitle || profile.name}
            </h1>

            {profile.heroDescription && (
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {profile.heroDescription}
              </p>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => {
                  setActiveTab('mqc');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold shadow-lg shadow-blue-600/30 transition-all hover:scale-105"
              >
                <BookOpen className="w-5 h-5" />
                <span>Daftar Kelas Tahsin</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-blue-800/40 aspect-4/3 lg:aspect-square">
                {profile.heroImageUrl ? (
                  <img
                    src={profile.heroImageUrl}
                    alt="Hidayah Indonesia"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className="flex h-full w-full items-center justify-center bg-blue-950"
                    role="img"
                    aria-label="Gambar utama belum tersedia"
                  >
                    <BookOpen className="h-20 w-20 text-blue-300" aria-hidden="true" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
