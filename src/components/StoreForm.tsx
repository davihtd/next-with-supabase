"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function StoreForm({ userId }: { userId: string }) {
  const supabase = createClient();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    website: "",
    address: "",
    zone: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase.from("stores").insert([
      {
        user_id: userId,
        ...form,
      },
    ]);

    if (error) {
      alert("Error: " + error.message);
    } else {
      window.location.reload(); // recargar dashboard
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="text"
        placeholder="Nombre de la tienda"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Teléfono"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />
      <input
        type="text"
        placeholder="Sitio web"
        value={form.website}
        onChange={(e) => setForm({ ...form, website: e.target.value })}
      />
      <input
        type="text"
        placeholder="Dirección"
        value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
      />
      <select
        value={form.zone}
        onChange={(e) => setForm({ ...form, zone: e.target.value })}
      >
        <option value="">Selecciona una zona</option>
        <option value="Centro">Centro</option>
        <option value="Zona Alta">Zona Alta</option>
        <option value="Circuito Comercial">Circuito Comercial</option>
        <option value="Costanera">Costanera</option>
      </select>
      <button type="submit">Guardar tienda</button>
    </form>
  );
}
