import { model, Schema } from "mongoose";
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const schema = new Schema(
  {
    userName: {
      type: String,
      required: [true, "Required User Name"],
      trim: true
    },
    email: {
      type: String,
      required: [true, "Required User Email"],
      trim: true,
      lowercase: true,
      match: EMAIL_REGEX,
      unique: true
    },
    password: String,
    is_active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

schema.index({ email: 1 });

export const userSchema = model("users", schema);
