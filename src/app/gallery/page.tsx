import WeddingWebsite from "@/components/WeddingWebsite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Gallery() {
	const cookieStore = await cookies();
	const auth = cookieStore.get("wedding_auth");
	if (!auth || auth.value !== "authenticated") {
		redirect("/");
	}

	return <WeddingWebsite />;
}
