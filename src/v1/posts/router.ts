import { Router } from "express";
import { APIError } from "../../utils/error-handler";
import {
  createPost,
  modifiedPost,
  deletePost,
  publicPost,
  privatePost
} from "./module";
import { authenticate } from "../../utils/authorization";
const router = Router();

router.post("/create", authenticate, async (req, res, next) => {
  try {
    res.status(200).send(await createPost(req.body, res.locals.user));
  } catch (err) {
    next(new APIError(err.message));
  }
});

router.put("/:postId/Modify", authenticate, async (req, res, next) => {
  try {
    res.status(200).send(await modifiedPost(req.params.postId, req.body));
  } catch (err) {
    next(new APIError(err.message));
  }
});

router.put("/:postId/delete", authenticate, async (req, res, next) => {
  try {
    res.status(200).send(await deletePost(req.params.postId));
  } catch (err) {
    next(new APIError(err.message));
  }
});

router.get("/public/list", async (req, res, next) => {
  try {
    res.status(200).send(await publicPost());
  } catch (err) {
    next(new APIError(err.message));
  }
});

router.get("/private/list", authenticate, async (req, res, next) => {
  try {
    res.status(200).send(await privatePost(res.locals.users));
  } catch (err) {
    next(new APIError(err.message));
  }
});

export { router as postsRouter };
