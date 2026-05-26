import Link from "next/link";
import { canManageBookings, requireAdminContext } from "@/lib/adminAuth";
import { getAdminBlogs, getUpcomingBookings } from "@/lib/cmsData";

export default async function AdminDashboardPage() {
  const context = await requireAdminContext();
  const blogs = await getAdminBlogs(context.profile!.role, context.user!.id);
  const bookings = canManageBookings(context.profile!.role)
    ? await getUpcomingBookings()
    : [];

  const pendingReview = blogs.filter((post) => post.status === "in_review").length;
  const published = blogs.filter((post) => post.status === "published").length;

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] bg-[linear-gradient(135deg,#17312f_0%,#214d48_100%)] p-7 text-white shadow-[0_26px_80px_rgba(10,18,22,0.18)]">
        <p className="text-[11px] uppercase tracking-[0.24em] text-white/60">
          Admin dashboard
        </p>
        <h1 className="mt-4 font-[var(--font-display)] text-5xl font-semibold">
          Run Awish content and bookings from one place.
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-white/74">
          This panel is wired for Supabase-backed blog management, role-based approvals and consultation visibility.
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {[
          { label: "Your blog posts", value: blogs.length.toString() },
          { label: "Awaiting review", value: pendingReview.toString() },
          { label: "Published", value: published.toString() },
        ].map((item) => (
          <div key={item.label} className="surface-card rounded-[1.8rem] p-6">
            <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--muted)]">
              {item.label}
            </p>
            <p className="mt-3 text-4xl font-semibold text-[var(--foreground)]">
              {item.value}
            </p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <div className="surface-card rounded-[1.8rem] p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--muted)]">
                Blogs
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-[var(--foreground)]">
                Recent content workflow
              </h2>
            </div>
            <Link
              href="/admin/blogs/new"
              className="rounded-full bg-[var(--brand)] px-4 py-2 text-sm font-semibold text-white"
            >
              New blog
            </Link>
          </div>

          <div className="mt-6 space-y-3">
            {blogs.slice(0, 6).map((post) => (
              <Link
                key={post.id}
                href={`/admin/blogs/${post.id}`}
                className="block rounded-[1.3rem] border border-[rgba(30,36,34,0.08)] bg-white px-4 py-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-[var(--foreground)]">
                      {post.title}
                    </p>
                    <p className="mt-1 text-sm text-[var(--muted)]">
                      {post.slug}
                    </p>
                  </div>
                  <span className="rounded-full bg-[var(--surface-strong)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground)]">
                    {post.status}
                  </span>
                </div>
              </Link>
            ))}

            {!blogs.length && (
              <p className="rounded-[1.3rem] border border-dashed border-[rgba(30,36,34,0.14)] bg-white px-4 py-8 text-sm text-[var(--muted)]">
                No blogs yet. Start by creating your first post.
              </p>
            )}
          </div>
        </div>

        <div className="surface-card rounded-[1.8rem] p-6">
          <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--muted)]">
            Consultations
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-[var(--foreground)]">
            Upcoming visibility
          </h2>
          {canManageBookings(context.profile!.role) ? (
            <>
              <p className="mt-3 text-base leading-8 text-[var(--muted)]">
                Scheduled consultations and general enquiries become visible here for admins.
              </p>
              <div className="mt-5 space-y-3">
                {bookings.slice(0, 5).map((booking) => (
                  <div
                    key={booking.id}
                    className="rounded-[1.3rem] border border-[rgba(30,36,34,0.08)] bg-white px-4 py-4"
                  >
                    <p className="font-semibold text-[var(--foreground)]">
                      {booking.name}
                    </p>
                    <p className="mt-1 text-sm text-[var(--muted)]">
                      {booking.service || "General enquiry"}
                    </p>
                    <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[var(--accent)]">
                      {booking.preferred_date
                        ? `${booking.preferred_date}${booking.preferred_time ? ` | ${booking.preferred_time}` : ""}`
                        : "No preferred slot shared"}
                    </p>
                  </div>
                ))}
              </div>
              <Link
                href="/admin/bookings"
                className="mt-6 inline-flex rounded-full border border-[rgba(30,36,34,0.12)] bg-white px-4 py-2 text-sm font-semibold text-[var(--foreground)]"
              >
                Open bookings view
              </Link>
            </>
          ) : (
            <p className="mt-3 text-base leading-8 text-[var(--muted)]">
              Writers can manage drafts and review-ready blogs here. Booking visibility is limited to admins.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
