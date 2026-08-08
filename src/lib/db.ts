import type { Publication, Stats } from '@/types';
import { createServerClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

const TABLE = 'pub_publications';

// ---- Public queries (respect RLS) ----

export async function getPublications(): Promise<Publication[]> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('stato', 'pubblicato')
    .order('anno', { ascending: false })
    .order('titolo', { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []) as Publication[];
}

export async function getPublication(slug: string): Promise<Publication | null> {
  const supabase = await createServerClient();
  const { data } = await supabase
    .from(TABLE)
    .select('*')
    .eq('slug', slug)
    .eq('stato', 'pubblicato')
    .single();
  return data as Publication | null;
}

export async function getStats(): Promise<Stats> {
  const supabase = await createServerClient();
  const { data } = await supabase
    .from(TABLE)
    .select('collana')
    .eq('stato', 'pubblicato');
  const rows = data ?? [];
  const collaneSet = new Set(rows.map((r: { collana: string }) => r.collana));
  return {
    volumi_pubblicati: rows.length,
    collane_attive: collaneSet.size,
  };
}

// ---- Admin queries (service role, bypass RLS) ----

export async function adminGetPublications(): Promise<Publication[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as Publication[];
}

export async function adminGetPublication(id: string): Promise<Publication | null> {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from(TABLE)
    .select('*')
    .eq('id', id)
    .single();
  return data as Publication | null;
}

export type PublicationInput = Omit<Publication, 'id' | 'created_at' | 'updated_at'>;

export async function adminCreatePublication(input: PublicationInput): Promise<Publication> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from(TABLE)
    .insert(input)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data as Publication;
}

export async function adminUpdatePublication(
  id: string,
  input: Partial<PublicationInput>
): Promise<Publication> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from(TABLE)
    .update(input)
    .eq('id', id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data as Publication;
}

export async function adminDeletePublication(id: string): Promise<void> {
  const supabase = createAdminClient();
  const { error } = await supabase.from(TABLE).delete().eq('id', id);
  if (error) throw new Error(error.message);
}
