import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseServiceClient } from "@/lib/supabase/service";
import type { AdminProfile, AdminRole } from "@/lib/cms";

export async function getApiAdminContext() {
  const supabase = await createSupabaseServerClient();
  const service = createSupabaseServiceClient();

  if (!supabase || !service) {
    return {
      configured: false,
      supabase: null,
      service: null,
      user: null,
      profile: null,
    };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      configured: true,
      supabase,
      service,
      user: null,
      profile: null,
    };
  }

  const { data: profile } = await service
    .from("profiles")
    .select("id, email, full_name, role, created_at")
    .eq("id", user.id)
    .maybeSingle();

  return {
    configured: true,
    supabase,
    service,
    user,
    profile: profile
      ? ({
          id: profile.id as string,
          email: (profile.email as string | null) ?? user.email ?? null,
          full_name: (profile.full_name as string | null) ?? null,
          role: ((profile.role as AdminRole | null) ?? "writer") as AdminRole,
          created_at: (profile.created_at as string | undefined) ?? undefined,
        } satisfies AdminProfile)
      : null,
  };
}

export function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}
