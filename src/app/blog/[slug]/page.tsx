import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import BlogContentBlocks from "@/components/blog/BlogContentBlocks";
import { getPublishedBlogBySlug, getPublishedBlogs } from "@/lib/cmsData";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedBlogBySlug(slug);

  if (!post) {
    return { title: "Blog not found" };
  }

  return {
    title: post.title,
    description: post.excerpt || `Read ${post.title} on the Awish Clinic blog.`,
  };
}

export async function generateStaticParams() {
  const posts = await getPublishedBlogs();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPublishedBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="page-shell flex-1">
        <section className="section-shell">
          <div className="container-shell">
            <div className="mx-auto max-w-4xl">
              <span className="eyebrow">Awish Blog</span>
              <h1 className="mt-5 text-5xl font-semibold text-[var(--foreground)]">
                {post.title}
              </h1>
              <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
                {post.excerpt}
              </p>
              <p className="mt-5 text-sm uppercase tracking-[0.18em] text-[var(--muted)]">
                {new Date(post.published_at || post.created_at).toLocaleDateString("en-IN")} |{" "}
                {post.author_name || "Awish Clinic"}
              </p>
            </div>

            {post.cover_image_url && (
              <div className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-[2rem] border border-[rgba(30,36,34,0.08)]">
                <div className="relative h-[22rem] sm:h-[30rem]">
                  <Image
                    src={post.cover_image_url}
                    alt={post.title}
                    fill
                    sizes="(min-width: 1280px) 60vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            )}

            <article className="mx-auto mt-10 max-w-4xl space-y-10">
              <BlogContentBlocks content={post.content} />

              {!!post.gallery_image_urls.length && (
                <section>
                  <h2 className="text-3xl font-semibold text-[var(--foreground)]">
                    Blog gallery
                  </h2>
                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    {post.gallery_image_urls.map((image, index) => (
                      <div
                        key={`${image}-${index}`}
                        className="overflow-hidden rounded-[1.6rem] border border-[rgba(30,36,34,0.08)]"
                      >
                        <div className="relative h-64">
                          <Image
                            src={image}
                            alt={`${post.title} image ${index + 1}`}
                            fill
                            sizes="(min-width: 1024px) 32vw, 100vw"
                            className="object-cover"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {!!post.youtube_links.length && (
                <section>
                  <h2 className="text-3xl font-semibold text-[var(--foreground)]">
                    YouTube references
                  </h2>
                  <div className="mt-4 space-y-3">
                    {post.youtube_links.map((link) => (
                      <a
                        key={link}
                        href={link}
                        target="_blank"
                        rel="noreferrer"
                        className="block text-base font-medium text-[var(--brand)] underline-offset-4 hover:underline"
                      >
                        {link}
                      </a>
                    ))}
                  </div>
                </section>
              )}

              {!!post.drive_links.length && (
                <section>
                  <h2 className="text-3xl font-semibold text-[var(--foreground)]">
                    Additional resources
                  </h2>
                  <div className="mt-4 space-y-3">
                    {post.drive_links.map((link) => (
                      <a
                        key={link}
                        href={link}
                        target="_blank"
                        rel="noreferrer"
                        className="block text-base font-medium text-[var(--brand)] underline-offset-4 hover:underline"
                      >
                        {link}
                      </a>
                    ))}
                  </div>
                </section>
              )}
            </article>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
