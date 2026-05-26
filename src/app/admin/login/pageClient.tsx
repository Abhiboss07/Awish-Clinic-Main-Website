"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function AdminLoginForm({ configured }: { configured: boolean }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const supabase = createSupabaseBrowserClient();

    if (!supabase) {
      setError("Supabase is not configured yet.");
      return;
    }

    setLoading(true);
    setError(null);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#0b1518_0%,#102220_100%)] px-4 py-12">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[2.2rem] border border-white/10 bg-[rgba(255,255,255,0.06)] p-8 text-white shadow-[0_30px_90px_rgba(5,12,16,0.32)] backdrop-blur">
          <p className="text-[11px] uppercase tracking-[0.24em] text-white/55">
            Awish admin
          </p>
          <h1 className="mt-5 font-[var(--font-display)] text-5xl font-semibold leading-tight">
            Manage blogs, approvals and consultation visibility from one place.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-white/74">
            Writers can prepare drafts and submit them for review. Admins can approve, publish and monitor upcoming consultation bookings.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              "RBAC with admin and writer roles",
              "Blog publishing workflow with approval gates",
              "Upcoming consultation and booking view",
              "Image uploads plus YouTube and Drive link support",
            ].map((item) => (
              <div
                key={item}
                className="rounded-[1.4rem] border border-white/10 bg-white/6 px-4 py-4 text-sm leading-7 text-white/82"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2.2rem] border border-white/10 bg-[rgba(255,253,249,0.98)] p-8 shadow-[0_30px_90px_rgba(5,12,16,0.22)]">
          <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--accent)]">
            Secure sign in
          </p>
          <h2 className="mt-4 text-4xl font-semibold text-[var(--foreground)]">
            Admin access
          </h2>
          <p className="mt-4 text-base leading-8 text-[var(--muted)]">
            Use a Supabase Auth user account. Create users and assign `admin` or `writer` roles in the `profiles` table.
          </p>

          {configured && (
            <div className="mt-6 rounded-[1.4rem] border border-[rgba(33,77,72,0.18)] bg-[rgba(223,232,229,0.72)] px-4 py-4 text-sm leading-7 text-[var(--brand)]">
              Supabase is configured on the current server. You can sign in with a Supabase Auth email and password.
            </div>
          )}

          {!configured && (
            <div className="mt-6 rounded-[1.4rem] border border-[#e8b5a6] bg-[#fff4ef] px-4 py-4 text-sm leading-7 text-[#9b4834]">
              Supabase environment variables are missing on the current server process. If you added `.env.local` recently, restart the dev server and reload this page.
            </div>
          )}

          {searchParams.get("error") === "profile-missing" && (
            <div className="mt-6 rounded-[1.4rem] border border-[#e8b5a6] bg-[#fff4ef] px-4 py-4 text-sm leading-7 text-[#9b4834]">
              Your auth user exists, but no matching `profiles` row was found. Run the Supabase setup SQL and assign a role.
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="text-sm font-semibold text-[var(--foreground)]">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 w-full rounded-[1.2rem] border border-[rgba(30,36,34,0.12)] bg-white px-4 py-3 text-[var(--foreground)]"
                placeholder="admin@awishclinic.com"
                required
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-[var(--foreground)]">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-2 w-full rounded-[1.2rem] border border-[rgba(30,36,34,0.12)] bg-white px-4 py-3 text-[var(--foreground)]"
                placeholder="Enter your password"
                required
              />
            </div>

            {error && (
              <div className="rounded-[1.2rem] border border-[#e8b5a6] bg-[#fff4ef] px-4 py-3 text-sm text-[#9b4834]">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={!configured || loading}
              className="w-full rounded-full bg-[var(--brand)] px-6 py-3.5 text-base font-semibold text-white disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
