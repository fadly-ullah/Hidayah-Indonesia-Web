import React, { useEffect, useState } from 'react';
import { initialProfile } from './data/initialData';
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

type ProfileStatus = 'loading' | 'available' | 'unavailable';

/**
 * Semua informasi publik berasal dari API CMS Rumahweb.
 * Jika API gagal saat pembukaan halaman, jangan menampilkan identitas/dokumen contoh.
 * Jika API gagal saat refresh berkala, pertahankan data CMS terakhir yang valid.
 */
export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [profile, setProfile] = useState<FoundationProfile | null>(null);
  const [profileStatus, setProfileStatus] = useState<ProfileStatus>('loading');
  const [hasCmsWarning, setHasCmsWarning] = useState(false);
  const [units, setUnits] = useState<UnitDakwah[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    let disposed = false;

    const refresh = async () => {
      const outcomes = await Promise.allSettled([
        publicCms.profile(controller.signal),
        publicCms.units(controller.signal),
        publicCms.articles(controller.signal),
        publicCms.activities(controller.signal),
        publicCms.testimonials(controller.signal),
      ] as const);

      if (disposed || controller.signal.aborted) return;
      const [nextProfile, nextUnits, nextArticles, nextActivities, nextTestimonials] = outcomes;

      if (nextProfile.status === 'fulfilled' && nextProfile.value) {
        const incoming = nextProfile.value;
        setProfile({
          ...initialProfile,
          ...incoming,
          contact: { ...initialProfile.contact, ...(incoming.contact || {}) },
          mission: Array.isArray(incoming.mission) ? incoming.mission : [],
          legalities: Array.isArray(incoming.legalities) ? incoming.legalities : [],
          management: Array.isArray(incoming.management) ? incoming.management : [],
        });
        setProfileStatus('available');
      } else {
        // Jangan hilangkan data yang pernah berhasil dibaca sebelumnya.
        setProfileStatus((previous) => previous === 'available' ? previous : 'unavailable');
      }

      if (nextUnits.status === 'fulfilled') setUnits(nextUnits.value);
      if (nextArticles.status === 'fulfilled') setArticles(nextArticles.value);
      if (nextActivities.status === 'fulfilled') setActivities(nextActivities.value);
      if (nextTestimonials.status === 'fulfilled') setTestimonials(nextTestimonials.value);

      const failed = outcomes.some((outcome) => outcome.status === 'rejected') ||
        (nextProfile.status === 'fulfilled' && !nextProfile.value);
      setHasCmsWarning(failed);

      for (const outcome of outcomes) {
        if (outcome.status === 'rejected') {
          console.warn('Data CMS sementara tidak tersedia:', outcome.reason);
        }
      }
    };

    void refresh();
    // Isi konten diperbarui otomatis setiap dua menit selama halaman terlihat.
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

  const displayProfile = profile || initialProfile;
  const profileUnavailable = (
    <section role="status" className="mx-auto max-w-4xl px-6 py-16 text-center text-slate-700">
      <h1 className="text-2xl font-bold text-[#0B192C]">Informasi Profil Hidayah Indonesia</h1>
      <p className="mt-3">
        {profileStatus === 'loading'
          ? 'Sedang mengambil data resmi yayasan dari CMS Rumahweb...'
          : 'Informasi profil sementara tidak tersedia. Silakan muat ulang halaman beberapa saat lagi.'}
      </p>
    </section>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} profile={displayProfile} />

      <main className="flex-grow">
        {(hasCmsWarning || profileStatus === 'unavailable') && (
          <div role="status" className="border-b border-amber-200 bg-amber-50 px-4 py-3 text-center text-sm text-amber-900">
            Sebagian data CMS sementara tidak dapat diperbarui. Data yang sebelumnya berhasil dimuat tetap ditampilkan.
          </div>
        )}
        {activeTab === 'home' && (
          <>
            {profile ? (
              <>
                <Hero setActiveTab={setActiveTab} profile={profile} />
                <ProfileSection profile={profile} />
              </>
            ) : profileUnavailable}
            <UnitsSection units={units} setActiveTab={setActiveTab} />
            <DonationBanner />
            <ArticlesSection articles={articles} />
            <ActivitiesSection activities={activities} />
            <TestimonialsSection testimonials={testimonials} />
          </>
        )}
        {activeTab === 'profile' && (profile ? <ProfileSection profile={profile} /> : profileUnavailable)}
        {activeTab === 'units' && <UnitsSection units={units} setActiveTab={setActiveTab} />}
        {activeTab === 'mqc' && <MQCPage onAddRegistration={() => {}} />}
        {activeTab === 'articles-activities' && (
          <>
            <ArticlesSection articles={articles} />
            <ActivitiesSection activities={activities} />
          </>
        )}
        {activeTab === 'testimonials' && <TestimonialsSection testimonials={testimonials} />}
      </main>

      <Footer setActiveTab={setActiveTab} onOpenAdmin={openCmsAdmin} profile={displayProfile} />
    </div>
  );
}
