import { createClient } from "@/utils/supabase/server";
import StoreForm from "@/components/StoreForm";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <p>No estás logueado</p>;
  }

  // buscar si ya existe la tienda
  const { data: store } = await supabase
    .from("stores")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (!store) {
    // no existe → mostrar formulario
    return <StoreForm userId={user.id} />;
  }

  if (store.status === "pending") {
    return (
      <div className="p-6 rounded-lg bg-green-50 border border-green-200 text-green-800 text-center">
        ¡Gracias! Recibimos tu solicitud y pronto nos pondremos en contacto.
      </div>
    );
  }

  // ya existe → mostrar dashboard de tienda
  return (
    <div>
      <h1>Dashboard de {store.name}</h1>
      <p>Zona: {store.zone}</p>
      <p>Teléfono: {store.phone}</p>
      {/* luego acá agregás fotos, categorías, etc */}
    </div>
  );
}

