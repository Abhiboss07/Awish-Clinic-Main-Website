import { redirect } from "next/navigation";
import { canManageBookings, requireAdminContext } from "@/lib/adminAuth";
import { formatDateTime } from "@/lib/cms";
import { getUpcomingBookings } from "@/lib/cmsData";

export default async function AdminBookingsPage() {
  const context = await requireAdminContext();

  if (!canManageBookings(context.profile!.role)) {
    redirect("/admin");
  }

  const bookings = await getUpcomingBookings();
  const scheduled = bookings.filter((item) => item.preferred_date && item.preferred_time);
  const enquiries = bookings.filter((item) => !item.preferred_date || !item.preferred_time);

  return (
    <div className="space-y-6">
      <section className="surface-card rounded-[1.8rem] p-7">
        <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--muted)]">
          Bookings
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-[var(--foreground)]">
          Upcoming meetings and consultation requests
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--muted)]">
          This view is backed by Supabase records from the public contact and appointment forms. Slot booking is capped at three requests per date and time combination.
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {[
          { label: "Total open records", value: bookings.length },
          { label: "Scheduled consultations", value: scheduled.length },
          { label: "General enquiries", value: enquiries.length },
        ].map((item) => (
          <div key={item.label} className="surface-card rounded-[1.6rem] p-5">
            <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--muted)]">
              {item.label}
            </p>
            <p className="mt-3 text-4xl font-semibold text-[var(--foreground)]">
              {item.value}
            </p>
          </div>
        ))}
      </section>

      <section className="surface-card rounded-[1.8rem] p-6">
        <h2 className="text-3xl font-semibold text-[var(--foreground)]">
          Scheduled consultations
        </h2>
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[rgba(30,36,34,0.08)] text-[var(--muted)]">
                <th className="pb-3 pr-4 font-semibold">Patient</th>
                <th className="pb-3 pr-4 font-semibold">Service</th>
                <th className="pb-3 pr-4 font-semibold">Slot</th>
                <th className="pb-3 pr-4 font-semibold">Contact</th>
                <th className="pb-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {scheduled.map((booking) => (
                <tr key={booking.id} className="border-b border-[rgba(30,36,34,0.06)]">
                  <td className="py-4 pr-4">
                    <p className="font-semibold text-[var(--foreground)]">{booking.name}</p>
                    <p className="text-[var(--muted)]">{booking.source}</p>
                  </td>
                  <td className="py-4 pr-4 text-[var(--foreground)]">
                    {booking.service || "General consultation"}
                  </td>
                  <td className="py-4 pr-4 text-[var(--foreground)]">
                    {formatDateTime(booking.preferred_date, booking.preferred_time)}
                  </td>
                  <td className="py-4 pr-4 text-[var(--foreground)]">
                    {booking.phone}
                    {booking.email ? <span className="block text-[var(--muted)]">{booking.email}</span> : null}
                  </td>
                  <td className="py-4">
                    <span className="rounded-full bg-[var(--surface-strong)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground)]">
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {!scheduled.length && (
            <p className="rounded-[1.3rem] border border-dashed border-[rgba(30,36,34,0.14)] bg-white px-4 py-8 text-sm text-[var(--muted)]">
              No scheduled consultations are visible yet.
            </p>
          )}
        </div>
      </section>

      <section className="surface-card rounded-[1.8rem] p-6">
        <h2 className="text-3xl font-semibold text-[var(--foreground)]">
          General enquiries
        </h2>
        <div className="mt-5 space-y-3">
          {enquiries.map((booking) => (
            <div
              key={booking.id}
              className="rounded-[1.3rem] border border-[rgba(30,36,34,0.08)] bg-white p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-[var(--foreground)]">{booking.name}</p>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    {booking.service || "General consultation enquiry"}
                  </p>
                </div>
                <p className="text-sm text-[var(--muted)]">{booking.phone}</p>
              </div>
              {booking.message && (
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                  {booking.message}
                </p>
              )}
            </div>
          ))}

          {!enquiries.length && (
            <p className="rounded-[1.3rem] border border-dashed border-[rgba(30,36,34,0.14)] bg-white px-4 py-8 text-sm text-[var(--muted)]">
              No unscheduled enquiries are visible right now.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
