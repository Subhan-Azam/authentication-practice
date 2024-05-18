"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

export default function UserRegistration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errorInEmail, setErrorInEmail] = useState("");
  const [errorInPass, setErrorInPass] = useState("");
  const [showPass, setShowPass] = useState(false);

  const router = useRouter();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const minLength = 7;
  const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;

  const submitHandler = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("All fields are necessary");
      return;
    } else {
      setError("");
    }

    // email validation
    if (!emailRegex.test(email)) {
      setErrorInEmail("Please provide correct email");
      return;
    } else {
      setErrorInEmail("");
    }

    // Minimum Length in password
    if (password.length < minLength) {
      setErrorInPass("Minimum 7 characters.");
      return;
    }

    // special character in password
    if (!specialCharacterRegex.test(password)) {
      setErrorInPass("Minimum 1 special character.");
      return;
    }
    setErrorInPass("");

    // remove more than one spaces b/t words
    const normalizeSpaces = (str) => {
      return str.replace(/\s+/g, " ").trim();
    };

    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        name: normalizeSpaces(name),
        email: normalizeSpaces(email),
        password: password,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("/api/signUp", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
    } catch (error) {
      console.log("error========", error);
    } finally {
      setName("");
      setEmail("");
      setPassword("");
      setError("");
      setErrorInEmail("");
      setErrorInPass("");
      alert("Data successfully saved");
      router.push("/login");
    }
  };

  return (
    <>
      <div className="grid place-items-center mx-10 lg:mx-0 h-screen">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-2xl rounded-xl h-auto max-w-[400px] w-full p-7 border-t-4 bg-zinc-300/10 border-green-500">
          <h1 className="font-bold text-2xl">Registration</h1>
          <form className="flex flex-col gap-6 my-4">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 border-2 border-gray-300 rounded-lg"
              type="text"
              placeholder="Full Name"
            />

            <div>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 border-2 border-gray-300 rounded-lg w-full"
                type="email"
                placeholder="Email"
              />
              {errorInEmail && (
                <div className="text-right mr-2 text-red-600 text-sm">
                  {errorInEmail}
                </div>
              )}
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
              {errorInPass && (
                <div className="text-right mr-2 text-red-600 text-sm">
                  {errorInPass}
                </div>
              )}
            </div>
            <button
              onClick={submitHandler}
              className="py-2 text-lg font-semibold rounded-lg bg-green-500"
            >
              Registration
            </button>

            {error && (
              <div className="bg-red-600 text-sm text-white w-fit rounded-lg px-4 py-1">
                {error}
              </div>
            )}

            <div className="text-right">
              <span>Already have an account?</span>
              <Link href={"login"}>
                <span className="underline ml-3 hover:decoration-blue-800 hover:text-blue-800">
                  LogIn
                </span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
