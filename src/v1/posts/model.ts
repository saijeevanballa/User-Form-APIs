import { model, Schema, Types } from "mongoose";
const schema = new Schema(
  {
    header: { type: String, trim: true, required: true },
    body: { type: String, trim: true, required: true },
    status: { type: String, enum: ["PRIVATE", "PUBLIC"], default: "PRIVATE" },
    createdBy: { type: Types.ObjectId, ref: "users", required: true },
    isDelete: { type: Boolean, default: false }
  },
  { timestamps: true }
);

schema.index({ email: 1 });

export const postSchema = model("posts", schema);
