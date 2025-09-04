import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

type StoreInsert = {
  user_id?: string | null;
  name: string;
  phone?: string | null;
  website?: string | null;
  address?: string | null;
  zona?: string | null;
  status?: string | null;
};

// METODO GET
export async function GET(req: Request) {
  try {
    const supabase = await createClient();

    const url = new URL(req.url);
    const user_id = url.searchParams.get('user_id');

    let query = supabase.from('stores').select('*');
    if (user_id) query = query.eq('user_id', user_id);

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data ?? [], { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Unexpected error' }, { status: 500 });
  }
}

// METODO POST
export async function POST(req: Request) {
  try {
    const supabase = await createClient();

    const body = (await req.json()) as Partial<StoreInsert>;
    if (!body || !body.name) {
      return NextResponse.json({ error: 'El campo "name" es requerido' }, { status: 400 });
    }

    const insertPayload: StoreInsert = {
      user_id: body.user_id ?? null,
      name: body.name,
      phone: body.phone ?? null,
      website: body.website ?? null,
      address: body.address ?? null,
      zona: body.zona ?? null,
      status: body.status ?? null,
    };

    const { data, error } = await supabase
      .from('stores')
      .insert([insertPayload])
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Unexpected error' }, { status: 500 });
  }
}