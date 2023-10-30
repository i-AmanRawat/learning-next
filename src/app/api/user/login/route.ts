import connect from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/userModel";
import { request } from "http";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);
    const user = await User.findOne({ email });

    // if user doesnt' exist
    if (!user) {
      return NextResponse.json({ message: "User doesn't exist", status: 400 });
    }

    //validation
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ message: "Invalid password", status: 400 });
    }

    const payload = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = jwt.sign(payload, process.env.TOKEN_KEY!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Login successfully",
      status: true,
    });

    response.cookies.set("token", token, { httpOnly: true }); // httpOnly : true => which means that it can only be accessed and modified on the server-side and not accessible via client-side JavaScript.

    return response;
  } catch (error: any) {
    return NextResponse.json({ message: error.message });
  }
}
