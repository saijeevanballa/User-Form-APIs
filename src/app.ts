import express from "express";
import mongoose from "mongoose";
import * as bodyParser from "body-parser";
import cors from "cors";
import * as path from "path";

import { api } from "./api";

const app: express.Application = express();
mongoose
  .connect(process.env.MONGO_URL || "PLACE_MONGO_URL")
  .then(() => {
    console.log("DB connection successfully.");
  })
  .catch(() => {
    console.log("DB connection Fail.");
  });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("hello world!");
});

app.use("/v1", api);
app.use(express.static(path.join(__dirname, "public")));

app.use((error: Error, req: any, res: any, next: any) => {
  res
    .status((error as any).code < 600 ? (error as any).code : 500)
    .send({ errors: error.message || (error as any).error });
});

export { app };
