import { userSchema } from "./model";
import {
  comparePassword,
  jwt_create,
  validateEmail,
  hashPassword
} from "../../utils/authorization";

export async function login({ email, password }) {
  try {
    if (!email || !password || email.trim() === "" || password.trim() === "")
      throw new Error("Required Madatory fields.");
    let userDetails: any = await userSchema.findOne({ email }).exec();
    if (
      !userDetails ||
      (userDetails && !comparePassword(password, userDetails.password))
    )
      throw new Error("Invalid credentials");
    return await jwt_create({ user: userDetails._id });
  } catch (err) {
    throw err;
  }
}

export async function register(body) {
  try {
    const { userName, email, password } = body;
    if (
      !userName ||
      !email ||
      !password ||
      email.trim() === "" ||
      password.trim() === "" ||
      userName.trim() === "" ||
      !validateEmail(email)
    ) {
      throw new Error("Required Mandatory fields or invalid data");
    }
    let userData = await userSchema.create({
      ...body,
      password: hashPassword(password)
    });
    return await jwt_create({ user: userData._id });
  } catch (err) {
    throw err;
  }
}
