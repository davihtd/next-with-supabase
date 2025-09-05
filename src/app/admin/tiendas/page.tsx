import { createClient } from '@/utils/supabase/server';
import AdminActions from './admin-actions';
import AdminFeatureToggle from './admin-feature-toggle';
import { redirect } from 'next/navigation';

export default async function AdminStoresPage() {
  const supabase = await createClient();

  // Obtener usuario actual
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return redirect('/sign-in');

  // Chequear claim/metadata 'role' o tabla admins
  const isAdminClaim = (user.user_metadata as any)?.role === 'admin' || (user.app_metadata as any)?.role === 'admin';
  let isAdmin = !!isAdminClaim;

  if (!isAdmin) {
    const { data: adminRow } = await supabase.from('admins').select('user_id').eq('user_id', user.id).maybeSingle();
    if (adminRow) isAdmin = true;
  }

  if (!isAdmin) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Acceso denegado</h1>
        <p>No tienes permisos de administrador para ver este panel.</p>
      </div>
    );
  }

  // Listar todas las tiendas (admin) para poder aprobar/rechazar y marcar como featured
  const { data: stores, error } = await supabase.from('stores').select('*').order('created_at', { ascending: false });
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Panel de Tiendas (admin)</h1>
      {stores && stores.length > 0 ? (
        <ul className="space-y-4">
          {stores.map((s: any) => (
            <li key={s.id} className="p-4 border rounded flex items-start justify-between">
              <div>
                <h2 className="font-semibold">{s.name} <span className="text-sm text-gray-500">({s.status})</span></h2>
                <p>{s.address}</p>
                <p>Zona: {s.zona}</p>
                <p>Usuario: {s.user_id}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <AdminActions storeId={s.id} />
                <AdminFeatureToggle storeId={s.id} initial={!!s.is_featured} />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay tiendas registradas</p>
      )}
    </div>
  );
}
