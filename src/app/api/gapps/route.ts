import { NextResponse } from "next/server";

export async function GET(request: Request) {
	const baseUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
	if (!baseUrl) {
		return NextResponse.json({ ok: false, error: "Server not configured" }, { status: 500 });
	}
	try {
		const url = new URL(request.url);
		const forwardUrl = `${baseUrl}?${url.searchParams.toString()}`;
		const res = await fetch(forwardUrl, { method: "GET", cache: "no-store" });
		const contentType = res.headers.get("content-type") || "application/json";
		const text = await res.text();
		return new NextResponse(text, { status: res.status, headers: { "content-type": contentType } });
	} catch (e) {
		return NextResponse.json({ ok: false, error: "Upstream error" }, { status: 502 });
	}
}

export async function POST(request: Request) {
	const baseUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
	if (!baseUrl) {
		return NextResponse.json({ ok: false, error: "Server not configured" }, { status: 500 });
	}
	try {
		// If clients post JSON/form, convert to GET with querystring since GAS often expects GET
		const contentType = request.headers.get("content-type") || "";
		let forwardUrl = baseUrl;
		if (contentType.includes("application/json")) {
			const json = await request.json().catch(() => ({} as Record<string, string>));
			const params = new URLSearchParams(json as Record<string, string>);
			forwardUrl = `${baseUrl}?${params.toString()}`;
		} else if (contentType.includes("application/x-www-form-urlencoded")) {
			const text = await request.text();
			forwardUrl = `${baseUrl}?${text}`;
		} else {
			// Fallback: pass-through as GET without params
			const url = new URL(request.url);
			forwardUrl = `${baseUrl}?${url.searchParams.toString()}`;
		}

		const res = await fetch(forwardUrl, { method: "GET", cache: "no-store" });
		const resType = res.headers.get("content-type") || "application/json";
		const text = await res.text();
		return new NextResponse(text, { status: res.status, headers: { "content-type": resType } });
	} catch (e) {
		return NextResponse.json({ ok: false, error: "Upstream error" }, { status: 502 });
	}
}
