import { Router } from "express";
import { APIError } from "../../utils/error-handler";
import { login, register } from "./module";
const router = Router();

router.get("/", async (req, res, next) => {
  try {
    res.status(200).send("from user");
  } catch (err) {
    next(new APIError(err.message));
  }
});

router.post("/login", async (req, res, next) => {
  try {
    res.status(200).send(await login(req.body));
  } catch (err) {
    next(new APIError(err.message));
  }
});

router.post("/register", async (req, res, next) => {
  try {
    res.status(200).send(await register(req.body));
  } catch (err) {
    next(new APIError(err.message));
  }
});

export { router as userRouter };
