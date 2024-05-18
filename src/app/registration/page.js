import UserRegistration from "@/components/userRegistration/UserRegistration";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Page() {
  const session = await getServerSession(authOptions)
  console.log('sessionPage====', session)
  if (session) {
   redirect("/dashboard")
  }
  return (
    <div>
      <UserRegistration />
    </div>
  );
}
