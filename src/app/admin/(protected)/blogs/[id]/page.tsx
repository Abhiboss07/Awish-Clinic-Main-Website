import { redirect } from "next/navigation";
import AdminBlogEditor from "@/components/admin/AdminBlogEditor";
import { canEditBlog, requireAdminContext } from "@/lib/adminAuth";
import { getAdminBlogById } from "@/lib/cmsData";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminBlogDetailPage({ params }: PageProps) {
  const { id } = await params;
  const context = await requireAdminContext();
  const post = await getAdminBlogById(id);

  if (!post) {
    redirect("/admin/blogs");
  }

  if (
    !canEditBlog(context.profile!.role, context.user!.id, post.author_id)
  ) {
    redirect("/admin/blogs");
  }

  return (
    <div className="space-y-6">
      <section className="surface-card rounded-[1.8rem] p-7">
        <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--muted)]">
          Edit blog
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-[var(--foreground)]">
          {post.title}
        </h1>
      </section>
      <AdminBlogEditor
        mode="edit"
        role={context.profile!.role}
        initialPost={post}
      />
    </div>
  );
}
