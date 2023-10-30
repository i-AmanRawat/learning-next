import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function decryptJwt(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value || "";

    const decodedToken: any = jwt.verify(token, process.env.TOKEN_KEY!);

    return decodedToken.id;
  } catch (error: any) {
    console.log(error.message);
  }
}
