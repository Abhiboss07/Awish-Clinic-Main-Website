export interface SupabasePublicConfig {
  url: string;
  anonKey: string;
}

export interface SupabaseServiceConfig extends SupabasePublicConfig {
  serviceRoleKey: string;
}

function readEnv(name: string) {
  const value = process.env[name]?.trim();
  return value ? value : null;
}

export function getSupabasePublicConfig(): SupabasePublicConfig | null {
  const url = readEnv("NEXT_PUBLIC_SUPABASE_URL");
  // Support both the older anon key variable and the newer publishable key label from Supabase.
  const anonKey =
    readEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY") ??
    readEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY");

  if (!url || !anonKey) {
    return null;
  }

  return { url, anonKey };
}

export function getSupabaseServiceConfig(): SupabaseServiceConfig | null {
  const publicConfig = getSupabasePublicConfig();
  const serviceRoleKey = readEnv("SUPABASE_SERVICE_ROLE_KEY");

  if (!publicConfig || !serviceRoleKey) {
    return null;
  }

  return { ...publicConfig, serviceRoleKey };
}

export function isSupabaseConfigured() {
  return !!getSupabasePublicConfig();
}
