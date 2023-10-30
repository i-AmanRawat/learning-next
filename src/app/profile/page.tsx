"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfileHomePage() {
  const router = useRouter();
  const [id, setId] = useState("");

  async function onLogout() {
    try {
      await axios.get("/api/user/logout");
      router.push("/login");
      console.log("logged out successfully");
    } catch (error: any) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("api/user/me");

        console.log(response.data.user._id);
        setId(response.data.user._id);
      } catch (error: any) {
        console.log(error.message);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="flex flex-col h-screen justify-center items-center ">
      <div className="">
        <h1 className="bg-orange-400 rounded-md px-4 py-2">
          PROFILE HOME PAGE
        </h1>
      </div>
      <br />
      <div className="">
        {id ? (
          <Link
            className="px-4 py-2 rounded-md bg-blue-700 text-white hover:bg-gray-600"
            href={`/profile/${id}`}
          >
            {id}
          </Link>
        ) : (
          "User Id not found!"
        )}
      </div>
      <br />
      <div className="">
        <button
          className="px-4 py-2 rounded-md bg-blue-700 text-white hover:bg-gray-600"
          onClick={onLogout}
        >
          logout
        </button>
      </div>
    </div>
  );
}
