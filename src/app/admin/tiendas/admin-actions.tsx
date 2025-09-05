"use client";

import { useState } from 'react';

export default function AdminActions({ storeId }: { storeId: string }) {
  const [loading, setLoading] = useState(false);

  async function updateStatus(status: 'approved' | 'rejected') {
    setLoading(true);
    const res = await fetch(`/api/store/${storeId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    setLoading(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      alert('Error: ' + (data.error || res.statusText));
    } else {
      // recargar la página para ver los cambios
      window.location.reload();
    }
  }

  return (
    <div className="mt-3 flex gap-2">
      <button className="px-3 py-1 bg-green-600 text-white rounded" onClick={() => updateStatus('approved')} disabled={loading}>
        Aprobar
      </button>
      <button className="px-3 py-1 bg-red-600 text-white rounded" onClick={() => updateStatus('rejected')} disabled={loading}>
        Rechazar
      </button>
    </div>
  );
}
