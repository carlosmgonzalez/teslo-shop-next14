import { auth } from "@/auth";
import { Title } from "@/components";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
	const session = await auth();

	if (!session?.user) return redirect("/");

	return (
		<div>
			<Title title="Perfil" />
			<pre>{JSON.stringify(session?.user, null, 2)}</pre>
		</div>
	);
}
