import React, { useEffect, useState } from 'react';
import { initialProfile, initialUnits } from './data/initialData';
import type { FoundationProfile, UnitDakwah, Article, Activity, Testimonial } from './types';
import { publicCms } from './services/cmsApi';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProfileSection } from './components/ProfileSection';
import { UnitsSection } from './components/UnitsSection';
import { MQCPage } from './components/MQCPage';
import { ArticlesSection } from './components/ArticlesSection';
import { ActivitiesSection } from './components/ActivitiesSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { DonationBanner } from './components/DonationBanner';
import { Footer } from './components/Footer';

/**
 * Frontend only reads PUBLIC CMS endpoints. Editing takes place in the
 * authenticated Rumahweb dashboard instead of the legacy localStorage editor.
 * Existing layouts and CSS classes are preserved.
 */
export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [profile, setProfile] = useState<FoundationProfile>(initialProfile);
  const [units, setUnits] = useState<UnitDakwah[]>(initialUnits);
  const [articles, setArticles] = useState<Article[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    let disposed = false;

    const refresh = async () => {
      const [nextProfile, nextUnits, nextArticles, nextActivities, nextTestimonials] =
        await Promise.allSettled([
          publicCms.profile(controller.signal),
          publicCms.units(controller.signal),
          publicCms.articles(controller.signal),
          publicCms.activities(controller.signal),
          publicCms.testimonials(controller.signal),
        ]);
      if (disposed) return;

      if (nextProfile.status === 'fulfilled' && nextProfile.value) {
        // Preserve required frontend fields if the CMS profile has not been filled completely.
        setProfile({
          ...initialProfile,
          ...nextProfile.value,
          contact: { ...initialProfile.contact, ...(nextProfile.value.contact || {}) },
          mission: Array.isArray(nextProfile.value.mission) ? nextProfile.value.mission : [],
          legalities: Array.isArray(nextProfile.value.legalities) ? nextProfile.value.legalities : [],
          management: Array.isArray(nextProfile.value.management) ? nextProfile.value.management : [],
        });
      }
      if (nextUnits.status === 'fulfilled') {
        // After a successful API response, CMS is the source of truth, including empty lists.
        setUnits(nextUnits.value);
      }
      if (nextArticles.status === 'fulfilled') setArticles(nextArticles.value);
      if (nextActivities.status === 'fulfilled') setActivities(nextActivities.value);
      if (nextTestimonials.status === 'fulfilled') setTestimonials(nextTestimonials.value);

      for (const outcome of [nextProfile, nextUnits, nextArticles, nextActivities, nextTestimonials]) {
        if (outcome.status === 'rejected' && !controller.signal.aborted) {
          console.warn('CMS sementara tidak dapat dibaca, menggunakan data cadangan:', outcome.reason);
        }
      }
    };

    void refresh();
    // An already-open page refreshes its public content periodically.
    const timer = window.setInterval(() => {
      if (document.visibilityState === 'visible') void refresh();
    }, 120000);
    return () => {
      disposed = true;
      controller.abort();
      window.clearInterval(timer);
    };
  }, []);

  const openCmsAdmin = () => {
    window.location.assign('https://api.hidayahindonesia.id/cms-admin.html');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} profile={profile} />

      <main className="flex-grow">
        {activeTab === 'home' && (
          <>
            <Hero setActiveTab={setActiveTab} profile={profile} />
            <ProfileSection profile={profile} />
            <UnitsSection units={units} setActiveTab={setActiveTab} />
            <DonationBanner />
            <ArticlesSection articles={articles} />
            <ActivitiesSection activities={activities} />
            <TestimonialsSection testimonials={testimonials} />
          </>
        )}
        {activeTab === 'profile' && <ProfileSection profile={profile} />}
        {activeTab === 'units' && <UnitsSection units={units} setActiveTab={setActiveTab} />}
        {activeTab === 'mqc' && (
          // Form pendaftaran lama belum terhubung ke backend; pengiriman lokal dinonaktifkan
          // oleh patch MQCPage yang WAJIB dipasang bersama file ini.
          <MQCPage onAddRegistration={() => {}} />
        )}
        {activeTab === 'articles-activities' && (
          <>
            <ArticlesSection articles={articles} />
            <ActivitiesSection activities={activities} />
          </>
        )}
        {activeTab === 'testimonials' && <TestimonialsSection testimonials={testimonials} />}
      </main>

      <Footer setActiveTab={setActiveTab} onOpenAdmin={openCmsAdmin} profile={profile} />
    </div>
  );
}
