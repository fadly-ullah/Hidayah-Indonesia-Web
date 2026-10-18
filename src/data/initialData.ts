
import type { FoundationProfile, UnitDakwah } from '../types';

/**
 * Nilai sementara untuk tampilan, bukan sumber data resmi yayasan.
 * Jangan masukkan nama pengurus, nomor legalitas,
 * kontak, atau testimoni contoh.
 */
export const initialProfile: FoundationProfile = {
  name: 'Hidayah Indonesia',
  tagline: '',
  description: '',
  vision: '',
  mission: [],
  history: '',
  logoText: 'Hidayah Indonesia',
  logoSubtext: '',
  heroBadge: '',
  heroTitle: '',
  heroDescription: '',
  heroCardTitle: '',
  heroCardSubtitle: '',
  heroImageUrl: '',
  heroBgImageUrl: '',
  logoImageUrl: '',
  legalities: [],
  management: [],
  contact: {
    address: '',
    phone: '',
    email: '',
    whatsapp: '',
  },
};

/** Unit dakwah selalu dibaca dari CMS Rumahweb. */
export const initialUnits: UnitDakwah[] = [];
