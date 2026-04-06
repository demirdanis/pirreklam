'use client';

import { Save, User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface Profile {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
}

export default function ProfilimPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    fetch('/api/profile', { cache: 'no-store' })
      .then(async (r) => {
        if (!r.ok)
          throw new Error(
            (await r.json().catch(() => ({}))).error ?? 'Profil alınamadı.'
          );
        return r.json();
      })
      .then((data: Profile) => {
        console.log('data', data);
        setProfile(data);
        setFirstName(data.first_name ?? '');
        setLastName(data.last_name ?? '');
      })
      .catch(() => setErrorMsg('Profil bilgileri yüklenemedi.'))
      .finally(() => setLoading(false));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim()) return;

    setSaving(true);
    setStatus('idle');
    setErrorMsg('');

    try {
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: firstName.trim(),
          last_name: lastName.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data?.error ?? 'Güncelleme başarısız.');
        setStatus('error');
        return;
      }
      setStatus('success');
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setStatus('idle'), 3000);
    } catch {
      setErrorMsg('Sunucuya bağlanılamadı.');
      setStatus('error');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <div className="mx-auto max-w-lg px-4 py-8 sm:px-6 lg:px-8">
        {/* Başlık */}
        <div className="mb-6 flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#cc0636]/10">
            <User className="w-5 h-5 text-[#cc0636]" />
          </div>
          <h1 className="text-2xl font-bold text-[#16223f]">Profilim</h1>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
          {loading ? (
            <div className="space-y-4 animate-pulse">
              <div className="h-4 bg-gray-100 rounded w-1/3" />
              <div className="h-10 bg-gray-100 rounded" />
              <div className="h-4 bg-gray-100 rounded w-1/3" />
              <div className="h-10 bg-gray-100 rounded" />
              <div className="h-4 bg-gray-100 rounded w-1/3" />
              <div className="h-10 bg-gray-100 rounded" />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="first_name"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Ad <span className="text-[#cc0636]">*</span>
                </label>
                <input
                  id="first_name"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-[#cc0636] focus:outline-none focus:ring-2 focus:ring-[#cc0636]/20 transition"
                  placeholder="Adınız"
                />
              </div>

              <div>
                <label
                  htmlFor="last_name"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Soyad <span className="text-[#cc0636]">*</span>
                </label>
                <input
                  id="last_name"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-[#cc0636] focus:outline-none focus:ring-2 focus:ring-[#cc0636]/20 transition"
                  placeholder="Soyadınız"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  E-posta
                </label>
                <input
                  id="email"
                  type="email"
                  value={profile?.email ?? ''}
                  disabled
                  className="w-full rounded-xl border border-gray-100 bg-gray-50 px-4 py-2.5 text-sm text-gray-400 cursor-not-allowed"
                />
                <p className="mt-1 text-xs text-gray-400">
                  E-posta adresi değiştirilemez.
                </p>
              </div>

              {status === 'error' && errorMsg && (
                <p className="rounded-xl bg-red-50 border border-red-200 px-4 py-2.5 text-sm text-red-700">
                  {errorMsg}
                </p>
              )}
              {status === 'success' && (
                <p className="rounded-xl bg-green-50 border border-green-200 px-4 py-2.5 text-sm text-green-700">
                  Profil bilgileriniz güncellendi.
                </p>
              )}

              <button
                type="submit"
                disabled={saving || !firstName.trim() || !lastName.trim()}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#cc0636] hover:bg-[#a8052c] disabled:opacity-50 text-white text-sm font-medium py-2.5 transition-colors"
              >
                <Save className="w-4 h-4" />
                {saving ? 'Kaydediliyor…' : 'Kaydet'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
