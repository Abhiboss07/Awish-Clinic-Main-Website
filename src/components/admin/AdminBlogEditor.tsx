"use client";
/* eslint-disable @next/next/no-img-element */

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import BlogContentBlocks from "@/components/blog/BlogContentBlocks";
import {
  buildBlogStatusLabel,
  parseLinkText,
  slugify,
  type AdminRole,
  type BlogPostRecord,
} from "@/lib/cms";

type UploadAsset = {
  url: string;
  path: string;
  name: string;
};

export default function AdminBlogEditor({
  mode,
  role,
  initialPost,
}: {
  mode: "create" | "edit";
  role: AdminRole;
  initialPost?: BlogPostRecord | null;
}) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"editor" | "preview">("editor");
  const [title, setTitle] = useState(initialPost?.title ?? "");
  const [slug, setSlug] = useState(initialPost?.slug ?? "");
  const [excerpt, setExcerpt] = useState(initialPost?.excerpt ?? "");
  const [content, setContent] = useState(initialPost?.content ?? "");
  const [youtubeText, setYoutubeText] = useState(
    initialPost?.youtube_links.join("\n") ?? ""
  );
  const [driveText, setDriveText] = useState(
    initialPost?.drive_links.join("\n") ?? ""
  );
  const [coverImageUrl, setCoverImageUrl] = useState(
    initialPost?.cover_image_url ?? ""
  );
  const [coverImagePath, setCoverImagePath] = useState(
    initialPost?.cover_image_path ?? ""
  );
  const [galleryImages, setGalleryImages] = useState<UploadAsset[]>(
    (initialPost?.gallery_image_urls ?? []).map((url, index) => ({
      url,
      path: initialPost?.gallery_image_paths[index] ?? "",
      name: `Image ${index + 1}`,
    }))
  );
  const [savingAction, setSavingAction] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);

  const statusLabel = initialPost
    ? buildBlogStatusLabel(initialPost.status)
    : "New draft";

  const actionButtons = useMemo(() => {
    if (role === "admin") {
      return [
        { action: "save_draft", label: "Save draft" },
        { action: "approve", label: "Approve" },
        { action: "publish", label: "Publish live" },
        { action: "reject", label: "Reject" },
      ] as const;
    }

    return [
      { action: "save_draft", label: "Save draft" },
      { action: "submit_review", label: "Submit for review" },
    ] as const;
  }, [role]);

  const previewYoutubeLinks = parseLinkText(youtubeText);
  const previewDriveLinks = parseLinkText(driveText);

  const uploadFiles = async (files: FileList | null) => {
    if (!files?.length) {
      return [] as UploadAsset[];
    }

    const formData = new FormData();

    Array.from(files).forEach((file) => {
      formData.append("files", file);
    });

    const response = await fetch("/api/admin/uploads", {
      method: "POST",
      body: formData,
    });
    const payload = await response.json();

    if (!response.ok || !payload.files) {
      throw new Error(payload.error || "Image upload failed.");
    }

    return payload.files as UploadAsset[];
  };

  const handleCoverUpload = async (files: FileList | null) => {
    try {
      setUploadingCover(true);
      setError(null);
      const uploaded = await uploadFiles(files);

      if (uploaded[0]) {
        setCoverImageUrl(uploaded[0].url);
        setCoverImagePath(uploaded[0].path);
      }
    } catch (uploadError) {
      setError(
        uploadError instanceof Error ? uploadError.message : "Cover upload failed."
      );
    } finally {
      setUploadingCover(false);
    }
  };

  const handleGalleryUpload = async (files: FileList | null) => {
    try {
      setUploadingGallery(true);
      setError(null);
      const uploaded = await uploadFiles(files);
      setGalleryImages((current) => [...current, ...uploaded]);
    } catch (uploadError) {
      setError(
        uploadError instanceof Error ? uploadError.message : "Gallery upload failed."
      );
    } finally {
      setUploadingGallery(false);
    }
  };

  const removeGalleryImage = (path: string) => {
    setGalleryImages((current) => current.filter((image) => image.path !== path));
  };

  const handleTitleBlur = () => {
    if (!slug.trim() && title.trim()) {
      setSlug(slugify(title));
    }
  };

  const handleSave = async (action: string) => {
    if (!title.trim() || !content.trim()) {
      setError("Title and content are required.");
      return;
    }

    setSavingAction(action);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(
        mode === "create"
          ? "/api/admin/blogs"
          : `/api/admin/blogs/${initialPost?.id}`,
        {
          method: mode === "create" ? "POST" : "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            slug: slug || slugify(title),
            excerpt,
            content,
            coverImageUrl: coverImageUrl || null,
            coverImagePath: coverImagePath || null,
            galleryImageUrls: galleryImages.map((image) => image.url),
            galleryImagePaths: galleryImages.map((image) => image.path),
            youtubeLinks: parseLinkText(youtubeText),
            driveLinks: parseLinkText(driveText),
            action,
          }),
        }
      );
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || "Blog save failed.");
      }

      setSuccess("Blog updated successfully.");

      if (mode === "create" && payload.id) {
        router.push(`/admin/blogs/${payload.id}`);
      } else {
        router.refresh();
      }
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Blog save failed.");
    } finally {
      setSavingAction(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-[1.8rem] border border-[rgba(30,36,34,0.08)] bg-white px-5 py-4 shadow-[0_18px_50px_rgba(18,24,28,0.06)]">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
            Blog status
          </p>
          <p className="mt-2 text-lg font-semibold text-[var(--foreground)]">
            {statusLabel}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("editor")}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              activeTab === "editor"
                ? "bg-[var(--brand)] text-white"
                : "border border-[rgba(30,36,34,0.12)] bg-white text-[var(--foreground)]"
            }`}
          >
            Editor
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("preview")}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              activeTab === "preview"
                ? "bg-[var(--brand)] text-white"
                : "border border-[rgba(30,36,34,0.12)] bg-white text-[var(--foreground)]"
            }`}
          >
            Preview
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-[1.4rem] border border-[#e8b5a6] bg-[#fff4ef] px-4 py-3 text-sm text-[#9b4834]">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-[1.4rem] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          {success}
        </div>
      )}

      {activeTab === "editor" ? (
        <div className="grid gap-6 xl:grid-cols-[1fr_0.86fr]">
          <div className="space-y-6">
            <div className="surface-card rounded-[1.8rem] p-6">
              <label className="text-sm font-semibold text-[var(--foreground)]">
                Blog title
              </label>
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                onBlur={handleTitleBlur}
                className="mt-2 w-full rounded-[1.2rem] border border-[rgba(30,36,34,0.12)] bg-white px-4 py-3 text-[var(--foreground)]"
                placeholder="Write the blog title"
              />

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold text-[var(--foreground)]">
                    Slug
                  </label>
                  <input
                    value={slug}
                    onChange={(event) => setSlug(slugify(event.target.value))}
                    className="mt-2 w-full rounded-[1.2rem] border border-[rgba(30,36,34,0.12)] bg-white px-4 py-3 text-[var(--foreground)]"
                    placeholder="blog-post-slug"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-[var(--foreground)]">
                    Excerpt
                  </label>
                  <input
                    value={excerpt}
                    onChange={(event) => setExcerpt(event.target.value)}
                    className="mt-2 w-full rounded-[1.2rem] border border-[rgba(30,36,34,0.12)] bg-white px-4 py-3 text-[var(--foreground)]"
                    placeholder="Short summary for blog cards"
                  />
                </div>
              </div>

              <label className="mt-5 block text-sm font-semibold text-[var(--foreground)]">
                Content
              </label>
              <p className="mt-1 text-sm leading-7 text-[var(--muted)]">
                Use plain paragraphs. Start lines with `## ` for subheadings and `- ` for bullet points.
              </p>
              <textarea
                value={content}
                onChange={(event) => setContent(event.target.value)}
                rows={18}
                className="mt-3 w-full rounded-[1.2rem] border border-[rgba(30,36,34,0.12)] bg-white px-4 py-4 text-[var(--foreground)]"
                placeholder="Write the full blog content here..."
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="surface-card rounded-[1.8rem] p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-[var(--foreground)]">
                    Cover image
                  </p>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    Upload the main image used on the blog card and blog hero.
                  </p>
                </div>
                <label className="rounded-full bg-[var(--brand)] px-4 py-2 text-sm font-semibold text-white">
                  {uploadingCover ? "Uploading..." : "Upload"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(event) => handleCoverUpload(event.target.files)}
                  />
                </label>
              </div>

              {coverImageUrl ? (
                <img
                  src={coverImageUrl}
                  alt="Cover preview"
                  className="mt-4 h-48 w-full rounded-[1.4rem] object-cover"
                />
              ) : (
                <div className="mt-4 rounded-[1.4rem] border border-dashed border-[rgba(30,36,34,0.16)] bg-[var(--surface)] px-4 py-10 text-center text-sm text-[var(--muted)]">
                  No cover image uploaded yet.
                </div>
              )}
            </div>

            <div className="surface-card rounded-[1.8rem] p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-[var(--foreground)]">
                    Gallery images
                  </p>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    Add supporting blog images for the public article page.
                  </p>
                </div>
                <label className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white">
                  {uploadingGallery ? "Uploading..." : "Add images"}
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(event) => handleGalleryUpload(event.target.files)}
                  />
                </label>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {galleryImages.map((image) => (
                  <div
                    key={image.path}
                    className="overflow-hidden rounded-[1.3rem] border border-[rgba(30,36,34,0.08)] bg-white"
                  >
                    <img
                      src={image.url}
                      alt={image.name}
                      className="h-32 w-full object-cover"
                    />
                    <div className="flex items-center justify-between gap-3 px-3 py-3">
                      <p className="truncate text-sm text-[var(--foreground)]">
                        {image.name}
                      </p>
                      <button
                        type="button"
                        onClick={() => removeGalleryImage(image.path)}
                        className="text-xs font-semibold text-[#9b4834]"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}

                {!galleryImages.length && (
                  <div className="rounded-[1.3rem] border border-dashed border-[rgba(30,36,34,0.16)] bg-[var(--surface)] px-4 py-8 text-sm text-[var(--muted)]">
                    No gallery images yet.
                  </div>
                )}
              </div>
            </div>

            <div className="surface-card rounded-[1.8rem] p-6">
              <label className="text-sm font-semibold text-[var(--foreground)]">
                YouTube links
              </label>
              <textarea
                value={youtubeText}
                onChange={(event) => setYoutubeText(event.target.value)}
                rows={4}
                className="mt-2 w-full rounded-[1.2rem] border border-[rgba(30,36,34,0.12)] bg-white px-4 py-3 text-[var(--foreground)]"
                placeholder="One YouTube link per line"
              />

              <label className="mt-5 block text-sm font-semibold text-[var(--foreground)]">
                Drive links
              </label>
              <textarea
                value={driveText}
                onChange={(event) => setDriveText(event.target.value)}
                rows={4}
                className="mt-2 w-full rounded-[1.2rem] border border-[rgba(30,36,34,0.12)] bg-white px-4 py-3 text-[var(--foreground)]"
                placeholder="One Google Drive link per line"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="surface-card rounded-[1.8rem] p-7">
          <div className="max-w-4xl">
            <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--accent)]">
              Preview
            </p>
            <h2 className="mt-4 text-4xl font-semibold text-[var(--foreground)]">
              {title || "Untitled blog"}
            </h2>
            <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
              {excerpt || "Add a short excerpt to preview the blog summary here."}
            </p>
            {coverImageUrl && (
              <img
                src={coverImageUrl}
                alt="Blog preview cover"
                className="mt-6 h-72 w-full rounded-[1.8rem] object-cover"
              />
            )}
            <div className="mt-8">
              <BlogContentBlocks content={content || "Start writing your blog content..."} />
            </div>

            {!!galleryImages.length && (
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {galleryImages.map((image) => (
                  <img
                    key={image.path}
                    src={image.url}
                    alt={image.name}
                    className="h-48 w-full rounded-[1.4rem] object-cover"
                  />
                ))}
              </div>
            )}

            {!!previewYoutubeLinks.length && (
              <div className="mt-8">
                <p className="text-sm font-semibold text-[var(--foreground)]">
                  YouTube links
                </p>
                <div className="mt-3 space-y-2">
                  {previewYoutubeLinks.map((link) => (
                    <a
                      key={link}
                      href={link}
                      target="_blank"
                      rel="noreferrer"
                      className="block text-sm font-medium text-[var(--brand)] underline-offset-4 hover:underline"
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {!!previewDriveLinks.length && (
              <div className="mt-8">
                <p className="text-sm font-semibold text-[var(--foreground)]">
                  Drive links
                </p>
                <div className="mt-3 space-y-2">
                  {previewDriveLinks.map((link) => (
                    <a
                      key={link}
                      href={link}
                      target="_blank"
                      rel="noreferrer"
                      className="block text-sm font-medium text-[var(--brand)] underline-offset-4 hover:underline"
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="surface-card rounded-[1.8rem] p-5">
        <div className="flex flex-wrap gap-3">
          {actionButtons.map((button) => (
            <button
              key={button.action}
              type="button"
              onClick={() => handleSave(button.action)}
              disabled={savingAction !== null}
              className={`rounded-full px-5 py-3 text-sm font-semibold ${
                button.action === "publish"
                  ? "bg-[var(--accent)] text-white"
                  : button.action === "reject"
                    ? "bg-[#9b4834] text-white"
                    : "bg-[var(--brand)] text-white"
              } disabled:opacity-60`}
            >
              {savingAction === button.action ? "Saving..." : button.label}
            </button>
          ))}

          {mode === "edit" && (
            <button
              type="button"
              onClick={() => handleSave("archive_to_draft")}
              disabled={savingAction !== null}
              className="rounded-full border border-[rgba(30,36,34,0.12)] bg-white px-5 py-3 text-sm font-semibold text-[var(--foreground)] disabled:opacity-60"
            >
              Move to draft
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
