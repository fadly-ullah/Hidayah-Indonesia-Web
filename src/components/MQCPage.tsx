import React, { useEffect, useState } from 'react';
import type { MQCRegistration } from '../types';
import type { MQCRegistrationInput, MQCTariffCode } from '../services/mqcRegistration';
import {
  getMQCRegistrationStatus,
  submitMQCRegistration,
} from '../services/mqcRegistration';
import {
  BookOpen, MapPin, Video, Users, CheckCircle2, Award, Sparkles, Send,
} from 'lucide-react';

// Tetap kompatibel dengan App.tsx yang saat ini mengirim onAddRegistration.
// Data pendaftaran yang sah hanya disimpan melalui API PHP Rumahweb.
interface MQCPageProps {
  onAddRegistration?: (
    reg: Omit<MQCRegistration, 'id' | 'createdAt' | 'status'>
  ) => void;
}

type RegistrationFields = Pick<MQCRegistrationInput,
  'fullName' | 'whatsapp' | 'gender' | 'classType' | 'level' |
  'mode' | 'dayPreference' | 'timePreference'> & {
    mqcBranch: 'bekasi' | 'depok';
    billingPlan: 'monthly' | 'per_session';
    regularAmount: 100000 | 150000;
  };

type TariffSelection = {
  code: MQCTariffCode;
  amount: number;
  unit: 'bulan' | 'pertemuan';
};

const getTariffSelection = (values: RegistrationFields): TariffSelection => {
  if (values.classType === 'Kelas Reguler') {
    return {
      code: values.regularAmount === 150000 ? 'regular_150_month' : 'regular_100_month',
      amount: values.regularAmount,
      unit: 'bulan',
    };
  }
  const offline = values.mode === 'Offline';
  const monthly = values.billingPlan === 'monthly';
  return {
    code: offline
      ? (monthly ? 'private_offline_month' : 'private_offline_session')
      : (monthly ? 'private_online_month' : 'private_online_session'),
    amount: offline ? (monthly ? 600000 : 85000) : (monthly ? 550000 : 75000),
    unit: monthly ? 'bulan' : 'pertemuan',
  };
};

const formatRupiah = (amount: number) => `Rp${amount.toLocaleString('id-ID')}`;

const INITIAL_FORM: RegistrationFields = {
  fullName: '',
  whatsapp: '',
  gender: 'Ikhwan',
  classType: 'Kelas Reguler',
  level: 'Level 1 (Pemula)',
  mode: 'Offline',
  mqcBranch: 'bekasi',
  billingPlan: 'monthly',
  regularAmount: 100000,
  dayPreference: 'Senin & Rabu',
  timePreference: '16.00',
};

const inputClass =
  'w-full px-4 py-3 rounded-xl bg-slate-900 border border-blue-900 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500';
const selectClass =
  'w-full px-3 py-3 rounded-xl bg-slate-900 border border-blue-900 text-white focus:outline-none focus:border-blue-500 text-xs';
const labelClass = 'block text-xs font-semibold text-blue-200 mb-1';

export const MQCPage: React.FC<MQCPageProps> = () => {
  const [formData, setFormData] = useState<RegistrationFields>({ ...INITIAL_FORM });
  const [registrationOpen, setRegistrationOpen] = useState<boolean | null>(null);
  const [statusError, setStatusError] = useState('');
  const [formError, setFormError] = useState('');
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [lastTicket, setLastTicket] = useState<string | null>(null);
  const selectedTariff = getTariffSelection(formData);

  useEffect(() => {
    const controller = new AbortController();
    getMQCRegistrationStatus(controller.signal)
      .then((isOpen) => {
        if (!controller.signal.aborted) {
          setRegistrationOpen(isOpen);
          setStatusError('');
        }
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setRegistrationOpen(false);
          setStatusError('Tidak dapat memeriksa layanan pendaftaran. Coba lagi nanti.');
        }
      });
    return () => controller.abort();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError('');
    if (isSubmitting) return;
    if (registrationOpen !== true) {
      setFormError('Pendaftaran MQC belum dibuka.');
      return;
    }
    if (!consent) {
      setFormError('Mohon setujui penggunaan data untuk administrasi pendaftaran.');
      return;
    }
    setIsSubmitting(true);
    try {
      const tariff = getTariffSelection(formData);
      const receipt = await submitMQCRegistration({
        formVersion: 2,
        fullName: formData.fullName.trim(),
        whatsapp: formData.whatsapp.trim(),
        gender: formData.gender,
        classType: formData.classType,
        level: formData.level,
        mode: formData.mode,
        mqcBranch: formData.mode === 'Offline' ? formData.mqcBranch : null,
        billingPlan: formData.classType === 'Kelas Reguler' ? 'monthly' : formData.billingPlan,
        tariffCode: tariff.code,
        infaqAmount: tariff.amount,
        dayPreference: formData.dayPreference,
        timePreference: formData.timePreference,
        consent: true,
        website: '',
      });
      // Nomor pendaftaran berasal dari database/API Rumahweb, bukan Math.random().
      setLastTicket(receipt.registrationCode);
      setSubmitted(true);
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : 'Pendaftaran belum berhasil. Silakan coba lagi.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const startAnotherRegistration = () => {
    setFormData({ ...INITIAL_FORM });
    setConsent(false);
    setFormError('');
    setLastTicket(null);
    setSubmitted(false);
  };

  return (
    <div className="py-12 bg-slate-50 text-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Banner. Gaya lama dipertahankan. */}
        <div className="bg-gradient-to-r from-[#0B192C] via-[#1E3E62] to-[#0B192C] text-white rounded-3xl p-8 sm:p-12 mb-12 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-900/80 border border-blue-700/60 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Program Unggulan Hidayah Indonesia</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
              Madrasah Qur'an Center (MQC)
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-6">
              Bimbingan Belajar Al-Quran profesional untuk Ikhwan &amp; Akhwat. Tersedia secara Online dan Offline dengan metode Talaqqi bersama pengajar bersanad.
            </p>
            <div className="flex flex-wrap gap-4 text-sm font-semibold text-blue-200">
              <span className="flex items-center bg-blue-900/60 px-3.5 py-1.5 rounded-xl border border-blue-700/50">
                <Users className="w-4 h-4 mr-2 text-amber-400" /> Usia Mulai 13 Tahun+
              </span>
              <span className="flex items-center bg-blue-900/60 px-3.5 py-1.5 rounded-xl border border-blue-700/50">
                <Award className="w-4 h-4 mr-2 text-amber-400" /> Pengajar Bersanad
              </span>
              <span className="flex items-center bg-blue-900/60 px-3.5 py-1.5 rounded-xl border border-blue-700/50">
                <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-400" /> Gratis Pendaftaran Rp. 50.000
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Kolom informasi kiri */}
          <div className="lg:col-span-7 space-y-10">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-200">
              <h2 className="text-xl font-bold text-[#0B192C] mb-4 flex items-center">
                <MapPin className="w-6 h-6 text-blue-600 mr-2" /> Lokasi &amp; Metode Belajar
              </h2>
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <h3 className="font-bold text-slate-900 flex items-center mb-1">
                    <MapPin className="w-4 h-4 text-red-500 mr-2" /> Offline (Tatap Muka)
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    MQC Bekasi: Hidayah Indonesia, Jl. Raya Jatimekar, Rt.001/Rw.011 No.339, RT.003/RW.011, Jatimekar, Kec. Jatiasih, Kota Bks, Jawa Barat 17422
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <h3 className="font-bold text-slate-900 flex items-center mb-1">
                    <MapPin className="w-4 h-4 text-red-500 mr-2" /> MQC Depok (Offline)
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Tersedia pilihan kelas tatap muka di MQC Depok. Alamat detail dan jadwal akan dikonfirmasi admin.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <h3 className="font-bold text-slate-900 flex items-center mb-1">
                    <Video className="w-4 h-4 text-blue-500 mr-2" /> Online Interaktif
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Zoom Meeting / Google Meet / WhatsApp Grup Bimbingan Khusus (Sangat fleksibel dari rumah).
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-200">
              <h2 className="text-xl font-bold text-[#0B192C] mb-6 flex items-center">
                <BookOpen className="w-6 h-6 text-blue-600 mr-2" /> Pilihan Kelas Belajar
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-50 p-6 rounded-2xl border-2 border-blue-600/30 flex flex-col justify-between">
                  <div>
                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">Pilihan A</span>
                    <h3 className="text-lg font-bold text-[#0B192C] mt-2 mb-2">Kelas Reguler</h3>
                    <p className="text-xs text-slate-600 mb-4">Belajar bersama dalam kelompok kecil dengan pendampingan intensif.</p>
                    <ul className="space-y-2 text-xs text-slate-700">
                      <li>✓ Metode Talaqqi + Iqro</li>
                      <li>✓ Jadwal sudah ditentukan</li>
                      <li className="font-bold text-emerald-600">✓ Gratis Biaya Pendaftaran Rp. 50.000</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl border-2 border-indigo-600/30 flex flex-col justify-between">
                  <div>
                    <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold">Pilihan B</span>
                    <h3 className="text-lg font-bold text-[#0B192C] mt-2 mb-2">Kelas Privat</h3>
                    <p className="text-xs text-slate-600 mb-4">One-on-one learning dengan perhatian penuh dari pengajar.</p>
                    <ul className="space-y-2 text-xs text-slate-700">
                      <li>✓ Pendampingan Personal &amp; Fokus</li>
                      <li>✓ Waktu sepenuhnya diatur Anda</li>
                      <li className="font-bold text-emerald-600">✓ Gratis Biaya Pendaftaran Rp. 50.000</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-200">
              <h2 className="text-xl font-bold text-[#0B192C] mb-6">Pilihan Level Belajar</h2>
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100">
                  <h3 className="font-bold text-blue-900 mb-1">1. Level Pemula</h3>
                  <p className="text-xs sm:text-sm text-slate-600">Untuk yang baru mulai atau ingin mengulang dari dasar. Belajar huruf hijaiyah, harakat, dan bertahap menggunakan Iqro.</p>
                </div>
                <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100">
                  <h3 className="font-bold text-blue-900 mb-1">2. Level Tahsin</h3>
                  <p className="text-xs sm:text-sm text-slate-600">Memperbaiki bacaan sesuai kaidah tajwid, makhraj, sifat huruf, nun sukun, mim sukun, mad, waqaf-ibtida' dengan talaqqi.</p>
                </div>
                <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100">
                  <h3 className="font-bold text-blue-900 mb-1">3. Level Tahfizh</h3>
                  <p className="text-xs sm:text-sm text-slate-600">Untuk yang ingin menghafal Al-Quran dengan bacaan benar. Setoran hafalan baru dan murajaah langsung disimak pengajar.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-200">
              <h2 className="text-xl font-bold text-[#0B192C] mb-6">Keunggulan Madrasah Qur'an Center</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  ['Pengajar Bersanad', 'Standar bacaan valid'],
                  ['2x Sepekan', 'Pertemuan intensif'],
                  ['Durasi 60 Menit', 'Fokus & efektif'],
                  ['5-8 Peserta', 'Keluarga kecil (Reguler)'],
                  ['Waktu Fleksibel', 'Pilihan pagi / malam'],
                  ['Usia 13 Tahun+', 'Remaja & Dewasa'],
                ].map(([title, description]) => (
                  <div key={title} className="p-3.5 bg-slate-50 rounded-xl text-center">
                    <p className="font-bold text-sm text-[#0B192C]">{title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Kolom formulir kanan */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 bg-[#0B192C] text-white p-6 sm:p-8 rounded-3xl shadow-2xl border border-blue-800 relative">
              <div className="absolute -top-4 -right-4 bg-amber-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Promo 5 Pendaftar Pertama</span>
              </div>
              <div className="mb-6">
                <h3 className="text-2xl font-extrabold mb-1">Form Pendaftaran Santri Baru (PSB)</h3>
                <p className="text-xs text-blue-300">Madrasah Qur'an Center Hidayah Indonesia</p>
              </div>
              <div className="bg-amber-500/20 border border-amber-500/40 p-3.5 rounded-2xl mb-6 text-xs text-amber-200">
                ⭐ <strong>Spesial Pendaftar Pertama:</strong> Free Buku Tajwid Ringkas + Free Biaya Pendaftaran (Rp 0 dari normal Rp 50.000). Cukup bayar infak sesuai paket pilihan Anda! <span className="block mt-1">Ketersediaan promo dikonfirmasi admin.</span>
              </div>

              {submitted ? (
                <div className="bg-emerald-950/80 border border-emerald-500/50 p-6 rounded-2xl text-center space-y-4 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto text-2xl font-bold shadow-lg">✓</div>
                  <h4 className="text-xl font-bold text-white">Pendaftaran Berhasil!</h4>
                  <p className="text-xs text-emerald-200">Alhamdulillah, data pendaftaran Anda telah tercatat di sistem kami. Tim admin MQC akan menghubungi melalui WhatsApp.</p>
                  <div className="bg-slate-900 p-4 rounded-xl font-mono text-sm text-amber-300 border border-emerald-500/30 break-all">
                    Nomor Pendaftaran: <strong>{lastTicket}</strong>
                  </div>
                  <button type="button" onClick={startAnotherRegistration} className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold">Daftar Peserta Lain</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                  <div>
                    <label htmlFor="mqc-fullName" className={labelClass}>Nama Lengkap *</label>
                    <input id="mqc-fullName" type="text" required minLength={3} maxLength={150}
                      autoComplete="name" placeholder="Contoh: Ahmad Fauzan" value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="mqc-whatsapp" className={labelClass}>Nomor WhatsApp (Aktif) *</label>
                    <input id="mqc-whatsapp" type="tel" required autoComplete="tel" inputMode="tel"
                      placeholder="Contoh: 081234567890" value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })} className={inputClass} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="mqc-gender" className={labelClass}>Gender</label>
                      <select id="mqc-gender" value={formData.gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value as RegistrationFields['gender'] })} className={selectClass}>
                        <option value="Ikhwan">Ikhwan (Pria)</option><option value="Akhwat">Akhwat (Wanita)</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="mqc-classType" className={labelClass}>Jenis Kelas</label>
                      <select id="mqc-classType" value={formData.classType}
                        onChange={(e) => {
                          const classType = e.target.value as RegistrationFields['classType'];
                          setFormData((previous) => ({
                            ...previous,
                            classType,
                            billingPlan: classType === 'Kelas Reguler' ? 'monthly' : 'per_session',
                          }));
                        }} className={selectClass}>
                        <option value="Kelas Reguler">Kelas Reguler</option><option value="Kelas Privat">Kelas Privat</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="mqc-level" className={labelClass}>Level Belajar</label>
                      <select id="mqc-level" value={formData.level}
                        onChange={(e) => setFormData({ ...formData, level: e.target.value as RegistrationFields['level'] })} className={selectClass}>
                        <option value="Level 1 (Pemula)">Level 1 (Pemula)</option>
                        <option value="Level 2 (Tahsin)">Level 2 (Tahsin)</option>
                        <option value="Level 3 (Tahfizh)">Level 3 (Tahfizh)</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="mqc-mode" className={labelClass}>Metode Belajar</label>
                      <select id="mqc-mode" value={formData.mode}
                        onChange={(e) => setFormData({ ...formData, mode: e.target.value as RegistrationFields['mode'] })} className={selectClass}>
                        <option value="Offline">Offline (Tatap Muka)</option>
                        <option value="Online">Online (Zoom/Meet)</option>
                      </select>
                    </div>
                  </div>
                  {formData.mode === 'Offline' && (
                    <div>
                      <label htmlFor="mqc-branch" className={labelClass}>Lokasi MQC *</label>
                      <select id="mqc-branch" required value={formData.mqcBranch}
                        onChange={(e) => setFormData({ ...formData, mqcBranch: e.target.value as RegistrationFields['mqcBranch'] })}
                        className={selectClass}>
                        <option value="bekasi">MQC Bekasi</option>
                        <option value="depok">MQC Depok</option>
                      </select>
                    </div>
                  )}
                  {formData.classType === 'Kelas Privat' && (
                    <div>
                      <label htmlFor="mqc-billing" className={labelClass}>Paket Privat *</label>
                      <select id="mqc-billing" value={formData.billingPlan}
                        onChange={(e) => setFormData({ ...formData, billingPlan: e.target.value as RegistrationFields['billingPlan'] })}
                        className={selectClass}>
                        <option value="per_session">Per Pertemuan</option>
                        <option value="monthly">Paket Spesial Bulanan</option>
                      </select>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="mqc-day" className={labelClass}>Pilihan Hari</label>
                      <select id="mqc-day" value={formData.dayPreference}
                        onChange={(e) => setFormData({ ...formData, dayPreference: e.target.value })} className={selectClass}>
                        <option value="Senin & Rabu">Senin &amp; Rabu</option>
                        <option value="Selasa & Kamis">Selasa &amp; Kamis</option>
                        <option value="Senin & Kamis">Senin &amp; Kamis</option>
                        <option value="Selasa & Rabu">Selasa &amp; Rabu</option>
                        <option value="Sabtu & Ahad">Sabtu &amp; Ahad</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="mqc-time" className={labelClass}>Jam Belajar</label>
                      <select id="mqc-time" value={formData.timePreference}
                        onChange={(e) => setFormData({ ...formData, timePreference: e.target.value })} className={selectClass}>
                        <option value="05.00">05.00 WIB (Pagi)</option>
                        <option value="09.00">09.00 WIB (Siang)</option>
                        <option value="16.00">16.00 WIB (Sore)</option>
                        <option value="20.00">20.00 WIB (Malam)</option>
                      </select>
                    </div>
                  </div>
                  {formData.classType === 'Kelas Reguler' && (
                    <div>
                      <label htmlFor="mqc-infaq" className={labelClass}>Pilihan Infak Bulanan</label>
                      <select id="mqc-infaq" value={formData.regularAmount}
                        onChange={(e) => setFormData({ ...formData, regularAmount: Number(e.target.value) as 100000 | 150000 })}
                        className={selectClass}>
                        <option value={100000}>Rp100.000 / Bulan</option>
                        <option value={150000}>Rp150.000 / Bulan (Dukungan Operasional)</option>
                      </select>
                    </div>
                  )}
                  <div role="status" aria-live="polite" className="rounded-xl border border-blue-700/60 bg-blue-950/70 p-4 space-y-1">
                    <p className="text-xs text-blue-200">Ringkasan biaya {formData.classType === 'Kelas Privat' ? 'Privat' : 'Reguler'}</p>
                    <p className="text-2xl font-extrabold text-white">{formatRupiah(selectedTariff.amount)} <span className="text-sm font-medium text-blue-200">/ {selectedTariff.unit}</span></p>
                    <p className="text-xs text-slate-300">
                      {formData.mode === 'Offline'
                        ? `Offline • MQC ${formData.mqcBranch === 'bekasi' ? 'Bekasi' : 'Depok'}`
                        : 'Online'}
                      {' • '}{formData.classType === 'Kelas Privat'
                        ? (formData.billingPlan === 'monthly' ? 'Paket spesial bulanan' : 'Per pertemuan')
                        : 'Reguler bulanan'}
                    </p>
                    <p className="text-[11px] text-slate-400">Nominal akan diverifikasi kembali oleh server saat pendaftaran.</p>
                  </div>

                  <div aria-live="polite" className="text-xs">
                    {registrationOpen === null && <p className="text-blue-200">Memeriksa layanan pendaftaran...</p>}
                    {registrationOpen === false && !statusError && <p className="text-amber-300">Pendaftaran online MQC belum dibuka.</p>}
                    {statusError && <p role="alert" className="text-amber-300">{statusError}</p>}
                    {formError && <p role="alert" className="text-red-300 mt-2">{formError}</p>}
                  </div>
                  <label className="flex items-start gap-3 text-xs text-slate-300">
                    <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)}
                      className="mt-1 accent-amber-500" />
                    <span>Saya menyetujui pemrosesan nama, nomor WhatsApp, dan pilihan kelas untuk keperluan pendaftaran MQC serta komunikasi administrasi melalui WhatsApp.</span>
                  </label>
                  <button type="submit" disabled={registrationOpen !== true || isSubmitting || !consent}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-base shadow-lg transition-all flex items-center justify-center space-x-2 mt-2">
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Mengirim Pendaftaran...' : 'Kirim Pendaftaran Sekarang'}</span>
                  </button>
                  <p className="text-[11px] text-slate-400 text-center mt-2">
                    Jadwal dan pilihan kelas akan dikonfirmasi oleh admin MQC. Tarif mengikuti pilihan paket yang ditampilkan.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
