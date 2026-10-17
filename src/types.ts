export interface FoundationProfile {
  name: string;
  tagline: string;
  description: string;
  vision: string;
  mission: string[];
  history: string;
  logoText: string;
  logoSubtext: string;
  heroBadge: string;
  heroTitle: string;
  heroDescription: string;
  heroCardTitle: string;
  heroCardSubtitle: string;
  heroImageUrl: string;
  heroBgImageUrl: string;
  logoImageUrl: string;
  legalities: {
    title: string;
    number: string;
    notary?: string;
    year: string;
  }[];
  management: {
    role: string;
    name: string;
    photo?: string;
  }[];
  contact: {
    address: string;
    phone: string;
    email: string;
    whatsapp: string;
  };
}

export interface UnitDakwah {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  badge: string;
  url: string;
  features: string[];
  colorTheme: string;
}

export interface Article {
  id: string;
  title: string;
  category: 'Kajian' | 'Artikel' | 'Berita' | 'Sanad';
  summary: string;
  content: string;
  author: string;
  date: string;
  imageUrl: string;
}

export interface Activity {
  id: string;
  title: string;
  category: string;
  schedule: string;
  location: string;
  description: string;
  instructor: string;
  imageUrl: string;
  isOnline: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: 'Ulama/Kyai' | 'Jemaah' | 'Donatur' | 'Orang Tua Asuh' | 'Wali Santri';
  comment: string;
  institutionOrTitle?: string;
  rating: number;
  avatarUrl: string;
}

export interface MQCRegistration {
  id: string;
  fullName: string;
  whatsapp: string;
  gender: 'Ikhwan' | 'Akhwat';
  classType: 'Kelas Reguler' | 'Kelas Privat';
  level: 'Level 1 (Pemula)' | 'Level 2 (Tahsin)' | 'Level 3 (Tahfizh)';
  mode: 'Online (Zoom/Meet/WA)' | 'Offline (Jatiasih, Bekasi)';
  dayPreference: string;
  timePreference: string;
  infaqAmount: number;
  isFirstFive: boolean;
  createdAt: string;
  status: 'Pending' | 'Dikonfirmasi' | 'Aktif';
}
