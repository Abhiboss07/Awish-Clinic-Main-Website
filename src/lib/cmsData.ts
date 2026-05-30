import {
  normalizeBlogRecord,
  normalizeBookingRecord,
  type AdminProfile,
  type BlogPostRecord,
  type BookingRecord,
} from "@/lib/cms";
import { createSupabaseServiceClient } from "@/lib/supabase/service";

export async function getPublishedBlogs() {
  const supabase = createSupabaseServiceClient();

  if (!supabase) {
    return [] as BlogPostRecord[];
  }

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error || !data) {
    return [] as BlogPostRecord[];
  }

  return data.map((row) => normalizeBlogRecord(row));
}

export async function getPublishedBlogBySlug(slug: string) {
  const supabase = createSupabaseServiceClient();

  if (!supabase) {
    return null as BlogPostRecord | null;
  }

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error || !data) {
    return null as BlogPostRecord | null;
  }

  return normalizeBlogRecord(data);
}

export async function getAdminBlogs(role: AdminProfile["role"], userId: string) {
  const supabase = createSupabaseServiceClient();

  if (!supabase) {
    return [] as BlogPostRecord[];
  }

  let query = supabase.from("blog_posts").select("*").order("updated_at", {
    ascending: false,
  });

  if (role !== "admin") {
    query = query.eq("author_id", userId);
  }

  const { data, error } = await query;

  if (error || !data) {
    return [] as BlogPostRecord[];
  }

  return data.map((row) => normalizeBlogRecord(row));
}

export async function getAdminBlogById(id: string) {
  const supabase = createSupabaseServiceClient();

  if (!supabase) {
    return null as BlogPostRecord | null;
  }

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) {
    return null as BlogPostRecord | null;
  }

  return normalizeBlogRecord(data);
}

export async function getUpcomingBookings() {
  const supabase = createSupabaseServiceClient();

  if (!supabase) {
    return [] as BookingRecord[];
  }

  const today = new Date().toISOString().slice(0, 10);

  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .or(`preferred_date.gte.${today},preferred_date.is.null`)
    .order("preferred_date", { ascending: true, nullsFirst: false })
    .order("preferred_time", { ascending: true, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [] as BookingRecord[];
  }

  return data.map((row) => normalizeBookingRecord(row));
}

export async function getBookingSlotCount(date: string, time: string) {
  const supabase = createSupabaseServiceClient();

  if (!supabase) {
    return 0;
  }

  const { count, error } = await supabase
    .from("bookings")
    .select("*", { count: "exact", head: true })
    .eq("preferred_date", date)
    .eq("preferred_time", time)
    .not("status", "eq", "cancelled");

  if (error) {
    return 0;
  }

  return count ?? 0;
}
