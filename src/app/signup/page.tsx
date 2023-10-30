"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  async function onSignup() {
    try {
      const response = await axios.post("/api/user/signup", user);
      console.log("signup successfully", response);
      router.push("/login");
    } catch (error: any) {
      console.log("signup failed", error.message);
    }
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen space-y-5">
        <div className="">
          <h1 className="text-center">SIGNUP FORM</h1>
        </div>
        <div className="flex space-x-12 ">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            className="border-zinc-800"
            type="email"
            value={user.email}
            onChange={(e) => {
              setUser((prev) => {
                return { ...prev, email: e.target.value };
              });
            }}
          />
        </div>
        <div className="flex space-x-4">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            className="border-zinc-800"
            type="text"
            value={user.username}
            onChange={(e) => {
              setUser((prev) => {
                return { ...prev, username: e.target.value };
              });
            }}
          />
        </div>
        <div className="flex space-x-4">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            className="border-zinc-800"
            type="password"
            value={user.password}
            onChange={(e) => {
              setUser((prev) => {
                return { ...prev, password: e.target.value };
              });
            }}
          />
        </div>
        <div className="flex space-x-4">
          <button
            className="bg-blue-400 p-1 rounded-sm"
            onClick={onSignup}
            disabled={buttonDisabled}
          >
            SIGNUP
          </button>
        </div>
        <div className="flex space-x-4  bg-blue-400 p-1 rounded-sm">
          <Link href="/login">LOGIN HERE</Link>
        </div>
      </div>
    </>
  );
}
