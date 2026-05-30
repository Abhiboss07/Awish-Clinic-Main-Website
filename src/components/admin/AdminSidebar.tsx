import Link from "next/link";
import type { AdminRole } from "@/lib/cms";
import AdminSignOutButton from "@/components/admin/AdminSignOutButton";

export default function AdminSidebar({
  role,
  name,
}: {
  role: AdminRole;
  name: string;
}) {
  const links = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/blogs", label: "Blogs" },
    ...(role === "admin"
      ? [{ href: "/admin/bookings", label: "Bookings" }]
      : []),
  ];

  return (
    <aside className="rounded-[2rem] border border-white/10 bg-[rgba(13,25,30,0.82)] p-6 text-white shadow-[0_24px_80px_rgba(8,14,18,0.26)] backdrop-blur">
      <p className="text-[11px] uppercase tracking-[0.24em] text-white/50">
        Awish admin
      </p>
      <h2 className="mt-3 font-[var(--font-display)] text-3xl font-semibold">
        Content & consultations
      </h2>
      <p className="mt-3 text-sm leading-7 text-white/68">
        Signed in as {name} | {role}
      </p>

      <div className="mt-8 space-y-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="block rounded-[1.2rem] border border-white/8 bg-white/4 px-4 py-3 text-sm font-semibold text-white/82 transition hover:bg-white/10 hover:text-white"
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-[1.4rem] border border-emerald-200/14 bg-emerald-400/10 p-4">
        <p className="text-[11px] uppercase tracking-[0.22em] text-emerald-100/62">
          Workflow
        </p>
        <p className="mt-3 text-sm leading-7 text-emerald-50">
          Writers prepare content. Admin reviews, approves and publishes it to the live blog.
        </p>
      </div>

      <div className="mt-8">
        <AdminSignOutButton />
      </div>
    </aside>
  );
}
