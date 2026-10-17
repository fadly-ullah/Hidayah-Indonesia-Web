import { FoundationProfile, UnitDakwah, Article, Activity, Testimonial } from '../types';

export const initialProfile: FoundationProfile = {
  name: "Yayasan Hidayah Indonesia",
  tagline: "Pusat Dakwah, Pendidikan Al-Quran, Sosial, dan Pemberdayaan Umat",
  description: "Yayasan Hidayah Indonesia adalah lembaga keagamaan dan sosial yang berkhidmat dalam pembinaan umat melalui Al-Quran, pendidikan Islam berkualitas, aksi sosial peduli sesama, dan kemandirian ekonomi berbasis syariah.",
  vision: "Menjadi lembaga unggul dalam mencetak generasi Qur'ani yang berakhlak mulia, mandiri, dan menebar rahmat bagi semesta alam.",
  mission: [
    "Menyelenggarakan pendidikan Al-Quran dan keislaman yang mudah diakses oleh seluruh kalangan melalui Madrasah Qur'an Center.",
    "Menggerakkan kepedulian sosial yang berkelanjutan melalui program 'Mari Berbagi'.",
    "Mengembangkan dakwah Islam rahmatan lil 'alamin melalui media digital dan majelis taklim.",
    "Membangun kemandirian ekonomi umat melalui unit usaha dan pemberdayaan berbasis syariah (HI Mart)."
  ],
  history: "Didirikan atas dasar keprihatinan dan kepedulian mendalam terhadap pembinaan umat serta pemahaman Al-Quran di masyarakat. Hidayah Indonesia terus berkembang menjadi mercusuar kebaikan di Bekasi dan Indonesia.",
  logoText: "Hidayah Indonesia",
  logoSubtext: "Yayasan Resmi & Berbadan Hukum",
  heroBadge: "Yayasan Resmi Berbadan Hukum • SK Kemenkumham RI",
  heroTitle: "Mencerahkan Umat Melalui Al-Quran & Kepedulian",
  heroDescription: "Selamat datang di Yayasan Hidayah Indonesia. Kami berkhidmat dalam 4 pilar utama: Pendidikan Al-Quran (Madrasah Qur'an Center), Sosial Kemanusiaan (Mari Berbagi), Dakwah Umat, dan Pemberdayaan Ekonomi Syariah.",
  heroCardTitle: "Madrasah Qur'an Center",
  heroCardSubtitle: "Bimbingan Belajar Al-Quran Ikhwan & Akhwat",
  heroImageUrl: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&q=80&w=900",
  heroBgImageUrl: "",
  logoImageUrl: "",
  legalities: [
    {
      title: "SK Menteri Hukum dan HAM RI",
      number: "AHU-0019283.AH.01.04.Tahun 2021",
      year: "2021"
    },
    {
      title: "Akta Notaris Pendirian",
      number: "No. 14 Tanggal 12 Oktober 2021",
      notary: "H. Ahmad Fauzi, S.H., M.Kn.",
      year: "2021"
    },
    {
      title: "NPWP Yayasan",
      number: "62.839.102.9-402.000",
      year: "2021"
    }
  ],
  management: [
    { role: "Ketua Dewan Pembina", name: "Dr. K.H. Abdullah Syafi'i, M.A." },
    { role: "Ketua Yayasan", name: "Ust. M. Ihsanuddin, Lc., M.Pd." },
    { role: "Sekretaris Yayasan", name: "Ahmad Zulfikar, S.Sos." },
    { role: "Bendahara Yayasan", name: "Siti Aminah, S.E." },
    { role: "Kepala Unit Madrasah Qur'an", name: "Ust. Farhan Al-Hafizh" },
    { role: "Direktur Unit Sosial & Mari Berbagi", name: "Rizki Maulan, S.I.Kom." }
  ],
  contact: {
    address: "Jl. Raya Jatimekar, No. 339, RT.003/RW.011, Jatimekar, Kec. Jatiasih, Kota Bks, Jawa Barat 17422",
    phone: "+62 812-3456-7890",
    email: "info@hidayahindonesia.or.id",
    whatsapp: "+62 812-3456-7890"
  }
};

export const initialUnits: UnitDakwah[] = [
  {
    id: 'mqc',
    title: 'Madrasah Qur\'an Center',
    subtitle: 'Pendidikan Al-Quran',
    description: 'Bimbingan Belajar Al-Quran interaktif untuk segala usia (Ikhwan & Akhwat) secara Online & Offline dengan metode Talaqqi bersanad.',
    iconName: 'BookOpen',
    badge: 'Unggulan',
    url: '#mqc',
    features: ['Kelas Reguler & Privat', 'Pengajar Bersanad', 'Level Pemula & Tahsin', 'Online & Offline'],
    colorTheme: 'from-blue-900 to-indigo-950'
  },
  {
    id: 'mhq',
    title: 'Markaz Hidayah Qur\'an',
    subtitle: 'Pusat Tahfizh',
    description: 'Program khusus karantina dan pembinaan hafalan Al-Quran intensif bagi santri yang ingin mengkhatamkan 30 juz.',
    iconName: 'Award',
    badge: 'Tahfizh',
    url: '#mqc',
    features: ['Karantina 30 Juz', 'Setoran & Murajaah Harian', 'Sanad Hafalan', 'Asrama Representatif'],
    colorTheme: 'from-indigo-900 to-blue-950'
  },
  {
    id: 'mariberbagi',
    title: 'Mari Berbagi',
    subtitle: 'Sosial & Kemanusiaan',
    description: 'Platform aksi sosial dan donasi terpercaya untuk membantu yatim piatu, dhuafa, beasiswa santri, serta tanggap bencana.',
    iconName: 'HeartHandshake',
    badge: 'Donasi',
    url: 'https://mariberbagi.net',
    features: ['Donasi Yatim & Dhuafa', 'Beasiswa Santri', 'Bantuan Kemanusiaan', '100% Amanah'],
    colorTheme: 'from-blue-800 to-slate-900'
  },
  {
    id: 'himedia',
    title: 'HI Media',
    subtitle: 'Dakwah Digital',
    description: 'Syiar Islam menyejukkan melalui siaran dakwah digital, podcast islami, kajian streaming, dan publikasi media sosial.',
    iconName: 'Mic',
    badge: 'Syiar',
    url: '#dakwah-section',
    features: ['Kajian Online Streaming', 'Podcast Inspiratif', 'Buletin Dakwah', 'Channel Resmi HI'],
    colorTheme: 'from-slate-900 to-blue-950'
  },
  {
    id: 'qolbun',
    title: 'Majlis Qolbun Muneeb',
    subtitle: 'Majelis Tasawwuf',
    description: 'Majelis zikir, pembinaan rohani, tazkiyatun nufus, dan pengajian kitab kuning bersama para alim ulama.',
    iconName: 'Sparkles',
    badge: 'Majelis',
    url: '#dakwah-section',
    features: ['Kajian Kitab Kuning', 'Zikir & Doa Bersama', 'Tazkiyatun Nufus', 'Bimbingan Ulama'],
    colorTheme: 'from-blue-950 to-indigo-900'
  },
  {
    id: 'himart',
    title: 'HI Mart',
    subtitle: 'Ekonomi Syariah',
    description: 'Pusat perbelanjaan dan minimarket syariah mandiri guna mendukung operasional dakwah dan pemberdayaan ekonomi umat.',
    iconName: 'Store',
    badge: 'Ekonomi',
    url: '#bisnis-section',
    features: ['Minimarket Syariah', 'Produk UMKM Binaan', 'Pemberdayaan Umat', 'Profit untuk Dakwah'],
    colorTheme: 'from-blue-900 to-slate-900'
  }
];

export const initialArticles: Article[] = [
  {
    id: 'art-1',
    title: 'Keutamaan Membaca dan Menghafal Al-Quran di Era Modern',
    category: 'Kajian',
    summary: 'Di tengah kesibukan dunia modern, meluangkan waktu berinteraksi dengan Al-Quran adalah ketenangan hakiki bagi jiwa yang gelisah.',
    content: 'Al-Quran adalah pedoman hidup yang tidak pernah lekang oleh zaman. Di era digital saat ini, kemudahan akses belajar Al-Quran melalui program online memberikan peluang emas bagi setiap Muslim untuk memperbaiki bacaan di sela kesibukan harian...',
    author: 'Ust. M. Ihsanuddin, Lc., M.Pd.',
    date: '14 Oktober 2026',
    imageUrl: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'art-2',
    title: 'Mengenal Metode Talaqqi: Tradisi Emas Sanad Al-Quran',
    category: 'Sanad',
    summary: 'Metode talaqqi (berhadap-hadapan langsung menyimak dan dikoreksi guru) adalah penjaga keotentikan bacaan Nabi Muhammad SAW.',
    content: 'Sanad Al-Quran merupakan mata rantai keilmuan yang bersambung hingga Rasulullah SAW. Di Madrasah Qur\'an Center Hidayah Indonesia, setiap pengajar memiliki kualifikasi sanad yang valid...',
    author: 'Ust. Farhan Al-Hafizh',
    date: '10 Oktober 2026',
    imageUrl: 'https://images.unsplash.com/photo-1584286595398-a19f2a34f75e?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'art-3',
    title: 'Gerakan Mari Berbagi: Menebar Senyum untuk Seribu Yatim',
    category: 'Berita',
    summary: 'Laporan penyaluran santunan yatim dan dhuafa bulan ini berkat uluran tangan para dermawan melalui platform Mari Berbagi.',
    content: 'Alhamdulillah, program bulanan Mari Berbagi kembali menyalurkan paket pendidikan dan santunan tunai kepada anak-anak yatim piatu di sekitar Jabodetabek...',
    author: 'Rizki Maulan, S.I.Kom.',
    date: '05 Oktober 2026',
    imageUrl: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb9?auto=format&fit=crop&q=80&w=800'
  }
];

export const initialActivities: Activity[] = [
  {
    id: 'act-1',
    title: 'Kajian Bulanan Majlis Qolbun Muneeb',
    category: 'Majelis & Tasawwuf',
    schedule: 'Ahad Pekan ke-2 | Pukul 09.00 - 11.30 WIB',
    location: 'Masjid & Aula Utama Hidayah Indonesia, Jatiasih, Bekasi',
    description: 'Kajian kitab kuning dan tazkiyatun nufus bersama para alim ulama dan kyai sepuh untuk melembutkan hati.',
    instructor: 'K.H. Ahmad Jauhari & Tim Asatidz',
    imageUrl: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=800',
    isOnline: false
  },
  {
    id: 'act-2',
    title: 'Daurah Tahsin & Sanad Al-Fatihah',
    category: 'Program Sanad',
    schedule: 'Setiap Sabtu | Pukul 16.00 - 17.30 WIB',
    location: 'Zoom Meeting & Offline Hidayah Indonesia',
    description: 'Pelatihan intensif memperbaiki makhraj huruf dan sifatul huruf terkhusus surat Al-Fatihah sebagai rukun salat.',
    instructor: 'Ust. Farhan Al-Hafizh, S.Pd.',
    imageUrl: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&q=80&w=800',
    isOnline: true
  },
  {
    id: 'act-3',
    title: 'Bakti Sosial & Jumat Berkah Mari Berbagi',
    category: 'Sosial',
    schedule: 'Setiap Hari Jumat | Pukul 13.00 WIB - Selesai',
    location: 'Wilayah Jatiasih & Sekitarnya',
    description: 'Pembagian 500 nasi box dan paket sembako gratis untuk kaum dhuafa, pemulung, dan pejuang jalanan.',
    instructor: 'Tim Relawan Mari Berbagi',
    imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800',
    isOnline: false
  }
];

export const initialTestimonials: Testimonial[] = [
  {
    id: 'test-1',
    name: 'K.H. Dr. M. Hamdan Rasyid, M.A.',
    role: 'Ulama/Kyai',
    institutionOrTitle: 'Dewan Pakar Syariah & Ulama Bekasi',
    comment: 'Hidayah Indonesia hadir dengan manhaj yang lurus, istiqamah dalam pembinaan umat, serta mengintegrasikan pendidikan Al-Quran dan sosial kemasyarakatan secara sangat baik.',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'test-2',
    name: 'Bapak H. Hendra & Ibu Rina',
    role: 'Wali Santri',
    institutionOrTitle: 'Orang Tua Peserta MQC Reguler',
    comment: 'Alhamdulillah anak kami yang tadinya membaca Al-Quran masih terbata-bata, kini setelah 3 bulan di Madrasah Qur\'an Center sudah jauh lebih fasih dan rajin murajaah.',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'test-3',
    name: 'Ir. H. Budi Santoso',
    role: 'Donatur',
    institutionOrTitle: 'Dermawan Mitra Mari Berbagi',
    comment: 'Menyalurkan zakat dan infaq melalui Mari Berbagi Hidayah Indonesia sangat transparan. Laporannya rutin dan kami bisa melihat langsung senyum anak-anak yatim.',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'test-4',
    name: 'Siti Sarah',
    role: 'Jemaah',
    institutionOrTitle: 'Peserta Majlis Qolbun Muneeb',
    comment: 'Majelisnya sangat menyejukkan hati. Pembahasan ilmu tasawwuf dan hati yang disampaikan para ustadz membuat kami semakin tenang dan dekat dengan Allah SWT.',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
  }
];
