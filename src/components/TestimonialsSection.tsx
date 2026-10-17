import React from 'react';
import { Testimonial } from '../types';
import { Star, Quote, Sparkles } from 'lucide-react';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  return (
    <section className="py-20 bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Testimoni & Kesaksian</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B192C] tracking-tight">
            Apa Kata Ulama, Wali Santri & Donatur
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Penilaian dan kesan nyata dari para kyai, wali santri, jamaah, dan donatur atas khidmat Yayasan Hidayah Indonesia.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testi) => (
            <div 
              key={testi.id}
              className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md flex flex-col justify-between hover:border-blue-500 transition-all relative"
            >
              <div className="absolute top-6 right-6 text-blue-200">
                <Quote className="w-8 h-8 opacity-40" />
              </div>

              <div>
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testi.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed italic mb-6">
                  "{testi.comment}"
                </p>
              </div>

              <div className="flex items-center space-x-3 pt-4 border-t border-slate-200">
                <img
                  src={testi.avatarUrl}
                  alt={testi.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-blue-600 shadow-sm"
                />
                <div>
                  <h4 className="font-bold text-[#0B192C] text-sm">{testi.name}</h4>
                  <p className="text-[11px] font-semibold text-blue-600">{testi.role}</p>
                  {testi.institutionOrTitle && (
                    <p className="text-[10px] text-slate-500">{testi.institutionOrTitle}</p>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
