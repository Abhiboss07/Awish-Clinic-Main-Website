import Link from "next/link";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { requireAdminContext } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const context = await requireAdminContext();

  if (!context.configured) {
    return (
      <main className="min-h-screen bg-[var(--background)] px-4 py-12">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-[rgba(30,36,34,0.08)] bg-white p-8 shadow-[0_24px_70px_rgba(18,24,28,0.08)]">
          <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--accent)]">
            Supabase setup needed
          </p>
          <h1 className="mt-5 text-4xl font-semibold text-[var(--foreground)]">
            Configure Supabase to unlock the admin panel.
          </h1>
          <p className="mt-4 text-base leading-8 text-[var(--muted)]">
            Add the Supabase environment variables, run the schema SQL, create the first auth user, and set the user role in the `profiles` table.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex rounded-full bg-[var(--brand)] px-5 py-3 text-sm font-semibold text-white"
          >
            Back to website
          </Link>
        </div>
      </main>
    );
  }

  const role = context.profile!.role;
  const displayName =
    context.profile!.full_name || context.profile!.email || "Awish User";

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f6efe5_0%,#f3ebdf_100%)] px-4 py-8 lg:px-8">
      <div className="mx-auto grid max-w-[1600px] gap-6 xl:grid-cols-[16rem_1fr]">
        <div className="xl:sticky xl:top-8 xl:self-start">
          <AdminSidebar role={role} name={displayName} />
        </div>
        <div className="min-w-0">{children}</div>
      </div>
    </main>
  );
}
