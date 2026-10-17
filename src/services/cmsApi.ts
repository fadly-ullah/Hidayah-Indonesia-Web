import type { FoundationProfile, UnitDakwah, Article, Activity, Testimonial } from '../types';

/** Public-only CMS reader. No admin token or password is sent to the browser. */
const CMS_ENDPOINT = 'https://api.hidayahindonesia.id/cms.php';

async function request<T>(resource: string, signal: AbortSignal, page?: number): Promise<T> {
  const url = new URL(CMS_ENDPOINT);
  url.searchParams.set('resource', resource);
  if (page !== undefined) {
    url.searchParams.set('page', String(page));
    url.searchParams.set('limit', '100');
  }
  const response = await fetch(url.toString(), {
    method: 'GET',
    credentials: 'omit',
    cache: 'no-store',
    signal,
  });
  if (!response.ok) throw new Error(`CMS ${resource}: HTTP ${response.status}`);
  const result: { ok?: boolean; data?: T; error?: string } = await response.json();
  if (result?.ok !== true || !('data' in result)) {
    throw new Error(result?.error || `Respons CMS ${resource} tidak valid`);
  }
  return result.data as T;
}

async function listAll<T>(resource: string, signal: AbortSignal): Promise<T[]> {
  const items: T[] = [];
  for (let page = 1; page <= 20; page++) {
    const next = await request<T[]>(resource, signal, page);
    if (!Array.isArray(next)) throw new Error(`CMS ${resource}: daftar data tidak valid`);
    items.push(...next);
    if (next.length < 100) return items;
  }
  throw new Error(`CMS ${resource}: lebih dari 2000 entri. Perlu pagination lanjutan.`);
}

export const publicCms = {
  profile: (signal: AbortSignal) => request<FoundationProfile | null>('profile', signal),
  units: (signal: AbortSignal) => listAll<UnitDakwah>('units', signal),
  articles: (signal: AbortSignal) => listAll<Article>('articles', signal),
  activities: (signal: AbortSignal) => listAll<Activity>('activities', signal),
  testimonials: (signal: AbortSignal) => listAll<Testimonial>('testimonials', signal),
};
