import { NextResponse } from "next/server";
import * as jose from "jose";

const verifyJwt = async (token) => {
  if (!token) {
    return false;
  }

  try {
    const secretKey = new TextEncoder().encode(process.env.SECRET);
    await jose.jwtVerify(token, secretKey);
    return true;
  } catch (error) {
    console.error("JWT verification error:", error);
    return false;
  }
};

export async function middleware(req) {
  let token = req.cookies.get("token")?.value;

  const {
    nextUrl: { pathname },
  } = req;

  if (["/", "/:path*"].includes(pathname) && !(await verifyJwt(token))) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  if (pathname.startsWith("/auth") && (await verifyJwt(token))) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [`/((?!api|_next/static|_next/image|media).*)`],
};
