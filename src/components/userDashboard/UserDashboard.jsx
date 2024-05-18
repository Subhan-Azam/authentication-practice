"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function UserDashboard() {
  const { data: session } = useSession();
  console.log("session=====", session);

  const router = useRouter();

  const logOut = async (e) => {
    e.preventDefault();
    try {
      await signOut();
      router.replace("/login");
      
    } catch (error) {
      console.log('error=======', error)
    }
  };

  return (
    <div className=" px-7 py-8 space-y-4">
      <h1 className="text-2xl font-bold">User LogOut</h1>
      <div>
        <b>Name: </b>
        <span>{session?.user?.name}</span>
      </div>
      <div>
        <b> Email:</b>
        <span>{session?.user?.email}</span>
      </div>
      <button
        onClick={logOut}
        className="mb-3 w-full py-2 text-lg font-semibold rounded-lg text-white bg-red-600"
      >
        LogOut
      </button>
    </div>
  );
}
