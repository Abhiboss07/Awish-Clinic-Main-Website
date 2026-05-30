import { redirect } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import type { AdminProfile, AdminRole } from "@/lib/cms";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export interface AdminContext {
  configured: boolean;
  user: User | null;
  profile: AdminProfile | null;
}

export async function getAdminContext(): Promise<AdminContext> {
  if (!isSupabaseConfigured()) {
    return {
      configured: false,
      user: null,
      profile: null,
    };
  }

  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return {
      configured: false,
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
      user: null,
      profile: null,
    };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, email, full_name, role, created_at")
    .eq("id", user.id)
    .maybeSingle();

  return {
    configured: true,
    user,
    profile: profile
      ? {
          id: profile.id as string,
          email: (profile.email as string | null) ?? user.email ?? null,
          full_name: (profile.full_name as string | null) ?? null,
          role: ((profile.role as AdminRole | null) ?? "writer") as AdminRole,
          created_at: (profile.created_at as string | undefined) ?? undefined,
        }
      : null,
  };
}

export async function requireAdminContext() {
  const context = await getAdminContext();

  if (!context.configured) {
    return context;
  }

  if (!context.user) {
    redirect("/admin/login");
  }

  if (!context.profile) {
    redirect("/admin/login?error=profile-missing");
  }

  return context;
}

export function canManageBookings(role: AdminRole | null | undefined) {
  return role === "admin";
}

export function canApproveBlogs(role: AdminRole | null | undefined) {
  return role === "admin";
}

export function canEditBlog(
  role: AdminRole | null | undefined,
  currentUserId: string,
  authorId: string
) {
  if (role === "admin") {
    return true;
  }

  return role === "writer" && currentUserId === authorId;
}
