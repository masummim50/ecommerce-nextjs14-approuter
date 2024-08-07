import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

import { NextRequest, NextResponse } from "next/server";

interface decoded {
  id: string;
  name: string;
  email: string;
  role: string;
  exp: number;
}
// this is the previous middleware

// export async function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;
//   const cookie = request.cookies.get("accessToken");
//   const token = cookie?.value;
//   const publicRoutes = ["/"];
//   const userRoutes = ["/user"];
//   const sellerRoutes = ["/seller"];
//   if (token) {
//     const user = jwtDecode(token) as decoded;
//     if (user.role === "seller") {
//       if (sellerRoutes.includes(pathname) || publicRoutes.includes(pathname)) {
//         return NextResponse.next();
//       } else {
//         return NextResponse.redirect(new URL("/seller", request.url));
//       }
//     } else if (user.role === "customer") {
//       if (userRoutes.includes(pathname) || publicRoutes.includes(pathname)) {
//         return NextResponse.next();
//       } else {
//         return NextResponse.redirect(new URL("/user", request.url));
//       }
//     }
//   } else {
//     if (!userRoutes.includes(pathname) && !sellerRoutes.includes(pathname)) {
//       return NextResponse.next();
//     } else {
//       return NextResponse.redirect(new URL("/login", request.url));
//     }
//   }
// }

// updated middleware
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookie = request.cookies.get("accessToken");
  const token = cookie?.value;
  const publicRoutes = ["/"];
  const userRoutes = ["/user"];
  const sellerRoutes = ["/seller"];
  if (token) {
    const user = jwtDecode(token) as decoded;
    if (user.role === "seller") {
      if (!pathname.startsWith("/user")) {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/seller", request.url));
      }
    } else if (user.role === "customer") {
      if (!pathname.startsWith("/seller")) {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/user", request.url));
      }
    }
  } else {
    if (!pathname.startsWith("/user") && !pathname.startsWith("/seller")) {
      return NextResponse.next();
    } else {
      // return NextResponse.redirect(new URL("/login", request.url));
      // change below line to send some extra param to login
      return NextResponse.redirect(new URL(`/login`, request.url));
    }
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
