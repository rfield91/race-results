import { NextRequest, NextResponse } from "next/server";
import { isValidTenant } from "./lib/tenants";

export function proxy(req: NextRequest) {
  const url = req.nextUrl;
  const host = req.headers.get("host") || "";
  const pathParts = url.pathname.split("/").filter(Boolean);

  let tenant = "global";

  // Subdomain strategy (for custom domain later)
  const subdomain = host.split(".")[0];
  const isSubdomainTenant =
    !host.includes("vercel.app") &&
    subdomain !== "www" &&
    subdomain !== "localhost";

  if (isSubdomainTenant) {
    tenant = subdomain;
  }

  // Path fallback strategy (for vercel.app URLs)
  if (pathParts[0] === "t" && pathParts[1]) {
    tenant = pathParts[1];
  }

  if (!isValidTenant(tenant)) {
    url.pathname = "/tenant-not-found";
    return NextResponse.rewrite(url);
  }

  const res = NextResponse.next();
  res.headers.set("x-tenant-slug", tenant);

  return res;
}

export const config = {
  matcher: ["/((?!_next|static|favicon.ico).*)"]
};