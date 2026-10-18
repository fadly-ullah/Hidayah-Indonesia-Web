/**
 * MQC public registration client for Hidayah Indonesia (React + Vite).
 * Save as src/services/mqcRegistration.ts in the GitHub repository.
 * Contains no admin credentials or secret tokens.
 */
const ENDPOINT = 'https://api.hidayahindonesia.id/mqc-register.php';

export interface MQCRegistrationInput {
  fullName: string;
  whatsapp: string;
  gender: 'Ikhwan' | 'Akhwat';
  classType: 'Kelas Reguler' | 'Kelas Privat';
  level: 'Level 1 (Pemula)' | 'Level 2 (Tahsin)' | 'Level 3 (Tahfizh)';
  mode: 'Online (Zoom/Meet/WA)' | 'Offline (Jatiasih, Bekasi)';
  dayPreference: string;
  timePreference: string;
  infaqAmount: number;
  consent: true;
  website?: string;
}

export interface MQCRegistrationReceipt {
  registrationCode: string;
  status: string;
  message: string;
}

async function parseJson(response: Response): Promise<any> {
  try {
    return await response.json();
  } catch {
    throw new Error('Server pendaftaran tidak mengembalikan data yang valid.');
  }
}

export async function getMQCRegistrationStatus(signal?: AbortSignal): Promise<boolean> {
  const response = await fetch(ENDPOINT, {
    method: 'GET',
    credentials: 'omit',
    cache: 'no-store',
    signal,
  });
  const result = await parseJson(response);
  if (!response.ok || result?.ok !== true || result?.database !== 'ready') {
    throw new Error('Layanan pendaftaran MQC sedang tidak tersedia.');
  }
  return result.registration_open === true;
}

export async function submitMQCRegistration(
  values: MQCRegistrationInput,
  signal?: AbortSignal,
): Promise<MQCRegistrationReceipt> {
  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'omit',
    cache: 'no-store',
    body: JSON.stringify(values),
    signal,
  });
  const result = await parseJson(response);
  if (!response.ok || result?.ok !== true) {
    throw new Error(typeof result?.error === 'string'
      ? result.error
      : 'Pendaftaran belum berhasil dikirim. Coba lagi nanti.');
  }
  const receipt = result?.data;
  if (!receipt || typeof receipt.registrationCode !== 'string' || !receipt.registrationCode) {
    throw new Error('Server tidak mengembalikan kode pendaftaran yang valid. Hubungi admin sebelum mencoba lagi.');
  }
  return {
    registrationCode: receipt.registrationCode,
    status: typeof receipt.status === 'string' ? receipt.status : 'Pending',
    message: typeof receipt.message === 'string' ? receipt.message : 'Pendaftaran diterima.',
  };
}
