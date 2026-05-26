import Link from "next/link";
import { requireAdminContext } from "@/lib/adminAuth";
import { buildBlogStatusLabel } from "@/lib/cms";
import { getAdminBlogs } from "@/lib/cmsData";

export default async function AdminBlogsPage() {
  const context = await requireAdminContext();
  const posts = await getAdminBlogs(context.profile!.role, context.user!.id);

  return (
    <div className="space-y-6">
      <section className="surface-card rounded-[1.8rem] p-7">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--muted)]">
              Blog manager
            </p>
            <h1 className="mt-4 text-4xl font-semibold text-[var(--foreground)]">
              Draft, review and publish clinic content
            </h1>
          </div>
          <Link
            href="/admin/blogs/new"
            className="rounded-full bg-[var(--brand)] px-5 py-3 text-sm font-semibold text-white"
          >
            Create blog
          </Link>
        </div>
      </section>

      <section className="surface-card rounded-[1.8rem] p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[rgba(30,36,34,0.08)] text-[var(--muted)]">
                <th className="pb-3 pr-4 font-semibold">Title</th>
                <th className="pb-3 pr-4 font-semibold">Author</th>
                <th className="pb-3 pr-4 font-semibold">Status</th>
                <th className="pb-3 pr-4 font-semibold">Updated</th>
                <th className="pb-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b border-[rgba(30,36,34,0.06)]">
                  <td className="py-4 pr-4">
                    <p className="font-semibold text-[var(--foreground)]">{post.title}</p>
                    <p className="mt-1 text-[var(--muted)]">{post.slug}</p>
                  </td>
                  <td className="py-4 pr-4 text-[var(--foreground)]">
                    {post.author_name || "Awish writer"}
                  </td>
                  <td className="py-4 pr-4">
                    <span className="rounded-full bg-[var(--surface-strong)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground)]">
                      {buildBlogStatusLabel(post.status)}
                    </span>
                  </td>
                  <td className="py-4 pr-4 text-[var(--foreground)]">
                    {new Date(post.updated_at).toLocaleDateString("en-IN")}
                  </td>
                  <td className="py-4">
                    <Link
                      href={`/admin/blogs/${post.id}`}
                      className="text-sm font-semibold text-[var(--brand)]"
                    >
                      Open editor
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {!posts.length && (
            <p className="rounded-[1.3rem] border border-dashed border-[rgba(30,36,34,0.14)] bg-white px-4 py-8 text-sm text-[var(--muted)]">
              No blog posts yet.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
