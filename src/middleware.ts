import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken")?.value;

  //if if the user is connected but tries to acces the log in page or  the sign up page redirect to home page
  if (token && req.nextUrl.pathname.startsWith("/userpages/LogIn")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (token && req.nextUrl.pathname.startsWith("/userpages/SignIn")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!token && req.nextUrl.pathname.startsWith("/userpages/Profile")) {
    return NextResponse.redirect(new URL("/userpages/LogIn", req.url));
  }

  if (!token && req.nextUrl.pathname.startsWith("/userpages/CheckOut")) {
    return NextResponse.redirect(new URL("/userpages/LogIn", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/userpages/:path* ",
};
