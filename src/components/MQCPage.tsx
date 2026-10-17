import React, { useState } from 'react';
import { MQCRegistration } from '../types';
import { BookOpen, MapPin, Video, Users, Clock, Calendar, CheckCircle2, Award, Sparkles, Send, ShieldCheck, Heart } from 'lucide-react';

interface MQCPageProps {
  onAddRegistration: (reg: Omit<MQCRegistration, 'id' | 'createdAt' | 'status'>) => void;
}

export const MQCPage: React.FC<MQCPageProps> = ({ onAddRegistration }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    whatsapp: '',
    gender: 'Ikhwan' as 'Ikhwan' | 'Akhwat',
    classType: 'Kelas Reguler' as 'Kelas Reguler' | 'Kelas Privat',
    level: 'Level 1 (Pemula)' as 'Level 1 (Pemula)' | 'Level 2 (Tahsin)' | 'Level 3 (Tahfizh)',
    mode: 'Offline (Jatiasih, Bekasi)' as 'Online (Zoom/Meet/WA)' | 'Offline (Jatiasih, Bekasi)',
    dayPreference: 'Senin & Rabu',
    timePreference: '16.00',
    infaqAmount: 100000,
    isFirstFive: true
  });

  const [submitted, setSubmitted] = useState(false);
  const [lastTicket, setLastTicket] = useState<string | null>(null);

 
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  alert(
    'Pendaftaran online MQC sedang dalam pembaruan. ' +
    'Silakan hubungi admin MQC melalui kontak resmi Hidayah Indonesia.'
  );
};

    onAddRegistration(formData);
const ticketId = 'MQC-' + Math.floor(100000 + Math.random() * 900000);
setLastTicket(ticketId);
setSubmitted(true);
};

  return (
    <div className="py-12 bg-slate-50 text-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-[#0B192C] via-[#1E3E62] to-[#0B192C] text-white rounded-3xl p-8 sm:p-12 mb-12 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-900/80 border border-blue-700/60 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Program Unggulan Hidayah Indonesia</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
              Madrasah Qur'an Center (MQC)
            </h1>
            
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-6">
              Bimbingan Belajar Al-Quran profesional untuk Ikhwan & Akhwat. Tersedia secara Online dan Offline dengan metode Talaqqi bersama pengajar bersanad.
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

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Details & Curriculums */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* Lokasi Belajar */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-200">
              <h2 className="text-xl font-bold text-[#0B192C] mb-4 flex items-center">
                <MapPin className="w-6 h-6 text-blue-600 mr-2" />
                Lokasi & Metode Belajar
              </h2>
              
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <h3 className="font-bold text-slate-900 flex items-center mb-1">
                    <MapPin className="w-4 h-4 text-red-500 mr-2" />
                    Offline (Tatap Muka)
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Hidayah Indonesia, Jl. Raya Jatimekar, Rt.001/Rw.011 No.339, RT.003/RW.011, Jatimekar, Kec. Jatiasih, Kota Bks, Jawa Barat 17422
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <h3 className="font-bold text-slate-900 flex items-center mb-1">
                    <Video className="w-4 h-4 text-blue-500 mr-2" />
                    Online Interaktif
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Zoom Meeting / Google Meet / WhatsApp Grup Bimbingan Khusus (Sangat fleksibel dari rumah).
                  </p>
                </div>
              </div>
            </div>

            {/* Pilihan Kelas Belajar */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-200">
              <h2 className="text-xl font-bold text-[#0B192C] mb-6 flex items-center">
                <BookOpen className="w-6 h-6 text-blue-600 mr-2" />
                Pilihan Kelas Belajar
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Kelas Reguler */}
                <div className="bg-slate-50 p-6 rounded-2xl border-2 border-blue-600/30 flex flex-col justify-between">
                  <div>
                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">Pilihan A</span>
                    <h3 className="text-lg font-bold text-[#0B192C] mt-2 mb-2">Kelas Reguler</h3>
                    <p className="text-xs text-slate-600 mb-4">Belajar bersama dalam kelompok kecil dengan pendampingan intensif.</p>
                    
                    <ul className="space-y-2 text-xs text-slate-700">
                      <li className="flex items-center">✓ Metode Talaqqi + Iqro</li>
                      <li className="flex items-center">✓ Jadwal sudah ditentukan</li>
                      <li className="flex items-center font-bold text-emerald-600">✓ Gratis Biaya Pendaftaran Rp. 50.000</li>
                    </ul>
                  </div>
                </div>

                {/* Kelas Privat */}
                <div className="bg-slate-50 p-6 rounded-2xl border-2 border-indigo-600/30 flex flex-col justify-between">
                  <div>
                    <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold">Pilihan B</span>
                    <h3 className="text-lg font-bold text-[#0B192C] mt-2 mb-2">Kelas Privat</h3>
                    <p className="text-xs text-slate-600 mb-4">One-on-one learning dengan perhatian penuh dari pengajar.</p>
                    
                    <ul className="space-y-2 text-xs text-slate-700">
                      <li className="flex items-center">✓ Pendampingan Personal & Fokus</li>
                      <li className="flex items-center">✓ Waktu sepenuhnya diatur Anda</li>
                      <li className="flex items-center font-bold text-emerald-600">✓ Gratis Biaya Pendaftaran Rp. 50.000</li>
                    </ul>
                  </div>
                </div>

              </div>
            </div>

            {/* Pilihan Level Belajar */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-200">
              <h2 className="text-xl font-bold text-[#0B192C] mb-6">Pilihan Level Belajar</h2>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100">
                  <h3 className="font-bold text-blue-900 mb-1">1. Level Pemula</h3>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Untuk yang baru mulai atau ingin mengulang dari dasar. Belajar huruf hijaiyah, harakat, dan bertahap menggunakan Iqro.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100">
                  <h3 className="font-bold text-blue-900 mb-1">2. Level Tahsin</h3>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Memperbaiki bacaan sesuai kaidah tajwid, makhraj, sifat huruf, nun sukun, mim sukun, mad, waqaf-ibtida' dengan talaqqi.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100">
                  <h3 className="font-bold text-blue-900 mb-1">3. Level Tahfizh</h3>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Untuk yang ingin menghafal Al-Quran dengan bacaan benar. Setoran hafalan baru dan murajaah langsung disimak pengajar.
                  </p>
                </div>
              </div>
            </div>

            {/* Keunggulan */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-200">
              <h2 className="text-xl font-bold text-[#0B192C] mb-6">Keunggulan Madrasah Qur'an Center</h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="p-3.5 bg-slate-50 rounded-xl text-center">
                  <p className="font-bold text-sm text-[#0B192C]">Pengajar Bersanad</p>
                  <p className="text-xs text-slate-500 mt-0.5">Standar bacaan valid</p>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl text-center">
                  <p className="font-bold text-sm text-[#0B192C]">2x Sepekan</p>
                  <p className="text-xs text-slate-500 mt-0.5">Pertemuan intensif</p>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl text-center">
                  <p className="font-bold text-sm text-[#0B192C]">Durasi 60 Menit</p>
                  <p className="text-xs text-slate-500 mt-0.5">Fokus & efektif</p>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl text-center">
                  <p className="font-bold text-sm text-[#0B192C]">5-8 Peserta</p>
                  <p className="text-xs text-slate-500 mt-0.5">Keluarga kecil (Reguler)</p>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl text-center">
                  <p className="font-bold text-sm text-[#0B192C]">Waktu Fleksibel</p>
                  <p className="text-xs text-slate-500 mt-0.5">Pilihan pagi / malam</p>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl text-center">
                  <p className="font-bold text-sm text-[#0B192C]">Usia 13 Tahun+</p>
                  <p className="text-xs text-slate-500 mt-0.5">Remaja & Dewasa</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: PSB Registration Form */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 bg-[#0B192C] text-white p-6 sm:p-8 rounded-3xl shadow-2xl border border-blue-800">
              
              <div className="absolute -top-4 -right-4 bg-amber-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Promo 5 Pendaftar Pertama</span>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-extrabold mb-1">Form Pendaftaran Santri Baru (PSB)</h3>
                <p className="text-xs text-blue-300">Madrasah Qur'an Center Hidayah Indonesia</p>
              </div>

              <div className="bg-amber-500/20 border border-amber-500/40 p-3.5 rounded-2xl mb-6 text-xs text-amber-200">
                ⭐ <strong>Spesial Pendaftar Pertama:</strong> Free Buku Tajwid Ringkas + Free Biaya Pendaftaran (Rp 0 dari normal Rp 50.000). Cukup bayar infaq bulanan pilihan Anda!
              </div>

              {submitted ? (
                <div className="bg-emerald-950/80 border border-emerald-500/50 p-6 rounded-2xl text-center space-y-4 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto text-2xl font-bold shadow-lg">
                    ✓
                  </div>
                  <h4 className="text-xl font-bold text-white">Pendaftaran Berhasil!</h4>
                  <p className="text-xs text-emerald-200">
                    Alhamdulillah, data pendaftaran Anda telah tercatat di sistem kami. Tim admin MQC akan segera menghubungi via WhatsApp.
                  </p>
                  
                  <div className="bg-slate-900 p-4 rounded-xl font-mono text-sm text-amber-300 border border-emerald-500/30">
                    Nomor Pendaftaran: <strong>{lastTicket}</strong>
                  </div>

                  <button
                    onClick={() => setSubmitted(false)}
                    className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold"
                  >
                    Daftar Peserta Lain
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                  <div>
                    <label className="block text-xs font-semibold text-blue-200 mb-1">Nama Lengkap *</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Ahmad Fauzan"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-blue-900 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-blue-200 mb-1">Nomor WhatsApp (Aktif) *</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: 081234567890"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-blue-900 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-blue-200 mb-1">Gender</label>
                      <select
                        value={formData.gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                        className="w-full px-3 py-3 rounded-xl bg-slate-900 border border-blue-900 text-white focus:outline-none focus:border-blue-500 text-xs"
                      >
                        <option value="Ikhwan">Ikhwan (Pria)</option>
                        <option value="Akhwat">Akhwat (Wanita)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-blue-200 mb-1">Jenis Kelas</label>
                      <select
                        value={formData.classType}
                        onChange={(e) => setFormData({ ...formData, classType: e.target.value as any })}
                        className="w-full px-3 py-3 rounded-xl bg-slate-900 border border-blue-900 text-white focus:outline-none focus:border-blue-500 text-xs"
                      >
                        <option value="Kelas Reguler">Kelas Reguler</option>
                        <option value="Kelas Privat">Kelas Privat</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-blue-200 mb-1">Level Belajar</label>
                      <select
                        value={formData.level}
                        onChange={(e) => setFormData({ ...formData, level: e.target.value as any })}
                        className="w-full px-3 py-3 rounded-xl bg-slate-900 border border-blue-900 text-white focus:outline-none focus:border-blue-500 text-xs"
                      >
                        <option value="Level 1 (Pemula)">Level 1 (Pemula)</option>
                        <option value="Level 2 (Tahsin)">Level 2 (Tahsin)</option>
                        <option value="Level 3 (Tahfizh)">Level 3 (Tahfizh)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-blue-200 mb-1">Metode Belajar</label>
                      <select
                        value={formData.mode}
                        onChange={(e) => setFormData({ ...formData, mode: e.target.value as any })}
                        className="w-full px-3 py-3 rounded-xl bg-slate-900 border border-blue-900 text-white focus:outline-none focus:border-blue-500 text-xs"
                      >
                        <option value="Offline (Jatiasih, Bekasi)">Offline (Jatiasih)</option>
                        <option value="Online (Zoom/Meet/WA)">Online (Zoom/Meet)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-blue-200 mb-1">Pilihan Hari</label>
                      <select
                        value={formData.dayPreference}
                        onChange={(e) => setFormData({ ...formData, dayPreference: e.target.value })}
                        className="w-full px-3 py-3 rounded-xl bg-slate-900 border border-blue-900 text-white focus:outline-none focus:border-blue-500 text-xs"
                      >
                        <option value="Senin & Rabu">Senin & Rabu</option>
                        <option value="Selasa & Kamis">Selasa & Kamis</option>
                        <option value="Senin & Kamis">Senin & Kamis</option>
                        <option value="Selasa & Rabu">Selasa & Rabu</option>
                        <option value="Sabtu & Ahad">Sabtu & Ahad</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-blue-200 mb-1">Jam Belajar</label>
                      <select
                        value={formData.timePreference}
                        onChange={(e) => setFormData({ ...formData, timePreference: e.target.value })}
                        className="w-full px-3 py-3 rounded-xl bg-slate-900 border border-blue-900 text-white focus:outline-none focus:border-blue-500 text-xs"
                      >
                        <option value="05.00">05.00 WIB (Pagi)</option>
                        <option value="09.00">09.00 WIB (Siang)</option>
                        <option value="16.00">16.00 WIB (Sore)</option>
                        <option value="20.00">20.00 WIB (Malam)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-blue-200 mb-1">Pilihan Infaq Bulanan</label>
                    <select
                      value={formData.infaqAmount}
                      onChange={(e) => setFormData({ ...formData, infaqAmount: Number(e.target.value) })}
                      className="w-full px-3 py-3 rounded-xl bg-slate-900 border border-blue-900 text-white focus:outline-none focus:border-blue-500 text-xs"
                    >
                      <option value={100000}>Rp. 100.000 / Bulan</option>
                      <option value={150000}>Rp. 150.000 / Bulan (Dukungan Operasional)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-base shadow-lg transition-all flex items-center justify-center space-x-2 mt-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Kirim Pendaftaran Sekarang</span>
                  </button>

                  <p className="text-[11px] text-slate-400 text-center mt-2">
                    Dengan mendaftar, Anda menyetujui ketentuan belajar dan infaq bulanan MQC Hidayah Indonesia.
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
