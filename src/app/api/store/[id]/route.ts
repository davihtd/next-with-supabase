import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

type StoreUpdate = {
  user_id?: string | null;
  name?: string;
  phone?: string | null;
  website?: string | null;
  address?: string | null;
  zona?: string | null;
  status?: string | null;
  is_featured?: boolean | null;
};

const isUuid = (v: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(v);

export async function GET(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  if (!id || !isUuid(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from('stores').select('*').eq('id', id).single();

    if (error) {
      if ((error as any).code === 'PGRST116') return NextResponse.json({ error: 'Not found' }, { status: 404 });
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data ?? null, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Unexpected error' }, { status: 500 });
  }
}

// PATCH -> actualizar estatus (approve/reject)
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  if (!id || !isUuid(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });

  try {
    const body = (await req.json()) as Partial<StoreUpdate>;
    if (!body || (typeof body.status === 'undefined' && typeof body.is_featured === 'undefined')) {
      return NextResponse.json({ error: 'Missing fields to update' }, { status: 400 });
    }

    // validate status only if provided
    if (typeof body.status !== 'undefined') {
      const allowed = ['approved', 'rejected', 'pending'];
      if (!allowed.includes(body.status)) return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    const supabase = await createClient();
    // allow updating status and/or is_featured
    const updatePayload: any = {};
    if (body.status) updatePayload.status = body.status;
    if (typeof body.is_featured !== 'undefined') updatePayload.is_featured = body.is_featured;

    if (Object.keys(updatePayload).length === 0) {
      return NextResponse.json({ error: 'Nothing to update' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('stores')
      .update(updatePayload)
      .eq('id', id)
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Unexpected error' }, { status: 500 });
  }
}
