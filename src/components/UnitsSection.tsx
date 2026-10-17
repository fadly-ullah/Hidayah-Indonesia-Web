import React from 'react';
import { UnitDakwah } from '../types';
import { BookOpen, HeartHandshake, Mic, Store, ExternalLink, ArrowRight, Award, Sparkles } from 'lucide-react';

interface UnitsSectionProps {
  units: UnitDakwah[];
  setActiveTab: (tab: string) => void;
}

export const UnitsSection: React.FC<UnitsSectionProps> = ({ units, setActiveTab }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen': return <BookOpen className="w-8 h-8 text-white" />;
      case 'Award': return <Award className="w-8 h-8 text-white" />;
      case 'HeartHandshake': return <HeartHandshake className="w-8 h-8 text-white" />;
      case 'Mic': return <Mic className="w-8 h-8 text-white" />;
      case 'Sparkles': return <Sparkles className="w-8 h-8 text-white" />;
      case 'Store': return <Store className="w-8 h-8 text-white" />;
      default: return <BookOpen className="w-8 h-8 text-white" />;
    }
  };

  return (
    <section className="py-20 bg-[#0B192C] text-white relative overflow-hidden">
      {/* Decorative background gradients */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            6 Unit Dakwah Hidayah Indonesia
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Pilar pengabdian dan pelayanan umat yang dikelola secara profesional di bidang pendidikan, tahfizh, sosial, dakwah media, majelis zikir, dan ekonomi syariah.
          </p>
        </div>

        {/* Units Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {units.map((unit) => {
            const isExternal = unit.url.startsWith('http');
            const isEducation = unit.id === 'mqc' || unit.id === 'mhq';
            
            return (
              <div 
                key={unit.id}
                className="bg-gradient-to-b from-blue-900/50 to-slate-900/90 rounded-3xl p-6 sm:p-8 border border-blue-800/60 shadow-xl flex flex-col justify-between hover:border-blue-500 transition-all group hover:-translate-y-1.5"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      {getIcon(unit.iconName)}
                    </div>
                    <span className="px-3 py-1 rounded-full bg-blue-800/80 text-blue-200 text-xs font-bold border border-blue-700/50">
                      {unit.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">
                    {unit.title}
                  </h3>
                  <p className="text-xs font-semibold text-amber-300 mb-3 uppercase tracking-wider">{unit.subtitle}</p>
                  
                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    {unit.description}
                  </p>

                  <div className="space-y-2 mb-8">
                    {unit.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center space-x-2 text-xs text-slate-300 font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  {isExternal ? (
                    <a
                      href={unit.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2"
                    >
                      <span>Kunjungi Website ({unit.subtitle})</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  ) : (
                    <button
                      onClick={() => {
                        if (isEducation) {
                          setActiveTab('mqc');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                      }}
                      className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2"
                    >
                      <span>Akses Unit ({unit.subtitle})</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
