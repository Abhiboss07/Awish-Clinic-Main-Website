import { NextResponse } from "next/server";
import {
  slugify,
  type BlogEditorPayload,
  type BlogStatus,
} from "@/lib/cms";
import { getApiAdminContext, jsonError } from "@/lib/adminApi";

type Context = {
  params: Promise<{ id: string }>;
};

function nextStatus(
  action: BlogEditorPayload["action"],
  currentStatus: BlogStatus,
  isAdmin: boolean
) {
  if (action === "save_draft" || action === "archive_to_draft") {
    return "draft" as const;
  }

  if (action === "submit_review") {
    return "in_review" as const;
  }

  if (action === "approve" && isAdmin) {
    return "approved" as const;
  }

  if (action === "publish" && isAdmin) {
    return "published" as const;
  }

  if (action === "reject" && isAdmin) {
    return "rejected" as const;
  }

  return currentStatus;
}

export async function PATCH(request: Request, context: Context) {
  const { id } = await context.params;
  const admin = await getApiAdminContext();

  if (!admin.configured) {
    return jsonError("Supabase is not configured yet.", 503);
  }

  if (!admin.user || !admin.profile) {
    return jsonError("Please sign in to continue.", 401);
  }

  const { data: existing } = await admin.service!
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!existing) {
    return jsonError("Blog post not found.", 404);
  }

  const isAdmin = admin.profile.role === "admin";
  const isOwner = existing.author_id === admin.user.id;

  if (!isAdmin && !isOwner) {
    return jsonError("You cannot edit this blog post.", 403);
  }

  const payload = (await request.json()) as BlogEditorPayload;

  if (
    !isAdmin &&
    !["save_draft", "submit_review", "archive_to_draft"].includes(payload.action)
  ) {
    return jsonError("Writers cannot perform this action.", 403);
  }

  const title = payload.title?.trim();
  const content = payload.content?.trim();
  const slug = slugify(payload.slug || payload.title || "");

  if (!title || !content || !slug) {
    return jsonError("Title, slug and content are required.", 400);
  }

  const status = nextStatus(payload.action, existing.status as BlogStatus, isAdmin);
  const now = new Date().toISOString();
  const updatePayload: Record<string, unknown> = {
    title,
    slug,
    excerpt: payload.excerpt?.trim() || "",
    content,
    cover_image_url: payload.coverImageUrl || null,
    cover_image_path: payload.coverImagePath || null,
    gallery_image_urls: payload.galleryImageUrls ?? [],
    gallery_image_paths: payload.galleryImagePaths ?? [],
    youtube_links: payload.youtubeLinks ?? [],
    drive_links: payload.driveLinks ?? [],
    status,
  };

  if (payload.action === "submit_review") {
    updatePayload.submitted_at = now;
  }

  if (payload.action === "approve" || payload.action === "publish") {
    updatePayload.approved_at = existing.approved_at || now;
    updatePayload.reviewer_id = admin.user.id;
    updatePayload.reviewer_name =
      admin.profile.full_name || admin.profile.email || "Awish Admin";
  }

  if (payload.action === "publish") {
    updatePayload.published_at = now;
  }

  if (payload.action === "archive_to_draft") {
    updatePayload.published_at = null;
  }

  const { error } = await admin.service!
    .from("blog_posts")
    .update(updatePayload)
    .eq("id", id);

  if (error) {
    const message =
      error.code === "23505"
        ? "Another blog already uses this slug."
        : "Blog could not be updated right now.";
    return jsonError(message, 400);
  }

  return NextResponse.json({ success: true });
}
