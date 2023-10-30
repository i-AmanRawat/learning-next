import { NextRequest, NextResponse } from "next/server";
import { decryptJwt } from "@/helpers/decryptJwt";
import { User } from "@/models/userModel";

export async function GET(request: NextRequest) {
  //getUserDetail
  try {
    const userId = await decryptJwt(request);

    const user = await User.findById(userId).select("-password");

    if (user) {
      return NextResponse.json({ message: "User details found", user });
    }

    return NextResponse.json({ message: "User details not found" });
  } catch (error: any) {
    console.log(error.message);
  }
}
