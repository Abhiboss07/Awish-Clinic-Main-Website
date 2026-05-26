import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { getPublishedBlogs } from "@/lib/cmsData";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Read expert articles on skin care, hair loss, cosmetic surgery, weight management and dermatology tips from the doctors at Awish Clinic Delhi.",
};

export default async function BlogIndexPage() {
  const posts = await getPublishedBlogs();

  return (
    <>
      <Header />
      <main className="page-shell flex-1">
        <section className="section-shell relative min-h-[85vh] overflow-hidden">
          <Image
            src="/images/blogs/awish-blog-bg.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="container-shell relative z-10">
            <div>
              <span className="eyebrow">Awish Blog</span>
              <h1 className="mt-5 text-5xl font-semibold text-[var(--foreground)]">
                Articles on skin, hair and consultation planning
              </h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-[var(--muted)]">
                Published articles from the Awish admin panel will appear here after admin approval and publishing.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="surface-card overflow-hidden rounded-[1.8rem]"
                >
                  <div className="relative h-60">
                    {post.cover_image_url ? (
                      <Image
                        src={post.cover_image_url}
                        alt={post.title}
                        fill
                        sizes="(min-width: 1280px) 24vw, (min-width: 768px) 42vw, 100vw"
                        className="object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-[linear-gradient(135deg,#17312f_0%,#214d48_100%)]" />
                    )}
                  </div>
                  <div className="p-6">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
                      {new Date(post.published_at || post.created_at).toLocaleDateString("en-IN")}
                    </p>
                    <h2 className="mt-4 text-3xl font-semibold text-[var(--foreground)]">
                      {post.title}
                    </h2>
                    <p className="mt-4 text-base leading-8 text-[var(--muted)]">
                      {post.excerpt || "Read the full article on the Awish Clinic blog."}
                    </p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="mt-6 inline-flex text-sm font-semibold text-[var(--brand)]"
                    >
                      Read article
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {!posts.length && (
              <div className="surface-card mt-10 rounded-[1.8rem] p-8">
                <p className="text-base leading-8 text-[var(--muted)]">
                  No blog posts are published yet. As soon as the first article is approved and pushed live from the admin panel, it will appear here.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
