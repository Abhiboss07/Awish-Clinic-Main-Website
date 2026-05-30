export type AdminRole = "admin" | "writer";
export type BlogStatus =
  | "draft"
  | "in_review"
  | "approved"
  | "published"
  | "rejected";
export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";
export type BookingSource = "contact" | "appointment";

export interface AdminProfile {
  id: string;
  email: string | null;
  full_name: string | null;
  role: AdminRole;
  created_at?: string;
}

export interface BlogPostRecord {
  id: string;
  author_id: string;
  author_name: string | null;
  reviewer_id: string | null;
  reviewer_name: string | null;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url: string | null;
  cover_image_path: string | null;
  gallery_image_urls: string[];
  gallery_image_paths: string[];
  youtube_links: string[];
  drive_links: string[];
  status: BlogStatus;
  submitted_at: string | null;
  approved_at: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface BookingRecord {
  id: string;
  source: BookingSource;
  name: string;
  phone: string;
  email: string | null;
  service: string | null;
  message: string | null;
  preferred_date: string | null;
  preferred_time: string | null;
  status: BookingStatus;
  created_at: string;
}

export interface BookingPayload {
  source: BookingSource;
  name: string;
  phone: string;
  email?: string;
  service?: string;
  message?: string;
  preferredDate?: string;
  preferredTime?: string;
}

export interface BlogEditorPayload {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl?: string | null;
  coverImagePath?: string | null;
  galleryImageUrls?: string[];
  galleryImagePaths?: string[];
  youtubeLinks?: string[];
  driveLinks?: string[];
  action:
    | "save_draft"
    | "submit_review"
    | "approve"
    | "publish"
    | "reject"
    | "archive_to_draft";
}

export function normalizeStringArray(value: unknown) {
  if (!Array.isArray(value)) {
    return [] as string[];
  }

  return value
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean);
}

export function normalizeBlogRecord(row: Record<string, unknown>): BlogPostRecord {
  return {
    id: String(row.id ?? ""),
    author_id: String(row.author_id ?? ""),
    author_name: typeof row.author_name === "string" ? row.author_name : null,
    reviewer_id: typeof row.reviewer_id === "string" ? row.reviewer_id : null,
    reviewer_name: typeof row.reviewer_name === "string" ? row.reviewer_name : null,
    title: String(row.title ?? ""),
    slug: String(row.slug ?? ""),
    excerpt: String(row.excerpt ?? ""),
    content: String(row.content ?? ""),
    cover_image_url:
      typeof row.cover_image_url === "string" ? row.cover_image_url : null,
    cover_image_path:
      typeof row.cover_image_path === "string" ? row.cover_image_path : null,
    gallery_image_urls: normalizeStringArray(row.gallery_image_urls),
    gallery_image_paths: normalizeStringArray(row.gallery_image_paths),
    youtube_links: normalizeStringArray(row.youtube_links),
    drive_links: normalizeStringArray(row.drive_links),
    status: (row.status as BlogStatus) ?? "draft",
    submitted_at:
      typeof row.submitted_at === "string" ? row.submitted_at : null,
    approved_at: typeof row.approved_at === "string" ? row.approved_at : null,
    published_at:
      typeof row.published_at === "string" ? row.published_at : null,
    created_at: String(row.created_at ?? ""),
    updated_at: String(row.updated_at ?? ""),
  };
}

export function normalizeBookingRecord(row: Record<string, unknown>): BookingRecord {
  return {
    id: String(row.id ?? ""),
    source: (row.source as BookingSource) ?? "contact",
    name: String(row.name ?? ""),
    phone: String(row.phone ?? ""),
    email: typeof row.email === "string" ? row.email : null,
    service: typeof row.service === "string" ? row.service : null,
    message: typeof row.message === "string" ? row.message : null,
    preferred_date:
      typeof row.preferred_date === "string" ? row.preferred_date : null,
    preferred_time:
      typeof row.preferred_time === "string" ? row.preferred_time : null,
    status: (row.status as BookingStatus) ?? "pending",
    created_at: String(row.created_at ?? ""),
  };
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function parseLinkText(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function formatIndianDate(value: string | null) {
  if (!value) {
    return "Not scheduled";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function formatDateTime(date: string | null, time: string | null) {
  if (!date && !time) {
    return "No slot selected";
  }

  if (!date) {
    return time ?? "No slot selected";
  }

  return `${formatIndianDate(date)}${time ? `, ${time}` : ""}`;
}

export function buildBlogStatusLabel(status: BlogStatus) {
  switch (status) {
    case "draft":
      return "Draft";
    case "in_review":
      return "In review";
    case "approved":
      return "Approved";
    case "published":
      return "Published";
    case "rejected":
      return "Rejected";
    default:
      return status;
  }
}

export function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, "").trim();
}

export function contentToBlocks(content: string) {
  return content
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      if (block.startsWith("## ")) {
        return { type: "heading" as const, value: block.slice(3).trim() };
      }

      if (block.startsWith("- ")) {
        return {
          type: "list" as const,
          value: block
            .split("\n")
            .map((line) => line.replace(/^- /, "").trim())
            .filter(Boolean),
        };
      }

      return { type: "paragraph" as const, value: block };
    });
}
