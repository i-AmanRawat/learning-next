import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json({
      message: "Loggedout successfully",
      success: true,
    });

    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });

    return response;
  } catch (error: any) {
    console.log(error.message);
  }
}
