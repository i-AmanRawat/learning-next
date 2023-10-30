"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [buttonDisabled, setButtonDisabled] = useState(true);

  async function onLogin() {
    try {
      const response = await axios.post("/api/user/login", user);
      console.log("Login successful ", response.data);
      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed ", error.message);
    }
  }

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.username.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen space-y-5">
        <div className="">
          <h1 className="text-center">LOGIN FORM</h1>
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
            onClick={onLogin}
            disabled={buttonDisabled}
          >
            LOGIN
          </button>
        </div>
        <div className="flex space-x-4">
          <span>Already have an account? </span>
          <div className="flex space-x-4  bg-blue-400 p-1 rounded-sm">
            <Link href="/signup">SIGNUP HERE</Link>
          </div>
        </div>
      </div>
    </>
  );
}
