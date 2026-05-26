import { NextResponse } from "next/server";
import { slugify, type BlogEditorPayload, type BlogStatus } from "@/lib/cms";
import { getApiAdminContext, jsonError } from "@/lib/adminApi";

function mapStatus(
  action: BlogEditorPayload["action"],
  currentStatus: BlogStatus | null,
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

  return currentStatus ?? "draft";
}

export async function POST(request: Request) {
  const context = await getApiAdminContext();

  if (!context.configured) {
    return jsonError("Supabase is not configured yet.", 503);
  }

  if (!context.user || !context.profile) {
    return jsonError("Please sign in to continue.", 401);
  }

  const payload = (await request.json()) as BlogEditorPayload;
  const isAdmin = context.profile.role === "admin";

  if (
    !isAdmin &&
    !["save_draft", "submit_review"].includes(payload.action)
  ) {
    return jsonError("Writers cannot perform this action.", 403);
  }

  const title = payload.title?.trim();
  const content = payload.content?.trim();
  const slug = slugify(payload.slug || payload.title || "");

  if (!title || !content || !slug) {
    return jsonError("Title, slug and content are required.", 400);
  }

  const status = mapStatus(payload.action, null, isAdmin);
  const now = new Date().toISOString();

  const { data, error } = await context.service!
    .from("blog_posts")
    .insert({
      author_id: context.user.id,
      author_name:
        context.profile.full_name || context.profile.email || "Awish Writer",
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
      submitted_at: status === "in_review" ? now : null,
      approved_at:
        status === "approved" || status === "published" ? now : null,
      reviewer_id:
        status === "approved" || status === "published" ? context.user.id : null,
      reviewer_name:
        status === "approved" || status === "published"
          ? context.profile.full_name || context.profile.email
          : null,
      published_at: status === "published" ? now : null,
    })
    .select("id")
    .single();

  if (error) {
    const message =
      error.code === "23505"
        ? "Another blog already uses this slug."
        : "Blog could not be created right now.";
    return jsonError(message, 400);
  }

  return NextResponse.json({ success: true, id: data.id });
}
