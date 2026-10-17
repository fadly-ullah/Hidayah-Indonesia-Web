import React from 'react';
import { Activity } from '../types';
import { Calendar, Clock, MapPin, User, Video, Sparkles } from 'lucide-react';

interface ActivitiesSectionProps {
  activities: Activity[];
}

export const ActivitiesSection: React.FC<ActivitiesSectionProps> = ({ activities }) => {
  return (
    <section className="py-20 bg-slate-50 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Agenda & Syiar Umat</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B192C] tracking-tight">
            Kegiatan, Kajian, & Majlis Rutin
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Mari ikuti berbagai majelis ilmu, kajian tasawwuf, program sanad Al-Quran, dan bakti sosial Hidayah Indonesia.
          </p>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((act) => (
            <div 
              key={act.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md flex flex-col justify-between hover:border-blue-500 transition-all group hover:-translate-y-1"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={act.imageUrl}
                    alt={act.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#0B192C]/90 text-white text-xs font-bold">
                    {act.category}
                  </span>
                  {act.isOnline && (
                    <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center space-x-1">
                      <Video className="w-3.5 h-3.5" />
                      <span>Online / Offline</span>
                    </span>
                  )}
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="text-lg font-bold text-[#0B192C] group-hover:text-blue-600 transition-colors">
                    {act.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {act.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-600 font-medium">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>{act.schedule}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                      <span className="truncate">{act.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>Pengampu: {act.instructor}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <a
                  href="https://wa.me/6281234567890?text=Halo%20Admin%20Hidayah%20Indonesia,%20saya%20ingin%20bergabung%20di%20kegiatan%20"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center space-x-2 border border-blue-200"
                >
                  <span>Ikuti / Konfirmasi Kehadiran</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
