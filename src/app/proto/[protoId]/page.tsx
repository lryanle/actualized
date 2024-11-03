import ClientPage from "./client-page";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Page() {
	// const supabase = await createClient();

	// const { data, error } = await supabase.auth.getUser();
	// if (error || !data?.user) {
	// 	console.log("[Doing Redirect] error Value: ", error);
	// 	console.log("[Doing Redirect] data Value: ", data);
	// 	redirect("/sign-in");
	// }

	return <ClientPage />;
}
