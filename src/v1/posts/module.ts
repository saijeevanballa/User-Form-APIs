import { postSchema } from "./model";

export async function createPost(objBody: any, userObj) {
  try {
    const { header, body, status } = objBody;
    if (!header || !body || !status)
      throw new Error("Required Mandatory fields.");
    return await postSchema.create({ ...body, createdBy: userObj._id });
  } catch (err) {
    throw err;
  }
}

export async function modifiedPost(id: string, body: any) {
  try {
    return await postSchema.findByIdAndUpdate(id, body, { new: true });
  } catch (err) {
    throw err;
  }
}

export async function deletePost(id) {
  try {
    return await postSchema.findByIdAndUpdate(
      id,
      { isDelete: true },
      { new: true }
    );
  } catch (err) {
    throw err;
  }
}

export async function publicPost() {
  try {
    return await postSchema.find({ status: "PUBLIC", isDelete: false });
  } catch (err) {
    throw err;
  }
}

export async function privatePost(userObj) {
  try {
    return await postSchema.find({
      status: "PRIVATE",
      isDelete: false,
      createdBy: userObj._id
    });
  } catch (err) {
    throw err;
  }
}
