import { userRouter } from "./v1/user/router";
import { postsRouter } from "./v1/posts/router";
import express = require("express");
const app: express.Application = express();

app.use("/user", userRouter);
app.use("/posts", postsRouter);

export { app as api };
