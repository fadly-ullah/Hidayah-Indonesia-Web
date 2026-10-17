import React, { useState, useEffect } from 'react';
import { initialProfile, initialUnits, initialArticles, initialActivities, initialTestimonials } from './data/initialData';
import { FoundationProfile, UnitDakwah, Article, Activity, Testimonial, MQCRegistration } from './types';
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
import { AdminModal } from './components/AdminModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  // Persistent state with localStorage
  const [profile, setProfile] = useState<FoundationProfile>(() => {
    const saved = localStorage.getItem('hi_profile');
    return saved ? JSON.parse(saved) : initialProfile;
  });

  const [units, setUnits] = useState<UnitDakwah[]>(() => {
    const saved = localStorage.getItem('hi_units');
    return saved ? JSON.parse(saved) : initialUnits;
  });

  const [articles, setArticles] = useState<Article[]>(() => {
    const saved = localStorage.getItem('hi_articles');
    return saved ? JSON.parse(saved) : initialArticles;
  });

  const [activities, setActivities] = useState<Activity[]>(() => {
    const saved = localStorage.getItem('hi_activities');
    return saved ? JSON.parse(saved) : initialActivities;
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    const saved = localStorage.getItem('hi_testimonials');
    return saved ? JSON.parse(saved) : initialTestimonials;
  });

  const [registrations, setRegistrations] = useState<MQCRegistration[]>(() => {
    const saved = localStorage.getItem('hi_registrations');
    return saved ? JSON.parse(saved) : [
      {
        id: 'reg-1',
        fullName: 'Ahmad Fauzan',
        whatsapp: '081234567890',
        gender: 'Ikhwan',
        classType: 'Kelas Reguler',
        level: 'Level 2 (Tahsin)',
        mode: 'Offline (Jatiasih, Bekasi)',
        dayPreference: 'Senin & Rabu',
        timePreference: '16.00',
        infaqAmount: 100000,
        isFirstFive: true,
        createdAt: '15 Okt 2026',
        status: 'Dikonfirmasi'
      }
    ];
  });

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('hi_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('hi_units', JSON.stringify(units));
  }, [units]);

  useEffect(() => {
    localStorage.setItem('hi_articles', JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem('hi_activities', JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    localStorage.setItem('hi_testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem('hi_registrations', JSON.stringify(registrations));
  }, [registrations]);

  const handleAddRegistration = (regData: Omit<MQCRegistration, 'id' | 'createdAt' | 'status'>) => {
    const newReg: MQCRegistration = {
      ...regData,
      id: 'reg-' + Date.now(),
      createdAt: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: 'Pending'
    };
    setRegistrations([newReg, ...registrations]);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* Header / Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        profile={profile}
      />

      {/* Main Content Area */}
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

        {activeTab === 'profile' && (
          <ProfileSection profile={profile} />
        )}

        {activeTab === 'units' && (
          <UnitsSection units={units} setActiveTab={setActiveTab} />
        )}

        {activeTab === 'mqc' && (
          <MQCPage onAddRegistration={handleAddRegistration} />
        )}

        {activeTab === 'articles-activities' && (
          <>
            <ArticlesSection articles={articles} />
            <ActivitiesSection activities={activities} />
          </>
        )}

        {activeTab === 'testimonials' && (
          <TestimonialsSection testimonials={testimonials} />
        )}
      </main>

      {/* Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenAdmin={() => setIsAdminOpen(true)}
        profile={profile}
      />

      {/* Admin Panel Modal */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        profile={profile}
        setProfile={setProfile}
        units={units}
        setUnits={setUnits}
        articles={articles}
        setArticles={setArticles}
        activities={activities}
        setActivities={setActivities}
        testimonials={testimonials}
        setTestimonials={setTestimonials}
        registrations={registrations}
        setRegistrations={setRegistrations}
      />

    </div>
  );
}
