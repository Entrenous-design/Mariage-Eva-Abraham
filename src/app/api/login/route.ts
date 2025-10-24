import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		const { password } = await request.json();
		const correct = process.env.WEDDING_PASSWORD; // server-only, not exposed to client
		if (!correct) {
			return NextResponse.json({ ok: false, error: "Server not configured" }, { status: 500 });
		}
		if (password !== correct) {
			return NextResponse.json({ ok: false, error: "Invalid password" }, { status: 401 });
		}

		const res = NextResponse.json({ ok: true });
		// Set HttpOnly auth cookie (1 day)
		res.cookies.set("wedding_auth", "authenticated", {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			maxAge: 60 * 60 * 24,
			path: "/",
			sameSite: "lax",
		});
		return res;
	} catch (e) {
		return NextResponse.json({ ok: false, error: "Bad request" }, { status: 400 });
	}
}
