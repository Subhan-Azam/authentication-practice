"use client";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

export default function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const router = useRouter();

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      //   if (!email || !password) {
      //     setError("All fields are necessary");
      //     return;
      //   } else {
      //     setError("");
      //   }
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res.error) {
        setError("Invalid Credential");
        return;
      } 
      router.replace("dashboard");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <div className="grid place-items-center mx-10 lg:mx-0 h-screen">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-2xl rounded-xl h-auto max-w-[400px] w-full p-7 border-t-4 bg-zinc-300/10 border-green-500">
          <h1 className="font-bold text-2xl">LogIn</h1>
          <form className="flex flex-col gap-6 my-4">
            <div>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 border-2 border-gray-300 rounded-lg w-full"
                type="email"
                placeholder="Email"
              />
            </div>

            <div>
              <div className="flex items-center justify-between p-2 border-2 border-gray-300 rounded-lg">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="outline-none w-full"
                  type={`${showPass ? "text" : "password"}`}
                  placeholder="Password"
                />
                <div
                  onClick={() => setShowPass(!showPass)}
                  className="cursor-pointer"
                >
                  {showPass ? (
                    <FontAwesomeIcon className="mr-2" icon={faEye} />
                  ) : (
                    <FontAwesomeIcon className="mr-2" icon={faEyeSlash} />
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={loginHandler}
              className="py-2 text-lg font-semibold rounded-lg bg-green-500"
            >
              LogIn
            </button>

            {error && (
              <div className="bg-red-600 text-sm text-white w-fit rounded-lg px-4 py-1">
                {error}
              </div>
            )}

            <div className="text-right">
              <span>Don't have an account?</span>
              <Link href={"registration"}>
                <span className="underline ml-3 hover:decoration-blue-800 hover:text-blue-800">
                  Register
                </span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
