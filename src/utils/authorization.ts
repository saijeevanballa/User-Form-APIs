import { sign as jwtSign, verify as jwtVerify } from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
import { APIError } from "./error-handler";
import { userSchema } from "../v1/user/model";
import { NextFunction } from "express";

const SALTROUNDS = 10;
const SECRET: string = process.env.TOKEN_SECRET || "TOKEN_SECRET";
const ACCESS_TOKEN_LIFETIME = process.env.TOKEN_LIFE_TIME || "TOKEN_LIFE_TIME";

// USER AUTHENTICATION
export async function authenticate(
  req: any,
  res: any,
  next: any
): Promise<NextFunction> {
  try {
    if (!req.headers.authorization) throw new Error("Missing Token.");
    let token: any = await jwt_Verify(req.headers.authorization.substring(7));
    if (!token) throw new Error("Invalid Token");
    const user: any = await userSchema.findOne({ _id: token.user }).exec();
    if (!user || !user.is_active) next(new APIError("Invalid Action", 401));
    res.locals.user = user;
    return next();
  } catch (err) {
    return next(new APIError("Unauthorized"));
  }
}

//  Hash password
export function hashPassword(password: string): Promise<string> {
  try {
    return bcrypt.hashSync(password, SALTROUNDS);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

//  Compare Password
export function comparePassword(
  password: string,
  hash_password: string
): Promise<boolean> {
  try {
    return bcrypt.compareSync(password, hash_password);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

//  CREATE JWT
export async function jwt_create(
  data: any,
  ACCESS_TOKEN_TIME?: string
): Promise<string> {
  return await jwtSign(data, SECRET, {
    expiresIn: ACCESS_TOKEN_TIME || ACCESS_TOKEN_LIFETIME
  });
}

//  JWT VERIFY
export async function jwt_Verify(token: string): Promise<any> {
  try {
    return await jwtVerify(token, SECRET);
  } catch (err) {
    throw err;
  }
}

//  VALIDATE EMAIL
export function validateEmail(email: string): Promise<boolean> {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  ) as any;
}
