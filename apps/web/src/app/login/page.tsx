'use client';

import { useState } from 'react';
import { z } from 'zod';

const emailSchema = z.string().email();

type State = 'idle' | 'loading' | 'success' | 'error';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<State>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg('');

    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      setErrorMsg('Lütfen geçerli bir e-posta adresi girin.');
      return;
    }

    setState('loading');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error ?? 'Bir hata oluştu.');
        setState('error');
        return;
      }

      setState('success');
    } catch {
      setErrorMsg('Sunucuya bağlanılamadı. Lütfen tekrar deneyin.');
      setState('error');
    }
  }

  return (
    <main className="min-h-screen bg-[#f4f4f4] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo / Başlık */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#cc0636] mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-[#16223f]">Pir Reklam</h1>
          <p className="text-sm text-gray-500 mt-1">Hesabınıza giriş yapın</p>
        </div>

        {/* Kart */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {state === 'success' ? (
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-100 mb-4">
                <svg
                  className="w-7 h-7 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-[#16223f] mb-2">
                E-postanızı kontrol edin
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                <strong className="text-[#16223f]">{email}</strong> adresine
                giriş linki gönderdik. Gelen kutunuzu kontrol edin.
              </p>
              <button
                onClick={() => {
                  setEmail('');
                  setState('idle');
                }}
                className="mt-6 text-sm text-[#cc0636] hover:underline"
              >
                Farklı bir e-posta ile dene
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-lg font-semibold text-[#16223f] mb-1">
                Giriş Linki Al
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                E-posta adresinizi girin, size tek kullanımlık giriş linki
                gönderelim.
              </p>

              <form onSubmit={handleSubmit} noValidate>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[#16223f] mb-1.5"
                >
                  E-posta adresi
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (state === 'error') {
                      setState('idle');
                      setErrorMsg('');
                    }
                  }}
                  placeholder="ornek@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-[#16223f] placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#cc0636]/30 focus:border-[#cc0636] transition-all"
                  disabled={state === 'loading'}
                />

                {errorMsg && (
                  <p className="mt-2 text-sm text-red-600">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={state === 'loading' || !email}
                  className="mt-5 w-full bg-[#cc0636] hover:bg-[#a8052c] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold text-sm py-3 rounded-xl transition-colors"
                >
                  {state === 'loading' ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="w-4 h-4 animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        />
                      </svg>
                      Gönderiliyor…
                    </span>
                  ) : (
                    'Giriş Linki Gönder'
                  )}
                </button>
              </form>
            </>
          )}
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          © {new Date().getFullYear()} Pir Reklam. Tüm hakları saklıdır.
        </p>
      </div>
    </main>
  );
}
