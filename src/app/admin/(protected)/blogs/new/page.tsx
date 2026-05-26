import AdminBlogEditor from "@/components/admin/AdminBlogEditor";
import { requireAdminContext } from "@/lib/adminAuth";

export default async function NewAdminBlogPage() {
  const context = await requireAdminContext();

  return (
    <div className="space-y-6">
      <section className="surface-card rounded-[1.8rem] p-7">
        <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--muted)]">
          New blog
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-[var(--foreground)]">
          Write a new blog draft
        </h1>
      </section>
      <AdminBlogEditor mode="create" role={context.profile!.role} />
    </div>
  );
}
