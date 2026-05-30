import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { services } from "@/data/services";
import { getSupabasePublicConfig } from "@/lib/supabase/config";

const MAIN_DOMAINS = ["awishclinic.com", "www.awishclinic.com", "awnish-one.vercel.app"];

function copyCookies(source: NextResponse, target: NextResponse) {
  source.cookies.getAll().forEach((cookie) => {
    target.cookies.set(cookie.name, cookie.value);
  });
}

export async function proxy(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const url = request.nextUrl.clone();
  const hostname = host.split(":")[0];
  const response = NextResponse.next({ request });
  const supabaseConfig = getSupabasePublicConfig();

  if (supabaseConfig) {
    const supabase = createServerClient(
      supabaseConfig.url,
      supabaseConfig.anonKey,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              request.cookies.set(name, value);
              response.cookies.set(name, value, options);
            });
          },
        },
      }
    );

    await supabase.auth.getUser();
  }

  let subdomain: string | null = null;

  if (hostname === "localhost" || hostname === "127.0.0.1") {
    subdomain = null;
  } else if (hostname.endsWith(".localhost")) {
    const parts = hostname.split(".");
    if (parts.length > 1 && parts[0] !== "www") {
      subdomain = parts[0];
    }
  } else if (hostname.endsWith(".vercel.app")) {
    subdomain = null;
  } else {
    if (!MAIN_DOMAINS.includes(hostname)) {
      const parts = hostname.split(".");
      if (parts.length >= 3 && parts[0] !== "www") {
        subdomain = parts[0];
      }
    }
  }

  if (!subdomain) {
    return response;
  }

  const service = services.find((item) => item.subdomain === subdomain);

  if (service) {
    url.pathname = `/landing/${service.slug}`;
    const rewritten = NextResponse.rewrite(url);
    copyCookies(response, rewritten);
    return rewritten;
  }

  const mainUrl = new URL(request.url);
  mainUrl.hostname = MAIN_DOMAINS[0];
  mainUrl.pathname = "/";
  const redirected = NextResponse.redirect(mainUrl);
  copyCookies(response, redirected);
  return redirected;
}

export const config = {
  matcher: [
    "/((?!_next|api|favicon\\.ico|images|brand|fonts|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2|ttf|eot|webmanifest)).*)",
  ],
};
