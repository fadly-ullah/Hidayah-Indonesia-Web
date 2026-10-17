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
