import { config } from "dotenv";
import { jwtVerify, SignJWT } from "jose";

config();

const secret = new TextEncoder().encode(process.env.BETTER_AUTH_SECRET);

export const signJwt = async (payload: any) => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .sign(secret);
};

export const verifyJwt = async (token: string) => {
  const { payload } = await jwtVerify(token, secret);

  return payload;
};
