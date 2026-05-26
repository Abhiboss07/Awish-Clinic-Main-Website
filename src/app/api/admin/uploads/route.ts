import { NextResponse } from "next/server";
import { getApiAdminContext, jsonError } from "@/lib/adminApi";

export async function POST(request: Request) {
  const context = await getApiAdminContext();

  if (!context.configured) {
    return jsonError("Supabase is not configured yet.", 503);
  }

  if (!context.user || !context.profile) {
    return jsonError("Please sign in to continue.", 401);
  }

  const formData = await request.formData();
  const files = formData
    .getAll("files")
    .filter((entry): entry is File => entry instanceof File);

  if (!files.length) {
    return jsonError("Please choose at least one image.", 400);
  }

  const uploaded: { url: string; path: string; name: string }[] = [];

  for (const file of files) {
    const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const sanitizedName = file.name
      .replace(/\.[^.]+$/, "")
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    const path = `blogs/${context.user.id}/${Date.now()}-${sanitizedName}.${extension}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const { error } = await context.service!.storage
      .from("blog-media")
      .upload(path, buffer, {
        contentType: file.type || "image/jpeg",
        upsert: false,
      });

    if (error) {
      return jsonError("Image upload failed.", 500);
    }

    const {
      data: { publicUrl },
    } = context.service!.storage.from("blog-media").getPublicUrl(path);

    uploaded.push({
      url: publicUrl,
      path,
      name: file.name,
    });
  }

  return NextResponse.json({ success: true, files: uploaded });
}
