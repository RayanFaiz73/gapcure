import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function page() {
    const session = await getServerSession();
    if(!session || !session.user) {
        redirect("/login");
    }
    return (
        <div>
            This is a protected router.
            <br />
            You will only see this if you are authenticated.
        </div>
    )
}
