import React from 'react';
import { Heart, ExternalLink, Sparkles, ShieldCheck } from 'lucide-react';

export const DonationBanner: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-[#0B192C] via-[#1E3E62] to-[#0B192C] text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-b from-blue-900/60 to-slate-900/90 rounded-3xl p-8 sm:p-12 border border-blue-700/50 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          
          <div className="space-y-4 max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Unit Sosial • Mari Berbagi</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ulurkan Tangan, Berbagi Kebaikan untuk Umat
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Salurkan sedekah, infaq, zakat, dan donasi terbaik Anda melalui <strong className="text-white">Mari Berbagi</strong>. Setiap rupiah yang Anda donasikan disalurkan langsung untuk yatim piatu, dhuafa, beasiswa santri, dan operasional dakwah.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-xs font-medium text-blue-200 pt-2">
              <span className="flex items-center"><ShieldCheck className="w-4 h-4 text-emerald-400 mr-1.5" /> 100% Amanah & Transparan</span>
              <span className="flex items-center"><ShieldCheck className="w-4 h-4 text-emerald-400 mr-1.5" /> Laporan Berkala</span>
              <span className="flex items-center"><ShieldCheck className="w-4 h-4 text-emerald-400 mr-1.5" /> Penyaluran Tepat Sasaran</span>
            </div>
          </div>

          <div className="shrink-0">
            <a
              href="https://mariberbagi.net"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-3 px-8 py-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-base shadow-xl shadow-amber-500/30 transition-all hover:scale-105"
            >
              <Heart className="w-6 h-6 fill-white text-white animate-pulse" />
              <span>Donasi ke mariberbagi.net</span>
              <ExternalLink className="w-5 h-5 ml-1" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};
