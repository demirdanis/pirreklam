'use client';

import { Check, FileText, Pencil, Plus, Star, Trash2, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

interface InvoiceInfo {
  id: string;
  full_name: string;
  email: string;
  tckn: string;
  address: string;
  city: string;
  district: string | null;
  phone: string | null;
  tax_office: string | null;
  is_default: boolean;
}

type FormData = Omit<InvoiceInfo, 'id'>;

const emptyForm = (): FormData => ({
  full_name: '',
  email: '',
  tckn: '',
  address: '',
  city: '',
  district: '',
  phone: '',
  tax_office: '',
  is_default: false,
});

// ─── Invoice Card ─────────────────────────────────────────────────────────────
function InvoiceCard({
  invoice,
  onEdit,
  onDelete,
  onSetDefault,
}: {
  invoice: InvoiceInfo;
  onEdit: (inv: InvoiceInfo) => void;
  onDelete: (id: string) => void;
  onSetDefault: (id: string) => void;
}) {
  const [delConfirm, setDelConfirm] = useState(false);
  const delTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function requestDelete() {
    if (delConfirm) {
      onDelete(invoice.id);
    } else {
      setDelConfirm(true);
      delTimer.current = setTimeout(() => setDelConfirm(false), 3500);
    }
  }

  useEffect(
    () => () => {
      if (delTimer.current) clearTimeout(delTimer.current);
    },
    []
  );

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
      <div className="p-4 sm:p-5 flex-1">
        {/* Header row */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-[#16223f] truncate">
              {invoice.full_name}
            </p>
            <p className="text-xs text-gray-500 truncate">{invoice.email}</p>
          </div>
          {invoice.is_default && (
            <span className="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 border border-amber-200 text-amber-700">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
              Varsayılan
            </span>
          )}
        </div>

        {/* Details grid */}
        <div className="space-y-1.5 text-xs text-gray-600">
          <div className="flex gap-1.5">
            <span className="text-gray-400 w-20 shrink-0">TC Kimlik</span>
            <span className="font-medium text-gray-700">{invoice.tckn}</span>
          </div>
          <div className="flex gap-1.5">
            <span className="text-gray-400 w-20 shrink-0">Adres</span>
            <span className="font-medium text-gray-700 break-words">
              {invoice.address}
            </span>
          </div>
          <div className="flex gap-1.5">
            <span className="text-gray-400 w-20 shrink-0">İl / İlçe</span>
            <span className="font-medium text-gray-700">
              {invoice.city}
              {invoice.district ? ` / ${invoice.district}` : ''}
            </span>
          </div>
          {invoice.phone && (
            <div className="flex gap-1.5">
              <span className="text-gray-400 w-20 shrink-0">Telefon</span>
              <span className="font-medium text-gray-700">{invoice.phone}</span>
            </div>
          )}
          {invoice.tax_office && (
            <div className="flex gap-1.5">
              <span className="text-gray-400 w-20 shrink-0">Vergi D.</span>
              <span className="font-medium text-gray-700">
                {invoice.tax_office}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div className="border-t border-gray-50 bg-gray-50/60 px-4 sm:px-5 py-3 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => onEdit(invoice)}
          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-800 transition-colors"
        >
          <Pencil className="w-3.5 h-3.5" />
          Düzenle
        </button>

        {!invoice.is_default && (
          <button
            type="button"
            onClick={() => onSetDefault(invoice.id)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-amber-200 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 text-xs font-medium text-amber-700 transition-colors"
          >
            <Star className="w-3.5 h-3.5" />
            Varsayılan Yap
          </button>
        )}

        <button
          type="button"
          onClick={requestDelete}
          className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
            delConfirm
              ? 'bg-red-600 text-white hover:bg-red-700 border border-red-600'
              : 'border border-red-100 bg-red-50 hover:bg-red-100 text-red-600'
          }`}
        >
          <Trash2 className="w-3.5 h-3.5" />
          {delConfirm ? 'Emin misin?' : 'Sil'}
        </button>
      </div>
    </div>
  );
}

// ─── Invoice Form Modal ───────────────────────────────────────────────────────
function InvoiceFormModal({
  initial,
  defaultEmail,
  defaultFullName,
  onSave,
  onClose,
}: {
  initial: InvoiceInfo | null;
  defaultEmail: string;
  defaultFullName: string;
  onSave: (data: FormData, id: string | null) => Promise<void>;
  onClose: () => void;
}) {
  const isEdit = initial !== null;
  const [form, setForm] = useState<FormData>(
    initial
      ? {
          full_name: initial.full_name,
          email: initial.email,
          tckn: initial.tckn,
          address: initial.address,
          city: initial.city,
          district: initial.district ?? '',
          phone: initial.phone ?? '',
          tax_office: initial.tax_office ?? '',
          is_default: initial.is_default,
        }
      : { ...emptyForm(), email: defaultEmail, full_name: defaultFullName }
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  function set(field: keyof FormData, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await onSave(form, initial?.id ?? null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-bold text-[#16223f]">
            {isEdit ? 'Fatura Bilgisi Düzenle' : 'Yeni Fatura Bilgisi'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="overflow-y-auto flex-1 px-6 py-5 space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Ad Soyad <span className="text-[#cc0636]">*</span>
              </label>
              <input
                type="text"
                value={form.full_name}
                onChange={(e) => set('full_name', e.target.value)}
                required
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-[#cc0636] focus:outline-none focus:ring-2 focus:ring-[#cc0636]/20 transition"
                placeholder="Ad Soyad"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">
                E-posta <span className="text-[#cc0636]">*</span>
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => set('email', e.target.value)}
                required
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-[#cc0636] focus:outline-none focus:ring-2 focus:ring-[#cc0636]/20 transition"
                placeholder="ornek@email.com"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">
                TC Kimlik No <span className="text-[#cc0636]">*</span>
              </label>
              <input
                type="text"
                value={form.tckn}
                onChange={(e) =>
                  set('tckn', e.target.value.replace(/\D/g, '').slice(0, 11))
                }
                required
                maxLength={11}
                inputMode="numeric"
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-[#cc0636] focus:outline-none focus:ring-2 focus:ring-[#cc0636]/20 transition"
                placeholder="11 haneli TC Kimlik No"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Adres <span className="text-[#cc0636]">*</span>
              </label>
              <textarea
                value={form.address}
                onChange={(e) => set('address', e.target.value)}
                required
                rows={2}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-[#cc0636] focus:outline-none focus:ring-2 focus:ring-[#cc0636]/20 transition resize-none"
                placeholder="Açık adres"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                İl <span className="text-[#cc0636]">*</span>
              </label>
              <input
                type="text"
                value={form.city}
                onChange={(e) => set('city', e.target.value)}
                required
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-[#cc0636] focus:outline-none focus:ring-2 focus:ring-[#cc0636]/20 transition"
                placeholder="İstanbul"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                İlçe
              </label>
              <input
                type="text"
                value={form.district ?? ''}
                onChange={(e) => set('district', e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-[#cc0636] focus:outline-none focus:ring-2 focus:ring-[#cc0636]/20 transition"
                placeholder="Kadıköy"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Telefon
              </label>
              <input
                type="tel"
                value={form.phone ?? ''}
                onChange={(e) => set('phone', e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-[#cc0636] focus:outline-none focus:ring-2 focus:ring-[#cc0636]/20 transition"
                placeholder="0555 000 00 00"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Vergi Dairesi
              </label>
              <input
                type="text"
                value={form.tax_office ?? ''}
                onChange={(e) => set('tax_office', e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-[#cc0636] focus:outline-none focus:ring-2 focus:ring-[#cc0636]/20 transition"
                placeholder="Opsiyonel"
              />
            </div>

            <div className="col-span-2">
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <div
                  onClick={() => set('is_default', !form.is_default)}
                  className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
                    form.is_default
                      ? 'bg-amber-500 border-amber-500'
                      : 'border-gray-300 hover:border-amber-400'
                  }`}
                >
                  {form.is_default && <Check className="w-3 h-3 text-white" />}
                </div>
                <span className="text-sm text-gray-700">
                  Varsayılan fatura bilgisi olarak işaretle
                </span>
              </label>
            </div>
          </div>

          {error && (
            <p className="rounded-xl bg-red-50 border border-red-200 px-4 py-2.5 text-sm text-red-700">
              {error}
            </p>
          )}

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 px-4 py-2.5 text-sm font-medium text-gray-600 transition-colors"
            >
              İptal
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 rounded-xl bg-[#cc0636] hover:bg-[#a8052c] disabled:opacity-50 text-white text-sm font-medium py-2.5 transition-colors"
            >
              {saving ? 'Kaydediliyor…' : isEdit ? 'Güncelle' : 'Ekle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function FaturaBilgilerimPage() {
  const [invoices, setInvoices] = useState<InvoiceInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<InvoiceInfo | null>(null);
  const [userEmail, setUserEmail] = useState('');
  const [userFullName, setUserFullName] = useState('');

  const loadInvoices = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/invoice-infos', { cache: 'no-store' });
      if (!res.ok) throw new Error('Veri alınamadı.');
      const data = await res.json();
      setInvoices(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadInvoices();
    // Also load profile for default email/name in form
    fetch('/api/profile', { cache: 'no-store' })
      .then((r) => r.json())
      .then((d) => {
        if (d?.email) setUserEmail(d.email);
        const name = [d?.first_name, d?.last_name].filter(Boolean).join(' ');
        if (name) setUserFullName(name);
      })
      .catch(() => {});
  }, [loadInvoices]);

  async function handleSave(data: FormData, id: string | null) {
    const url = id ? `/api/invoice-infos/${id}` : '/api/invoice-infos';
    const method = id ? 'PATCH' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json?.error ?? 'Kaydetme başarısız.');

    setShowForm(false);
    setEditing(null);
    await loadInvoices();
  }

  async function handleDelete(id: string) {
    const res = await fetch(`/api/invoice-infos/${id}`, { method: 'DELETE' });
    if (!res.ok) {
      const json = await res.json().catch(() => ({}));
      setError(json?.error ?? 'Silme başarısız.');
      return;
    }
    setInvoices((prev) => prev.filter((inv) => inv.id !== id));
  }

  async function handleSetDefault(id: string) {
    const res = await fetch(`/api/invoice-infos/${id}/set-default`, {
      method: 'POST',
    });
    if (!res.ok) {
      const json = await res.json().catch(() => ({}));
      setError(json?.error ?? 'Varsayılan ayarlanamadı.');
      return;
    }
    setInvoices((prev) =>
      prev.map((inv) => ({ ...inv, is_default: inv.id === id }))
    );
  }

  function openAdd() {
    setEditing(null);
    setShowForm(true);
  }

  function openEdit(inv: InvoiceInfo) {
    setEditing(inv);
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditing(null);
  }

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#cc0636]/10">
              <FileText className="w-5 h-5 text-[#cc0636]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#16223f]">
                Fatura Bilgilerim
              </h1>
              {invoices.length > 0 && (
                <p className="text-sm text-gray-500">
                  {invoices.length} fatura bilgisi
                </p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={openAdd}
            className="inline-flex items-center gap-2 rounded-xl bg-[#cc0636] hover:bg-[#a8052c] px-4 py-2 text-sm font-medium text-white transition-colors"
          >
            <Plus className="w-4 h-4" />
            Yeni Ekle
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 flex items-center justify-between rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
            <span>{error}</span>
            <button
              type="button"
              onClick={() => setError('')}
              className="ml-4 text-red-400 hover:text-red-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div
            className="grid gap-4"
            style={{
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            }}
          >
            {[1, 2].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-100 h-52 animate-pulse"
              />
            ))}
          </div>
        ) : invoices.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <FileText className="w-8 h-8 text-gray-300" />
            </div>
            <h2 className="text-lg font-semibold text-gray-700 mb-1">
              Henüz fatura bilgisi yok
            </h2>
            <p className="text-sm text-gray-400 mb-6">
              Fatura bilgisi ekleyerek siparişlerinizde kullanabilirsiniz.
            </p>
            <button
              type="button"
              onClick={openAdd}
              className="inline-flex items-center gap-2 rounded-xl bg-[#cc0636] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#a8052c] transition-colors"
            >
              <Plus className="w-4 h-4" />
              Fatura Bilgisi Ekle
            </button>
          </div>
        ) : (
          <div
            className="grid gap-4"
            style={{
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            }}
          >
            {invoices.map((inv) => (
              <InvoiceCard
                key={inv.id}
                invoice={inv}
                onEdit={openEdit}
                onDelete={handleDelete}
                onSetDefault={handleSetDefault}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showForm && (
        <InvoiceFormModal
          initial={editing}
          defaultEmail={userEmail}
          defaultFullName={userFullName}
          onSave={handleSave}
          onClose={closeForm}
        />
      )}
    </div>
  );
}
