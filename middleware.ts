import { NextRequest, NextResponse } from "next/server";

function isPublicPath(pathname: string): boolean {
	// Allow the login page and common public assets
	if (pathname === "/") return true;
	if (pathname.startsWith("/_next")) return true;
	if (pathname.startsWith("/api")) return true; // keep APIs accessible or adjust if needed
	if (pathname === "/favicon.ico") return true;
	if (pathname === "/robots.txt" || pathname === "/sitemap.xml") return true;
	// Allow direct access to files in public/ (images, fonts, etc.)
	if (/\.(?:png|jpg|jpeg|gif|svg|webp|ico|css|js|woff2?|ttf|otf)$/i.test(pathname)) return true;
	return false;
}

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const authCookie = request.cookies.get("wedding_auth");
	const isAuthed = !!authCookie && authCookie.value === "authenticated";

	// If user is authenticated and tries to open the login page, send to gallery
	if (isAuthed && pathname === "/") {
		const url = request.nextUrl.clone();
		url.pathname = "/gallery";
		return NextResponse.redirect(url);
	}

	// Block all non-public paths when not authenticated
	if (!isAuthed && !isPublicPath(pathname)) {
		// Avoid redirect loops by checking if we're already on the login page
		if (pathname !== "/") {
			const url = request.nextUrl.clone();
			url.pathname = "/";
			url.search = ""; // drop query to avoid loops
			return NextResponse.redirect(url);
		}
	}

	return NextResponse.next();
}

export const config = {
	// Run on all paths so we can gate everything except public assets
	matcher: ["/:path*"],
};
