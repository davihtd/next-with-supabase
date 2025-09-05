'use client';

import { useState } from 'react';

interface Props {
  storeId: string;
  initial?: boolean;
}

export default function AdminFeatureToggle({ storeId, initial = false }: Props) {
  const [featured, setFeatured] = useState<boolean>(initial);
  const [loading, setLoading] = useState(false);

  async function toggle() {
    setLoading(true);
    try {
      const res = await fetch(`/api/store/${storeId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_featured: !featured }),
      });
      if (!res.ok) throw new Error('Failed');
      const data = await res.json();
      setFeatured(!!data.is_featured || !!data.is_featured);
    } catch (err) {
      console.error(err);
      // keep current state on error
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`px-3 py-2 rounded font-medium ${featured ? 'bg-yellow-400 text-white' : 'bg-gray-100 text-gray-800'}`}
    >
      {loading ? '...' : featured ? 'Quitar featured' : 'Marcar featured'}
    </button>
  );
}
