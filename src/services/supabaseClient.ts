import { createClient, SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://xyzcompany.supabase.co';

const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy_anon_key';

export const isSupabaseConfigured = (): boolean => {
  return (
    (!!import.meta.env.VITE_SUPABASE_URL || !!import.meta.env.NEXT_PUBLIC_SUPABASE_URL) &&
    (!!import.meta.env.VITE_SUPABASE_ANON_KEY || !!import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) &&
    !SUPABASE_URL.includes('xyzcompany')
  );
};

export const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
