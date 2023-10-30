import connect from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/userModel";

import bcryptjs from "bcryptjs";

connect(); //connecting to db

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    //using zod check for the types of reqbody  // incomplete task for future
    console.log(reqBody);
    console.log("hello there");

    //check if user exist in database or not
    const user = await User.findOne({ username });
    if (user) {
      return NextResponse.json({ message: "User already exists" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10); //generating hashed pass to store it in db
    console.log(hashedPassword);
    const newUser = new User({ username, email, password: hashedPassword }); //creating instance of newUser
    console.log("newuser", newUser);
    const savedUser = await newUser.save(); //saving new user to db
    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message });
  }
}
